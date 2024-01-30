import { hypValidCurrencies } from "$lib/consts/hyp";
import { isNumber } from "$lib/utils/general_utils";
import {
  dateIsoStr,
  dateToDateStr,
  isoToDate,
  setTo1970,
} from "$lib/utils/times_utils";
import BookingTransactionModel, {
  PaymentTypes,
} from "../booking/booking_transaction";
import { defaultCurrency } from "../general/currency_model";
import type IconData from "../general/icon_data";
import { Price } from "../general/price";
import TransactionNotificationPayload from "../notifications/transaction_notification_payload";
import { PaymentObject } from "./payment_object";

export default class TransactionModel extends PaymentObject {
  transactionReference: string = "";
  userName: string = "";
  userId: string = "";
  info: string = "";
  isDeposit: boolean = false;
  businessName: string = "";
  invoiceId: string | undefined;
  canceled: boolean = false;
  refundTransactionId: string | undefined;
  refundTransactionCreatedAt: Date | undefined;
  refundTransaction: boolean = false;
  originalTransactionRef: string | undefined;
  businessId: string = "";
  workerId: string = "";

  constructor({});

  constructor({
    price,
    createdAt,
    id,
    workerId,
    businessId,
    transactionReference,
    userName,
    userId,
    info,
    businessName,
    isDeposit,
    invoiceId,
  }: {
    price: Price;
    createdAt: Date;
    id: string;
    workerId: string;
    businessId: string;
    transactionReference: string;
    userName: string;
    userId: string;
    info: string;
    businessName: string;
    isDeposit: boolean;
    invoiceId: string | undefined;
  }) {
    super();
    this.price = price;
    this.createdAt = createdAt;
    this.id = id;
    this.workerId = workerId;
    this.businessId = businessId;
    this.transactionReference = transactionReference;
    this.userName = userName;
    this.userId = userId;
    this.info = info;
    this.businessName = businessName;
    this.isDeposit = isDeposit;
    this.invoiceId = invoiceId;
  }

  static empty(): TransactionModel {
    return new TransactionModel({});
  }

  static fromJson(json: Record<string, any>, newId: string): TransactionModel {
    const transactionModel = new TransactionModel({});
    transactionModel.isDeposit = json["ID"] ?? false;
    transactionModel.info = json["I"] ?? "";
    transactionModel.businessId = json["BI"] ?? "";
    transactionModel.workerId = json["WI"] ?? "";
    transactionModel.originalTransactionRef = json["OTR"];
    transactionModel.userId = json["UI"] ?? "";
    transactionModel.refundTransaction = json["RT"] ?? false;
    transactionModel.canceled = json["CAN"] ?? false;
    transactionModel.refundTransactionId = json["RTI"];
    transactionModel.userName = json["UN"] ?? "";
    if (json["RTCA"] != null) {
      transactionModel.refundTransactionCreatedAt = isoToDate(json["RTCA"]);
    }
    transactionModel.transactionReference = json["TR"] ?? "";
    transactionModel.invoiceId = json["II"];
    transactionModel.businessName = json["BN"] ?? "";
    const amount =
      json["A"] != null
        ? isNumber(json["A"])
          ? json["A"]
          : parseFloat(json["A"])
        : 0;
    const currencyCode = json["C"] ?? "";
    const currency = hypValidCurrencies[currencyCode];
    transactionModel.price = new Price({
      amount: amount.toString(),
      currency: currency ?? defaultCurrency,
    });
    if (json["CA"] != null) {
      transactionModel.createdAt = isoToDate(json["CA"]);
    }
    return transactionModel;
  }

  static fromTransaction(transactionModel: TransactionModel): TransactionModel {
    const newTransactionModel = new TransactionModel({});
    newTransactionModel.isDeposit = transactionModel.isDeposit;
    newTransactionModel.info = transactionModel.info;
    newTransactionModel.businessId = transactionModel.businessId;
    newTransactionModel.workerId = transactionModel.workerId;
    newTransactionModel.originalTransactionRef =
      transactionModel.originalTransactionRef;
    newTransactionModel.userId = transactionModel.userId;
    newTransactionModel.refundTransaction = transactionModel.refundTransaction;
    newTransactionModel.canceled = transactionModel.canceled;
    newTransactionModel.refundTransactionId =
      transactionModel.refundTransactionId;
    newTransactionModel.userName = transactionModel.userName;
    newTransactionModel.createdAt = transactionModel.createdAt;
    newTransactionModel.canceled = transactionModel.canceled;
    newTransactionModel.refundTransaction = transactionModel.refundTransaction;
    newTransactionModel.refundTransactionId =
      transactionModel.refundTransactionId;
    newTransactionModel.originalTransactionRef =
      transactionModel.originalTransactionRef;
    newTransactionModel.price = transactionModel.price;
    return newTransactionModel;
  }

  get canCancel(): boolean {
    return (
      dateToDateStr(this.createdAt) == dateToDateStr(new Date()) &&
      setTo1970(new Date()).getTime() < new Date(1970, 0, 1, 23, 29).getTime()
    );
  }

  get bookingTransaction(): BookingTransactionModel {
    return new BookingTransactionModel({
      amount: this.price.amount,
      createdAt: this.createdAt,
      hypId: this.transactionReference,
      id: this.id,
      type: this.isDeposit ? PaymentTypes.deposit : PaymentTypes.payment,
    });
  }

  toTransactionNotificationPayload(
    shopIcon: IconData
  ): TransactionNotificationPayload {
    const payload = new TransactionNotificationPayload({
      businessName: this.businessName,
      businessId: this.businessId,
      workerId: this.workerId,
      id: this.id,
      date: this.createdAt,
      shopIcon: shopIcon,
    });
    payload.shopIcon = shopIcon;
    return payload;
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};
    data["A"] = this.price.amount;
    data["C"] = this.price.currency.code;
    data["UI"] = this.userId;
    data["BI"] = this.businessId;
    data["WI"] = this.workerId;
    if (this.canceled) {
      data["CAN"] = this.canceled;
    }
    if (this.refundTransactionId != null) {
      data["RTI"] = this.refundTransactionId;
    }
    if (this.originalTransactionRef != null) {
      data["OTR"] = this.originalTransactionRef;
    }

    if (this.refundTransaction) {
      data["RT"] = this.refundTransaction;
    }

    data["UN"] = this.userName;
    data["I"] = this.info;
    data["CA"] = dateIsoStr(this.createdAt);
    data["BN"] = this.businessName;
    data["TR"] = this.transactionReference;
    if (this.refundTransactionCreatedAt != null) {
      data["RTCA"] = dateIsoStr(this.refundTransactionCreatedAt);
    }
    if (this.isDeposit) {
      data["ID"] = this.isDeposit;
    }
    if (this.invoiceId != null) {
      data["II"] = this.invoiceId;
    }

    return data;
  }

  toString(): string {
    return JSON.stringify(this, null, "  ");
  }
}
