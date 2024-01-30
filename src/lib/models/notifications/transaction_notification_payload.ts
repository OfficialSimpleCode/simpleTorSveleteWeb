import { dateIsoStr, isoToDate } from "$lib/utils/times_utils";
import IconData from "../general/icon_data";
import NotifcationPayloadObject from "./notification_payload_object";

export default class TransactionNotificationPayload extends NotifcationPayloadObject {
  constructor({
    businessName,
    businessId,
    date,
    id,
    workerId,
    shopIcon,
  }: {
    businessName: string;
    businessId: string;
    date: Date;
    id: string;
    workerId: string;
    shopIcon: IconData | undefined;
  }) {
    super({ businessName, businessId, date, id, workerId, shopIcon });
  }

  static fromJsonStr(jsonStr: string): TransactionNotificationPayload {
    const json = JSON.parse(jsonStr);

    const businessName = json["businessName"] || "";
    const businessId = json["businessId"] || "";
    const date = json["date"] ? isoToDate(json["date"]) : new Date();
    const id = json["id"] || "";
    const workerId = json["workerId"] || "";
    const shopIcon = json["shopIcon"]
      ? IconData.fromJsonStr(json["shopIcon"])
      : undefined;

    return new TransactionNotificationPayload({
      businessName: businessName,
      businessId: businessId,
      date: date,
      id: id,
      workerId: workerId,
      shopIcon: shopIcon,
    });
  }

  toJsonStr(): string {
    const data: Record<string, any> = {};

    data["businessName"] = this.businessName;
    data["businessId"] = this.businessId;
    if (this.date != null) {
      data["date"] = dateIsoStr(this.date);
    }

    data["id"] = this.id;
    data["workerId"] = this.workerId;
    data["shopIcon"] = this.shopIcon ? this.shopIcon.toJsonStr() : undefined;

    return JSON.stringify(data);
  }

  toString(): string {
    return this.toJsonStr();
  }
}
