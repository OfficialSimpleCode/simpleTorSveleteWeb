import {
  BookingReminderType,
  BookingStatuses,
  NotificationType,
} from "$lib/consts/booking";
import UserInitializer from "$lib/initializers/user_initializer";
import Booking from "$lib/models/booking/booking_model";
import { Duration } from "$lib/models/core/duration";
import type MultiBooking from "$lib/models/multi_booking/multi_booking";
import type MultiBookingUser from "$lib/models/multi_booking/multi_booking_user";
import { EnterAction } from "$lib/models/notifications/notification_payload";
import type UserNotification from "$lib/models/notifications/user_notification";
import PaymentRequest from "$lib/models/payment_hyp/payment_request/payment_request";
import type PaymentRequestUser from "$lib/models/payment_hyp/payment_request/payment_request_user";
import BreakModel from "$lib/models/schedule/break_model";
import type WorkerModel from "$lib/models/worker/worker_model";
import { isNotEmpty } from "$lib/utils/core_utils";
import { subDuration } from "$lib/utils/duration_utils";
import { sendMessagePaymentRequest } from "$lib/utils/notifications_utils";
import { dateToDateStr, setToMidNight } from "$lib/utils/times_utils";
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
    await NotificationsHelper.GI().notifyWorkerAboutOrder(worker, booking);

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
  }

  async afterDeleteBooking({
    booking,
    worker,
    isChildOfReccurence = false,

    fromDeleteWorker = false,
  }: {
    booking: Booking;
    worker?: WorkerModel;
    isChildOfReccurence?: boolean;
    notifyWorker?: boolean;
    fromDeleteWorker?: boolean;
  }): Promise<void> {
    console.log("ddddddddddddddddd");
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
            booking.recurrenceNotificationsLastDate == null ||
            booking.bookingDate <= booking.recurrenceNotificationsLastDate
          ) {
            if (booking.recurrenceRef != null) {
              booking.bookingId = `${booking.recurrenceRef}--${dateToDateStr(
                booking.bookingDate
              )}`;
            }
            // Delete the schedule message if it exists
            MessagesHelper.GI().cancelScheduleMessageToMultipleBookings({
              [booking.bookingId]: booking,
            });
          }
        }
        if (booking.notificationType === NotificationType.push) {
          // Delete the scheduled notification
          NotificationsHelper.GI().deleteAllScheduleBookingsNotifications([
            booking,
          ]);
        }
      }
    }
    console.log("ddddddddddddddddd");
    if (worker == null) {
      return;
    }
    console.log("ddddddddddddddddd");
    // No need to notify on passed bookings
    if (!booking.isPassed) {
      // Notify the worker if the user deletes the booking
      NotificationsHelper.GI().notifyWorkerAboutUserBookingDeletion(
        booking,
        worker
      );
    }
    console.log("ddddddddddddddddd");
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
          NotificationsHelper.GI().deleteAllScheduleBookingsNotifications([
            oldBooking,
          ]);
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

  async afterNeedCancelToMultiBookingSigning({
    userBooking,
    worker,
  }: {
    userBooking: Booking;
    worker: WorkerModel;
  }): Promise<void> {
    await NotificationsHelper.GI().notifyWorkerThatUserWantToCancelMultiBookingSigning(
      { userBooking, worker }
    );
  }

  async afterSignUsersToMultiBooking({
    multiBooking,
    addedUsersBookingsIds,
    worker,
    workerAction,
  }: {
    multiBooking: MultiBooking;
    addedUsersBookingsIds: Set<string>;
    worker: WorkerModel;
    workerAction: boolean;
  }): Promise<void> {
    const usersToNotify: Set<UserNotification> = new Set();
    const numbersToMessage: Set<string> = new Set();
    const numbersToNewUserMessage: Set<string> = new Set();
    const scheduleWithNotifications: Record<string, MultiBookingUser> = {};
    const scheduleWithMessages: Record<string, MultiBookingUser> = {};

    Object.entries(multiBooking.users).forEach(
      ([bookingUserId, multiBookingUser]) => {
        if (
          multiBookingUser.cancelDate ||
          !addedUsersBookingsIds.has(bookingUserId)
        ) {
          return;
        }
        if (multiBookingUser.notificationType === NotificationType.message) {
          if (UserInitializer.GI().user.id !== multiBookingUser.customerId) {
            if (multiBookingUser.isUserExist) {
              numbersToMessage.add(multiBookingUser.customerPhone);
            } else {
              numbersToNewUserMessage.add(multiBookingUser.customerPhone);
            }
          }
          if (multiBookingUser.status === BookingStatuses.approved) {
            scheduleWithMessages[multiBookingUser.userBookingId] =
              multiBookingUser;
          }
        } else if (
          multiBookingUser.notificationType === NotificationType.push
        ) {
          if (UserInitializer.GI().user.id !== multiBookingUser.customerId) {
            usersToNotify.add(
              multiBooking.toUserNotification(
                EnterAction.openUserBooking,
                multiBookingUser
              )
            );
          }
          if (multiBookingUser.status === BookingStatuses.approved) {
            scheduleWithNotifications[multiBookingUser.userBookingId] =
              multiBookingUser;
          }
        }
      }
    );

    //-----------------------------notify to customers ----------------------

    const addedMultiBookingUser =
      multiBooking.users[addedUsersBookingsIds.values().next().value];

    if (addedMultiBookingUser) {
      if (addedMultiBookingUser.status === BookingStatuses.approved) {
        NotificationsHelper.GI().notifyWorkerThatClientSignToMultiBooking({
          multiBooking,
          multiBookingUser: addedMultiBookingUser,
          worker,
        });
      } else {
        NotificationsHelper.GI().notifyWorkerThatClientSignToMultiAndWaitForApprove(
          {
            multiBooking,
            multiBookingUser: addedMultiBookingUser,
            worker,
          }
        );
      }
    }

    //-----------------------------schedule the customers -------------------
    if (isNotEmpty(scheduleWithNotifications)) {
      NotificationsHelper.GI().makeScheduleNotificationsToUsers({
        multiBooking: multiBooking,
        usersToScheudle: scheduleWithNotifications,
      });
    }
    if (isNotEmpty(scheduleWithMessages)) {
      MessagesHelper.GI().scheduleMultiBookingMessagesToUsers({
        multiBooking: multiBooking,
        multiBookingUsers: scheduleWithMessages,
      });
    }
  }

  async afterSignOutFromMultiBooking({
    multiBooking,
    removedUserBookingsIds,
    worker,
    workerAction,
  }: {
    multiBooking: MultiBooking;
    removedUserBookingsIds: Set<string>;
    worker: WorkerModel;
    workerAction: boolean;
  }): Promise<void> {
    // Collect all the data from the customers
    const usersToNotify: Set<UserNotification> = new Set();
    const numbersToMessage: Set<string> = new Set();
    const scheduleWithNotifications: Record<string, MultiBookingUser> = {};
    const scheduleWithMessages: Record<string, MultiBookingUser> = {};

    Object.entries(multiBooking.users).forEach(
      ([bookingUserId, multiBookingUser]) => {
        if (
          multiBookingUser.cancelDate != null ||
          !removedUserBookingsIds.has(bookingUserId)
        ) {
          return;
        }
        if (multiBookingUser.notificationType === NotificationType.message) {
          // No need to notify to oneself
          if (UserInitializer.GI().user.id !== multiBookingUser.customerId) {
            numbersToMessage.add(multiBookingUser.customerPhone);
          }
          if (multiBookingUser.status === BookingStatuses.approved) {
            scheduleWithMessages[multiBookingUser.userBookingId] =
              multiBookingUser;
          }
        } else if (
          multiBookingUser.notificationType === NotificationType.push
        ) {
          // No need to notify to oneself
          if (UserInitializer.GI().user.id !== multiBookingUser.customerId) {
            usersToNotify.add(
              multiBooking.toUserNotification(
                EnterAction.openUserBooking,
                multiBookingUser
              )
            );
          }
          if (multiBookingUser.status === BookingStatuses.approved) {
            scheduleWithNotifications[multiBookingUser.userBookingId] =
              multiBookingUser;
          }
        }
      }
    );
    if (!workerAction) {
      //if user action there is only one customer been deleted
      NotificationsHelper.GI().notifyWorkerThatClientRemoveHimSelfFromMultiBooking(
        {
          multiBooking: multiBooking,
          worker: worker,
          userName: UserInitializer.GI().user.name,
        }
      );
    }

    //----------------------------- Remove schedule notifications -------------------
    if (isNotEmpty(scheduleWithNotifications)) {
      NotificationsHelper.GI().deleteAllScheduleMultiBookingNotifications({
        multiBooking: multiBooking,
        usersToDelete: scheduleWithNotifications,
      });
    }
    if (isNotEmpty(scheduleWithMessages)) {
      MessagesHelper.GI().cancelScheduleMultiBookingMessagesToUsers({
        multiBooking: multiBooking,
        multiBookingUsers: scheduleWithMessages,
      });
    }

    // Notify the waitingList
    if (
      !workerAction ||
      multiBooking.activeUsers - removedUserBookingsIds.size <
        multiBooking.treatment.participants
    ) {
      NotificationsHelper.GI().notifyWaitingListTopic(
        multiBooking.notificationTopic,
        multiBooking.businessPayloadData
      );
    }
  }

  async afterSavePaymentRequest(
    paymentRequest: PaymentRequest,
    users: Record<string, PaymentRequestUser>,
    worker: WorkerModel
  ): Promise<void> {
    const fcmsToNotify: Set<string> = new Set();
    const numbersToMessage: Set<string> = new Set();
    const numbersToNewUserMessage: Set<string> = new Set();

    Object.entries(users).forEach(([userId, user]) => {
      const notificationType = sendMessagePaymentRequest(user, worker);
      if (notificationType === NotificationType.message) {
        //no need to notify to him self
        if (UserInitializer.GI().user.id !== user.userId) {
          if (user.isExist) {
            numbersToMessage.add(user.phone);
          } else {
            numbersToNewUserMessage.add(user.phone);
          }
        }
      } else if (notificationType === NotificationType.push) {
        //no need to notify to him self
        if (UserInitializer.GI().user.id !== user.userId) {
          if (user.fcmTokens) {
            for (const fcmToken of user.fcmTokens) {
              fcmsToNotify.add(fcmToken);
            }
          }
        }
      }
    });

    if (fcmsToNotify.size > 0) {
      await NotificationsHelper.GI().notifyClientsThatWorkerAsignToThemNewPaymentRequest(
        fcmsToNotify,
        paymentRequest
      );
    }

    if (numbersToMessage.size > 0) {
      await MessagesHelper.GI().messageClientsThatWorkerAsignToThemNewPaymentRequest(
        numbersToMessage,
        paymentRequest
      );
    }

    if (numbersToNewUserMessage.size > 0) {
      await MessagesHelper.GI().messageNotExistClientsThatWorkerAsignToThemNewPaymentRequest(
        {
          numbers: numbersToNewUserMessage,
          paymentRequest: paymentRequest,
        }
      );
    }
  }

  async cancelAllBookingsScheduleNoification(
    bookingsToDelete: Record<string, Booking>
  ): Promise<boolean> {
    const bookingsToCancelShcdule: Record<string, Booking> = {};
    const recurrenceBookingToCancelScheduleMessage: Record<string, Booking> =
      {};

    Object.entries(bookingsToDelete).forEach(([bookingId, booking]) => {
      if (!booking.recurrenceEvent) {
        bookingsToCancelShcdule[bookingId] = booking;
      } else {
        recurrenceBookingToCancelScheduleMessage[bookingId] = booking;
      }
    });

    const futures: Promise<boolean>[] = [
      MessagesHelper.GI().cancelScheduleMessageToMultipleBookings(
        bookingsToCancelShcdule
      ),
      NotificationsHelper.GI().deleteAllScheduleBookingsNotifications(
        Object.values(bookingsToDelete)
      ),
    ];

    Object.entries(recurrenceBookingToCancelScheduleMessage).forEach(
      ([_, booking]) => {
        if (!booking.recurrenceNotificationsLastDate) {
          return;
        }
        futures.push(
          this.deleteRecurrenceBookingNotificationsInRange({
            start: new Date(),
            end: booking.recurrenceNotificationsLastDate,
            recurrenceBooking: booking,
          })
        );
      }
    );

    const resp = await Promise.all(futures);
    return !resp.includes(false);
  }

  async cancelAllBreaksScheduleNotifications(
    breaksToDelete: BreakModel[]
  ): Promise<boolean> {
    const breaksToCancelSchedule: BreakModel[] = [];
    const recurrenceBreaksToCancelScheduleMessage: BreakModel[] = [];

    breaksToDelete.forEach((breakModel) => {
      if (!breakModel.notify) {
        return;
      }

      if (!breakModel.recurrenceEvent) {
        // Make sure the breaks are in the future
        const notificationDate = new Date(breakModel.bookingDate);
        notificationDate.setMinutes(
          notificationDate.getMinutes() - breakModel.minutesNotification
        );

        if (notificationDate < new Date()) {
          return;
        }

        breaksToCancelSchedule.push(breakModel);
      } else {
        if (!breakModel.recurrenceNotificationsLastDate) {
          return;
        }
        recurrenceBreaksToCancelScheduleMessage.push(breakModel);
      }
    });

    const futures: Promise<boolean>[] = [];
    breaksToCancelSchedule.forEach((breakModel) => {
      futures.push(
        NotificationsHelper.GI().deleteScheduleBreakNotification({
          breakModel,
          workerId: breakModel.workerId,
        })
      );
    });

    recurrenceBreaksToCancelScheduleMessage.forEach((breakModel) => {
      futures.push(
        this.deleteRecurrenceBreakNotificationsInRange({
          start: new Date(),
          end: breakModel.recurrenceNotificationsLastDate!,
          workerId: breakModel.workerId,
          recurrenceBreakModel: breakModel,
        })
      );
    });

    const resp = await Promise.all(futures);
    return !resp.includes(false);
  }

  ///Get strat , end and delete all the recurrnece
  /// notifications/messages in that range
  async deleteRecurrenceBreakNotificationsInRange({
    start,
    end,
    recurrenceBreakModel,
    workerId,
  }: {
    start: Date;
    end: Date;
    recurrenceBreakModel: BreakModel;
    workerId: string;
  }): Promise<boolean> {
    if (!recurrenceBreakModel.recurrenceEvent) {
      return true;
    }

    if (start > end) {
      return true;
    }

    // Get the starting date
    let datePointer = setToMidNight(start);
    // Collect all the dates we need to delete
    const dateToDelete: Set<Date> = new Set();
    while (datePointer <= end) {
      // Find the dates that the recurrence break occurred in.
      // Find also the exceptions - need to delete them too
      if (
        recurrenceBreakModel.recurrenceEvent &&
        recurrenceBreakModel.recurrenceEvent.isAccureInDate({
          date: datePointer,
          considerException: false,
        })
      ) {
        dateToDelete.add(new Date(datePointer));
      }
      datePointer.setDate(datePointer.getDate() + 1);
    }

    const futures: Promise<boolean>[] = [];
    dateToDelete.forEach((date) => {
      // Make new break from the recurrence break with the date to notify
      // as the date of the booking but keep the hour and minutes the same
      const newBreak = BreakModel.fromBreakModel(recurrenceBreakModel);

      newBreak.day = dateToDateStr(date);
      newBreak.bookingDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        recurrenceBreakModel.bookingDate.getHours(),
        recurrenceBreakModel.bookingDate.getMinutes()
      );

      futures.push(
        NotificationsHelper.GI().deleteScheduleBreakNotification({
          breakModel: newBreak,
          workerId: workerId,
        })
      );
    });

    await Promise.all(futures);
    return true;
  }

  ///Get strat , end and delete all the recurrnece
  /// notifications/messages in that range
  async deleteRecurrenceBookingNotificationsInRange(params: {
    start: Date;
    end: Date;
    recurrenceBooking: Booking;
  }): Promise<boolean> {
    const { start, end, recurrenceBooking } = params;

    if (!recurrenceBooking.recurrenceEvent) {
      return false;
    }

    let datePointer = setToMidNight(start);
    const dateToDelete = new Set<Date>();

    const event = Object.values(recurrenceBooking.bookingsEventsAsEvents)[0];

    while (datePointer <= end) {
      if (
        !event.isBreak &&
        event.eventIndex === 0 &&
        event.recurrenceEvent &&
        event.recurrenceEvent.isAccureInDate(datePointer, false)
      ) {
        dateToDelete.add(new Date(datePointer));
      }
      datePointer.setDate(datePointer.getDate() + 1);
    }
    //all the booking that need to send schedule message to
    const bookingForCancelMessage: Record<string, Booking> = {};
    const bookingForCancelPushNotification: Booking[] = [];

    dateToDelete.forEach((date) => {
      //make new booking from the recurrence booking with the date to notify
      //as the date of the booking but keep the hour and minutes the same
      const newBooking: Booking = Booking.fromBooking(recurrenceBooking);

      newBooking.bookingDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        recurrenceBooking.bookingDate.getHours(),
        recurrenceBooking.bookingDate.getMinutes()
      );

      if (recurrenceBooking.notificationType === NotificationType.message) {
        //recurrence bookings cant has the same booking id for them all
        //add the date in the end to make the id uniqe
        newBooking.bookingId = `${newBooking.bookingId}--${dateToDateStr(
          newBooking.bookingDate
        )}`;
        bookingForCancelMessage[newBooking.bookingId] = newBooking;
      } else if (recurrenceBooking.notificationType === NotificationType.push) {
        bookingForCancelPushNotification.push(newBooking);
      }
    });

    // Now you can handle the logic to delete notifications and messages based on the collected data

    return true; // Return true if the operation is successful
  }
}
