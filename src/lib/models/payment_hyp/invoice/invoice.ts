import { hypValidCurrencies, invoiceNumberInvoiceLink } from "$lib/consts/hyp";
import BookingInvoiceData from "$lib/models/booking/booking_invoice_data";
import { defaultCurrency } from "$lib/models/general/currency_model";
import CustomerData from "$lib/models/general/customer_data";
import { Price } from "$lib/models/general/price";
import InvoiceNotificationPayload from "$lib/models/notifications/invoice_notification_payload";
import { dateToDayStr, dateToMonthStr } from "$lib/utils/times_utils";
import { phoneToDocId } from "$lib/utils/user";
import { PaymentObject } from "../payment_object";
import InvoiceBusinessInfo from "./invoice_business_info";
import PaymentsMethods from "./payments_methods";

export default class Invoice extends PaymentObject {
  customerData: CustomerData = new CustomerData({});
  invoiceNumber?: number;
  workerInfo: InvoiceWorkerInfo = new InvoiceWorkerInfo();
  businessInfo: InvoiceBusinessInfo = new InvoiceBusinessInfo();
  invoiceId: string = "";
  signature?: string;
  items: Record<number, InvoiceItem> = {};
  paymentsMethods: PaymentsMethods = new PaymentsMethods();

  constructor({});
  constructor({
    customerData,
    createdAt,
    paymentsMethods,
    items,
    businessInfo,
    workerInfo,
    invoiceNumber,
    invoiceId = "",
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
    this.invoiceId = invoiceId || "";
    this.price = new Price({
      amount: this.paymentsMethods.amount.toString(),
      currency:
        hypValidCurrencies[this.paymentsMethods.currency ?? ""] ||
        defaultCurrency,
    });
  }

  get itemsAsString(): string {
    let itemsStr = "";
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

  static fromJson(json: Record<string, any>, id: string): Invoice {
    const newObj = new Invoice({});
    newObj.invoiceId = id;
    if (json["CD"] !== undefined) {
      newObj.customerData = CustomerData.fromMinimalJson(json["CD"]);
    }
    if (json["RD"] !== undefined) {
      newObj.createdAt = new Date(json["RD"]);
    }
    if (json["BI"] !== undefined) {
      newObj.businessInfo = InvoiceBusinessInfo.fromJson(json["BI"]);
    }
    if (json["WIN"] !== undefined) {
      newObj.workerInfo = InvoiceWorkerInfo.fromJson(json["WIN"]);
    }

    newObj.items = {};
    Object.entries<Record<string, any>>(json["I"]).forEach(([index, json]) => {
      newObj.items[parseInt(index, 10)] = InvoiceItem.fromJson(
        json,
        parseInt(index, 10)
      );
    });

    if (json["PM"] !== undefined) {
      newObj.paymentsMethods = PaymentsMethods.fromJson(json["PM"]);
    }
    if (json["IN"] !== undefined) {
      newObj.invoiceNumber = parseInt(json["IN"], 10);
    }
    newObj.price = new Price({
      amount: newObj.paymentsMethods.amount.toString(),
      currency:
        hypValidCurrencies[newObj.paymentsMethods.currency ?? ""] ||
        defaultCurrency,
    });
    newObj.signature = json["Sig"];
    return newObj;
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};

    if (this.invoiceNumber !== undefined) {
      data["IN"] = this.invoiceNumber.toString();
    }

    if (this.signature !== undefined) {
      data["Sig"] = this.signature;
    }
    data["BI"] = this.businessInfo.toJson();
    data["WIN"] = this.workerInfo.toJson();
    data["RD"] = this.createdAt.toISOString();
    data["CD"] = this.customerData.toMinimalJson();

    data["I"] = {};
    for (const index in this.items) {
      data["I"][index] = this.items[index].toJson();
    }

    data["PM"] = this.paymentsMethods.toJson();

    return data;
  }

  get customerHashPhone(): string {
    return phoneToDocId(this.customerData.phoneNumber);
  }

  get customerPhoneAsCollection(): string {
    return this.customerData.phoneNumber.replace(/-/g, "");
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
    let link = "";
    if (this.signature === undefined) {
      return "";
    }
    if (this.invoiceNumber !== undefined) {
      link = invoiceNumberInvoiceLink
        .replace("MASOFNUMBER", this.businessInfo.masofNumber)
        .replace("INVOICENUMBER", this.invoiceNumber.toString())
        .replace("SIGNATURE", this.signature);
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
