import { currencyToInt, hypValidCurrencies } from "$lib/consts/hyp";
import { convertUrlToMap } from "$lib/consts/string";
import type { CurrencyModel } from "$lib/models/general/currency_model";
import type BookingReference from "$lib/models/payment_hyp/booking_reference";
import type InvoiceBusinessInfo from "$lib/models/payment_hyp/invoice/invoice_business_info";
import type PaymentCard from "$lib/models/payment_hyp/payment_card";
import PaymentResp from "$lib/models/resps/payment_resp";
import type UserModel from "$lib/models/user/user_model";
import HypClient from "$lib/services/clients/hyp_client";
import { hypErrors } from "$lib/services/errors/interpeters/hyp_errors_interpeter";
import { Errors } from "$lib/services/errors/messages";
import { translate } from "$lib/utils/translate";
import AppErrorsHelper from "../app_errors";
import PaymentsRepo from "./payments_repo";

export default class PaymentsHelper {
  private static _singleton: PaymentsHelper = new PaymentsHelper();

  private constructor() {}

  public static GI(): PaymentsHelper {
    return PaymentsHelper._singleton;
  }
  _hypClient: HypClient = new HypClient();
  paymentsRepo: PaymentsRepo = new PaymentsRepo();

  async getCheckoutLink({
    amount,
    terminal,
    info,
    businessId,
    email = "",
    firstName = "",
    lastName = "",
    isDeposit = false,
    currency = "ILS",
  }: {
    amount: number;
    terminal: string;
    info: string;
    businessId: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    isDeposit?: boolean;
    currency?: string;
  }): Promise<string> {
    return await this._hypClient.getCheckoutLink({
      businessId,
      terminal,
      transactionInfo: info,
      email,
      amount,
      isDeposit,
      firstName,
      currency: currencyToInt[currency] ?? 1,
    });
  }

  async payWithToken({
    terminal,
    info,
    token,
    dycripteMonth,
    dycriptedYear,
    card,
    email,
    amount,
    businessId,
    currency = "ILS",
    isDeposit = false,
  }: {
    terminal: string;
    info: string;
    token: string;
    dycripteMonth: string;
    dycriptedYear: string;
    card: PaymentCard;
    email: string;
    amount: number;
    businessId: string;
    currency?: string;
    isDeposit?: boolean;
  }): Promise<Map<string, string>> {
    const url = await this._hypClient.payWithToken({
      terminal,
      businessId,
      token,
      validityMonth: dycripteMonth,
      email,
      validityYear: dycriptedYear,
      currency: currencyToInt[currency] ?? 1,
      isDeposit,
      transactionInfo: info,
      amount,
      name: card.name,
      userId: card.userId,
    });

    const convertedMap = new Map(convertUrlToMap(url)) ;

    if (url.includes("CCode=0") || (url.includes("CCode=800") && isDeposit)) {
      convertedMap.set("isSoft", "True") ;
      return convertedMap;
    } else {
      AppErrorsHelper.GI().error =
        hypErrors[(convertedMap.get("CCode") || "").trim()] ?? Errors.unknown;
      return new Map();
    }
  }

 
async  getPaymentToken({
  terminal,
  transactionId,
  businessId,
}: {
  terminal: string;
  transactionId: string;
  businessId: string;
}): Promise<string> {
  return await this._hypClient
    .getPaymentToken({
      businessId: businessId,
      terminal: terminal,
      transactionId: transactionId,
    })
    .then((urlResp) => {
      const convertedMap = convertUrlToMap(urlResp);
      return convertedMap.get("Token") ?? "";
    });
}

async  payAmount({
  
  workerInfo,
  businessInfo,
  totalAmount,
  paidAmount,
  user,
  infoGenerator,
  afterPayment,
  currencyModel,
  timer,
  bookingRefernce,
  amountToPay,
  successText,
  showSuccess = true,
  isDeposit = false,
}: {
 
  workerInfo: InvoiceWorkerInfo;
  businessInfo: InvoiceBusinessInfo;
  totalAmount: number;
  paidAmount: number;
  user: UserModel;
  infoGenerator: (params: {
    currentAmount: number;
    isDeposit: boolean;
    paidAmount: number;
    totalAmount: number;
  }) => string;
  afterPayment: (resp: PaymentResp | undefined) => Promise<boolean>;
  currencyModel: CurrencyModel;
  timer: number | undefined;
  bookingRefernce: BookingReference | undefined;
  amountToPay: number;
  successText: string | undefined;
  showSuccess?: boolean;
  isDeposit?: boolean;
}): Promise<PaymentResp | undefined> {
  AppErrorsHelper.GI().error = Errors.unknown;
  if (!hypValidCurrencies[currencyModel.code]) {
    AppErrorsHelper.GI().error = Errors.currencyTypeIsNotAllowed;
    afterPayment(undefined);
    return undefined;
  }
  const showTip = amountToPay + paidAmount >= totalAmount;
  if (timer != null) {
    ScreenController().startPaymentTimer(timer);
  }
  let paymentResp: PaymentResp | undefined = await this.openCheckoutPage({
    
    totalAmount: totalAmount,
    workerInfo: workerInfo,
    infoGenerator: infoGenerator,
    user: user,
    successText: successText,
    paidAmount: paidAmount,
    businessInfo: businessInfo,
    currencyModel: currencyModel,
    bookingRefernce: bookingRefernce,
    showTip: showTip,
    amountToPay: amountToPay,
    isDeposit: isDeposit,
    showSuccess: showSuccess,
    afterPayment: afterPayment,
  });
  // ScreenController().cancelPaymentTimer();
  // if (paymentResp == null) {
  //   return null;
  // }
  // if (!paymentResp.paidWithPaymentCard) {
  //   if (paymentResp.email != "" && paymentResp.email != null) {
  //     userHelper.loadLibrary().then((value) => {
  //       userHelper.UserHelper().updateEmail(paymentResp.email!);
  //     });
  //   }
  //   await _makeNewCard({
     
  //     paymentResp: paymentResp,
  //     businessId: businessInfo.businessId,
  //     businessName: businessInfo.businessName,
  //     terminal: businessInfo.masofNumber,
  //   });
  // }
  // if (showTip && paymentResp.amount != null) {
  //   const alreadyPaidAmount = paidAmount;
  //   const tip = alreadyPaidAmount + paymentResp.amount! - totalAmount;
  //   const tipPrecentage = Math.ceil((100 * tip) / totalAmount);
  //   if (
  //     tipPrecentage !== UserInitializer().user.preferdTipPercentage
  //   ) {
  //     paymentsRepo
  //       .updateFieldInsideDocAsMapRepo({
  //         path: usersCollection,
  //         docId: UserInitializer().user.id,
  //         fieldName: "preferdTipPercentage",
  //         value: tipPrecentage,
  //       })
  //       .then((value) => {
  //         if (value) {
  //           UserInitializer().user.preferdTipPercentage = tipPrecentage;
  //         }
  //       });
  //   }
  // }
  return paymentResp;
}

// async  getUserPassword(
 
// ): Promise<string | null> {
//   if (UserInitializer().user.cardPaymentsPass === "") {
//     return await openSignPaymentCardSheet({
      
//       forNewCard: true,
//     });
//   }
//   return await openSignPaymentCardSheet({
   
//     forNewCard: false,
//   });
// }

// async  _makeNewCard({
 
//   terminal,
//   paymentResp,
//   businessId,
//   businessName,
// }: {
  
//   terminal: string;
//   paymentResp: PaymentResp;
//   businessId: string;
//   businessName: string;
// }): Promise<void> {
//   if (paymentResp.paymentCard == null) {
//     return;
//   }
//   if (
//     UserInitializer().user.isCardFromJsonExist(
//       paymentResp.paymentCard!,
//       businessId
//     )
//   ) {
//     return;
//   }
//   const cardPassword = await getUserPassword(context);
//   if (cardPassword == null || cardPassword === "") {
//     return;
//   }
//   await Loading({
//     context: context,
//     navigator: Navigator.of(context),
//     future: userHelper.loadLibrary().then((value) => {
//       return makeNewCardAction({
//         terminal: terminal,
//         paymentResp: paymentResp,
//         businessId: businessId,
//         cardPassword: cardPassword,
//       });
//     }),
//     msg: translate("cardSaved"),
//   }).dialog();
// }

// async makeNewCardAction({
//   terminal,
//   paymentResp,
//   businessId,
//   cardPassword,
// }: {
//   terminal: string;
//   paymentResp: PaymentResp;
//   businessId: string;
//   cardPassword: string;
// }): Promise<boolean> {
//   const token = await this.getPaymentToken({
//     businessId: businessId,
//     terminal: terminal,
//     transactionId: paymentResp.paymentId ?? "",
//   });
//   if (token === "") {
//     logger.e(
//       "Error accured while requesting card Token - don't create card"
//     );
//     return false;
//   }
//   const newPaymentCard = paymentResp.newPaymentCard({
//     token: token,
//     cardPassword: cardPassword,
//   });
//   if (newPaymentCard == null) {
//     return false;
//   }
//   return await UserHelper.GI().addPaymentCard({
//     businessId: businessId,
//     card: newPaymentCard,
//     newCardPassword: cardPassword,
//   });
// }


// async  getTransactionByIdUserAction({
//   date,
//   user,
//   transactionId,
// }: {
//   date: Date;
//   user: UserModel;
//   transactionId: string;
// }): Promise<TransactionModel | null> {
//   let transactions: Record<string, TransactionModel> | undefined;
//   const monthStr = dateToMonthStr(date);
  
//   transactions = user.currentMonthPayments;
  
//   if (transactions != null) {
//     const transaction = transactions.get(transactionId);
//     if (transaction != null) {
//       return transaction;
//     }
//   }
//   transactions = await _loadUserPaymentsFromDb({
//     monthStr: monthStr,
//     userId: user.id,
//   });
//   user.existPaymentRequestsDocs.add(monthStr);
//   if (isWeb || isCurrentDoc(date)) {
//     user.currentMonthPayments = transactions;
//   } else {
//     setUserPaymentsOnLocalCache({
//       transactionModels: transactions,
//       monthStr: monthStr,
//       userId: user.id,
//     });
//   }
//   return transactions.get(transactionId) ?? null;
// }

// async  openCheckoutPage({

//   user,
//   totalAmount,
//   bookingRefernce,
//   workerInfo,
//   paidAmount,
//   businessInfo,
//   amountToPay,
//   showTip,
//   successText,
//   currencyModel,
//   afterPayment,
//   infoGenerator,
//   showSuccess,
//   isDeposit = false,
//   card
// }: {
 
//   user: UserModel,
//   totalAmount: number,
//   bookingRefernce: BookingReference | undefined,
//   workerInfo: InvoiceWorkerInfo,
//   paidAmount: number,
//   businessInfo: InvoiceBusinessInfo,
//   amountToPay: number,
//   showTip: boolean;
//   successText: string | undefined;
//   currencyModel: CurrencyModel;
//   afterPayment: (resp: PaymentResp | null) => Promise<boolean>;
//   infoGenerator: (params: {
//     totalAmount: number;
//     paidAmount: number;
//     currentAmount: number;
//     isDeposit: boolean;
//   }) => string;
//   card?:PaymentCard,
//   showSuccess: boolean;
//   isDeposit?: boolean;
// }): Promise<PaymentResp | undefined> {

//   if (card) {
//     return await this.payWithCard({
      
//       card: result,
//       user: user,
//       showSuccess: showSuccess,
//       totalAmount: totalAmount,
//       paidAmount: paidAmount,
//       bookingRefernce: bookingRefernce,
//       businessInfo: businessInfo,
//       workerInfo: workerInfo,
//       amountToPay: amountToPay,
//       showTip: showTip,
//       isDeposit: isDeposit,
//       successText: successText,
//       currencyModel: currencyModel,
//       afterPayment: afterPayment,
//       amountListener: amountListener,
//       infoStr: infoStr,
//     });
//   } else {
//     return await this.payWithHypPage({
     
//       user: user,
//       totalAmount: totalAmount,
//       paidAmount: paidAmount,
//       showSuccess: showSuccess,
//       bookingRefernce: bookingRefernce,
//       successText: successText,
//       businessInfo: businessInfo,
//       workerInfo: workerInfo,
//       isDeposit: isDeposit,
//       amountToPay: amountToPay,
//       showTip: showTip,
//       currencyModel: currencyModel,
//       afterPayment: afterPayment,
//       amountListener: amountListener,
//       infoStr: infoStr,
//     });
//   }
// }

async  payWithCard({
 
  user,
  successText,
  card,
  bookingRefernce,
  totalAmount,
  paidAmount,
  businessInfo,
  workerInfo,
  amountToPay,
  showSuccess,
  showTip,
  currencyModel,
  afterPayment,
  amountListener,
  infoStr,
  isDeposit = false,
}: {
  
  user: UserModel;
  successText: string | undefined;
  card: PaymentCard;
  bookingRefernce: BookingReference | undefined;
  totalAmount: number;
  paidAmount: number;
  businessInfo: InvoiceBusinessInfo;
  workerInfo: InvoiceWorkerInfo;
  amountToPay: number;
  showSuccess: boolean;
  showTip: boolean;
  currencyModel: CurrencyModel;
  afterPayment: (resp: PaymentResp | undefined) => Promise<boolean>;
  infoStr: string;
  isDeposit?: boolean;
}): Promise<PaymentResp | undefined> {
 
  if (!(typeof password === "string") || password.length < 1) {
    afterPayment(undefined);
    return undefined;
  }
  const decryptedCard = card.decryptCard(password);
  let paymentResp: PaymentResp | undefined = undefined;
  if (decryptedCard.token.length > 0) {
    await Loading({
      
      navigator: Navigator.of(context),
      timeOutDuration: Duration(seconds: 10),
      showSuccessAnimation: showSuccess,
      future: this.payWithToken({
        businessId: businessInfo.businessId,
        terminal: businessInfo.masofNumber,
        dycripteMonth: decryptedCard.validityMonth,
        dycriptedYear: decryptedCard.validityYear,
        email: user.userPublicData.email,
        info: infoStr,
        amount: amountListener.value,
        token: decryptedCard.token,
        isDeposit: isDeposit,
        currency: currencyModel.code,
        card: card,
      }).then(async (resp) => {
        if (resp.isNotEmpty) {
          paymentResp = PaymentResp.fromPayment({
            resp: resp,
            isDeposit: isDeposit,
            userId: user.id,
            paidAmount: paidAmount,
            bookingRefernce: bookingRefernce,
            totalAmount: totalAmount,
            currencyModel: currencyModel,
            user: user,
            newWorkerInfo: workerInfo,
            newBusinessInfo: businessInfo,
            infoStr: infoStr,
          });
          this.savePaymentRespOnDb({
            paymentResp: paymentResp!,
            user: user,
            isUserExist: true,
          });
        }
        await afterPayment(paymentResp);
        return resp.isNotEmpty;
      }),
      msg: successText ?? translate("paySuccessfully", undefined, false),
    }).dialog();
  }
  return paymentResp;
}

async  payWithHypPage({

  user,
  totalAmount,
  paidAmount,
  successText,
  businessInfo,
  bookingRefernce,
  workerInfo,
  amountToPay,
  showTip,
  showSuccess,
  currencyModel,
  afterPayment,
  amountListener,
  infoStr,
  isDeposit = false,
}: {

  user: UserModel;
  totalAmount: number;
  paidAmount: number;
  successText: string | undefined;
  businessInfo: InvoiceBusinessInfo;
  bookingRefernce: BookingReference | undefined;
  workerInfo: InvoiceWorkerInfo;
  amountToPay: number;
  showTip: boolean;
  showSuccess: boolean;
  currencyModel: CurrencyModel;
  afterPayment: (resp: PaymentResp | undefined) => Promise<boolean>;
  
  infoStr: string;
  isDeposit?: boolean;
}): Promise<PaymentResp | undefined> {
  const resp = await this.openCheckOutScreen({

    businessInfo: businessInfo,
    transactionInfo: infoStr,
    isDeposit: isDeposit,
    currencyCode: currencyModel.code,
    amount: amountListener.value,
  });
  if (resp == null || resp.isEmpty) {
    afterPayment(undefined);
    return undefined;
  }
  const paymentResp = PaymentResp.fromPayment({
    resp: resp,
    isDeposit: isDeposit,
    paidAmount: paidAmount,
    userId: user.id,
    totalAmount: totalAmount,
    bookingRefernce: bookingRefernce,
    currencyModel: currencyModel,
    user: user,
    newWorkerInfo: workerInfo,
    newBusinessInfo: businessInfo,
    infoStr: infoStr,
  });
  savePaymentRespOnDb({
    paymentResp: paymentResp,
    user: user,
    isUserExist: true,
  });
  await Loading({
   
    navigator: Navigator.of(context),
    showSuccessAnimation: showSuccess,
    timeOutDuration: Duration(seconds: 20),
    future: afterPayment(paymentResp),
    msg: successText ?? translate("paySuccessfully", undefined, false),
  }).dialog();
  return paymentResp;
}



}
