import IconData from "$lib/models/general/icon_data";
import BusinessPayloadData from "$lib/models/notifications/business_data_payload";
import PaymentRequestNotificationPayload from "$lib/models/notifications/payment_request_notification_payload";
import InvoiceBusinessInfo from "../invoice/invoice_business_info";

class PaymentRequest extends PaymentObject {
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

  constructor(
    id: string,
    price: Price,
    summary: string = "",
    multi: boolean = false,
    userDecline: boolean = false,
    canceled: boolean = false,
    oneTime: boolean,
    shopIcon: IconData,
    closeForAll: boolean,
    workerInfo: InvoiceWorkerInfo,
    businessInfo: InvoiceBusinessInfo
  ) {
    super(price);
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
    const preview = new PaymentRequestPreview(
      this.id,
      this.businessInfo.businessName,
      this.shopIcon,
      this.businessInfo.businessId,
      this.workerInfo.workerId,
      this.price,
      this.oneTime,
      this.workerInfo.workerName,
      this.summary,
      this.closeForAll
    );
    preview.users = this.users;
    preview.createdAt = this.createdAt;
    return preview;
  }

  get toPaymentRequestNotificationPayload(): PaymentRequestNotificationPayload {
    const payload = new PaymentRequestNotificationPayload(
      this.businessInfo.businessId,
      this.id,
      this.businessInfo.businessName,
      this.createdAt,
      this.workerInfo.workerId
    );
    payload.shopIcon = this.shopIcon;
    return payload;
  }

  get businessPayloadData(): BusinessPayloadData {
    const payloadData = new BusinessPayloadData(
      this.businessInfo.businessName,
      this.businessInfo.businessId,
      this.shopIcon
    );
    return payloadData;
  }

  get docId(): string {
    return TimesUtils.dateToMonthStr(this.createdAt);
  }

  get toBookingPaymentRequestData(): BookingPaymentRequestData {
    const bookingData = new BookingPaymentRequestData(
      this.id,
      this.workerInfo.workerId
    );
    bookingData.createdAt = this.createdAt;
    return bookingData;
  }

  get userPay(): boolean {
    return Object.keys(this.userPayments).length > 0;
  }



  static fromJson(json: any, newId: any):PaymentRequest {
    this.id = newId;
    if (json["businessInfo"] != null) {
      this.businessInfo = InvoiceBusinessInfo.fromJson(json["businessInfo"]);
    }
    this.closeForAll = json["closeForAll"] ?? true;
    if (json["workerInfo"] != null) {
      this.workerInfo = InvoiceWorkerInfo.fromJson(json["workerInfo"]);
    }
    if (json["shopIcon"] != null) {
      this.shopIcon = IconData.fromJson(json["shopIcon"]);
    }
    this.canceled = json["canceled"] ?? false;
    this.oneTime = json["oneTime"] ?? true;
    if (json["price"] != null) {
      this.price = Price.fromJson(json["price"]);
    }
    this.multi = json["multi"] ?? false;
    this.userDecline = json["userDecline"] ?? false;
    if (json["userPayments"] != null && typeof json["userPayments"] === "object") {
      Object.entries(json["userPayments"]).forEach(([transactionId, dateStr]) => {
        this.userPayments[transactionId] =
          dateStr != null ? new Date(dateStr) : new Date(0);
      });
    }
    this.summary = json["summary"] ?? "";
    if (json["createdAt"] != null) {
      this.createdAt =
        json["createdAt"] != null ? new Date(json["createdAt"]) : new Date(0);
    }
    this.payers = json["payers"] ?? 0;
  }

  toJson(): any {
    const data: any = {};
    if (this.createdAt != null && this.createdAt.getTime() !== new Date(0).getTime()) {
      data["createdAt"] = this.createdAt.toISOString();
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
        data["userPayments"][transactionId] = date.toISOString();
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
    return JSON.stringify(this, null, '  ');
  }
}


