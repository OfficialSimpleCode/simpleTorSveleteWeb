import pkg from "uuid";
import type { CurrencyModel } from "../general/currency_model";
import CustomerData from "../general/customer_data";
import { Price } from "../general/price";
import type BookingReference from "../payment_hyp/booking_reference";
import Invoice from "../payment_hyp/invoice/invoice";
import InvoiceBusinessInfo from "../payment_hyp/invoice/invoice_business_info";
import PaymentsMethods from "../payment_hyp/invoice/payments_methods";
import PaymentCard, {
  bankFromStr,
  paymentBrandsFromStr,
} from "../payment_hyp/payment_card";
import TransactionModel from "../payment_hyp/transaction";
import type UserModel from "../user/user_model";
const { v4 } = pkg;
export default class PaymentResp {
  invoice?: Invoice;
  transaction?: TransactionModel;
  workerInfo?: InvoiceWorkerInfo;
  businessInfo: InvoiceBusinessInfo = new InvoiceBusinessInfo();
  paidWithPaymentCard: boolean = false;
  email?: string;
  amount?: number;
  paymentId?: string;
  paymentCard?: PaymentCard;

  static fromPayment({
    resp,
    isDeposit,
    paidAmount,
    bookingRefernce,
    totalAmount,
    currencyModel,
    newWorkerInfo,
    newBusinessInfo,
    infoStr,
    userId,
    isCanceledTransaction = false,
    originalTransactionIfRefund,
    user,
    customerData,
  }: {
    resp: Record<string, string>;
    isDeposit: boolean;
    paidAmount: number;
    bookingRefernce?: BookingReference;
    totalAmount: number;
    currencyModel: CurrencyModel;
    newWorkerInfo?: InvoiceWorkerInfo;
    newBusinessInfo: InvoiceBusinessInfo;
    infoStr: string;
    userId?: string;
    isCanceledTransaction?: boolean;
    originalTransactionIfRefund?: TransactionModel;
    user?: UserModel;
    customerData?: CustomerData;
  }): PaymentResp | undefined {
    const newPaymentResp = new PaymentResp();
    if (isCanceledTransaction) {
      newPaymentResp.paymentId = resp["TransId"];
    } else {
      newPaymentResp.paymentId = resp["Id"];
    }

    if (!newPaymentResp.paymentId) {
      return undefined;
    }

    newPaymentResp.businessInfo = newBusinessInfo;
    newPaymentResp.workerInfo = newWorkerInfo;
    newPaymentResp.paidWithPaymentCard = resp["isSoft"] === "True";
    newPaymentResp.email = resp["Fild2"];
    const paymentTime = new Date();

    newPaymentResp.amount = parseFloat(resp["Amount"]) || paidAmount;
    if (!newPaymentResp.amount) {
      return undefined;
    }

    const invoiceNumber = originalTransactionIfRefund
      ? resp["HeshASM"]
      : resp["Hesh"];

    if (!isDeposit && invoiceNumber) {
      newPaymentResp.invoice = new Invoice({
        workerInfo: newPaymentResp.workerInfo || new InvoiceWorkerInfo(),
        businessInfo: newPaymentResp.businessInfo,
        refundInvoice: isCanceledTransaction || !!originalTransactionIfRefund,
        invoiceNumber: parseInt(invoiceNumber),
        customerData:
          customerData ||
          user?.userPublicData.customerData ||
          (new CustomerData({}).customerUuid = userId || ""),
        createdAt: paymentTime,
        paymentsMethods: new PaymentsMethods({
          amount: newPaymentResp.amount,
          onlinePayment: new OnlinePayment(newPaymentResp.amount),
          currency: currencyModel.code,
        }),
        id: v4(),
        items: {
          0: new InvoiceItem({
            amountPerItem: newPaymentResp.amount,
            quantity: 1,
            code: 0,
            information: infoStr,
          }),
        },
      });
    }

    if (!isCanceledTransaction) {
      newPaymentResp.transaction = new TransactionModel({
        createdAt: paymentTime,
        businessName: newPaymentResp.businessInfo.businessName,
        id: v4(),
        workerId: newPaymentResp.workerInfo?.workerId || "",
        businessId: newPaymentResp.businessInfo.businessId,
        userId: customerData?.customerUuid || user?.id || userId || "",
        transactionReference: newPaymentResp.paymentId || "",
        info: infoStr,
        invoiceId: newPaymentResp.invoice?.id,
        userName: customerData?.name || user?.name || "",
        price: new Price({
          amount: newPaymentResp.amount.toString(),
          currency: currencyModel,
        }),
        isDeposit: isDeposit,
      });
      newPaymentResp.transaction.refundTransaction =
        !!originalTransactionIfRefund;
      newPaymentResp.transaction.originalTransactionRef =
        originalTransactionIfRefund?.transactionReference;
      newPaymentResp.transaction.bookingRef = bookingRefernce;
    }

    newPaymentResp.paymentCard = new PaymentCard({
      cardId: "",
      brand: paymentBrandsFromStr[resp["Brand"]] || "Card",
      token: "",
      validityMonth: resp["Tmonth"] || "",
      validityYear: resp["Tyear"] || "",
      name: resp["Fild1"] || "",
      userId: resp["UserId"] || "",
      bankName: bankFromStr[resp["Bank"]] || "",
      l4Digits: resp["L4digit"] || "",
    });

    return newPaymentResp;
  }

  // newPaymentCard({
  //   token,
  //   cardPassword,
  // }: {
  //   token: string;
  //   cardPassword: string;
  // }): PaymentCard | undefined {
  //   if (!this.paymentCard) return undefined;

  //   return new PaymentCard({
  //     cardId: v4(),
  //     brand: this.paymentCard.brand,
  //     token: Encryptor.GI().encrypt(token, cardPassword),
  //     validityMonth: Encryptor.GI().encrypt(
  //       this.paymentCard.validityMonth,
  //       cardPassword
  //     ),
  //     validityYear: Encryptor.GI().encrypt(
  //       this.paymentCard.validityYear,
  //       cardPassword
  //     ),
  //     name: this.paymentCard.name,
  //     userId: this.paymentCard.userId,
  //     bankName: this.paymentCard.bankName,
  //     l4Digits: this.paymentCard.l4Digits,
  //     businessId: this.businessInfo.businessId,
  //   });
  // }
}
