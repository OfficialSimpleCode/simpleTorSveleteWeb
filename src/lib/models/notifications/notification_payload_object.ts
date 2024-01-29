import { dateIsoStr } from "$lib/utils/times_utils";
import IconData from "../general/icon_data";

export default class NotifcationPayloadObject {
  businessId: string = "";
  businessName: string = "";
  date?: Date | null;
  id: string = "";
  workerId: string = "";
  shopIcon: IconData = new IconData();

  constructor({
    businessId = "",
    date,
    id = "",
    workerId = "",
    businessName = "",
    shopIcon = new IconData(),
  }: {
    businessId?: string;
    date?: Date | null;
    id?: string;
    workerId?: string;
    businessName?: string;
    shopIcon?: IconData;
  } = {}) {
    this.businessId = businessId;
    this.date = date || null;
    this.id = id;
    this.workerId = workerId;
    this.businessName = businessName;
    this.shopIcon = shopIcon;
  }

  static fromJsonStr(jsonStr: string): NotifcationPayloadObject {
    const json = JSON.parse(jsonStr) as {
      businessId: string;
      date?: string;
      id: string;
      workerId: string;
      businessName: string;
      shopIcon?: string;
    };

    const date = json.date ? new Date(json.date) : null;
    const newShopIcon = json.shopIcon
      ? IconData.fromJsonStr(json.shopIcon)
      : new IconData();

    const newObj = new NotifcationPayloadObject({
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
      id: this.id,
      workerId: this.workerId,
      businessName: this.businessName,
      shopIcon: this.shopIcon.toJsonStr(),
    };

    return JSON.stringify(data);
  }

  toString(): string {
    return this.toJsonStr();
  }
}
