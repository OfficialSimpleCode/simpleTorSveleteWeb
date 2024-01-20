import IconData from "$lib/models/general/icon_data";
import type { Price } from "$lib/models/general/price";
import { dateToMonthStr } from "$lib/utils/times_utils/times_utils";
import { PaymentObject } from "../payment_object";
import type PaymentRequestUser from "./payment_request_user";

class PaymentRequestPreview extends PaymentObject {
  id: string = "";
  summary: string = "";
  workerId: string = "";
  businessId: string = "";
  businessName: string = "";
  workerName: string = "";
  users: { [key: string]: PaymentRequestUser } = {};
  closeForAll: boolean = true;
  oneTime: boolean = true;
  bookingReference?: BookingRefernce;
  shopIcon: IconData = new IconData(); // Assuming IconData is a class

  constructor(
    id: string,
    price: Price,
    summary: string,
    businessName: string,
    shopIcon: IconData,
    oneTime: boolean,
    closeForAll: boolean,
    workerName: string,
    workerId: string,
    businessId: string
  ) {
    super();
    this.id = id;
    this.price = price;
    this.summary = summary;
    this.businessName = businessName;
    this.shopIcon = shopIcon;
    this.oneTime = oneTime;
    this.closeForAll = closeForAll;
    this.workerName = workerName;
    this.workerId = workerId;
    this.businessId = businessId;
  }

  static empty() {
    return {};
  }

  get link() {
    return `https://${SERVER_BASE_URL}/${PAYMENT_REQUEST_END_POINT}`.replaceAll(
      "PAYMENT_ID",
      this.id
    );
  }

  get payers() {
    let count: number = 0;
    Object.values(this.users).forEach((user) => {
      count += user.payments.length;
    });
    return count;
  }

  get docId() {
    return dateToMonthStr(this.createdAt);
  }

  toPaymentRequest(workerInfo, businessInfo): PaymentRequest {
    return (new PaymentRequest({
      id: this.id,
      price: this.price,
      oneTime: this.oneTime,
      shopIcon: this.shopIcon,
      multi: Object.keys(this.users).length > 1,
      workerInfo: workerInfo,
      businessInfo: businessInfo,
      summary: this.summary,
      closeForAll: this.closeForAll,
    }).createdAt = this.createdAt);
  }

  get toPaymentRequestNotificationPayload() {
    return (new PaymentRequestNotificationPayload({
      businessName: this.businessName,
      businessId: this.businessId,
      id: this.id,
      date: this.createdAt,
      workerId: this.workerId,
    }).shopIcon = this.shopIcon);
  }

  static fromJson(json, newId) {
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
        DateTime.tryParse(json["createdAt"]) ?? new Date(0);
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
      paymentRequestPreview.bookingReference = BookingRefernce.fromJson(
        json["bookingReference"]
      );
    }
    return paymentRequestPreview;
  }

  toJson() {
    const data: { [key in string]: any } = {};
    if (this.createdAt != new Date(0)) {
      data["createdAt"] = this.createdAt.toString();
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
