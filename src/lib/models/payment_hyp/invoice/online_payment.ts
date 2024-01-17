class OnlinePayment {
    amount: number;
  
    constructor(amount: number) {
      this.amount = amount;
    }
  
    toJson(): Record<string, any> {
      const data: Record<string, any> = {};
      data["A"] = this.amount;
      return data;
    }
  
    static fromJson(json: Record<string, any>): OnlinePayment {
      const amount = json["A"] ?? 0;
      return new OnlinePayment(amount);
    }
  
    toString(): string {
      return JSON.stringify(this, null, 2);
    }
  }
  