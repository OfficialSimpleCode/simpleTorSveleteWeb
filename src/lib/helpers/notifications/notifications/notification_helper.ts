import { ErrorsTypeLog, developers } from "$lib/consts/application_general";
import { BookingReminderType, BookingStatuses } from "$lib/consts/booking";
import {
  notifcationsCollection,
  scheduleNotificationDoc,
} from "$lib/consts/db";
import DeveloperHelper from "$lib/helpers/developer_helper";
import GeneralRepo from "$lib/helpers/general/general_repo";
import UserInitializer from "$lib/initializers/user_initializer";
import type Booking from "$lib/models/booking/booking_model";
import type BusinessModel from "$lib/models/business/business_model";
import type { CurrencyModel } from "$lib/models/general/currency_model";
import { Price } from "$lib/models/general/price";
import type MultiBooking from "$lib/models/multi_booking/multi_booking";
import type MultiBookingUser from "$lib/models/multi_booking/multi_booking_user";
import type BusinessPayloadData from "$lib/models/notifications/business_data_payload";
import NotificationPayload, {
  EnterAction,
} from "$lib/models/notifications/notification_payload";
import type NotificationTopic from "$lib/models/notifications/notification_topic";
import type Invoice from "$lib/models/payment_hyp/invoice/invoice";
import PaymentRequest from "$lib/models/payment_hyp/payment_request/payment_request";
import type BreakModel from "$lib/models/schedule/break_model";
import type UserModel from "$lib/models/user/user_model";
import type WorkerModel from "$lib/models/worker/worker_model";
import { activeBusiness } from "$lib/stores/Business";
import { dateToNotifyBreak, dateToRemindBooking } from "$lib/utils/dates_utils";
import { getFormatedTime } from "$lib/utils/string_utils";
import { dateIsoStr, isoToDate } from "$lib/utils/times_utils";
import { translate } from "$lib/utils/translate";
import { get } from "svelte/store";
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
  async notifyWorkerAboutOrder(
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

    console.log(content);

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
  async notifyWorkerAboutUserWantToDelete(
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
      title: translate("userWantsToDelete", undefined, false),
      content: translate("userWantDeleteContent", undefined, false)
        .replaceAll("CLIENT", booking.customerName)
        .replaceAll("DATE", getFormatedTime(booking.bookingDate)),
      isSilent: true,
    });
  }

  /// Get: `booking` and notify the booking worker about user restore the booking from wnat to delete
  async notifyWorkerAboutUserRestoreBooking(
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
      title: translate("userRestore", undefined, false),
      content: translate("userResotreContent", undefined, false)
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
        undefined,
        false
      ).replaceAll("BUSINESSNAME", newBooking.businessName),
      content: translate("WorkerChangedContent", undefined, false)
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
        undefined,
        false
      ).replaceAll("BUSINESSNAME", newBooking.businessName),
      content: translate("WorkerChangedTreatmentsContent", undefined, false)
        .replaceAll("DATE", getFormatedTime(newBooking.bookingDate))
        .replaceAll("CLIENT", nameOfChanging),
      payload: new NotificationPayload({
        action: EnterAction.openWorkerBooking,
        bookingData: newBooking.toBookingNotificationPayload,
      }),
      isSilent: true,
    });
  }
  async notifyWorkerThatClientConfirmArrival({
    worker,
    booking,
  }: {
    worker: WorkerModel;
    booking: Booking;
  }): Promise<void> {
    if (worker.fcmsTokens.size === 0) {
      return; // Unable to notify - there isn't an FCM token
    }
    if (worker.id === booking.customerId) {
      return; // Worker booked for himself
    }
    if (!worker.notifications.notifyOnClientConfirmArrival) {
      return; // Worker doesn't want to get notifications about the confirmation
    }

    await this.notificationRepo.notifyMultipleUsers({
      fcms: worker.fcmsTokens,
      payload: new NotificationPayload({
        action: EnterAction.openWorkerBooking,
        bookingData: booking.toBookingNotificationPayload,
      }),
      title: translate("clientComfirmArrival", undefined, false),
      content: translate("clientComfirmArrivalContent", undefined, false)
        .replace("TREATMENTNAME", booking.treatmentsToStringNotDetailed)
        .replace("DATE", getFormatedTime(booking.bookingDate))
        .replace("NAME", booking.customerName),
      isSilent: true,
    });
  }

  async notifyWorkerThatUserWantToCancelMultiBookingSigning({
    userBooking,
    worker,
  }: {
    userBooking: Booking;
    worker: WorkerModel;
  }): Promise<void> {
    if (!worker.notifications.notifyWhenGettingBooking) {
      return;
    }
    if (UserInitializer.GI().user.id === worker.id) {
      return;
    }
    await this.notificationRepo.notifyMultipleUsers({
      fcms: worker.fcmsTokens,
      payload: new NotificationPayload({
        action: EnterAction.openWorkerBooking,
        bookingData: userBooking.toBookingNotificationPayload,
      }),
      title: translate("userWantsToDeleteSigning", undefined, false),
      content: translate("userWantsToDeleteSigningContent", undefined, false)
        .replace("CUSTOMERNAME", userBooking.customerName)
        .replace("EVENTNAME", userBooking.treatmentsToStringNotDetailed)
        .replace("DATE", getFormatedTime(userBooking.bookingDate)),
    });
  }

  async notifyWorkerThatUseRestoredHisMultiBookingSigning({
    userBooking,
    worker,
  }: {
    userBooking: Booking;
    worker: WorkerModel;
  }): Promise<void> {
    if (!worker.notifications.notifyWhenGettingBooking) {
      return;
    }
    if (UserInitializer.GI().user.id === worker.id) {
      return;
    }
    await this.notificationRepo.notifyMultipleUsers({
      fcms: worker.fcmsTokens,
      payload: new NotificationPayload({
        action: EnterAction.openWorkerBooking,
        bookingData: userBooking.toBookingNotificationPayload,
      }),
      title: translate("userRestoreHisSigning", undefined, false),
      content: translate("userResotreContentMultiBooking", undefined, false)
        .replace("CUSTOMERNAME", userBooking.customerName)
        .replace("TREATMENTNAME", userBooking.treatmentsToStringNotDetailed)
        .replace("EVENTNAME", userBooking.treatmentsToStringNotDetailed)
        .replace("DATE", getFormatedTime(userBooking.bookingDate)),
    });
  }

  async notifyWorkerThatClientSignToMultiBooking({
    multiBooking,
    worker,
    multiBookingUser,
  }: {
    multiBooking: MultiBooking;
    worker: WorkerModel;
    multiBookingUser: MultiBookingUser;
  }): Promise<void> {
    if (!worker.notifications.notifyWhenGettingBooking) {
      return;
    }
    if (UserInitializer.GI().user.id === worker.id) {
      return;
    }

    const paid = multiBookingUser.isDepositTransaction
      ? multiBookingUser.transactionsTotalDepositAmount
      : multiBookingUser.transactionsTotalPaymentAmount;
    const price: Price = new Price({
      amount: paid.toString(),
      currency: multiBooking.treatment.price!.currency,
    });

    this.notificationRepo.notifyMultipleUsers({
      fcms: worker.fcmsTokens,
      payload: new NotificationPayload({
        action: EnterAction.openWorkerBooking,
        bookingData: multiBooking.toBookingNotificationPayload,
      }),
      title: translate("newSigning", undefined, false),
      content: translate("newClientOnMulti", undefined, false)
        .replace(
          "PAYMENT",
          paid > 0
            ? ` ${translate(
                multiBookingUser.isDepositTransaction
                  ? "depositAmount"
                  : "paymentAmount"
              ).replace("AMOUNT", price.toString())}`
            : ""
        )
        .replace("USERNAME", multiBookingUser.customerName)
        .replace("EVENTNAME", multiBooking.treatment.name)
        .replace("DATE", getFormatedTime(multiBooking.bookingDate)),
      isSilent: paid === 0,
    });
  }

  async notifyWorkerThatClientSignToMultiAndWaitForApprove({
    multiBooking,
    multiBookingUser,
    worker,
  }: {
    multiBooking: MultiBooking;
    multiBookingUser: MultiBookingUser;
    worker: WorkerModel;
  }): Promise<void> {
    if (!worker.notifications.notifyWhenGettingBooking) {
      return;
    }
    if (UserInitializer.GI().user.id === worker.id) {
      return;
    }

    this.notificationRepo.notifyMultipleUsers({
      fcms: worker.fcmsTokens,
      payload: new NotificationPayload({
        action: EnterAction.openWorkerBooking,
        bookingData: multiBooking.toBookingNotificationPayload,
      }),
      title: translate("signingWaiting", undefined, false),
      content: translate("signingWaitingForApprove", undefined, false)
        .replace("CUSTOMERNAME", multiBookingUser.customerName)
        .replace("EVENTNAME", multiBooking.treatment.name)
        .replace("DATE", getFormatedTime(multiBooking.bookingDate)),
      isSilent: true,
    });
  }

  async notifyClientsThatWorkerAsignToThemNewPaymentRequest(
    fcms: Set<string>,
    paymentRequest: PaymentRequest
  ): Promise<void> {
    await this.notificationRepo.notifyMultipleUsers({
      fcms: fcms,
      payload: new NotificationPayload({
        action: EnterAction.openUserPaymentRequest,
        paymentRequestData: paymentRequest.toPaymentRequestNotificationPayload,
      }),
      title: translate("newPaymentRequest", undefined, false),
      content: translate("newPaymentRequestContent", undefined, false)
        .replace("WORKERNAME", paymentRequest.workerInfo.workerName)
        .replace("BUSINESSNAME", paymentRequest.businessInfo.businessName)
        .replace("PRICE", paymentRequest.price.toString()),
    });
  }

  async notifyWorkerThatClientRemoveHimSelfFromMultiBooking({
    multiBooking,
    worker,
    userName,
  }: {
    multiBooking: MultiBooking;
    worker: WorkerModel;
    userName: string;
  }): Promise<void> {
    if (!worker.notifications.notifyWhenGettingBooking) {
      return;
    }
    if (UserInitializer.GI().user.id === worker.id) {
      return;
    }
    await this.notificationRepo.notifyMultipleUsers({
      fcms: worker.fcmsTokens,
      payload: new NotificationPayload({
        action: EnterAction.openWorkerBooking,
        bookingData: multiBooking.toBookingNotificationPayload,
      }),
      title: translate("signOutMultiBooking", undefined, false),
      content: translate("removeClientFromMulti", undefined, false)
        .replace("CUSTOMERNAME", userName)
        .replace("EVENTNAME", multiBooking.treatment.name)
        .replace("DATE", getFormatedTime(multiBooking.bookingDate)),
      isSilent: true,
    });
  }

  ///----------------------------------- payment request ------------------------------
  async notifyWorkerThatUserFinishPayOnRequest({
    paymentRequest,
    worker,
    userId,
    customerName,
  }: {
    paymentRequest: PaymentRequest;
    worker: WorkerModel;
    userId: string;
    customerName: string;
  }) {
    if (worker.fcmsTokens.size === 0) {
      return;
    }
    if (!worker.notifications.notifyOnPayments) {
      return;
    }
    if (worker.id === userId) {
      return;
    }
    await this.notificationRepo.notifyMultipleUsers({
      fcms: worker.fcmsTokens,
      payload: new NotificationPayload({
        action: EnterAction.openWorkerPaymentRequest,
        paymentRequestData: paymentRequest.toPaymentRequestNotificationPayload,
      }),
      title: translate("paymentRequestPaid", undefined, false),
      content: translate("paymentRequestPaidContent", undefined, false)
        .replaceAll("CUSTOMERNAME", customerName)
        .replaceAll("PRICE", paymentRequest.price.toString()),
    });
  }

  async notifyWorkerUserDeclineTheRequest({
    paymentRequest,
    worker,
    userName,
  }: {
    paymentRequest: PaymentRequest;
    worker: WorkerModel;
    userName: string;
  }) {
    if (worker.fcmsTokens.size === 0) {
      return;
    }
    if (!worker.notifications.notifyOnPayments) {
      return;
    }
    if (worker.id === UserInitializer.GI().user.id) {
      return;
    }
    await this.notificationRepo.notifyMultipleUsers({
      fcms: worker.fcmsTokens,
      payload: new NotificationPayload({
        action: EnterAction.openWorkerPaymentRequest,
        paymentRequestData: paymentRequest.toPaymentRequestNotificationPayload,
      }),
      title: translate("paymentRequestDeclined", undefined, false),
      content: translate("paymentRequestDeclinedContent", undefined, false)
        .replaceAll("CUSTOMERNAME", userName)
        .replaceAll("PRICE", paymentRequest.price.toString()),
    });
  }

  /// -------------------------------------invoice ------------------------------
  async notifyUserWorkerCreateInvoice({
    userFcms,
    workerName,
    currency,
    amount,
    invoice,
  }: {
    userFcms: Set<string>;
    workerName: string;
    currency: CurrencyModel;
    amount: number;
    invoice: Invoice;
  }) {
    if (!userFcms || userFcms.size === 0) {
      return;
    }

    const price = `${amount} ${currency}`;
    const payload = new NotificationPayload({
      action: EnterAction.openInvoice,
      invoiceData: invoice.toInvoiceNoticaficationPayload,
    });

    await this.notificationRepo.notifyMultipleUsers({
      fcms: userFcms,
      payload: payload,
      title: translate("newInvoice", undefined, false),
      content: translate("workerCreateInvoiceForUser", undefined, false)
        .replaceAll("BUSINESSNAME", invoice.businessInfo.businessName)
        .replaceAll("WORKERNAME", workerName)
        .replaceAll("PRICE", price),
    });
  }

  //-------------------------------------business -----------------------------------
  async notifyFirstTimeEnterBusiness(
    worker: WorkerModel,
    user: UserModel,
    business: BusinessModel
  ): Promise<void> {
    if (!UserInitializer.GI().isConnected) {
      return; // no need to notify about guests
    }

    if (!business.notifyOnNewCustomer) {
      return;
    }

    // no need to notify on enter of manager to business
    if (user.phoneNumber.startsWith("+972-5550")) {
      return;
    }

    // no need to notify on enter of developer to business
    if (developers.includes(user.id)) {
      return;
    }

    if (!UserInitializer.GI().user.firstEnterance(business.businessId)) {
      return; // user already visited
    }
    if (worker.fcmsTokens.size === 0) {
      return; // unable to notify - there aren't any FCMS tokens
    }

    if (worker.id === user.id) {
      return; // same user, no need to notify
    }

    if (get(activeBusiness) !== true) {
      return;
    }

    await this.notificationRepo.notifyMultipleUsers({
      fcms: worker.fcmsTokens,
      payload: new NotificationPayload({
        action: EnterAction.openBusiness,
        businessData: business.businessPayLoadData,
      }),
      title: translate("newCustomer", undefined, false),
      content: translate("newCustomerContent", undefined, false)
        .replace("BUSINESS_NAME", business.shopName)
        .replace("NAME", user.name)
        .replace("DATE", getFormatedTime(new Date())),
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

  //------------------------------------developer --------------------------------------
  async notifyDevelopersAboutError({
    userId,
    errorType,
    errorCode,
  }: {
    userId: string;
    errorType: ErrorsTypeLog;
    errorCode: string;
  }): Promise<void> {
    const developersFcm = await DeveloperHelper.GI().getDevelopersFcms();

    this.notificationRepo.notifyMultipleUsers({
      fcms: developersFcm,
      payload: new NotificationPayload(),
      title: translate(
        errorType === ErrorsTypeLog.login ? "newLoginError" : "newEnterError",
        undefined,
        false
      ),
      content:
        "WEB " +
        translate("newErrorContent", undefined, false)
          .replaceAll("USER", userId)
          .replaceAll("CODE", errorCode),
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
      notifications[dateIsoStr(reminder.dateToNotify)] ??= {};
      notifications[dateIsoStr(reminder.dateToNotify)]![reminder.id] =
        reminder.toJson();
    });

    const futures: Promise<boolean>[] = [];

    for (const [dateStr, data] of Object.entries(notifications)) {
      const dateToNotify = isoToDate(dateStr);

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
    const deleteResp = await this.deleteAllScheduleBookingsNotifications([
      oldBooking,
    ]);

    if (!deleteResp) {
      return false;
    }

    return await this.makeScheduleBookingNotification({ booking: newBooking });
  }

  async deleteAllScheduleBookingsNotifications(
    bookings: Booking[]
  ): Promise<boolean> {
    // Collect all the notifications to delete
    const datesToDelete: Record<string, Record<string, any>> = {};

    bookings.forEach((booking) => {
      const remindersOnBooking = booking.remindersOnBooking;

      for (const [dateToNotify, data] of Object.entries(remindersOnBooking)) {
        datesToDelete[dateToNotify] = data;
      }
    });

    const futures: Promise<boolean>[] = [];
    Object.entries(datesToDelete).forEach(([dateStr, data]) => {
      const dateToNotify = isoToDate(dateStr);
      const path = `${notifcationsCollection}/${scheduleNotificationDoc}/1/${dateToNotify.getFullYear()}/${
        dateToNotify.getMonth() + 1
      }/${dateToNotify.getDay()}/${dateToNotify.getHours()}`;

      futures.push(
        this.generalRepo.updateMultipleFieldsInsideDocAsMapRepo({
          insideEnviroments: false,
          path: path,
          docId: dateToNotify.getMinutes().toString(),
          data: data,
        })
      );
    });

    const results = await Promise.all(futures);
    return !results.includes(false);
  }

  async cancelSpecificScheduleNotificationOnBooking({
    booking,
    reminderType,
    minutesBefore,
  }: {
    booking: Booking;
    reminderType: BookingReminderType;
    minutesBefore: number;
  }): Promise<boolean> {
    if (minutesBefore === 0) {
      return true;
    }

    const dateToNotify = dateToRemindBooking(booking, minutesBefore);

    if (dateToNotify < new Date()) {
      return true;
    }

    // No possibility for non-valid data
    const path = `${notifcationsCollection}/${scheduleNotificationDoc}/1/${dateToNotify.getFullYear()}/${
      dateToNotify.getMonth() + 1
    }/${dateToNotify.getDate()}/${dateToNotify.getHours()}`;
    const docId = dateToNotify.getMinutes().toString();
    const fieldName = booking.reminderId(reminderType);

    return this.generalRepo.updateFieldInsideDocAsMapRepo({
      insideEnviroments: false,
      path,
      docId,
      fieldName,
    });
  }

  async deleteAllScheduleMultiBookingNotifications({
    multiBooking,
    usersToDelete,
  }: {
    multiBooking: MultiBooking;
    usersToDelete: Record<string, MultiBookingUser>;
  }): Promise<boolean> {
    // Collect all the notifications to delete
    const datesToDelete: Record<string, Record<string, any>> = {}; // {path:{minute:{bookingId:null}}}
    const existCombinedFcms: Set<string> = new Set();
    Object.entries(usersToDelete).forEach(([bookingId, userMultiBooking]) => {
      // Need to check if there is already a notification for this group of FCMS
      const combinedFcms = userMultiBooking.combinedFcms;
      if (existCombinedFcms.has(combinedFcms)) {
        return;
      }
      const reminders = multiBooking.remindersOnUser(userMultiBooking);
      Object.entries(reminders).forEach(([dateTimeToNotifyStr, data]) => {
        if (datesToDelete[dateTimeToNotifyStr] == null) {
          datesToDelete[dateTimeToNotifyStr] = {};
        }
        Object.entries(data).forEach(([reminderId, val]) => {
          datesToDelete[dateTimeToNotifyStr][reminderId] = val;
        });
      });
      // Add the combined FCMS if added to the dates
      existCombinedFcms.add(combinedFcms);
    });

    const futures: Promise<boolean>[] = [];
    Object.entries(datesToDelete).forEach(([dateToNotifyStr, data]) => {
      const dateToNotify = isoToDate(dateToNotifyStr);
      futures.push(
        this.generalRepo.updateMultipleFieldsInsideDocAsMapRepo({
          insideEnviroments: false,
          path: `${notifcationsCollection}/${scheduleNotificationDoc}/1/${dateToNotify.getFullYear()}/${
            dateToNotify.getMonth() + 1
          }/${dateToNotify.getDate()}/${dateToNotify.getHours()}`,
          docId: dateToNotify.getMinutes().toString(),
          data,
        })
      );
    });
    const results = await Promise.all(futures);
    return !results.includes(false);
  }

  async makeScheduleNotificationsToUsers({
    multiBooking,
    usersToScheudle,
  }: {
    multiBooking: MultiBooking;
    usersToScheudle: Record<string, MultiBookingUser>;
  }): Promise<boolean> {
    if (multiBooking.activeUsers === 0) {
      return false;
    }

    const notifications: Record<string, Record<string, any>> = {};
    const combinedExisFcms: Set<string> = new Set();

    Object.entries(usersToScheudle).forEach(([bookingId, userMultiBooking]) => {
      // Need to check if there is already schedule message to this group of fcms
      const combineFcms = userMultiBooking.combinedFcms;
      if (combinedExisFcms.has(combineFcms)) {
        return;
      }
      const reminders =
        multiBooking.remindersToFutureNotifications(userMultiBooking);

      reminders.forEach((reminder) => {
        notifications[dateIsoStr(reminder.dateToNotify)] ??= {};
        notifications[dateIsoStr(reminder.dateToNotify)][reminder.id] =
          reminder.toJson();
      });

      // Add the combine fcms if add the reminuders
      if (reminders.length > 0) {
        combinedExisFcms.add(combineFcms);
      }
    });

    const futures: Promise<any>[] = [];
    Object.entries(notifications).forEach(([dateToNotifyStr, data]) => {
      const dateToNotify = isoToDate(dateToNotifyStr);
      futures.push(
        this.generalRepo.setAsMapWithMergeRepo({
          insideEnviroments: false,
          path: `${notifcationsCollection}/${scheduleNotificationDoc}/1/${dateToNotify.getFullYear()}/${
            dateToNotify.getMonth() + 1
          }/${dateToNotify.getDate()}/${dateToNotify.getHours()}`,
          docId: dateToNotify.getMinutes().toString(),
          valueAsJson: data,
        })
      );
    });
    const resp = await Promise.all(futures);
    return !resp.includes(false);
  }

  ///-------------------------------------------------schedule breaks--------------------------------
  async deleteScheduleBreakNotification({
    breakModel,
    workerId,
  }: {
    breakModel: BreakModel;
    workerId: string;
  }): Promise<boolean> {
    if (!breakModel.notify) {
      return false;
    }
    const dateToNotify = dateToNotifyBreak(breakModel);
    if (dateToNotify < new Date()) {
      return false;
    }

    const id = breakModel.buisnessId + "--AAAA--" + workerId;
    return await this.generalRepo.updateFieldInsideDocAsMapRepo({
      insideEnviroments: false,
      path: `${notifcationsCollection}/${scheduleNotificationDoc}/1/${dateToNotify.getFullYear()}/${dateToNotify.getMonth()}/${dateToNotify.getDate()}/${dateToNotify.getHours()}`,
      docId: dateToNotify.getMinutes().toString(),
      fieldName: id,
    });
  }

  ///--------------------------------------------------------utils-----------------------------------

  private _notifyToWorker(
    customerId: string,
    worker?: WorkerModel,
    bookingStatus?: BookingStatuses
  ): boolean {
    console.log("qqqqqqqqqqqqq");
    if (worker == null) {
      console.log("4444444");
      return false;
    }
    if (worker.id === customerId) {
      console.log("3333333333");
      return false; // worker order to himself
    }
    if (
      !worker.notifications.notifyWhenGettingBooking &&
      (bookingStatus != BookingStatuses.waiting ||
        !worker.notifications.notifyAboutOrderNearDeadline)
    ) {
      console.log("444444444444444");
      return false; // the worker dosen't allow notifications while ordering
    }

    if (worker.fcmsTokens.size === 0) {
      console.log("6666666");
      return false; // imposible to notify there isn't fcm
    }
    console.log("44444444444444444444444444444444444");
    return true;
  }
}
