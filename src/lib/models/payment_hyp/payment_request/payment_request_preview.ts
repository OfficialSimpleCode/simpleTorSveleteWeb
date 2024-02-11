import {
  PAYMENT_REQUEST_END_POINT,
  SERVER_BASE_URL,
} from "$lib/consts/server_variables";
import BookingPaymentRequestData from "$lib/models/booking/booking_payment_request";
import IconData from "$lib/models/general/icon_data";
import { Price } from "$lib/models/general/price";
import PaymentRequestNotificationPayload from "$lib/models/notifications/payment_request_notification_payload";
import { dateIsoStr, dateToMonthStr, isoToDate } from "$lib/utils/times_utils";
import BookingReferencePaymentObj from "../booking_reference";
import type InvoiceBusinessInfo from "../invoice/invoice_business_info";
import { PaymentObject } from "../payment_object";
import PaymentRequest from "./payment_request";
import PaymentRequestUser from "./payment_request_user";

export default class PaymentRequestPreview extends PaymentObject {
  ///Uuid of the payment request used as doc id
  id: string = "";

  ///Some text that appear on the page of the request when the
  ///client presss the link
  summary: string = "";

  ///The worker info of the worker that reqeust that payment
  workerId: string = "";

  ///The business name of the business that request that payment
  businessName: string = "";

  /// Worker that the request sign on
  workerName: string = "";

  ///The business id of the business that request that payment
  businessId: string;

  ///Close for unknown users only for the users that appear on the preview
  closeForAll: boolean = true;

  ///Users that signed to this payment request
  users: Record<string, PaymentRequestUser> = {};

  ///Is the payment request is one time
  oneTime: boolean = true;

  ///Booking data that the payment requset sign on
  bookingReference?: BookingReferencePaymentObj;

  /// shop icon data
  shopIcon: IconData = new IconData();
  constructor({});
  constructor({
    id,
    price,
    createdAt,
    summary = "",
    businessName,
    shopIcon,
    oneTime = false,
    closeForAll = false,
    workerName,
    workerId,
    businessId,
  }: {
    id: string;
    price: Price;
    createdAt: Date;
    summary?: string;
    businessName: string;
    shopIcon: IconData;
    oneTime?: boolean;
    workerId: string;
    businessId: string;
    closeForAll?: boolean;
    workerName: string;
  }) {
    super();
    this.id = id;
    this.price = price;
    this.createdAt = createdAt;
    this.summary = summary;
    this.workerId = workerId;
    this.businessId = businessId;
    this.businessName = businessName;
    this.workerName = workerName;
    this.users = {};
    this.closeForAll = closeForAll;
    this.oneTime = oneTime;
    this.bookingReference = undefined;
    this.shopIcon = new IconData();
  }

  static empty() {
    return new PaymentRequestPreview({});
  }

  get link() {
    return `https://${SERVER_BASE_URL}/${PAYMENT_REQUEST_END_POINT}`.replaceAll(
      "PAYMENT_ID",
      this.id
    );
  }

  get payers() {
    let count = 0;
    Object.values(this.users).forEach((user) => {
      count += Object.keys(user.payments).length;
    });
    return count;
  }

  get docId() {
    return dateToMonthStr(this.createdAt);
  }

  toPaymentRequest(
    workerInfo: InvoiceWorkerInfo,
    businessInfo: InvoiceBusinessInfo
  ): PaymentRequest {
    const newObj = new PaymentRequest({
      id: this.id,
      price: this.price,
      oneTime: this.oneTime,
      shopIcon: this.shopIcon,
      multi: Object.keys(this.users).length > 1,
      workerInfo: workerInfo,
      businessInfo: businessInfo,
      summary: this.summary,
      closeForAll: this.closeForAll,
    });
    newObj.createdAt = this.createdAt;
    return newObj;
  }

  get toBookingPaymentRequestData(): BookingPaymentRequestData {
    const bookingPaymentRequest = new BookingPaymentRequestData({});
    bookingPaymentRequest.id = this.id;
    bookingPaymentRequest.workerId = this.workerId;
    bookingPaymentRequest.createdAt = this.createdAt;
    return bookingPaymentRequest;
  }

  get toPaymentRequestNotificationPayload() {
    const newObj = new PaymentRequestNotificationPayload({
      businessId: this.businessId,
      businessName: this.businessName,
      id: this.id,
      date: this.createdAt,
      workerId: this.workerId,
      shopIcon: this.shopIcon,
    });

    return newObj;
  }

  static fromJson(json: Record<string, any>, newId: string) {
    const paymentRequestPreview = new PaymentRequestPreview({});
    paymentRequestPreview.id = newId;
    if (json["price"] != null) {
      paymentRequestPreview.price = Price.fromJson(json["price"]);
    }
    paymentRequestPreview.closeForAll = json["closeForAll"] ?? true;
    paymentRequestPreview.summary = json["summary"] ?? "";
    if (json["shopIcon"] != null) {
      paymentRequestPreview.shopIcon = IconData.fromJson(json["shopIcon"]);
    }
    if (json["createdAt"] != null) {
      paymentRequestPreview.createdAt =
        isoToDate(json["createdAt"]) ?? new Date(0);
    }
    paymentRequestPreview.oneTime = json["oneTime"] ?? true;
    paymentRequestPreview.businessName = json["businessName"] ?? "";
    paymentRequestPreview.workerId = json["workerId"] ?? "";
    paymentRequestPreview.businessId = json["businessId"] ?? "";
    paymentRequestPreview.workerName = json["workerName"] ?? "";
    paymentRequestPreview.users = {};
    if (json["users"] != null) {
      Object.entries(json["users"]).forEach(([usersId, userJson]) => {
        paymentRequestPreview.users[usersId] = PaymentRequestUser.fromJson(
          userJson,
          usersId
        );
      });
    }
    if (json["bookingReference"] != null) {
      paymentRequestPreview.bookingReference =
        BookingReferencePaymentObj.fromJson(json["bookingReference"]);
    }
    return paymentRequestPreview;
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};
    if (this.createdAt != new Date(0)) {
      data["createdAt"] = dateIsoStr(this.createdAt);
    }
    if (this.summary !== "") {
      data["summary"] = this.summary;
    }
    if (!this.oneTime) {
      data["oneTime"] = this.oneTime;
    }
    if (!this.closeForAll) {
      data["closeForAll"] = this.closeForAll;
    }
    data["price"] = this.price.toJson();
    data["workerId"] = this.workerId;
    data["businessName"] = this.businessName;
    data["businessId"] = this.businessId;
    data["workerName"] = this.workerName;
    if (Object.keys(this.users).length > 0) {
      data["users"] = {};
      Object.entries(this.users).forEach(([userId, user]) => {
        data["users"][userId] = user.toJson();
      });
    }
    if (this.bookingReference != null) {
      data["bookingReference"] = this.bookingReference.toJson();
    }
    data["shopIcon"] = this.shopIcon.toJson();
    return data;
  }

  toJSON() {
    return this.toJson();
  }

  toString() {
    return JSON.stringify(this.toJson(), null, "  ");
  }
}
