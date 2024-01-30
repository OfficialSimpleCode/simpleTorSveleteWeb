import {
  PAYMENT_REQUEST_END_POINT,
  SERVER_BASE_URL,
} from "$lib/consts/server_variables";
import IconData from "$lib/models/general/icon_data";
import { Price } from "$lib/models/general/price";
import PaymentRequestNotificationPayload from "$lib/models/notifications/payment_request_notification_payload";
import { dateToMonthStr } from "$lib/utils/times_utils";
import BookingReferencePaymentObj from "../booking_reference";
import type InvoiceBusinessInfo from "../invoice/invoice_business_info";
import { PaymentObject } from "../payment_object";
import PaymentRequest from "./payment_request";
import PaymentRequestUser from "./payment_request_user";

export default class PaymentRequestPreview extends PaymentObject {
  id: string = "";
  summary: string = "";
  workerId: string = "";
  businessName: string = "";
  workerName: string = "";
  businessId: string;

  multi: boolean = false;
  closeForAll: boolean = true;
  users: Record<string, PaymentRequestUser> = {};
  oneTime: boolean = true;
  userPayments: Record<string, Date> = {};
  userDecline: boolean = false;
  canceled: boolean = false;
  bookingReference?: BookingReferencePaymentObj;
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
        new Date(json["createdAt"]) ?? new Date(0);
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

  toString() {
    return JSON.stringify(this.toJson(), null, "  ");
  }
}
