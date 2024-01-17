class BookingInvoiceData {
    invoiceId: string = "";
    docId: string = "";
    monthStr: string = "";
    issuedBy: string = "";
    amount: number = 0;
  
    constructor(
      monthStr: string,
      invoiceId: string,
      docId: string,
      amount: number,
      issuedBy: string
    ) {
      this.monthStr = monthStr;
      this.invoiceId = invoiceId;
      this.docId = docId;
      this.amount = amount;
      this.issuedBy = issuedBy;
    }
  
    toJson(): { [key: string]: any } {
      const data: { [key: string]: any } = {};
  
      data["monthStr"] = this.monthStr;
      data["docId"] = this.docId;
      data["issuedBy"] = this.issuedBy;
      data["amount"] = this.amount;
  
      return data;
    }
  
    constructorFromJson(json: { [key: string]: any }, id: string, workerId: string): void {
      this.invoiceId = id;
      this.docId = json["docId"] ?? "";
      this.monthStr = json["monthStr"] ?? "";
      this.issuedBy = json["issuedBy"] ?? workerId;
  
      if (json["amount"] != null) {
        this.amount = typeof json["amount"] === "number" ? json["amount"] : parseFloat(json["amount"]);
      }
    }
  
    constructorFromBookingInvoiceData(bookingInvoiceData: BookingInvoiceData): void {
      this.invoiceId = bookingInvoiceData.invoiceId;
      this.docId = bookingInvoiceData.docId;
      this.monthStr = bookingInvoiceData.monthStr;
      this.issuedBy = bookingInvoiceData.issuedBy;
      this.amount = bookingInvoiceData.amount;
    }
  
    toString(): string {
      return JSON.stringify(this.toJson(), null, 2);
    }
  }
  