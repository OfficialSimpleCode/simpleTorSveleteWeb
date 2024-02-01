import {
  BookingReminderType,
  BookingStatuses,
  NotificationType,
} from "$lib/consts/booking";
import UserInitializer from "$lib/initializers/user_initializer";
import Booking from "$lib/models/booking/booking_model";
import { Duration } from "$lib/models/core/duration";
import type WorkerModel from "$lib/models/worker/worker_model";
import { subDuration } from "$lib/utils/duration_utils";
import { dateToDateStr } from "$lib/utils/times_utils";
import MessagesHelper from "./messages/messages_helper";
import NotificationsHelper from "./notifications/notification_helper";

export default class NotificationHandler {
  private static instance: NotificationHandler;

  private constructor() {
    // Private constructor to enforce singleton pattern
  }

  static GI(): NotificationHandler {
    if (!NotificationHandler.instance) {
      NotificationHandler.instance = new NotificationHandler();
    }
    return NotificationHandler.instance;
  }

  async afterAddBooking({
    booking,
    worker,
  }: {
    booking: Booking;
    worker: WorkerModel;
  }): Promise<void> {
    // Notify the worker that the user ordered a booking for him
    NotificationsHelper.GI().notifyWorkerAboutOrder(worker, booking);

    if (booking.status === BookingStatuses.approved) {
      // Make scheduled notifications/messages
      if (booking.notificationType === NotificationType.message) {
        // Make the scheduled notification and save the message ID in the booking
        MessagesHelper.GI().scheduleMessageToMultipleBookings({
          [booking.bookingId]: booking,
        });
      } else if (booking.notificationType === NotificationType.push) {
        // Make a scheduled push notification
        NotificationsHelper.GI().makeScheduleBookingNotification({ booking });
      }
    }

    // // Delete the waiting list for that day if it exists
    // const notificationTopic = UserInitializer.GI().user.isSubToWaitingList({
    //   notificationTopic: booking.notificationTopic,
    // });

    // if (notificationTopic !== null) {
    //   // Remove subscription from the waiting list if it exists
    //   await this.userHelper().loadLibrary();
    //   await this.userHelper().unSubToWaitingList({ notificationTopic });
    // }
  }

  async afterDeleteBooking({
    booking,
    worker,
    isChildOfReccurence = false,
  }: {
    booking: Booking;
    worker?: WorkerModel;
    isChildOfReccurence?: boolean;
    notifyWorker?: boolean;
  }): Promise<void> {
    if (booking.recurrenceEvent === undefined) {
      if (booking.status === BookingStatuses.approved) {
        if (
          booking.notificationType === NotificationType.message &&
          subDuration(booking.bookingDate, new Duration({ hours: 1 })) >
            new Date()
        ) {
          // No need to delete the notification because the message
          // is not scheduled for this date
          if (
            !isChildOfReccurence ||
            booking.recurrenceNotificationsLastDate === undefined ||
            booking.bookingDate <= booking.recurrenceNotificationsLastDate
          ) {
            // Delete the schedule message if it exists
            MessagesHelper.GI().cancelScheduleMessageToMultipleBookings({
              [booking.bookingId]: booking,
            });
          }
        }
        if (booking.notificationType === NotificationType.push) {
          // Delete the scheduled notification
          NotificationsHelper.GI().deleteAllScheduleBookingsNotifications({
            bookings: [booking],
          });
        }
      }
    }
    if (worker === undefined) {
      return;
    }

    // No need to notify on passed bookings
    if (!booking.isPassed) {
      // Notify the worker if the user deletes the booking
      NotificationsHelper.GI().notifyWorkerAboutUserBookingDeletion(
        booking,
        worker
      );
    }

    // Notify the waiting list if the deleted booking opens new possible times
    NotificationsHelper.GI().notifyWaitingListTopic(
      booking.notificationTopic,
      booking.businessPayloadData
    );
  }

  async afterUpdateBooking({
    newBooking,
    oldBooking,
    newWorker,
    oldWorker,
    keepRecurrence,
    workerAction,
    isOldBoookingPassed,
    oldBookingDateForReccurence,
  }: {
    newBooking: Booking;
    oldBooking: Booking;
    newWorker: WorkerModel;
    oldWorker: WorkerModel;
    keepRecurrence: boolean;
    workerAction: boolean;
    isOldBoookingPassed: boolean;
    oldBookingDateForReccurence?: Date;
  }): Promise<void> {
    let oldBookingTemp = oldBooking;
    if (
      oldBooking.recurrenceEvent != null &&
      oldBookingDateForReccurence != null
    ) {
      const oldBookingTemp = Booking.fromBooking(oldBooking);

      oldBookingTemp.bookingDate = oldBookingDateForReccurence;
    }
    const workerChange = newBooking.workerId !== oldBooking.workerId;
    const userChange = newBooking.customerId !== oldBooking.customerId;
    const dateChange =
      newBooking.bookingDate.getTime() !==
      (oldBookingDateForReccurence ?? oldBooking.bookingDate).getTime();
    const treatmentsChange = !oldBooking.sameTreatments(newBooking);
    this._handleWorkerNotification({
      newBooking,
      oldBooking: oldBookingTemp,
      newWorker,
      oldWorker,
      workerChange,
      userChange,
      dateChange,
      treatmentsChange,
      workerAction,
      isOldBoookingPassed,
    });

    this._handleCustomerAlert({
      newBooking,
      oldBooking, //send oldBooking on puporse
      newWorker,
      oldWorker,
      keepRecurrence,
      oldBookingDateForReccurence,
      workerAction,
      isOldBoookingPassed,
      workerChange,
      userChange,
      dateChange,
      treatmentsChange,
    });
  }

  _handleCustomerAlert({
    newBooking,
    oldBooking,
    newWorker,
    oldWorker,
    workerAction,
    isOldBoookingPassed,
    oldBookingDateForReccurence,
    workerChange,
    userChange,
    dateChange,
    keepRecurrence,
    treatmentsChange,
  }: {
    newBooking: Booking;
    oldBooking: Booking;
    newWorker: WorkerModel;
    oldWorker: WorkerModel;
    workerAction: boolean;
    isOldBoookingPassed: boolean;
    oldBookingDateForReccurence?: Date;
    workerChange: boolean;
    userChange: boolean;
    dateChange: boolean;
    keepRecurrence: boolean;
    treatmentsChange: boolean;
  }): void {
    if (
      !treatmentsChange &&
      !dateChange &&
      !userChange &&
      oldBooking.status === BookingStatuses.approved
    ) {
      return;
    }
    if (
      oldBooking.notificationType === NotificationType.message &&
      oldBooking.status === BookingStatuses.approved &&
      newBooking.status === BookingStatuses.approved &&
      newBooking.notificationType === NotificationType.message
    ) {
      const oldBookingTemp = Booking.fromBooking(oldBooking);
      if (
        oldBooking.recurrenceEvent != null &&
        oldBookingDateForReccurence != null
      ) {
        oldBookingTemp.bookingId = `${oldBooking.bookingId}--${dateToDateStr(
          oldBookingDateForReccurence
        )}`;
      }
      MessagesHelper.GI().updateBookingScheduleMessage(
        oldBookingTemp,
        newBooking
      );
      return;
    } else if (
      oldBooking.notificationType === NotificationType.push &&
      oldBooking.status === BookingStatuses.approved &&
      newBooking.status === BookingStatuses.approved &&
      newBooking.notificationType === NotificationType.push
    ) {
      NotificationsHelper.GI().updateScheduleBookingNotification({
        oldBooking,
        newBooking,
      });
      return;
    } else {
      if (oldBooking.status === BookingStatuses.approved) {
        if (oldBooking.notificationType === NotificationType.message) {
          const oldBookingTemp = Booking.fromBooking(oldBooking);
          if (
            oldBooking.recurrenceEvent != null &&
            oldBookingDateForReccurence != null
          ) {
            oldBookingTemp.bookingId = `${
              oldBooking.bookingId
            }--${dateToDateStr(oldBookingDateForReccurence)}`;
          }
          MessagesHelper.GI().cancelScheduleMessageToMultipleBookings({
            [oldBookingTemp.bookingId]: oldBookingTemp,
          });
        } else if (oldBooking.notificationType === NotificationType.push) {
          NotificationsHelper.GI().deleteAllScheduleBookingsNotifications({
            bookings: [oldBooking],
          });
        }
      }
      if (newBooking.status === BookingStatuses.approved) {
        if (newBooking.notificationType === NotificationType.message) {
          MessagesHelper.GI().scheduleMessageToMultipleBookings({
            [newBooking.bookingId]: newBooking,
          });
        } else if (newBooking.notificationType === NotificationType.push) {
          NotificationsHelper.GI().makeScheduleBookingNotification({
            booking: newBooking,
          });
        }
      }
    }
  }

  _handleWorkerNotification({
    newBooking,
    oldBooking,
    newWorker,
    oldWorker,
    workerAction,
    isOldBoookingPassed,
    workerChange,
    userChange,
    dateChange,
    treatmentsChange,
  }: {
    newBooking: Booking;
    oldBooking: Booking;
    newWorker: WorkerModel;
    oldWorker: WorkerModel;
    workerAction: boolean;
    isOldBoookingPassed: boolean;
    workerChange: boolean;
    userChange: boolean;
    dateChange: boolean;
    treatmentsChange: boolean;
  }): void {
    if (workerChange) {
      if (workerAction) {
        // if (oldWorker.id != UserInitializer.GI().user.id) {
        //   NotificationsHelper.GI().notifyWorkerThatManagerDeleteHisBooking({
        //     worker: oldWorker,
        //     booking: oldBooking,
        //     managerName: UserInitializer.GI().user.name,
        //   });
        //   NotificationsHelper.GI().notifyWorkerThatManagerMakeHimNewBooking({
        //     worker: newWorker,
        //     booking: newBooking,
        //     managerName: UserInitializer.GI().user.name,
        //   });
        // }
      } else {
        NotificationsHelper.GI().notifyWorkerAboutUserBookingDeletion(
          oldBooking,
          oldWorker
        );
        NotificationsHelper.GI().notifyWorkerAboutOrder(newWorker, newBooking);
      }
    } else {
      if (treatmentsChange && !dateChange) {
        if (workerAction) {
          NotificationsHelper.GI().notifyWorkerThatUserChngeTreatmentsOfBooking(
            newBooking,
            oldBooking,
            newWorker,
            UserInitializer.GI().user.name,
            true
          );
        } else {
          NotificationsHelper.GI().notifyWorkerThatUserChngeTreatmentsOfBooking(
            newBooking,
            oldBooking,
            newWorker,
            newBooking.customerName,
            false
          );
        }
      } else if (dateChange) {
        if (workerAction) {
          NotificationsHelper.GI().notifyWorkerThatUserChangeBooking(
            newBooking,
            oldBooking,
            newWorker,
            UserInitializer.GI().user.name,
            true
          );
        } else {
          NotificationsHelper.GI().notifyWorkerThatUserChangeBooking(
            newBooking,
            oldBooking,
            newWorker,
            newBooking.customerName,
            false
          );
        }
      }
    }
  }

  async afterConfirmBookingArrival({
    booking,
    worker,
    minutesBeforeAlert,
    hasConfirmArrivalReminder,
  }: {
    booking: Booking;
    worker: WorkerModel;
    minutesBeforeAlert: number;
    hasConfirmArrivalReminder: boolean;
  }): Promise<void> {
    // Notify worker that user confirmed arrival
    await NotificationsHelper.GI().notifyWorkerThatClientConfirmArrival({
      worker,
      booking,
    });

    if (!hasConfirmArrivalReminder) {
      return;
    }

    if (booking.notificationType === NotificationType.message) {
      await MessagesHelper.GI().cancelSpecificScheduleMessageOnBooking(
        booking,
        BookingReminderType.confirmArrival
      );
    } else if (booking.notificationType === NotificationType.push) {
      await NotificationsHelper.GI().cancelSpecificScheduleNotificationOnBooking(
        {
          booking: booking,
          reminderType: BookingReminderType.confirmArrival,
          minutesBefore: minutesBeforeAlert,
        }
      );
    }
  }
}
