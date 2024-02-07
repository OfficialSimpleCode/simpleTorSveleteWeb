import {
  PAYMENT_REQUEST_END_POINT,
  SERVER_BASE_URL,
} from "$lib/consts/server_variables";
import BookingPaymentRequestData from "$lib/models/booking/booking_payment_request";
import { Price } from "$lib/models/general/price";
import BusinessPayloadData from "$lib/models/notifications/business_data_payload";
import PaymentRequestNotificationPayload from "$lib/models/notifications/payment_request_notification_payload";
import { isNotEmpty } from "$lib/utils/core_utils";
import { dateIsoStr, dateToMonthStr, isoToDate } from "$lib/utils/times_utils";
import InvoiceBusinessInfo from "../invoice/invoice_business_info";
import { PaymentObject } from "../payment_object";
import PaymentRequestPreview from "./payment_request_preview";

import type PaymentRequestUser from "./payment_request_user";
import TicketInfo from "./ticket_info";

export default class PaymentRequest extends PaymentObject {
  ///payment request id
  id: string = "";

  ///the summary of the payment request
  summary: string = "";

  ///the worker that the payment request sign on
  workerInfo: InvoiceWorkerInfo = new InvoiceWorkerInfo();

  ///the business that the payment request sign on
  businessInfo: InvoiceBusinessInfo = new InvoiceBusinessInfo();

  ///amount of time that paid for that payment request
  payers: number = 0;

  ///if there are more than one users sign to this request
  multi: boolean = false;

  ///the request is closed to users that not sign on
  closeForAll: boolean = true;

  ///users that signed on the request- only for saving
  users: Record<string, PaymentRequestUser> = {};

  ///Is the payment request is one time
  oneTime: boolean = true;

  ///is the request is canceled
  canceled: boolean = false;

  ///onlyfor the user -  the tickets of multi booking that connected to this payment
  /// requsest - only incase that payment request is of multi booking
  tickets: Record<string, TicketInfo> = {};

  ///only for the user - the payments that he paid for that request
  userPayments: Record<string, Date> = {};

  ///only for user - is he decline the request
  userDecline: boolean = false;

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
  get allPayments(): Record<string, Date> {
    if (isNotEmpty(this.tickets)) {
      const payments: Record<string, Date> = {};
      Object.entries(this.tickets).forEach(([_, ticketInfo]) => {
        Object.entries(ticketInfo.payments).forEach(([transactionId, date]) => {
          payments[transactionId] = date;
        });
      });
      return payments;
    } else {
      return this.userPayments;
    }
  }

  get toPaymentRequestPreview(): PaymentRequestPreview {
    const preview = new PaymentRequestPreview({
      id: this.id,
      businessName: this.businessInfo.businessName,
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
      shopIcon: this.businessInfo.shopIcon,
    });

    return payload;
  }

  get businessPayloadData(): BusinessPayloadData {
    const payloadData = new BusinessPayloadData({
      businessName: this.businessInfo.businessName,
      businessId: this.businessInfo.businessId,
      shopIcon: this.businessInfo.shopIcon,
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

    newObj.canceled = json["canceled"] ?? false;
    newObj.oneTime = json["oneTime"] ?? true;
    if (json["price"] != null) {
      newObj.price = Price.fromJson(json["price"]);
    }
    newObj.multi = json["multi"] ?? false;
    newObj.userDecline = json["userDecline"] ?? false;

    newObj.tickets = {};
    if (json["tickets"] != null) {
      Object.entries<Record<string, any>>(json["tickets"]).forEach(
        ([bookingId, ticketInfoJson]) => {
          newObj.tickets[bookingId] = TicketInfo.fromJson(
            ticketInfoJson,
            bookingId
          );
        }
      );
    }
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
    if (isNotEmpty(this.tickets)) {
      data["tickets"] = {};
      Object.entries(this.tickets).forEach(([bookingId, ticketInfo]) => {
        data["tickets"][bookingId] = ticketInfo.toJson();
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

    return data;
  }

  toString(): string {
    return JSON.stringify(this, null, "  ");
  }
}
