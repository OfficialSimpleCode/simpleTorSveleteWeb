import { BookingStatuses } from "$lib/consts/booking";
import {
  notifcationsCollection,
  scheduleNotificationDoc,
} from "$lib/consts/db";
import GeneralRepo from "$lib/helpers/general/general_repo";
import UserInitializer from "$lib/initializers/user_initializer";
import type Booking from "$lib/models/booking/booking_model";
import { Price } from "$lib/models/general/price";
import type BusinessPayloadData from "$lib/models/notifications/business_data_payload";
import NotificationPayload, {
  EnterAction,
} from "$lib/models/notifications/notification_payload";
import type NotificationTopic from "$lib/models/notifications/notification_topic";
import type WorkerModel from "$lib/models/worker/worker_model";
import { getFormatedTime, translate } from "$lib/utils/string_utils";
import NotificationsRepo from "./notifications_repo";

export default class NotificationsHelper {
  private static _singleton: NotificationsHelper = new this();
  private constructor() {}
  public static GI(): NotificationsHelper {
    return NotificationsHelper._singleton;
  }

  generalRepo: GeneralRepo = new GeneralRepo();
  notificationRepo: NotificationsRepo = new NotificationsRepo();

  // -- notifications to worker about user actions [order, delete, update] --

  ///  Get: `worker` that getting ordered.   [booking] object.
  ///       [isWorkerOrder] or the ServerNotificationsClient() order to itself.
  ///
  ///  Execute: send push notifiction if needed
  public async notifyWorkerAboutOrder(
    worker: WorkerModel,
    booking: Booking
  ): Promise<void> {
    if (!this._notifyToWorker(booking.customerId, worker, booking.status)) {
      return;
    }
    let content = "";
    let title = "";
    if (booking.status === BookingStatuses.approved) {
      title = translate("newBooking");
      content = `${booking.customerName} ${translate(
        "clientOrderMessage"
      )} ${translate("toDate").replaceAll(
        "DATE",
        getFormatedTime(booking.bookingDate)
      )}`;
    } else {
      title = translate("newWaitingBooking");
      content = translate("clientOrderWaitingBooking")
        .replaceAll("CLIENT", booking.customerName)
        .replaceAll("DATE", getFormatedTime(booking.bookingDate));
    }
    // add to the content payment details
    if (
      booking.transactions.size > 0 &&
      worker.notifications.notifyOnPayments
    ) {
      if (
        booking.transactionsTotalPaymentPrice.amount ===
          booking.totalPrice.amount ||
        booking.transactionsTotalPaymentPrice.amount <=
          booking.priceInAdvance.amount
      ) {
        // pay all the price or pay the amount in advance
        const transactionPrice = new Price({
          amount:
            booking.transactionPaymentLength !== 0
              ? booking.transactionsTotalPaymentPrice.amount.toString()
              : booking.transactionsTotalDepositPrice.amount.toString(),
          currency: booking.totalPrice.currency,
        });
        content +=
          " " +
          translate("payAmount")
            .replaceAll("AMOUNT", transactionPrice.toString())
            .replaceAll(
              "ACTION",
              booking.transactionPaymentLength === 0 //check if the transactions only with deposit
                ? translate("deposited2")
                : translate("paid")
            );
      } else if (
        booking.transactionsTotalPaymentPrice.amount > booking.totalPrice.amount
      ) {
        //pay all the price include tip
        const tipAmount =
          booking.transactionsTotalPaymentPrice.amount -
          booking.totalPrice.amount;
        const tipPrice = new Price({
          amount: tipAmount.toString(),
          currency: booking.totalPrice.currency,
        });
        content +=
          " " +
          translate("payAmountIncludeTip")
            .replaceAll("AMOUNT", booking.totalPrice.toString())
            .replaceAll("TIP", tipPrice.toString());
      }
    }
    // finally activate the notification
    await this.notificationRepo.notifyMultipleUsers({
      fcms: worker.fcmsTokens,
      content: content,
      title: title,
      payload: new NotificationPayload({
        action: EnterAction.openWorkerBooking,
        bookingData: booking.toBookingNotificationPayload,
      }),
      isSilent: true,
    });
  }

  /// Get: `booking` and notify the booking worker about deletion of it
  public async notifyWorkerAboutUserBookingDeletion(
    booking: Booking,
    worker: WorkerModel
  ): Promise<void> {
    if (!this._notifyToWorker(booking.customerId, worker)) {
      return;
    }
    let content = translate("WorkerDeletedContent");
    if (worker.notifications.notifyOnPayments && booking.isDepositTransaction) {
      content +=
        "." +
        translate("andDepositRedeemed").replaceAll(
          "AMOUNT",
          booking.transactionsTotalDepositPrice.toString()
        );
    }
    await this.notificationRepo.notifyMultipleUsers({
      fcms: worker.fcmsTokens,
      title: translate("WorkerBookingDeleted"),
      payload: new NotificationPayload({
        action: EnterAction.openWorkerBooking,
        bookingData: booking.toBookingNotificationPayload,
      }),
      content: content
        .replaceAll("CLIENT", booking.customerName)
        .replaceAll("DATE", getFormatedTime(booking.bookingDate)),
      isSilent: true,
    });
  }

  /// Get: `booking` and notify the booking worker about user want to delete it
  public async notifyWorkerAboutUserWantToDelete(
    booking: Booking,
    worker: WorkerModel
  ): Promise<void> {
    const isWorkerOrder = UserInitializer.GI().user.id === worker.id;
    if (!worker.notifications.notifyAboutCancelNearDeadline) {
      return; // the worker dosen't allow notifications while ordering
    }
    if (worker.fcmsTokens.size === 0) {
      return; // imposible to notify there isn't fcm
    }
    if (isWorkerOrder) {
      return; // the worker perform the order from scedule for ServerNotificationsClient()
    }
    if (worker.id === booking.customerId) {
      return; // worker order to himself
    }
    await this.notificationRepo.notifyMultipleUsers({
      fcms: worker.fcmsTokens,
      payload: new NotificationPayload({
        action: EnterAction.openWorkerBooking,
        bookingData: booking.toBookingNotificationPayload,
      }),
      title: translate("userWantsToDelete", false),
      content: translate("userWantDeleteContent", false)
        .replaceAll("CLIENT", booking.customerName)
        .replaceAll("DATE", getFormatedTime(booking.bookingDate)),
      isSilent: true,
    });
  }

  /// Get: `booking` and notify the booking worker about user restore the booking from wnat to delete
  public async notifyWorkerAboutUserRestoreBooking(
    booking: Booking,
    worker: WorkerModel
  ): Promise<void> {
    const isWorkerOrder = UserInitializer.GI().user.id === worker.id;
    if (!worker.notifications.notifyAboutCancelNearDeadline) {
      return; // the worker dosen't allow notifications while ordering
    }
    if (worker.fcmsTokens.size === 0) {
      return; // imposible to notify there isn't fcm
    }
    if (isWorkerOrder) {
      return; // the worker perform the order from scedule for ServerNotificationsClient()
    }
    if (worker.id === booking.customerId) {
      return; // worker order to himself
    }
    await this.notificationRepo.notifyMultipleUsers({
      fcms: worker.fcmsTokens,
      payload: new NotificationPayload({
        action: EnterAction.openWorkerBooking,
        bookingData: booking.toBookingNotificationPayload,
      }),
      title: translate("userRestore", false),
      content: translate("userResotreContent", false)
        .replaceAll("CLIENT", booking.customerName)
        .replaceAll("DATE", getFormatedTime(booking.bookingDate)),
      isSilent: true,
    });
  }

  /// Get: `booking` and notify the booking's worker about change that happened
  async notifyWorkerThatUserChangeBooking(
    newBooking: Booking,
    oldBooking: Booking,
    worker: WorkerModel,
    nameOfChanging: string,
    managerChange: boolean
  ): Promise<void> {
    if (!this._notifyToWorker(newBooking.customerId, worker)) {
      return;
    }
    await this.notificationRepo.notifyMultipleUsers({
      fcms: worker.fcmsTokens,
      title: translate(
        managerChange ? "managerUpdate" : "WorkerBookingChanged",
        false
      ).replaceAll("BUSINESSNAME", newBooking.businessName),
      content: translate("WorkerChangedContent", false)
        .replaceAll("OLDDATE", getFormatedTime(oldBooking.bookingDate))
        .replaceAll("NEWDATE", getFormatedTime(newBooking.bookingDate))
        .replaceAll("CLIENT", nameOfChanging),
      payload: new NotificationPayload({
        action: EnterAction.openWorkerBooking,
        bookingData: newBooking.toBookingNotificationPayload,
      }),
      isSilent: true,
    });
  }

  /// Get: `booking` and notify the booking's worker about change that happened
  async notifyWorkerThatUserChngeTreatmentsOfBooking(
    newBooking: Booking,
    oldBooking: Booking,
    worker: WorkerModel,
    nameOfChanging: string,
    managerChange: boolean
  ): Promise<void> {
    if (!this._notifyToWorker(newBooking.customerId, worker)) {
      return;
    }
    await this.notificationRepo.notifyMultipleUsers({
      fcms: worker.fcmsTokens,
      title: translate(
        managerChange ? "managerUpdate" : "WorkerBookingChanged",
        false
      ).replaceAll("BUSINESSNAME", newBooking.businessName),
      content: translate("WorkerChangedTreatmentsContent", false)
        .replaceAll("DATE", getFormatedTime(newBooking.bookingDate))
        .replaceAll("CLIENT", nameOfChanging),
      payload: new NotificationPayload({
        action: EnterAction.openWorkerBooking,
        bookingData: newBooking.toBookingNotificationPayload,
      }),
      isSilent: true,
    });
  }

  //-------------------------------------- waiting list -------------------------------

  async notifyWaitingListTopic(
    topic: NotificationTopic,
    businessData: BusinessPayloadData
  ): Promise<void> {
    await this.notificationRepo.notifyWaitingList({
      payload: new NotificationPayload({
        action: EnterAction.openBusiness,
        businessData: businessData,
      }),
      topic: topic,
    });
  }

  //-------------------------------------- schedule message --------------------------------
  // EXPLAIN: Upload the FutureNotification Object to the ScheduleNotifications
  // Collection to the correct time and the server will notify for all the
  // FutureNotification we uploaded

  // Get booking and make new schedule notification for it
  async makeScheduleBookingNotification({
    booking,
  }: {
    booking: Booking;
  }): Promise<boolean> {
    const notifications: Record<string, Record<string, any>> = {};
    const reminders = booking.remindersToFutureNotifications;

    reminders.forEach((reminder) => {
      notifications[reminder.dateToNotify.toISOString()] ??= {};
      notifications[reminder.dateToNotify.toISOString()]![reminder.id] =
        reminder.toJson();
    });

    const futures: Promise<boolean>[] = [];

    for (const [dateStr, data] of Object.entries(notifications)) {
      const dateToNotify = new Date(dateStr);

      const path = `${notifcationsCollection}/${scheduleNotificationDoc}/1/${dateToNotify.getFullYear()}/${dateToNotify.getMonth()}/${dateToNotify.getDay()}/${dateToNotify.getHours()}`;

      futures.push(
        this.generalRepo.setAsMapWithMergeRepo({
          insideEnviroments: false,
          path: path,
          docId: dateToNotify.getMinutes().toString(),
          valueAsJson: data,
        })
      );
    }

    const resp = await Promise.all(futures);

    return !resp.includes(false);
  }

  // Get oldBooking and newBooking and update the oldBooking schedule
  // notification to the new one
  async updateScheduleBookingNotification({
    oldBooking,
    newBooking,
  }: {
    oldBooking: Booking;
    newBooking: Booking;
  }): Promise<boolean> {
    const deleteResp = await this.deleteAllScheduleBookingsNotifications({
      bookings: [oldBooking],
    });

    if (!deleteResp) {
      return false;
    }

    return await this.makeScheduleBookingNotification({ booking: newBooking });
  }

  async deleteAllScheduleBookingsNotifications({
    bookings,
  }: {
    bookings: Booking[];
  }): Promise<boolean> {
    // Collect all the notifications to delete
    const datesToDelete: Record<string, Record<string, any>> = {};

    bookings.forEach((booking) => {
      const remindersOnBooking = booking.remindersOnBooking;

      for (const [dateToNotify, data] of Object.entries(remindersOnBooking)) {
        datesToDelete[dateToNotify] = data;
      }
    });

    const futures: Promise<boolean>[] = [];
    for (const [dateStr, data] of Object.entries(datesToDelete)) {
      const dateToNotify = new Date(dateStr);
      const path = `${notifcationsCollection}/${scheduleNotificationDoc}/1/${dateToNotify.getFullYear()}/${dateToNotify.getMonth()}/${dateToNotify.getDay()}/${dateToNotify.getHours()}`;

      futures.push(
        this.generalRepo.updateMultipleFieldsInsideDocAsMapRepo({
          insideEnviroments: false,
          path: path,
          docId: dateToNotify.getMinutes().toString(),
          data: data,
        })
      );
    }

    const results = await Promise.all(futures);
    return !results.includes(false);
  }

  private _notifyToWorker(
    customerId: string,
    worker?: WorkerModel,
    bookingStatus?: BookingStatuses
  ): boolean {
    if (worker === undefined) {
      return false;
    }
    if (worker.id === customerId) {
      return false; // worker order to himself
    }
    if (
      !worker.notifications.notifyWhenGettingBooking &&
      (bookingStatus != BookingStatuses.waiting ||
        !worker.notifications.notifyAboutOrderNearDeadline)
    ) {
      return false; // the worker dosen't allow notifications while ordering
    }

    if (worker.fcmsTokens.size === 0) {
      return false; // imposible to notify there isn't fcm
    }
    return true;
  }
}
