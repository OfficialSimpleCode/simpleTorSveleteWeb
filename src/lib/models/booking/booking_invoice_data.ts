export default class BookingInvoiceData {
  invoiceId: string = "";
  docId: string = "";
  monthStr: string = "";
  issuedBy: string = "";
  amount: number = 0;

  constructor({});

  constructor({
    monthStr,
    invoiceId,
    docId,
    amount,
    issuedBy,
  }: {
    monthStr: string;
    invoiceId: string;
    docId: string;
    amount: number;
    issuedBy: string;
  }) {
    this.monthStr = monthStr;
    this.invoiceId = invoiceId;
    this.docId = docId;
    this.amount = amount;
    this.issuedBy = issuedBy;
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};

    data["monthStr"] = this.monthStr;
    data["docId"] = this.docId;
    data["issuedBy"] = this.issuedBy;
    data["amount"] = this.amount;

    return data;
  }

  static fromJson(
    json: { [key: string]: any },
    id: string,
    workerId: string
  ): BookingInvoiceData {
    const newObj = new BookingInvoiceData({});
    newObj.invoiceId = id;
    newObj.docId = json["docId"] ?? "";
    newObj.monthStr = json["monthStr"] ?? "";
    newObj.issuedBy = json["issuedBy"] ?? workerId;

    if (json["amount"] != null) {
      newObj.amount =
        typeof json["amount"] === "number"
          ? json["amount"]
          : parseFloat(json["amount"]);
    }
    return newObj;
  }

  static fromBookingInvoiceData(
    bookingInvoiceData: BookingInvoiceData
  ): BookingInvoiceData {
    const newObj = new BookingInvoiceData({});
    newObj.invoiceId = bookingInvoiceData.invoiceId;
    newObj.docId = bookingInvoiceData.docId;
    newObj.monthStr = bookingInvoiceData.monthStr;
    newObj.issuedBy = bookingInvoiceData.issuedBy;
    newObj.amount = bookingInvoiceData.amount;
    return newObj;
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
