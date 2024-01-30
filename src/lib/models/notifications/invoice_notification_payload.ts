import { dateIsoStr, isoToDate } from "$lib/utils/times_utils";
import IconData from "../general/icon_data";
import NotifcationPayloadObject from "./notification_payload_object";
export default class InvoiceNotificationPayload extends NotifcationPayloadObject {
  constructor({
    businessId = "",
    date,
    id = "",
    workerId = "",
    businessName = "",
    shopIcon,
  }: {
    businessId?: string;
    date?: Date | undefined;
    id?: string;
    workerId?: string;
    businessName?: string;
    shopIcon?: IconData;
  } = {}) {
    super({ businessId, date, id, workerId, businessName, shopIcon });
  }

  static fromJsonStr(jsonStr: string): InvoiceNotificationPayload {
    const json = JSON.parse(jsonStr) as {
      businessId: string;
      date?: string;
      id: string;
      workerId: string;
      businessName: string;
      shopIcon?: string;
    };

    const date = json.date ? isoToDate(json.date) : undefined;
    const newShopIcon = json.shopIcon
      ? IconData.fromJsonStr(json.shopIcon)
      : new IconData();

    const newObj = new InvoiceNotificationPayload({
      businessId: json.businessId,
      date: date,
      id: json.id,
      workerId: json.workerId,
      businessName: json.businessName,
    });
    newObj.shopIcon = newShopIcon;
    return newObj;
  }

  toJsonStr(): string {
    const data = {
      businessId: this.businessId,
      date: this.date ? dateIsoStr(this.date) : undefined,
      businessName: this.businessName,
      id: this.id,
      workerId: this.workerId,
      shopIcon: this.shopIcon.toJsonStr(),
    };

    return JSON.stringify(data);
  }

  toString(): string {
    return this.toJsonStr();
  }
}
