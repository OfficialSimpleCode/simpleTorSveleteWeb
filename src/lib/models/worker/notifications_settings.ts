import type { BookingReminderType } from "$lib/consts/booking";
import { NotificationOption } from "$lib/consts/notification";


class WorkerNotificatiosSettings {
  showAdressAlert: boolean = false;
  showAdressMessage: boolean = false;
  showPhoneAlert: boolean = false;
  showPhoneMessage: boolean = false;
  recurrenceNotificationsLastDate: Date | null = null;
  notifyOnPayments: boolean = true;
  notifyOnWaitingListEvents: boolean = true;
  notifyAboutCancelNearDeadline: boolean = true;
  notifyOnClientConfirmArrival: boolean = true;
  notifyAboutOrderNearDeadline: boolean = true;
  notificationOption: NotificationOption = NotificationOption.PushOrSMS;
  notifyWhenGettingBooking: boolean = true;
  remindersTypes:Map<BookingReminderType,number> = new Map();

  constructor({
    showAdressAlert = false,
    showAdressMessage = false,
    showPhoneAlert = false,
    showPhoneMessage = false,
    recurrenceNotificationsLastDate,
    notifyOnPayments = true,
    notifyOnWaitingListEvents = true,
    notifyAboutCancelNearDeadline = true,
    notifyAboutOrderNearDeadline = true,
    notificationOption = NotificationOption.PushOrSMS,
    notifyWhenGettingBooking = true,
    remindersTypes,
  }: {
    showAdressAlert?: boolean;
    showAdressMessage?: boolean;
    showPhoneAlert?: boolean;
    showPhoneMessage?: boolean;
    recurrenceNotificationsLastDate?: Date | null;
    notifyOnPayments?: boolean;
    notifyOnWaitingListEvents?: boolean;
    notifyAboutCancelNearDeadline?: boolean;
    notifyAboutOrderNearDeadline?: boolean;
    notificationOption?: NotificationOption;
    notifyWhenGettingBooking?: boolean;
    remindersTypes?: { [key in BookingReminderType]: number };
  }) {
    this.showAdressAlert = showAdressAlert;
    this.showAdressMessage = showAdressMessage;
    this.showPhoneAlert = showPhoneAlert;
    this.showPhoneMessage = showPhoneMessage;
    this.recurrenceNotificationsLastDate = recurrenceNotificationsLastDate || null;
    this.notifyOnPayments = notifyOnPayments;
    this.notifyOnWaitingListEvents = notifyOnWaitingListEvents;
    this.notifyAboutCancelNearDeadline = notifyAboutCancelNearDeadline;
    this.notifyOnClientConfirmArrival = notifyOnClientConfirmArrival;
    this.notifyAboutOrderNearDeadline = notifyAboutOrderNearDeadline;
    this.notificationOption = notificationOption;
    this.notifyWhenGettingBooking = notifyWhenGettingBooking;
    this.remindersTypes = remindersTypes || new Map();
  }

  static fromJson(json: { [key: string]: any }): WorkerNotificatiosSettings {
    const settings = new WorkerNotificatiosSettings({
      notifyOnWaitingListEvents: json["notifyOnWaitingListEvents"] ?? true,
      notificationOption:
        notificationOptionFromStr[json["notificationOption"]] ||
        NotificationOption.PushOrSMS,
      recurrenceNotificationsLastDate: json["recurrenceNotificationsLastDate"]
        ? new Date(json["recurrenceNotificationsLastDate"])
        : null,
      remindersTypes: json["remindersTypes"]
        ? Object.entries(json["remindersTypes"]).reduce(
            (acc, [type, minutes]) => {
              if (bookingReminderTypeFromStr[type]) {
                acc[bookingReminderTypeFromStr[type]] = minutes;
              }
              return acc;
            },
            {} as { [key in BookingReminderType]: number }
          )
        : {
            [BookingReminderType.regular]: json["minutesBeforeNotify"] ?? 60,
          },
      notifyOnClientConfirmArrival: json["notifyOnClientConfirmArrival"] ?? true,
      showAdressAlert: json["showAdressAlert"] ?? false,
      showAdressMessage: json["showAdressMessage"] ?? false,
      showPhoneAlert: json["showPhoneAlert"] ?? false,
      showPhoneMessage: json["showPhoneMessage"] ?? false,
      notifyOnPayments: json["notifyOnPayments"] ?? true,
      notifyAboutCancelNearDeadline: json["notifyAboutCancelNearDeadline"] ?? true,
      notifyAboutOrderNearDeadline: json["notifyAboutOrderNearDeadline"] ?? true,
      notifyWhenGettingBooking: json["notifyWhenGettingBooking"] ?? true,
    });

    return settings;
  }

  isEqual(other: WorkerNotificatiosSettings): boolean {
    return DeepCollectionEquality.equals(other.toJson(), this.toJson());
  }

  get fromWorkerNotificatiosSettings(): WorkerNotificatiosSettings {
    const settings = WorkerNotificatiosSettings.fromJson(this.toJson());
    return settings;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};

    if (!this.notifyOnWaitingListEvents) {
      data['notifyOnWaitingListEvents'] = this.notifyOnWaitingListEvents;
    }

    if (this.notificationOption !== NotificationOption.PushOrSMS) {
      data["notificationOption"] =
        notificationOptionToStr[this.notificationOption];
    }

    if (this.recurrenceNotificationsLastDate) {
      data["recurrenceNotificationsLastDate"] =
        this.recurrenceNotificationsLastDate.toISOString();
    }

    if (!this.notifyOnClientConfirmArrival) {
      data["notifyOnClientConfirmArrival"] = this.notifyOnClientConfirmArrival;
    }

    if (!this.notifyOnPayments) {
      data['notifyOnPayments'] = this.notifyOnPayments;
    }

    data['remindersTypes'] = {};
    Object.entries(this.remindersTypes).forEach(([reminder, minutes]) => {
      data['remindersTypes'][bookingReminderTypeToStr[reminder]] = minutes;
    });

    if (!this.notifyAboutCancelNearDeadline) {
      data['notify
