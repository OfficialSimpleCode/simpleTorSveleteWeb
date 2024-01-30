import {
  PAYMENT_REQUEST_END_POINT,
  SERVER_BASE_URL,
} from "$lib/consts/server_variables";
import { dateIsoStr, isoToDate } from "$lib/utils/times_utils";

export default class BookingPaymentRequestData {
  id: string = "";
  workerId: string = "";
  createdAt: Date = new Date(0);
  signNewMultiBookingUsers: boolean = true;

  constructor({});
  constructor({ id, workerId }: { id: string; workerId: string }) {
    this.id = id;
    this.workerId = workerId;
  }

  get link(): string {
    return `https://${SERVER_BASE_URL}/${PAYMENT_REQUEST_END_POINT}`.replace(
      "PAYMENT_ID",
      this.id
    );
  }

  static fromJson(json: { [key: string]: any }): BookingPaymentRequestData {
    const newObj = new BookingPaymentRequestData({});
    newObj.id = json["id"] ?? "";

    if (json["createdAt"] != null) {
      newObj.createdAt = isoToDate(json["createdAt"]) || new Date(0);
    }

    newObj.workerId = json["workerId"] ?? "";
    newObj.signNewMultiBookingUsers = json["signNewMultiBookingUsers"] ?? true;
    return newObj;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};

    if (this.createdAt.getTime() !== new Date(0).getTime()) {
      data["createdAt"] = dateIsoStr(this.createdAt);
    }

    if (!this.signNewMultiBookingUsers) {
      data["signNewMultiBookingUsers"] = this.signNewMultiBookingUsers;
    }

    data["id"] = this.id;
    data["workerId"] = this.workerId;

    return data;
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
