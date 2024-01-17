import IconData from "../general/icon_data";
import NotifcationPayloadObject from "./notification_payload_object";

export default class BreakNotificationPayload extends NotifcationPayloadObject {
    constructor({
      businessId,
      date,
      id,
      workerId,
      businessName,
      shopIcon
    }: {
      businessId?: string;
      date?: Date;
      id?: string;
      workerId?: string;
      businessName: string;
      shopIcon?:IconData
    }) {
      super({ businessId, date, id, workerId, businessName });
    }
  
    static fromJsonStr(jsonStr: string): BreakNotificationPayload {
      const json = JSON.parse(jsonStr) as {
        businessId?: string;
        date?: string;
        id?: string;
        workerId?: string;
        businessName: string;
        shopIcon?: string;
      };
  
      return new BreakNotificationPayload({
        businessId: json.businessId || "",
        businessName: json.businessName || "",
        date: json.date ? new Date(json.date) : undefined,
        id: json.id || "",
        workerId: json.workerId || "",
        shopIcon: json.shopIcon ? IconData.fromJsonStr(json.shopIcon) : undefined,
      });
    }
  
    toJsonStr(): string {
      const data: { [key: string]: any } = {};
  
      data["businessId"] = this.businessId;
      data["date"] = this.date?.toString();
      data["businessName"] = this.businessName;
      data["id"] = this.id;
      data["workerId"] = this.workerId;
      data["shopIcon"] = this.shopIcon?.toJsonStr();
  
      return JSON.stringify(data);
    }
  
    toString(): string {
      return this.toJsonStr();
    }
  }
  