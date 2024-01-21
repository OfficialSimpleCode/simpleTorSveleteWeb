import BookingTransactionModel from "../booking/booking_transaction";
import { defaultCurrency } from "../general/currency_model";
import { Price } from "../general/price";
import { PaymentObject } from "./payment_object";

export default class TransactionModel extends PaymentObject {
  transactionReference: string = "";
  userName: string = "";
  info: string = "";
  transactionId: string = "";
  isDeposit: boolean = false;
  businessName: string = "";
  invoiceId?: string;

  constructor({
    price,
    createdAt,
    transactionReference,
    userName,
    transactionId,
    info,
    businessName,
    isDeposit,
    invoiceId,
  }: {
    price: Price;
    createdAt: Date;
    transactionReference: string;
    userName: string;
    transactionId: string;
    info: string;
    businessName: string;
    isDeposit: boolean;
    invoiceId?: string;
  }) {
    super();
    this.price = price;
    this.createdAt = createdAt;
    this.transactionReference = transactionReference;
    this.userName = userName;
    this.transactionId = transactionId;
    this.info = info;
    this.businessName = businessName;
    this.isDeposit = isDeposit;
    this.invoiceId = invoiceId;
  }

  static empty(): TransactionModel {
    return new TransactionModel({
      price: new Price({ amount: "0", currency: defaultCurrency }), // Replace with your actual default currency
      createdAt: new Date(0),
      transactionReference: "",
      userName: "",
      transactionId: "",
      info: "",
      businessName: "",
      isDeposit: false,
      invoiceId: undefined,
    });
  }

  static fromJson(json: Record<string, any>, newId: string): TransactionModel {
    const transactionModel = new TransactionModel({
      price: Price.fromJson(json.price),
      createdAt: json.CA ? new Date(json.CA) : new Date(0),
      transactionReference: json.TR || "",
      userName: json.UN || "",
      transactionId: newId,
      info: json.I || "",
      businessName: json.BN || "",
      isDeposit: json.ID || false,
      invoiceId: json.II,
    });

    return transactionModel;
  }

  static fromTransaction(transactionModel: TransactionModel): TransactionModel {
    const clonedTransactionModel = new TransactionModel({
      price: transactionModel.price,
      createdAt: transactionModel.createdAt,
      transactionReference: transactionModel.transactionReference,
      userName: transactionModel.userName,
      transactionId: transactionModel.transactionId,
      info: transactionModel.info,
      businessName: transactionModel.businessName,
      isDeposit: transactionModel.isDeposit,
      invoiceId: transactionModel.invoiceId,
    });

    return clonedTransactionModel;
  }

  get bookingTransaction(): BookingTransactionModel {
    return new BookingTransactionModel({
      amount: this.price.amount,
      createdAt: this.createdAt,
      hypId: this.transactionReference,
      id: this.transactionId,
      type: this.isDeposit ? "deposit" : "payment",
    });
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {
      A: this.price.amount,
      C: this.price.currency.code,
      UN: this.userName,
      I: this.info,
      CA: this.createdAt.toISOString(),
      BN: this.businessName,
      TR: this.transactionReference,
    };
    return data;
  }
}
