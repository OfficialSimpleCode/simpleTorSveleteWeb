import NotificationPayload from "./notification_payload";
///User notification object - for times we wsnt to send every
///notification with a diffrent payload
export default class UserNotification {
    fcms: Set<string>;
    payload: NotificationPayload | undefined;
  
    constructor({ fcms, payload }: { fcms: Set<string>; payload: NotificationPayload|undefined }) {
      this.fcms = fcms;
      this.payload = payload;
    }
  
    static fromJson(json: { fcms: string[]; payload: string | null }): UserNotification {
      const fcms = new Set<string>(json.fcms);
      const payload = json.payload !== null ? NotificationPayload.fromJsonStr(json.payload) : undefined;
  
      return new UserNotification({ fcms, payload });
    }
  
    toJson(): { fcms: string[]; payload: string | null } {
      const data: { fcms: string[]; payload: string | null } = {
        fcms: Array.from(this.fcms),
        payload: this.payload !== undefined ? this.payload.toJsonStr() : null,
      };
  
      return data;
    }
  }
  