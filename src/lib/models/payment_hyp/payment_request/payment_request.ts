import {
  PAYMENT_REQUEST_END_POINT,
  SERVER_BASE_URL,
} from "$lib/consts/server_variables";
import BookingPaymentRequestData from "$lib/models/booking/booking_payment_request";
import IconData from "$lib/models/general/icon_data";
import { Price } from "$lib/models/general/price";
import BusinessPayloadData from "$lib/models/notifications/business_data_payload";
import PaymentRequestNotificationPayload from "$lib/models/notifications/payment_request_notification_payload";
import { dateIsoStr, dateToMonthStr, isoToDate } from "$lib/utils/times_utils";
import InvoiceBusinessInfo from "../invoice/invoice_business_info";
import { PaymentObject } from "../payment_object";
import PaymentRequestPreview from "./PaymentRequestPreview";
import type PaymentRequestUser from "./payment_request_user";

export default class PaymentRequest extends PaymentObject {
  id: string = "";
  summary: string = "";
  workerInfo: InvoiceWorkerInfo = new InvoiceWorkerInfo();
  businessInfo: InvoiceBusinessInfo = new InvoiceBusinessInfo();
  payers: number = 0;
  multi: boolean = false;
  closeForAll: boolean = true;
  users: { [key: string]: PaymentRequestUser } = {};
  oneTime: boolean = true;
  userPayments: { [key: string]: Date } = {};
  userDecline: boolean = false;
  canceled: boolean = false;
  shopIcon: IconData = new IconData();

  constructor({});
  constructor({
    id,
    price,
    createdAt,
    summary = "",
    multi = false,
    userDecline = false,
    canceled = false,
    oneTime,
    shopIcon,
    closeForAll,
    workerInfo,
    businessInfo,
  }: {
    id: string;
    price: Price;
    createdAt: Date;
    summary?: string;
    multi?: boolean;
    userDecline?: boolean;
    canceled?: boolean;
    oneTime: boolean;
    shopIcon: IconData;
    closeForAll: boolean;
    workerInfo: InvoiceWorkerInfo;
    businessInfo: InvoiceBusinessInfo;
  }) {
    super();
    this.price = price;
    this.createdAt = createdAt;
    this.id = id;
    this.summary = summary;
    this.multi = multi;
    this.userDecline = userDecline;
    this.canceled = canceled;
    this.oneTime = oneTime;
    this.shopIcon = shopIcon;
    this.closeForAll = closeForAll;
    this.workerInfo = workerInfo;
    this.businessInfo = businessInfo;
  }

  get link(): string {
    return `https://${SERVER_BASE_URL}/${PAYMENT_REQUEST_END_POINT}`.replace(
      "PAYMENT_ID",
      this.id
    );
  }

  get toPaymentRequestPreview(): PaymentRequestPreview {
    const preview = new PaymentRequestPreview({
      id: this.id,
      businessName: this.businessInfo.businessName,
      shopIcon: this.shopIcon,
      businessId: this.businessInfo.businessId,
      workerId: this.workerInfo.workerId,
      price: this.price,
      oneTime: this.oneTime,
      workerName: this.workerInfo.workerName,
      summary: this.summary,
      closeForAll: this.closeForAll,
    });
    preview.users = this.users;
    preview.createdAt = this.createdAt;
    return preview;
  }

  get toPaymentRequestNotificationPayload(): PaymentRequestNotificationPayload {
    const payload = new PaymentRequestNotificationPayload({
      businessId: this.businessInfo.businessId,
      id: this.id,
      businessName: this.businessInfo.businessName,
      date: this.createdAt,
      workerId: this.workerInfo.workerId,
      shopIcon: this.shopIcon,
    });
    payload.shopIcon = this.shopIcon;
    return payload;
  }

  get businessPayloadData(): BusinessPayloadData {
    const payloadData = new BusinessPayloadData({
      businessName: this.businessInfo.businessName,
      businessId: this.businessInfo.businessId,
      shopIcon: this.shopIcon,
    });
    return payloadData;
  }

  ///Return the doc id that the PR saved on the worker collection on db
  get docId(): string {
    return dateToMonthStr(this.createdAt);
  }

  get toBookingPaymentRequestData(): BookingPaymentRequestData {
    const bookingData = new BookingPaymentRequestData({});
    bookingData.createdAt = this.createdAt;
    bookingData.id = this.id;
    bookingData.workerId = this.workerInfo.workerId;
    return bookingData;
  }

  get userPay(): boolean {
    return Object.keys(this.userPayments).length > 0;
  }

  static fromJson(json: Record<string, any>, newId: any): PaymentRequest {
    const newObj = new PaymentRequest({});
    newObj.id = newId;
    if (json["businessInfo"] != null) {
      newObj.businessInfo = InvoiceBusinessInfo.fromJson(json["businessInfo"]);
    }
    newObj.closeForAll = json["closeForAll"] ?? true;
    if (json["workerInfo"] != null) {
      newObj.workerInfo = InvoiceWorkerInfo.fromJson(json["workerInfo"]);
    }
    if (json["shopIcon"] != null) {
      newObj.shopIcon = IconData.fromJson(json["shopIcon"]);
    }
    newObj.canceled = json["canceled"] ?? false;
    newObj.oneTime = json["oneTime"] ?? true;
    if (json["price"] != null) {
      newObj.price = Price.fromJson(json["price"]);
    }
    newObj.multi = json["multi"] ?? false;
    newObj.userDecline = json["userDecline"] ?? false;
    if (
      json["userPayments"] != null &&
      typeof json["userPayments"] === "object"
    ) {
      Object.entries<string>(json["userPayments"]).forEach(
        ([transactionId, dateStr]) => {
          newObj.userPayments[transactionId] =
            dateStr != null ? isoToDate(dateStr) : new Date(0);
        }
      );
    }
    newObj.summary = json["summary"] ?? "";
    if (json["createdAt"] != null) {
      newObj.createdAt =
        json["createdAt"] != null ? isoToDate(json["createdAt"]) : new Date(0);
    }
    newObj.payers = json["payers"] ?? 0;

    return newObj;
  }

  toJson(): any {
    const data: any = {};
    if (
      this.createdAt != null &&
      this.createdAt.getTime() !== new Date(0).getTime()
    ) {
      data["createdAt"] = dateIsoStr(this.createdAt);
    }
    if (!this.oneTime) {
      data["oneTime"] = this.oneTime;
    }
    if (this.canceled) {
      data["canceled"] = this.canceled;
    }
    if (this.summary !== "") {
      data["summary"] = this.summary;
    }
    if (!this.closeForAll) {
      data["closeForAll"] = this.closeForAll;
    }
    if (Object.keys(this.userPayments).length > 0) {
      data["userPayments"] = {};
      Object.entries(this.userPayments).forEach(([transactionId, date]) => {
        data["userPayments"][transactionId] = dateIsoStr(date);
      });
    }
    if (this.payers > 0) {
      data["payers"] = this.payers;
    }
    if (this.userDecline) {
      data["userDecline"] = this.userDecline;
    }
    if (this.multi) {
      data["multi"] = this.multi;
    }
    data["price"] = this.price.toJson();
    data["workerInfo"] = this.workerInfo.toJson();
    data["businessInfo"] = this.businessInfo.toJson();
    data["shopIcon"] = this.shopIcon.toJson();
    return data;
  }

  toString(): string {
    return JSON.stringify(this, null, "  ");
  }
}
