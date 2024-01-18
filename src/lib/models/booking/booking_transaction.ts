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

  constructor({});

  constructor({
    type,
    amount,
    id,
    hypId,
    createdAt,
  }: {
    type: PaymentTypes;
    amount: number;
    id: string;
    hypId: string;
    createdAt: Date;
  }) {
    this.type = type;
    this.amount = Number(amount.toFixed(2)) || amount;
    this.id = id;
    this.hypId = hypId;
    this.createdAt = createdAt;
  }

  static fromJson(
    json: { [key: string]: any },
    newId: string
  ): BookingTransactionModel {
    const newObj = new BookingTransactionModel({});
    if (json["amount"] != null) {
      newObj.amount =
        typeof json["amount"] === "number"
          ? json["amount"]
          : parseFloat(json["amount"]);
    }
    newObj.hypId = json["hypId"] || "";
    newObj.id = newId;
    newObj.type = paymentTypesFromStr[json["type"]] || PaymentTypes.payment;
    newObj.createdAt = json["createdAt"]
      ? new Date(json["createdAt"])
      : new Date(0);
    return newObj;
  }

  static fromTransaction(
    transactionModel: BookingTransactionModel
  ): BookingTransactionModel {
    const newObj = new BookingTransactionModel({});
    newObj.type = transactionModel.type;
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
    data["type"] = paymentTypesToStr[this.type];
    data["createdAt"] = this.createdAt.toISOString();

    return data;
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
