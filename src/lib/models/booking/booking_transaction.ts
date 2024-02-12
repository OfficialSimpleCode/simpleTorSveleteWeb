import { dateIsoStr, isoToDate } from "$lib/utils/times_utils";

export enum PaymentTypes {
  deposit,
  payment,
}

export const paymentTypesToStr: { [key in PaymentTypes]: string } = {
  [PaymentTypes.deposit]: "deposit",
  [PaymentTypes.payment]: "payment",
};

export const paymentTypesFromStr: { [key: string]: PaymentTypes } = {
  deposit: PaymentTypes.deposit,
  payment: PaymentTypes.payment,
};

export default class BookingTransactionModel {
  type: PaymentTypes = PaymentTypes.payment;
  amount: number = 0;
  createdAt: Date = new Date(0);
  id: string = "";
  hypId: string = "";
  refund: boolean = false;
  canceled: boolean = false;

  constructor({});

  constructor({
    type = PaymentTypes.payment,
    amount = 0,
    id = "",
    hypId = "",
    refund = false,
    canceled = false,
    createdAt = new Date(0),
  }: {
    type?: PaymentTypes;
    amount?: number;
    refund?: boolean;
    id?: string;
    canceled?: boolean;
    hypId?: string;
    createdAt?: Date;
  }) {
    this.type = type;
    this.amount = parseFloat(amount.toFixed(2));
    this.id = id;
    this.canceled = canceled;
    this.hypId = hypId;
    this.refund = refund;
    this.createdAt = createdAt;
  }

  static fromJson(
    json: Record<string, any>,
    newId: string
  ): BookingTransactionModel {
    const newObj = new BookingTransactionModel({});
    if (json["amount"] != undefined) {
      newObj.amount = json["amount"];
    }
    newObj.refund = json["refund"] ?? false;
    newObj.canceled = json["canceled"] ?? false;
    newObj.hypId = json["hypId"] || "";
    newObj.id = newId;
    newObj.type = paymentTypesFromStr[json["type"]] || PaymentTypes.payment;
    newObj.createdAt = json["createdAt"]
      ? isoToDate(json["createdAt"])
      : new Date(0);
    return newObj;
  }

  static fromTransaction(
    transactionModel: BookingTransactionModel
  ): BookingTransactionModel {
    const newObj = new BookingTransactionModel({});
    newObj.type = transactionModel.type;
    newObj.canceled = transactionModel.canceled;
    newObj.amount = transactionModel.amount;
    newObj.id = transactionModel.id;
    newObj.hypId = transactionModel.hypId;
    newObj.createdAt = transactionModel.createdAt;
    return newObj;
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};
    data["amount"] = this.amount;
    data["hypId"] = this.hypId;
    if (this.canceled) {
      data["canceled"] = this.canceled;
    }
    if (this.refund) {
      data["refund"] = this.refund;
    }
    data["type"] = paymentTypesToStr[this.type];
    data["createdAt"] = dateIsoStr(this.createdAt);

    return data;
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
