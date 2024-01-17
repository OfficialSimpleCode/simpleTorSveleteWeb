
import IconData from "../general/icon_data";
import NotifcationPayloadObject from "./notification_payload_object";
export default class InvoiceNotificationPayload extends NotifcationPayloadObject {
    constructor({
      businessId = "",
      date,
      id = "",
      workerId = "",
      businessName = "",
    }: {
      businessId?: string;
      date?: Date| null;
      id?: string;
      workerId?: string;
      businessName?: string;
    } = {}) {
      super({ businessId, date, id, workerId, businessName });
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
  
      const date = json.date ? new Date(json.date) : null;
      const newShopIcon = json.shopIcon ? IconData.fromJsonStr(json.shopIcon) : new IconData();
  
      const newObj =  new InvoiceNotificationPayload({
        businessId: json.businessId,
        date:date,
        id: json.id,
        workerId: json.workerId,
        businessName: json.businessName
      });
      newObj.shopIcon = newShopIcon;
      return newObj;
    }
  
    toJsonStr(): string {
      const data = {
        businessId: this.businessId,
        date: this.date?.toString(),
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
  