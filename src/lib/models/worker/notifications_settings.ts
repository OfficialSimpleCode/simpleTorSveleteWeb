import {
  BookingReminderType,
  bookingReminderTypeFromStr,
} from "$lib/consts/booking";
import {
  NotificationOption,
  notificationOptionFromStr,
} from "$lib/consts/notification";

export default class WorkerNotificatiosSettings {
  showAdressAlert: boolean = false;
  showAdressMessage: boolean = false;
  showPhoneAlert: boolean = false;
  showPhoneMessage: boolean = false;
  recurrenceNotificationsLastDate?: Date;
  notifyOnPayments: boolean = true;
  notifyOnWaitingListEvents: boolean = true;
  notifyAboutCancelNearDeadline: boolean = true;
  notifyOnClientConfirmArrival: boolean = true;
  notifyAboutOrderNearDeadline: boolean = true;
  notificationOption: NotificationOption = NotificationOption.PushOrSMS;
  notifyWhenGettingBooking: boolean = true;
  remindersTypes: Map<BookingReminderType, number> = new Map();

  constructor() {}

  static fromJson(json: any): WorkerNotificatiosSettings {
    const newObj = new WorkerNotificatiosSettings();
    newObj.notifyOnWaitingListEvents =
      json["notifyOnWaitingListEvents"] ?? true;
    if (json["notificationOption"] != null) {
      newObj.notificationOption =
        notificationOptionFromStr[json["notificationOption"]] ??
        NotificationOption.PushOrSMS;
    }
    newObj.recurrenceNotificationsLastDate = json[
      "recurrenceNotificationsLastDate"
    ]
      ? new Date(json["recurrenceNotificationsLastDate"])
      : undefined;
    newObj.remindersTypes = new Map();
    if (json["remindersTypes"] != null) {
      for (const [type, minutes] of Object.entries<number>(
        json["remindersTypes"]
      )) {
        const reminderType = bookingReminderTypeFromStr[type];
        if (reminderType != null) {
          newObj.remindersTypes.set(reminderType, minutes);
        }
      }
    } else {
      newObj.remindersTypes.set(
        BookingReminderType.regular,
        json["minutesBeforeNotify"] ?? 60
      );
    }
    newObj.notifyOnClientConfirmArrival =
      json["notifyOnClientConfirmArrival"] ?? true;
    newObj.showAdressAlert = json["showAdressAlert"] ?? false;
    newObj.showAdressMessage = json["showAdressMessage"] ?? false;
    newObj.showPhoneAlert = json["showPhoneAlert"] ?? false;
    newObj.showPhoneMessage = json["showPhoneMessage"] ?? false;
    newObj.notifyOnPayments = json["notifyOnPayments"] ?? true;
    newObj.notifyAboutCancelNearDeadline =
      json["notifyAboutCancelNearDeadline"] ?? true;
    newObj.notifyAboutOrderNearDeadline =
      json["notifyAboutOrderNearDeadline"] ?? true;
    newObj.notifyWhenGettingBooking = json["notifyWhenGettingBooking"] ?? true;
    return newObj;
  }

  isEqual(other: WorkerNotificatiosSettings): boolean {
    return JSON.stringify(other.toJson()) === JSON.stringify(this.toJson());
  }

  static fromWorkerNotificatiosSettings(
    other: WorkerNotificatiosSettings
  ): WorkerNotificatiosSettings {
    return WorkerNotificatiosSettings.fromJson(other.toJson());
  }

  toJson(): any {
    const data: any = {};
    if (!this.notifyOnWaitingListEvents) {
      data["notifyOnWaitingListEvents"] = this.notifyOnWaitingListEvents;
    }
    if (this.notificationOption !== NotificationOption.PushOrSMS) {
      data["notificationOption"] = NotificationOption[this.notificationOption];
    }
    if (this.recurrenceNotificationsLastDate != null) {
      data["recurrenceNotificationsLastDate"] =
        this.recurrenceNotificationsLastDate.toISOString();
    }
    if (!this.notifyOnClientConfirmArrival) {
      data["notifyOnClientConfirmArrival"] = this.notifyOnClientConfirmArrival;
    }
    if (!this.notifyOnPayments) {
      data["notifyOnPayments"] = this.notifyOnPayments;
    }
    data["remindersTypes"] = {};
    this.remindersTypes.forEach((minutes, reminder) => {
      data["remindersTypes"][BookingReminderType[reminder]] = minutes;
    });
    if (!this.notifyAboutCancelNearDeadline) {
      data["notifyAboutCancelNearDeadline"] =
        this.notifyAboutCancelNearDeadline;
    }
    if (!this.notifyAboutOrderNearDeadline) {
      data["notifyAboutOrderNearDeadline"] = this.notifyAboutOrderNearDeadline;
    }
    if (!this.notifyWhenGettingBooking) {
      data["notifyWhenGettingBooking"] = this.notifyWhenGettingBooking;
    }
    if (this.showAdressAlert) {
      data["showAdressAlert"] = this.showAdressAlert;
    }
    if (this.showAdressMessage) {
      data["showAdressMessage"] = this.showAdressMessage;
    }
    if (this.showPhoneAlert) {
      data["showPhoneAlert"] = this.showPhoneAlert;
    }
    if (this.showPhoneMessage) {
      data["showPhoneMessage"] = this.showPhoneMessage;
    }
    return data;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}
