class InvoiceItem {
    code: number = 0;
    information: string = "";
    amountPerItem: number = 0;
    totalAmount: number = 0;
    quantity: number = 0;
  
    constructor({
      code = 0,
      information = "",
      amountPerItem = 0,
      quantity = 0,
    }: {
      code?: number;
      information?: string;
      amountPerItem?: number;
      quantity?: number;
    } = {}) {
      this.code = code || 0;
      this.information = information || "";
      this.amountPerItem = amountPerItem || 0;
      this.quantity = quantity || 0;
      this.totalAmount = this.quantity * this.amountPerItem;
    }
  
    toJson(): Record<string, any> {
      const data: Record<string, any> = {};
  
      data["I"] = this.information;
      data["A"] = this.amountPerItem;
      data["Q"] = this.quantity;
      return data;
    }
  
    static fromJson(json: Record<string, any>, index: number): InvoiceItem {
      const amountPerItem =
        json["A"] !== null && typeof json["A"] === "number"
          ? json["A"]
          : json["A"].toDouble();
  
      return new InvoiceItem({
        code: index,
        information: json["I"] || "",
        amountPerItem: amountPerItem,
        quantity: json["Q"] || 0,
      });
    }
  
    toItemFormat(): string {
      return `[${this.code}~${this.information}~${this.quantity}~${this.amountPerItem}]`;
    }
  }
  