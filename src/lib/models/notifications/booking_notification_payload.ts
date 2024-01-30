// Assuming IconData and NotifcationPayloadObject classes are defined somewhere with proper methods

import { dateIsoStr, isoToDate } from "$lib/utils/times_utils";
import IconData from "../general/icon_data";
import NotifcationPayloadObject from "./notification_payload_object";

export default class BookingNotificationPayload extends NotifcationPayloadObject {
  isRecurrence: boolean = false;
  totalMinutes: number = 0;

  constructor({
    businessId,
    date,
    id,
    workerId,
    businessName,
    totalMinutes,
    isRecurrence,
    shopIcon,
  }: {
    businessId: string;
    date: Date | undefined;
    id: string;
    workerId: string;
    businessName: string;
    totalMinutes: number;
    isRecurrence: boolean;
    shopIcon: IconData | undefined;
  }) {
    super({ businessId, date, id, workerId, businessName, shopIcon });
    this.totalMinutes = totalMinutes;
    this.isRecurrence = isRecurrence;
  }

  static fromJsonStr(jsonStr: string): BookingNotificationPayload {
    const json = JSON.parse(jsonStr);

    const businessId = json["businessId"] || "";
    const businessName = json["businessName"] || "";
    const date = json["date"] ? isoToDate(json["date"]) : undefined;
    const workerId = json["workerId"] || "";
    const id = json["id"] || "";
    const isRecurrence = json["isRecurrence"] || false;
    const totalMinutes = json["totalMinutes"] || 0;
    const shopIcon = json["shopIcon"]
      ? IconData.fromJsonStr(json["shopIcon"])
      : undefined;

    return new BookingNotificationPayload({
      businessId,
      date,
      id,
      workerId,
      businessName,
      totalMinutes,
      isRecurrence,
      shopIcon,
    });
  }

  toJsonStr(): string {
    const data: { [key: string]: any } = {};

    data["businessId"] = this.businessId;
    data["isRecurrence"] = this.isRecurrence;
    data["totalMinutes"] = this.totalMinutes;
    if (this.date !== undefined) {
      data["date"] = dateIsoStr(this.date!);
    }

    data["businessName"] = this.businessName;
    data["id"] = this.id;
    data["workerId"] = this.workerId;
    data["shopIcon"] = this.shopIcon?.toJsonStr() || null;

    return JSON.stringify(data);
  }

  toString(): string {
    return this.toJsonStr();
  }
}
