enum PaymentTypes {
    deposit,
    payment
  }
  
  const paymentTypesToStr: { [key in PaymentTypes]: string } = {
    [PaymentTypes.deposit]: "deposit",
    [PaymentTypes.payment]: "payment"
  };
  
  const paymentTypesFromStr: { [key: string]: PaymentTypes } = {
    "deposit": PaymentTypes.deposit,
    "payment": PaymentTypes.payment
  };
  
  class BookingTransactionModel {
    type: PaymentTypes = PaymentTypes.payment;
    amount: number = 0;
    createdAt: Date = new Date(0);
    id: string = "";
    hypId: string = "";
  
    constructor({
      type,
      amount,
      id,
      hypId,
      createdAt
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
  
    constructorFromJson(json: { [key: string]: any }, newId: string): void {
      if (json["amount"] != null) {
        this.amount = typeof json["amount"] === "number"
          ? json["amount"]
          : parseFloat(json["amount"]);
      }
      this.hypId = json["hypId"] || "";
      this.id = newId;
      this.type = paymentTypesFromStr[json["type"]] || PaymentTypes.payment;
      this.createdAt = json["createdAt"]
        ? new Date(json["createdAt"])
        : new Date(0);
    }
  
    fromTransaction(transactionModel: BookingTransactionModel): void {
      this.type = transactionModel.type;
      this.amount = transactionModel.amount;
      this.id = transactionModel.id;
      this.hypId = transactionModel.hypId;
      this.createdAt = transactionModel.createdAt;
    }
  
    toJson(): { [key: string]: any } {
      const data: { [key: string]: any } = {};
      data['amount'] = this.amount;
      data["hypId"] = this.hypId;
      data["type"] = paymentTypesToStr[this.type];
      data["createdAt"] = this.createdAt.toISOString();
  
      return data;
    }
  
    toString(): string {
      return JSON.stringify(this.toJson(), null, 2);
    }
  }
  