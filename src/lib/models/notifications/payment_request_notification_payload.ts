// Assuming IconData and NotifcationPayloadObject classes are defined somewhere with proper methods

import IconData from "../general/icon_data";
import NotifcationPayloadObject from "./notification_payload_object";

export default class PaymentRequestNotificationPayload extends NotifcationPayloadObject {
    
    constructor({
      businessId,
      date,
      id,
      workerId,
      businessName,
      shopIcon,
    }: {
      businessId: string;
      date: Date | undefined;
      id: string;
      workerId: string;
      businessName: string;
      shopIcon:IconData|undefined
    }) {
      super({ businessId, date, id, workerId, businessName });
    }
  
    static fromJsonStr(jsonStr: string): PaymentRequestNotificationPayload {
      const json = JSON.parse(jsonStr);
  
      const businessId = json["businessId"] || "";
      const businessName = json["businessName"] || "";
      const date = json["date"] ? new Date(json["date"]) : undefined;
      const workerId = json["workerId"] || "";
      const id = json["id"] || "";
      const shopIcon = json["shopIcon"] ? IconData.fromJsonStr(json["shopIcon"]) : undefined;
  
      return new PaymentRequestNotificationPayload({
        businessId,
        date,
        id,
        workerId,
        businessName,
        shopIcon,
      });
    }
  
    toJsonStr(): string {
      const data: { [key: string]: any } = {};
  
      data["businessId"] = this.businessId;
      data["date"] = this.date?.toISOString() || null;
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
  