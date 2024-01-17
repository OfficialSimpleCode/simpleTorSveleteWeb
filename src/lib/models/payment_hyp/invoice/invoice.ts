import InvoiceBusinessInfo from "./invoice_business_info";

export default class Invoice extends PaymentObject {
  customerData: CustomerData = new CustomerData();
  invoiceNumber?: number;
  workerInfo: InvoiceWorkerInfo = new InvoiceWorkerInfo();
  businessInfo: InvoiceBusinessInfo = new InvoiceBusinessInfo();
  invoiceId: string = '';
  signature?: string;
  items: Record<number, InvoiceItem> = {};
  paymentsMethods: PaymentsMethods = new PaymentsMethods();

  constructor({
    customerData,
    createdAt,
    paymentsMethods,
    items,
    businessInfo,
    workerInfo,
    invoiceNumber,
    invoiceId = '',
  }: {
    customerData: CustomerData;
    createdAt: Date;
    paymentsMethods: PaymentsMethods;
    items: Record<number, InvoiceItem>;
    businessInfo: InvoiceBusinessInfo;
    workerInfo: InvoiceWorkerInfo;
    invoiceNumber?: number;
    invoiceId?: string;
  }) {
    super();
    this.customerData = customerData;
    this.createdAt = createdAt;
    this.paymentsMethods = paymentsMethods;
    this.items = items;
    this.businessInfo = businessInfo;
    this.workerInfo = workerInfo;
    this.invoiceNumber = invoiceNumber;
    this.invoiceId = invoiceId || '';
    this.price = new Price({
      amount: this.paymentsMethods.amount.toString(),
      currency:
        hypValidCurrencies[this.paymentsMethods.currency] || defaultCurrency,
    });
  }

  get itemsAsString(): string {
    let itemsStr = '';
    for (const index in this.items) {
      itemsStr += this.items[index].toItemFormat();
    }
    return itemsStr;
  }

  get itemsTotalAmount(): number {
    let total = 0;
    for (const index in this.items) {
      total += this.items[index].totalAmount;
    }
    return total;
  }

  getInvoiceDocIndexByDate(date: Date): number {
    const dayInt = parseInt(dateToDayStr(date), 10) || 0;
    return dayInt > 16 ? 2 : 1;
  }

  get toBookingInvoiceData(): BookingInvoiceData {
    return new BookingInvoiceData({
      issuedBy: this.workerInfo.workerId,
      docId: this.getInvoiceDocIndexByDate(this.createdAt).toString(),
      monthStr: dateToMonthStr(this.createdAt),
      invoiceId: this.invoiceId,
      amount: this.paymentsMethods.amount,
    });
  }

  getInvoiceDocIndexByDate(date: Date): number {
    const dayInt = parseInt(dateToDayStr(date), 10) || 0;
    return dayInt > 16 ? 2 : 1;
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};

    if (this.invoiceNumber !== undefined) {
      data['IN'] = this.invoiceNumber.toString();
    }

    if (this.signature !== undefined) {
      data['Sig'] = this.signature;
    }
    data['BI'] = this.businessInfo.toJson();
    data['WIN'] = this.workerInfo.toJson();
    data['RD'] = this.createdAt.toISOString();
    data['CD'] = this.customerData.toMinimalJson();

    data['I'] = {};
    for (const index in this.items) {
      data['I'][index] = this.items[index].toJson();
    }

    data['PM'] = this.paymentsMethods.toJson();

    return data;
  }

  static fromJson(json: Record<string, any>, id: string); Invoice{
    super();
    this.invoiceId = id;
    if (json['CD'] !== undefined) {
      this.customerData = CustomerData.fromMinimalJson(json['CD']);
    }
    if (json['RD'] !== undefined) {
      this.createdAt = new Date(json['RD']);
    }
    if (json['BI'] !== undefined) {
      this.businessInfo = InvoiceBusinessInfo.fromJson(json['BI']);
    }
    if (json['WIN'] !== undefined) {
      this.workerInfo = InvoiceWorkerInfo.fromJson(json['WIN']);
    }

    this.items = {};
    for (const index in json['I']) {
      this.items[parseInt(index, 10)] = new InvoiceItem(
        json['I'][index],
        parseInt(index, 10)
      );
    }
    if (json['PM'] !== undefined) {
      this.paymentsMethods = PaymentsMethods.fromJson(json['PM']);
    }
    if (json['IN'] !== undefined) {
      this.invoiceNumber = parseInt(json['IN'], 10);
    }
    this.price = new Price({
      amount: this.paymentsMethods.amount.toString(),
      currency:
        hypValidCurrencies[this.paymentsMethods.currency] || defaultCurrency,
    });
    this.signature = json['Sig'];
  }

  get customerHashPhone(): string {
    return phoneToDocId(this.customerData.phoneNumber);
  }

  get customerPhoneAsCollection(): string {
    return this.customerData.phoneNumber.replace(/-/g, '');
  }

  get bookingInvoiceData(): BookingInvoiceData {
    return new BookingInvoiceData({
      docId: this.docId.toString(),
      amount: this.paymentsMethods.amount,
      monthStr: dateToMonthStr(this.createdAt),
      issuedBy: this.workerInfo.workerId,
      invoiceId: this.invoiceId,
    });
  }

  get link(): string {
    let link = '';
    if (this.signature === undefined) {
      return '';
    }
    if (this.invoiceNumber !== undefined) {
      link = invoiceNumberInvoiceLink
        .replace('MASOFNUMBER', this.businessInfo.masofNumber)
        .replace('INVOICENUMBER', this.invoiceNumber.toString())
        .replace('SIGNATURE', this.signature);
    }
    return link;
  }

  get toInvoiceNoticaficationPayload(): InvoiceNotificationPayload {
    return new InvoiceNotificationPayload({
      businessId: this.businessInfo.businessId,
      businessName: this.businessInfo.businessName,
      date: this.createdAt,
      id: this.invoiceId,
    });
  }

  get docId(): number {
    const dayInt = parseInt(dateToDayStr(this.createdAt), 10) || 0;
    return dayInt > 16 ? 2 : 1;
  }

  toString(): string {
    return JSON.stringify(this, null, 2);
  }
}
