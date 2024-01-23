import type IconData from "../general/icon_data";
import BookingNotificationPayload from "./booking_notification_payload";
import BreakNotificationPayload from "./break_notification_payload";
import BusinessPayloadData from "./business_data_payload";
import InvoiceNotificationPayload from "./invoice_notification_payload";
import PaymentRequestNotificationPayload from "./payment_request_notification_payload";

export enum EnterAction {
  openBusiness,
  openBreak,
  openUserBooking,
  openInvoice,
  openWorkerBooking,
  openWorkerPaymentRequest,
  openUserPaymentRequest,
}

export const enterActionToStr: { [key in EnterAction]: string } = {
  [EnterAction.openBusiness]: "openBusiness",
  [EnterAction.openBreak]: "openBreak",
  [EnterAction.openUserBooking]: "openUserBooking",
  [EnterAction.openInvoice]: "openInvoice",
  [EnterAction.openWorkerBooking]: "openWorkerBooking",
  [EnterAction.openWorkerPaymentRequest]: "openWorkerPaymentRequest",
  [EnterAction.openUserPaymentRequest]: "openUserPaymentRequest",
};

export const enterActionFromStr: { [key: string]: EnterAction } = {
  openBusiness: EnterAction.openBusiness,
  openBreak: EnterAction.openBreak,
  openUserBooking: EnterAction.openUserBooking,
  openWorkerBooking: EnterAction.openWorkerBooking,
  openInvoice: EnterAction.openInvoice,
  openWorkerPaymentRequest: EnterAction.openWorkerPaymentRequest,
  openUserPaymentRequest: EnterAction.openUserPaymentRequest,
};

export default class NotificationPayload {
  action: EnterAction | undefined;
  businessData: BusinessPayloadData | undefined;
  paymentRequestData: PaymentRequestNotificationPayload | undefined;
  bookingData: BookingNotificationPayload | undefined;
  breakData: BreakNotificationPayload | undefined;
  invoiceData: InvoiceNotificationPayload | undefined;

  constructor({
    action,
    businessData,
    paymentRequestData,
    breakData,
    invoiceData,
    bookingData,
  }: {
    action?: EnterAction;
    businessData?: BusinessPayloadData;
    paymentRequestData?: PaymentRequestNotificationPayload;
    breakData?: BreakNotificationPayload;
    invoiceData?: InvoiceNotificationPayload;
    bookingData?: BookingNotificationPayload;
  } = {}) {
    this.action = action;
    this.businessData = businessData;
    this.paymentRequestData = paymentRequestData;
    this.breakData = breakData;
    this.invoiceData = invoiceData;
    this.bookingData = bookingData;
  }

  static fromJsonStr(jsonStr: string): NotificationPayload {
    const json = JSON.parse(jsonStr) as {
      action?: string;
      businessData?: string;
      paymentRequestData?: string;
      invoiceData?: string;
      bookingData?: string;
      breakData?: string;
    };

    return new NotificationPayload({
      action: json.action ? enterActionFromStr[json.action] : undefined,
      businessData: json.businessData
        ? BusinessPayloadData.fromJsonStr(json.businessData)
        : undefined,
      paymentRequestData: json.paymentRequestData
        ? PaymentRequestNotificationPayload.fromJsonStr(json.paymentRequestData)
        : undefined,
      invoiceData: json.invoiceData
        ? InvoiceNotificationPayload.fromJsonStr(json.invoiceData)
        : undefined,
      bookingData: json.bookingData
        ? BookingNotificationPayload.fromJsonStr(json.bookingData)
        : undefined,
      breakData: json.breakData
        ? BreakNotificationPayload.fromJsonStr(json.breakData)
        : undefined,
    });
  }

  toJsonStr(): string {
    const data: { [key: string]: any } = {};
    if (this.action !== undefined) {
      data["action"] = enterActionToStr[this.action];
    }
    if (this.businessData !== undefined) {
      data["businessData"] = this.businessData.toJsonStr();
    }
    if (this.paymentRequestData !== undefined) {
      data["paymentRequestData"] = this.paymentRequestData.toJsonStr();
    }
    if (this.bookingData !== undefined) {
      data["bookingData"] = this.bookingData.toJsonStr();
    }
    if (this.breakData !== undefined) {
      data["breakData"] = this.breakData.toJsonStr();
    }
    if (this.invoiceData !== undefined) {
      data["invoiceData"] = this.invoiceData.toJsonStr();
    }

    return JSON.stringify(data);
  }

  get currentBusinessId(): string | null {
    if (
      this.businessData !== undefined &&
      this.businessData.businessId !== ""
    ) {
      return this.businessData.businessId;
    }
    if (this.invoiceData !== undefined && this.invoiceData.businessId !== "") {
      return this.invoiceData.businessId;
    }
    if (
      this.paymentRequestData !== undefined &&
      this.paymentRequestData.businessId !== ""
    ) {
      return this.paymentRequestData.businessId;
    }
    if (this.bookingData !== undefined && this.bookingData.businessId !== "") {
      return this.bookingData.businessId;
    }
    if (this.breakData !== undefined && this.breakData.businessId !== "") {
      return this.breakData.businessId;
    }
    return null;
  }

  get currentBusinessName(): string | null | undefined {
    if (
      this.businessData !== undefined &&
      this.businessData.businessName !== ""
    ) {
      return this.businessData.businessName;
    }
    if (
      this.invoiceData !== undefined &&
      this.invoiceData.businessName !== ""
    ) {
      return this.invoiceData.businessName;
    }
    if (
      this.paymentRequestData !== undefined &&
      this.paymentRequestData.businessName !== ""
    ) {
      return this.paymentRequestData.businessName;
    }
    if (
      this.bookingData !== undefined &&
      this.bookingData.businessName !== ""
    ) {
      return this.bookingData.businessName;
    }
    if (this.breakData !== undefined && this.breakData.businessName !== "") {
      return this.breakData.businessName;
    }
    return undefined;
  }

  get currentShopIcon(): IconData | undefined {
    if (
      this.businessData !== undefined &&
      this.businessData.shopIcon.isNotEmpty
    ) {
      return this.businessData.shopIcon;
    }
    if (
      this.invoiceData !== undefined &&
      this.invoiceData.shopIcon.isNotEmpty
    ) {
      return this.invoiceData.shopIcon;
    }
    if (
      this.paymentRequestData !== undefined &&
      this.paymentRequestData.shopIcon.isNotEmpty
    ) {
      return this.paymentRequestData.shopIcon;
    }
    if (
      this.bookingData !== undefined &&
      this.bookingData.shopIcon.isNotEmpty
    ) {
      return this.bookingData.shopIcon;
    }
    if (this.breakData !== undefined && this.breakData.shopIcon.isNotEmpty) {
      return this.breakData.shopIcon;
    }
    return undefined;
  }

  get businessIconPath(): string | null {
    if (this.currentBusinessId === null || this.currentShopIcon === undefined) {
      return null;
    }
    return this.currentShopIcon!.getShopIconPath(this.currentBusinessId);
  }

  toString(): string {
    return this.toJsonStr();
  }
}
