import {
  BookingReminderType,
  BookingStatuses,
  NotificationType,
  durationToUpdateBooking,
} from "$lib/consts/booking";
import { Gender, genderFromStr, genderToStr } from "$lib/consts/gender";
import { EventFilterType } from "$lib/consts/worker_schedule";
import { needToHoldOn } from "$lib/utils/booking_utils";
import { length } from "$lib/utils/core_utils";
import {
  dateToRemindMultiBooking,
  utcDeltaMinutes,
} from "$lib/utils/dates_utils";
import { addDuration, subDuration } from "$lib/utils/duration_utils";
import { formatedPhone } from "$lib/utils/string_utils";
import {
  dateIsoStr,
  dateToDateStr,
  dateToMonthStr,
  dateToTimeStr,
  dateToUtc,
  isoToDate,
  setToMidNight,
} from "$lib/utils/times_utils";
import pkg from "uuid";
import BookingHistoryItem from "../booking/booking_history";
import BookingInvoiceData from "../booking/booking_invoice_data";
import Booking from "../booking/booking_model";
import BookingPaymentRequestData from "../booking/booking_payment_request";
import BookingTransactionModel from "../booking/booking_transaction";
import type BusinessModel from "../business/business_model";
import { Duration } from "../core/duration";
import IconData from "../general/icon_data";
import { Price } from "../general/price";
import Treatment from "../general/treatment_model";
import WaitingListCustomer from "../general/waiting_list_customer";
import BookingNotificationPayload from "../notifications/booking_notification_payload";
import BusinessPayloadData from "../notifications/business_data_payload";
import FutureNotification from "../notifications/future_notification";
import type { EnterAction } from "../notifications/notification_payload";
import NotificationPayload from "../notifications/notification_payload";
import NotificationTopic from "../notifications/notification_topic";
import ScheduleMessage from "../notifications/schedule_message";
import UserNotification from "../notifications/user_notification";
import BookingReference from "../payment_hyp/booking_reference";
import Event from "../schedule/calendar_event";
import RecurrenceEvent from "../schedule/recurrence_event";
import ScheduleItem from "../schedule/schedule_item";
import type UserModel from "../user/user_model";
import type WorkerModel from "../worker/worker_model";
import MultiBookingTextTemplate from "./multi_booking_text_template";
import MultiBookingTime from "./multi_booking_time";
import MultiBookingUser from "./multi_booking_user";
import MultiBookingUsersPerCustomer from "./multi_booking_users_per_customer";

const { v4 } = pkg;
export default class MultiBooking extends ScheduleItem {
  treatment: Treatment = new Treatment();
  isMulti: boolean = true;
  workerGender: Gender = Gender.anonymous;
  note: string = "";
  bookingId: string = "";
  createdAt: Date = new Date();
  ///history of the booking update -
  /// for the developer to know all the changes that
  /// this booking has in its life time
  bookingHistory: Record<string, BookingHistoryItem> = {};

  adress: string = "";
  showWaitingList: boolean = true;
  users: Record<string, MultiBookingUser> = {};
  waitings: Record<string, WaitingListCustomer> = {};
  shopIcon: IconData = new IconData();
  recurrenceTimeId?: string;
  paymentRequest?: BookingPaymentRequestData;

  constructor({
    workerId,
    workerName,
    businessName,
    buisnessId,
    workerPhone,
  }: {
    workerId?: string | undefined;
    workerName?: string | undefined;
    businessName?: string | undefined;
    buisnessId?: string | undefined;
    workerPhone?: string | undefined;
  }) {
    super({
      workerId: workerId,
      workerName: workerName,
      businessName: businessName,
      buisnessId: buisnessId,
      workerPhone: workerPhone,
    });
  }

  static fromMultiBooking(multiBooking: MultiBooking): MultiBooking {
    const newObj = new MultiBooking({});

    newObj.workerGender = multiBooking.workerGender;
    newObj.paymentRequest = multiBooking.paymentRequest;
    newObj.note = multiBooking.note;
    newObj.adress = multiBooking.adress;

    newObj.showWaitingList = multiBooking.showWaitingList;
    newObj.recurrenceTimeId = multiBooking.recurrenceTimeId;
    newObj.businessName = multiBooking.businessName;
    newObj.bookingDate = multiBooking.bookingDate;
    newObj.workerId = multiBooking.workerId;
    newObj.recurrenceEventRefInfo = multiBooking.recurrenceEventRefInfo;
    if (multiBooking.recurrenceEvent != null) {
      newObj.recurrenceEvent = RecurrenceEvent.fromRecurrenceEvent(
        multiBooking.recurrenceEvent
      );
    }
    newObj.bookingHistory = { ...multiBooking.bookingHistory };
    newObj.shopIcon = multiBooking.shopIcon;
    newObj.bookingId = multiBooking.bookingId;
    newObj.workerPhone = multiBooking.workerPhone;
    newObj.treatment = Treatment.fromTreatment(multiBooking.treatment);
    newObj.recurrenceRef = multiBooking.recurrenceRef;
    newObj.recurrenceFatherDate = multiBooking.recurrenceFatherDate;
    newObj.workerName = multiBooking.workerName;
    newObj.buisnessId = multiBooking.buisnessId;
    newObj.createdAt = multiBooking.createdAt;
    newObj.users = {};
    Object.entries(multiBooking.users).forEach(([userBookingId, user]) => {
      newObj.users[userBookingId] = MultiBookingUser.fromMultiBookingUser(user);
    });
    newObj.waitings = {};
    for (const [userId, customer] of Object.entries(multiBooking.waitings)) {
      newObj.waitings[userId] =
        WaitingListCustomer.fromWaitingListCustomer(customer);
    }
    return newObj;
  }

  get onHoldUsers(): number {
    let counter = 0;
    for (const userObj of Object.values(this.users)) {
      if (
        userObj.status === BookingStatuses.waiting &&
        userObj.cancelDate == null
      ) {
        counter++;
      }
    }
    return counter;
  }
  get wantDeleteUsers(): number {
    let counter = 0;
    for (const userObj of Object.values(this.users)) {
      if (userObj.needCancel && userObj.cancelDate == null) {
        counter++;
      }
    }
    return counter;
  }
  get activeUsers(): number {
    let counter = 0;
    for (const userObj of Object.values(this.users)) {
      if (userObj.cancelDate == null) {
        counter++;
      }
    }
    return counter;
  }
  get hasTransaction(): boolean {
    for (const user of Object.values(this.users)) {
      if (user.transactions.size > 0) {
        return true;
      }
    }
    return false;
  }
  get currentDisplayDate(): Date {
    return this.recurrenceChildDate ?? this.bookingDate;
  }
  get canUpdate(): boolean {
    return (
      this.currentDisplayDate > subDuration(new Date(), durationToUpdateBooking)
    );
  }
  get isPassed(): boolean {
    if (this.recurrenceEvent != null) {
      if (this.recurrenceChildDate != null) {
        return (
          addDuration(
            this.recurrenceChildDate,
            new Duration({ minutes: this.totalMinutes + 2 })
          ) < new Date()
        );
      }
      const end = this.recurrenceEvent.endOfTheEvent;
      return end != null && end < setToMidNight(new Date());
    } else {
      return (
        addDuration(
          this.bookingDate,
          new Duration({ minutes: this.totalMinutes + 2 })
        ) < new Date()
      );
    }
  }
  get totalPaymentTransactionPrice(): Price {
    let price = new Price({
      amount: "0",
      currency: this.treatment.price!.currency,
    });
    for (const userObj of Object.values(this.users)) {
      if (userObj.cancelDate != null) {
        continue;
      }
      price.amount += userObj.transactionsTotalPaymentAmount;
    }
    return price;
  }

  remindersToScheduleMessages(
    multiBookingUser: MultiBookingUser
  ): ScheduleMessage[] {
    let messages: ScheduleMessage[] = [];
    multiBookingUser.remindersTypes.forEach((_, type) => {
      const reminderMessageTemp = this.reminderMessage(multiBookingUser, type);
      if (reminderMessageTemp != null) {
        messages.push(reminderMessageTemp);
      }
    });
    return messages;
  }
  reminderMessage(
    multiBookingUser: MultiBookingUser,
    type: BookingReminderType
  ): ScheduleMessage | undefined {
    if (multiBookingUser.notificationType !== NotificationType.message) {
      return undefined;
    }
    const minutesBefore = multiBookingUser.remindersTypes.get(type);
    if (minutesBefore == null || minutesBefore === 0) {
      return undefined;
    }

    const timeToSend = subDuration(
      this.bookingDate,
      new Duration({ minutes: minutesBefore })
    );
    // the event is in an hour from now no need to send a reminder
    if (timeToSend < new Date()) {
      return undefined;
    }
    return new ScheduleMessage({
      messageId: multiBookingUser.reminderId(type),
      destNumber: multiBookingUser.customerPhone,
      body: new MultiBookingTextTemplate(this).reminderTemplateByType(
        multiBookingUser,
        type
      ),
      timeToSend,
    });
  }

  get notificationTopic(): NotificationTopic {
    return new NotificationTopic({
      timeStr: dateToTimeStr(this.bookingDate),
      date: dateToDateStr(this.bookingDate),
      businessId: this.buisnessId,
      treatmentId: this.treatment.id,
      treatmentName: this.treatment.name,
      workerId: this.workerId,
      workerName: this.workerName,
    });
  }
  get totalDepositTransactionPrice(): Price {
    let price = new Price({
      amount: "0",
      currency: this.treatment.price!.currency,
    });
    for (const userObj of Object.values(this.users)) {
      if (userObj.cancelDate != null) {
        continue;
      }
      price.amount += userObj.transactionsTotalDepositAmount;
    }
    return price;
  }
  get totalTransactions(): number {
    let counter = 0;
    for (const userObj of Object.values(this.users)) {
      if (userObj.cancelDate != null) {
        continue;
      }
      counter += userObj.transactions.size;
    }
    return counter;
  }
  get monthStr(): string {
    return dateToMonthStr(this.bookingDate);
  }
  get totalTransactionsPerUser(): number {
    let counter = 0;
    for (const userObj of Object.values(this.users)) {
      if (userObj.cancelDate != null || userObj.transactions.size === 0) {
        continue;
      }
      counter++;
    }
    return counter;
  }
  get invoiceWorkerInfo(): InvoiceWorkerInfo {
    return new InvoiceWorkerInfo({
      workerId: this.workerId,
      workerName: this.workerName,
    });
  }
  remindersToFutureNotifications(
    multiBookingUser: MultiBookingUser
  ): FutureNotification[] {
    const reminders: FutureNotification[] = [];
    multiBookingUser.remindersTypes.forEach((minutes, type) => {
      const reminderMessageTemp = this.reminder(multiBookingUser, type);
      if (reminderMessageTemp != null) {
        reminders.push(reminderMessageTemp);
      }
    });
    return reminders;
  }

  reminder(
    multiBookingUser: MultiBookingUser,
    type: BookingReminderType
  ): FutureNotification | undefined {
    if (multiBookingUser.notificationType !== NotificationType.push) {
      return undefined;
    }

    const minutes = multiBookingUser.remindersTypes.get(type);

    if (minutes == null || minutes === 0) {
      return undefined;
    }

    const dateToNotify = dateToRemindMultiBooking(this, minutes);

    // No need to notify on past bookings
    if (dateToNotify < dateToUtc(new Date())) {
      return undefined;
    }

    if (multiBookingUser.userFcms.size === 0) {
      return undefined;
    }

    return new FutureNotification({
      businessName: this.businessName,
      shopIcon: this.shopIcon,
      address: multiBookingUser.showAdressAlert ? this.adress : "",
      isMulti: true,
      isRecurrence: this.recurrenceEvent != null || this.recurrenceRef != null,
      id: multiBookingUser.reminderId(type),
      dateToNotify,
      phoneToContact: multiBookingUser.showPhoneAlert
        ? formatedPhone(this.workerPhone)
        : "",
      businessId: this.buisnessId,
      type: this.treatment.name,
      //give the expected date that the user need to recive that future
      //notifiation and calculate the delta time from utc accordingly
      //to that date
      minutesToAdd:
        utcDeltaMinutes(
          subDuration(this.bookingDate, new Duration({ minutes: minutes }))
        ) + minutes,
      totalEventMinutes: this.totalMinutes,
      fcms: { ...multiBookingUser.userFcms },
    });
  }

  get businessPayloadData(): BusinessPayloadData {
    return new BusinessPayloadData({
      businessId: this.buisnessId,
      shopIcon: this.shopIcon,
      businessName: this.businessName,
    });
  }

  userTickets(
    userId: string,
    options: { excludeId?: string; needApprove?: boolean } = {}
  ): Record<string, MultiBookingUser> {
    const { excludeId = null, needApprove = false } = options;
    const newUsers: Record<string, MultiBookingUser> = {};

    Object.entries(this.users).forEach(([bookingId, user]) => {
      if (
        userId === user.customerId &&
        user.cancelDate == null &&
        bookingId !== excludeId &&
        (!needApprove || user.status === BookingStatuses.approved)
      ) {
        newUsers[bookingId] = user;
      }
    });

    return newUsers;
  }

  toUserNotification(
    enterAction: EnterAction,
    user: MultiBookingUser
  ): UserNotification {
    const bookingData = this.toBookingNotificationPayload;
    bookingData.id = user.userBookingId;
    return new UserNotification({
      fcms: user.userFcms,
      payload: new NotificationPayload({
        action: enterAction,
        bookingData: bookingData,
      }),
    });
  }
  get toBookingNotificationPayload(): BookingNotificationPayload {
    return new BookingNotificationPayload({
      businessId: this.buisnessId,
      id: this.bookingId,
      businessName: this.businessName,
      totalMinutes: this.totalMinutes,
      isRecurrence: this.recurrenceEvent != null,
      date: this.bookingDate,
      workerId: this.workerId,
      shopIcon: this.shopIcon,
    });
  }
  remindersOnUser(
    multiBookingUser: MultiBookingUser
  ): Record<string, Record<string, any>> {
    const reminders: { [key: string]: { [key: string]: any } } = {};
    if (multiBookingUser.cancelDate != null) {
      return {};
    }
    if (multiBookingUser.userFcms.size === 0) {
      return {};
    }
    if (multiBookingUser.notificationType !== NotificationType.push) {
      return {};
    }
    multiBookingUser.remindersTypes.forEach((minutes, type) => {
      if (minutes <= 0) {
        return;
      }
      const dateToNotify = dateToRemindMultiBooking(this, minutes);
      if (dateToNotify >= dateToUtc(new Date())) {
        if (!reminders[dateIsoStr(dateToNotify)]) {
          reminders[dateIsoStr(dateToNotify)] = {};
        }
        reminders[dateIsoStr(dateToNotify)][multiBookingUser.reminderId(type)] =
          null;
      }
    });
    return reminders;
  }
  messageRemindersOnUser(multiBookingUser: MultiBookingUser): string[] {
    const reminders: string[] = [];

    if (multiBookingUser.cancelDate != null) {
      return [];
    }

    multiBookingUser.remindersTypes.forEach((minutes, type) => {
      if (minutes <= 0) {
        return;
      }

      const dateToNotify = dateToRemindMultiBooking(this, minutes);

      if (dateToNotify >= dateToUtc(new Date())) {
        reminders.push(multiBookingUser.reminderId(type));
      }
    });
    return reminders;
  }
  copyDataToOrder({
    worker,
    customers,
    workerAction,

    user,
    business,
    clientNote = "",
    noteText = "",
  }: {
    worker: WorkerModel;
    customers: Record<string, MultiBookingUsersPerCustomer> | undefined;
    workerAction: boolean;
    business: BusinessModel;
    user: UserModel;

    clientNote?: string;
    noteText?: string;
  }): void {
    this.adress = business.adress;
    this.note = noteText;
    this.shopIcon = business.design.shopIconData;
    this.workerId = worker.id;
    this.workerPhone = worker.phone;
    this.workerName = worker.name;
    this.workerGender = worker.gender;
    if (customers != null) {
      this.users = {};
      Object.entries(customers).forEach(([__, customer]) => {
        const customerToIterate: MultiBookingUsersPerCustomer =
          MultiBookingUsersPerCustomer.fromMultiBookingUsersPerCustomer(
            customer
          );
        if (customer.multiBookingUsers.isNotEmpty) {
          Object.values(customerToIterate.multiBookingUsers)[0].canRemind =
            true;
        }
        Object.entries(customerToIterate.multiBookingUsers).forEach(
          ([_, multiBookingUser]) => {
            multiBookingUser.copyDataToOrder({
              worker: worker,
              bookingDate: this.bookingDate,
              noteText: clientNote,
              business: business,
              user: user,
              workerAction: workerAction,
              needToHoldOn: needToHoldOn(this.bookingDate, worker),
            });
            this.users[multiBookingUser.userBookingId] = multiBookingUser;
          }
        );
      });
    }
    this.businessName = business.shopName;
    this.bookingId =
      this.recurrenceEvent == null ? dateToTimeStr(this.bookingDate) : v4();
    this.buisnessId = business.businessId;
  }
  updateBookingByBooking({
    oldMultiBooking,
    worker,
    customers,
    workerAction,
    noteText = "",
    user,
    business,
    keepRecurrence = false,
  }: {
    oldMultiBooking: MultiBooking;
    worker: WorkerModel;
    customers: Record<string, MultiBookingUsersPerCustomer>;
    workerAction: boolean;
    business: BusinessModel;
    user: UserModel;
    noteText?: string;
    keepRecurrence?: boolean;
  }): void {
    this.adress = oldMultiBooking.adress;
    this.note = noteText;
    this.workerId = worker.id;
    this.workerPhone = worker.phone;
    this.workerName = worker.name;
    this.workerGender = worker.gender;
    this.showWaitingList = oldMultiBooking.showWaitingList;
    this.businessName = oldMultiBooking.businessName;
    this.buisnessId = oldMultiBooking.buisnessId;
    this.shopIcon = oldMultiBooking.shopIcon;
    const previousUsers = { ...this.users };
    const canceledUsers: { [key: string]: MultiBookingUser } = {};
    for (const [bookingId, userObj] of Object.entries(this.users)) {
      if (userObj.cancelDate != null) {
        canceledUsers[bookingId] = userObj;
      }
    }
    this.users = {};
    Object.entries(customers).forEach(([customerId, customer]) => {
      const customerToIterate: MultiBookingUsersPerCustomer =
        MultiBookingUsersPerCustomer.fromMultiBookingUsersPerCustomer(customer);
      if (customer.multiBookingUsers.isNotEmpty) {
        Object.values(customerToIterate.multiBookingUsers)[0].canRemind = true;
      }
      Object.entries(customerToIterate.multiBookingUsers).forEach(
        ([userBookingId, multiBookingUser]) => {
          if (previousUsers[multiBookingUser.userBookingId] !== undefined) {
            multiBookingUser = MultiBookingUser.fromMultiBookingUser(
              previousUsers[multiBookingUser.userBookingId]
            );
          } else {
            multiBookingUser.copyDataToOrder({
              worker: worker,
              user: user,
              business: business,
              bookingDate: this.bookingDate,
              workerAction: workerAction,
              needToHoldOn: needToHoldOn(this.bookingDate, worker),
            });
          }
          this.users[multiBookingUser.userBookingId] = multiBookingUser;
        }
      );
    });
    this.users = { ...this.users, ...canceledUsers };
    this.waitings = {};
    if (this.saveWaitings(oldMultiBooking)) {
      Object.entries(oldMultiBooking.waitings).forEach(
        ([customerId, customer]) => {
          this.waitings[customerId] =
            WaitingListCustomer.fromWaitingListCustomer(customer);
        }
      );
    }

    //add the booking history item for that update
    this.bookingHistory = { ...oldMultiBooking.bookingHistory };
    this.bookingHistory[length(oldMultiBooking.bookingHistory).toString()] =
      new BookingHistoryItem({
        updateTime: new Date(),
        previousTime: oldMultiBooking.bookingDate,
        workerId: oldMultiBooking.workerId,
        workerAction: workerAction,
        treatmentsIds: {
          [oldMultiBooking.treatment.id]: oldMultiBooking.treatment.count,
        },
        index: length(oldMultiBooking.bookingHistory).toString(),
      });
    this.recurrenceEvent = undefined;
    if (!keepRecurrence) {
      this.recurrenceFatherDate = undefined;
      this.recurrenceEventRefInfo = undefined;
      this.recurrenceRef = undefined;
    }
    this.bookingId = dateToTimeStr(this.bookingDate);
  }
  saveWaitings(other: MultiBooking): boolean {
    return (
      other.bookingDate.getTime() === this.bookingDate.getTime() &&
      other.treatment.id === this.treatment.id
    );
  }
  get totalMinutes(): number {
    let minutes = 0;
    for (const timeObj of Object.values(this.treatment.times)) {
      minutes += timeObj.workMinutes;
    }
    return minutes;
  }
  get toBookingReferncePaymentRequest(): BookingReference {
    return new BookingReference({
      id: this.bookingId,
      isMultiBooking: true,
      signNewMultiBookingUsers:
        this.paymentRequest?.signNewMultiBookingUsers ?? false,
      date: this.bookingDate,
      workerId: this.workerId,
    });
  }
  get bookingsForUsers(): Record<string, Booking> {
    const bookingsForUsers: Record<string, Booking> = {};
    for (const [bookingUserId, userObj] of Object.entries(this.users)) {
      if (userObj.cancelDate != null && userObj.cancelDate !== new Date(0)) {
        continue;
      }
      const bookingForUser = this.createRegularBooking(bookingUserId);
      if (bookingForUser != null) {
        bookingsForUsers[bookingUserId] = bookingForUser;
      }
    }
    return bookingsForUsers;
  }

  copyRecurrenceMultiBooking(newDateForRecurrence: Date): MultiBooking {
    const newMulti = MultiBooking.fromMultiBooking(this);
    const newRecurrenceEvent =
      this.recurrenceEvent != null
        ? RecurrenceEvent.fromRecurrenceEvent(this.recurrenceEvent!)
        : undefined;
    if (newRecurrenceEvent != null) {
      newRecurrenceEvent.exceptionDates = new Set<string>();
    }

    newMulti.bookingId = dateToTimeStr(newDateForRecurrence);
    newMulti.bookingDate = newDateForRecurrence;
    newMulti.recurrenceEvent = undefined;
    newMulti.recurrenceEventRefInfo = newRecurrenceEvent;
    newMulti.recurrenceRef = this.bookingId;
    newMulti.recurrenceTimeId = undefined;
    newMulti.recurrenceFatherDate = dateToDateStr(this.bookingDate);
    return newMulti;
  }

  createRegularBooking(bookingUserId: string): Booking | undefined {
    const userObj = this.users[bookingUserId];
    if (userObj == null) {
      return undefined;
    }
    const booking: Booking = new Booking({});
    booking.bookingDate = this.bookingDate;
    booking.bookingHistory = { ...this.bookingHistory };
    booking.treatments = { "0": this.treatment };
    booking.bookingId = bookingUserId;
    booking.workerId = this.workerId;
    booking.workerPhone = this.workerPhone;
    booking.workerName = this.workerName;
    booking.workerGender = this.workerGender;
    booking.businessName = this.businessName;
    booking.note = this.note;
    booking.buisnessId = this.buisnessId;
    booking.businessName = this.businessName;
    booking.adress = this.adress;
    booking.shopIcon = this.shopIcon;
    booking.customerName = userObj.customerName;
    booking.customerPhone = userObj.customerPhone;
    booking.userGender = userObj.userGender;
    booking.customerId = userObj.customerId;
    booking.clientNote = userObj.clientNote;
    booking.clientMail = userObj.clientMail;
    booking.lastTimeNotifyOnDebt = userObj.lastTimeNotifyOnDebt;
    booking.userDeleted = userObj.userDeleted;
    booking.showPhoneAlert = userObj.showPhoneAlert;
    booking.showAdressAlert = userObj.showAdressAlert;
    booking.remindersTypes = new Map(userObj.remindersTypes);
    booking.workerNotificationOption = userObj.workerNotificationOption;
    booking.workerRemindersTypes = new Map(userObj.workerRemindersTypes);
    booking.notificationType = userObj.notificationType;
    booking.status = userObj.status;
    booking.createdAt = userObj.createdAt;
    booking.addToClientAt = userObj.addToClientAt;
    booking.confirmedArrival = userObj.confirmedArrival;
    booking.orderingOptions = userObj.orderingOptions;
    booking.isUserExist = userObj.isUserExist;
    booking.isMultiRef = true;
    booking.needCancel = userObj.needCancel;
    booking.cancelDate = userObj.cancelDate;
    booking.finishInvoices = userObj.finishInvoices;
    booking.userFcms = userObj.userFcms;
    booking.debts = userObj.debts;
    booking.transactions = new Map();
    userObj.transactions.forEach((transaction, transactionId) => {
      booking.transactions.set(
        transactionId,
        BookingTransactionModel.fromTransaction(transaction)
      );
    });
    booking.invoices = new Map();
    userObj.invoices.forEach((invoice, inoviceId) => {
      booking.invoices.set(
        inoviceId,
        BookingInvoiceData.fromBookingInvoiceData(invoice)
      );
    });
    booking.paymentRequest = this.paymentRequest;
    booking.recurrenceEvent = undefined;
    booking.recurrenceEventRefInfo = undefined;
    booking.recurrenceRef = undefined;
    booking.recurreneFatherDate = undefined;
    return booking;
  }
  get bookingsEventsAsEvents(): Map<string, Event> {
    const bookingsPreviewsMap: Map<string, Event> = new Map();
    let lastTime: Date = this.bookingDate;
    const totalEventsOnBooking: number = this.treatment.times.size;
    let eventIndex: number = 0;

    this.treatment.times.forEach((timeData, timeIndex) => {
      // Adding the break before the segment
      lastTime = new Date(lastTime.getTime() + timeData.breakMinutes * 60000);
      const timeId: string =
        this.recurrenceTimeId != null && this.recurrenceEvent != null
          ? `${dateToTimeStr(lastTime)}_${this.recurrenceTimeId}`
          : dateToTimeStr(lastTime);
      const newEvent = new Event();
      newEvent.eventIndex;
      newEvent.onHold = false;
      newEvent.wantDelete = false;
      newEvent.totalBookingMinutes = this.totalMinutes;
      newEvent.subTreatmentName = timeData.title;
      newEvent.ids = [this.workerId];
      newEvent.treatmentName = this.treatment.name;
      newEvent.eventsBelong = totalEventsOnBooking;
      newEvent.invoiceCoverCounter;
      newEvent.isBreak = false;
      newEvent.debtCounter = this.getDebtCounter;
      newEvent.treatmentId = this.treatment.id;
      newEvent.onHoldCounter = this.onHoldUsers;
      newEvent.confirmedArrivalAmount = this.confirmedUsersCount;
      newEvent.wantDeleteCounter = this.wantDeleteUsers;
      newEvent.timeId =
        this.recurrenceEvent != null ? this.recurrenceTimeId : undefined;
      newEvent.isMulti = true;
      newEvent.recurrenceFatherBookingId =
        this.recurrenceEvent != null ? this.bookingId : undefined;
      newEvent.currentParticipants = this.activeUsers;
      newEvent.partOfRecurrence = this.recurrenceEventRefInfo != null;
      newEvent.hasInvoice = false;
      newEvent.recurrenceEvent;
      newEvent.transactionCounter = this.totalTransactions;
      newEvent.transactionsPerUser = this.totalTransactionsPerUser;
      newEvent.eventName = "";
      newEvent.from = new Date(lastTime);
      newEvent.durationMinutes = timeData.workMinutes;
      newEvent.colorIndex = this.treatment.colorIndex;
      bookingsPreviewsMap.set(timeId, newEvent);

      // Jumping to the end of the segment
      lastTime = addDuration(
        lastTime,
        new Duration({ minutes: timeData.workMinutes })
      );
      eventIndex += 1;
    });

    return bookingsPreviewsMap;
  }

  get bookingsEventsAsJson(): Map<string, any> {
    const bookingsPreviewsMap: Map<string, any> = new Map();
    let lastTime: Date = this.bookingDate;
    const totalEventsOnBooking: number = this.treatment.times.size;
    let eventIndex: number = 0;

    this.treatment.times.forEach((timeData, timeIndex) => {
      // Adding the break before the segment
      lastTime = new Date(lastTime.getTime() + timeData.breakMinutes * 60000);
      const timeId: string =
        this.recurrenceTimeId != null && this.recurrenceEvent != null
          ? `${dateToTimeStr(lastTime)}_${this.recurrenceTimeId}`
          : dateToTimeStr(lastTime);
      const newEvent = new Event();
      newEvent.eventIndex;
      newEvent.onHold = false;
      newEvent.wantDelete = false;
      newEvent.totalBookingMinutes = this.totalMinutes;
      newEvent.subTreatmentName = timeData.title;
      newEvent.ids = [this.workerId];
      newEvent.treatmentName = this.treatment.name;
      newEvent.eventsBelong = totalEventsOnBooking;
      newEvent.invoiceCoverCounter;
      newEvent.isBreak = false;
      newEvent.debtCounter = this.getDebtCounter;
      newEvent.treatmentId = this.treatment.id;
      newEvent.onHoldCounter = this.onHoldUsers;
      newEvent.confirmedArrivalAmount = this.confirmedUsersCount;
      newEvent.wantDeleteCounter = this.wantDeleteUsers;
      newEvent.timeId =
        this.recurrenceEvent != null ? this.recurrenceTimeId : undefined;
      newEvent.isMulti = true;
      newEvent.recurrenceFatherBookingId =
        this.recurrenceEvent != null ? this.bookingId : undefined;
      newEvent.currentParticipants = this.activeUsers;
      newEvent.partOfRecurrence = this.recurrenceEventRefInfo != null;
      newEvent.hasInvoice = false;
      newEvent.recurrenceEvent;
      newEvent.transactionCounter = this.totalTransactions;
      newEvent.transactionsPerUser = this.totalTransactionsPerUser;
      newEvent.eventName = "";
      newEvent.from = new Date(lastTime);
      newEvent.durationMinutes = timeData.workMinutes;
      newEvent.colorIndex = this.treatment.colorIndex;
      bookingsPreviewsMap.set(timeId, newEvent.toJson());

      // Jumping to the end of the segment
      lastTime = addDuration(
        lastTime,
        new Duration({ minutes: timeData.workMinutes })
      );
      eventIndex += 1;
    });

    return bookingsPreviewsMap;
  }

  get timesAsJson(): Record<string, any> {
    const bookingWorkTimesMap: Record<string, any> = {};
    let lastTime: Date = this.bookingDate;
    let index: number = 0;
    this.treatment.times.forEach((timeData, timeIndex) => {
      // addint the break before the segment
      lastTime = addDuration(
        lastTime,
        new Duration({ minutes: timeData.breakMinutes })
      );

      bookingWorkTimesMap[dateToTimeStr(lastTime)] = new MultiBookingTime({
        treatmentId: index == 0 ? this.treatment.id : "",
        currentParticipants: this.activeUsers,
        paymentRequestId:
          index === 0 &&
          this.paymentRequest != null &&
          this.paymentRequest!.signNewMultiBookingUsers
            ? this.paymentRequest!.id
            : undefined,
        maxParticipants: this.treatment.tempMaxParticipants,
        showWaitingList: this.showWaitingList,
        minutes: timeData.workMinutes,
        index: index,
      }).toJson();

      // jumping to the end of the segment
      lastTime = addDuration(
        lastTime,
        new Duration({ minutes: timeData.workMinutes })
      );
      index++;
    });
    return bookingWorkTimesMap;
  }

  get times(): Record<string, MultiBookingTime> {
    const bookingWorkTimesMap: Record<string, MultiBookingTime> = {};
    let lastTime: Date = this.bookingDate;
    let index: number = 0;
    this.treatment.times.forEach((timeData, timeIndex) => {
      // addint the break before the segment
      lastTime = addDuration(
        lastTime,
        new Duration({ minutes: timeData.breakMinutes })
      );

      bookingWorkTimesMap[dateToTimeStr(lastTime)] = new MultiBookingTime({
        treatmentId: index == 0 ? this.treatment.id : "",
        currentParticipants: this.activeUsers,
        paymentRequestId:
          index === 0 &&
          this.paymentRequest != null &&
          this.paymentRequest!.signNewMultiBookingUsers
            ? this.paymentRequest!.id
            : undefined,
        maxParticipants: this.treatment.tempMaxParticipants,
        showWaitingList: this.showWaitingList,
        minutes: timeData.workMinutes,
        index: index,
      });

      // jumping to the end of the segment
      lastTime = addDuration(
        lastTime,
        new Duration({ minutes: timeData.workMinutes })
      );
      index++;
    });
    return bookingWorkTimesMap;
  }

  get invoiceCoverCounter(): number {
    let counter = 0;
    for (const multiBookingUser of Object.values(this.users)) {
      if (
        multiBookingUser.cancelDate != null ||
        multiBookingUser.finishInvoices ||
        multiBookingUser.invoicePriceAmount >= this.treatment.price!.amount
      ) {
        counter++;
      }
    }
    return counter;
  }
  get getDebtCounter(): number {
    let counter = 0;
    for (const multiBookingUser of Object.values(this.users)) {
      if (
        multiBookingUser.cancelDate != null ||
        multiBookingUser.debts.size > 0
      ) {
        counter++;
      }
    }
    return counter;
  }
  get confirmedUsersCount(): number {
    let count = 0;
    for (const multiBookingUser of Object.values(this.users)) {
      if (
        multiBookingUser.cancelDate != null ||
        multiBookingUser.confirmedArrival
      ) {
        count++;
      }
    }
    return count;
  }
  get typesOfEvents(): Map<EventFilterType, number> {
    const types: Map<EventFilterType, number> = new Map();
    Object.entries(this.users).forEach(([_, user]) => {
      if (user.cancelDate != null) {
        return;
      }
      const userTypes = user.typesOfEvents;
      userTypes.forEach((value, type) => {
        if (types.get(type) == null) {
          types.set(type, 0);
        }
        types.set(type, types.get(type)! + value);
      });
    });
    if (this.waitings.isNotEmpty) {
      //add the waiting list to the types
      types.set(
        EventFilterType.waitingList,
        Object.entries(this.waitings).length
      );
    }

    return types;
  }

  static fromJson(json: Record<any, any>, id: string): MultiBooking {
    const newMultiBooking = new MultiBooking({});
    newMultiBooking.workerGender =
      genderFromStr[json["workerGender"]] ?? Gender.anonymous;

    newMultiBooking.note = json["note"] ?? "";
    newMultiBooking.bookingId = id;

    newMultiBooking.workerPhone = json["workerPhone"] ?? "";

    newMultiBooking.recurrenceTimeId = json["recurrenceTimeId"];

    newMultiBooking.workerId = json["workerId"] ?? json["workerPhone"] ?? "";
    newMultiBooking.adress = json["adress"] ?? "";

    if (json["bookingDate"] != null) {
      newMultiBooking.bookingDate = isoToDate(json["bookingDate"]);
    }
    if (json["treatment"] != null) {
      newMultiBooking.treatment = Treatment.fromJson(json["treatment"], "0");
    }
    newMultiBooking.showWaitingList = json["showWaitingList"] ?? true;
    newMultiBooking.workerName = json["workerName"] ?? "";
    newMultiBooking.businessName = json["businessName"] ?? "";
    newMultiBooking.buisnessId = json["buisnessId"] ?? "";
    if (json["bookingHistory"] != null) {
      Object.entries<Record<string, any>>(json["bookingHistory"]).forEach(
        ([index, bookingHistoryItemJson]) => {
          newMultiBooking.bookingHistory[index] = BookingHistoryItem.fromJson(
            bookingHistoryItemJson,
            index
          );
        }
      );
    }

    if (json["shopIcon"] != null) {
      newMultiBooking.shopIcon = IconData.fromJson(json["shopIcon"]);
    }
    if (json["createdAt"] != null) {
      newMultiBooking.createdAt = isoToDate(json["createdAt"]);
    }
    if (json["RE"] != null) {
      newMultiBooking.recurrenceEvent = RecurrenceEvent.fromJson(
        json["RE"],
        newMultiBooking.bookingDate
      );
    }
    if (json["RERI"] != null) {
      newMultiBooking.recurrenceEventRefInfo = RecurrenceEvent.fromJson(
        json["RERI"]
      );
    }
    newMultiBooking.recurrenceFatherDate = json["recurreneFatherDate"];
    newMultiBooking.recurrenceRef = json["recurrenceRef"];

    if (json["users"] != null) {
      Object.entries<Record<string, any>>(json["users"]).forEach(
        ([bookingId, userJson]) => {
          newMultiBooking.users[bookingId] = MultiBookingUser.fromJson(
            userJson,
            bookingId,
            newMultiBooking.workerId
          );
        }
      );
    }

    if (json["waitings"] != null) {
      Object.entries<Record<string, any>>(json["waitings"]).forEach(
        ([userId, customerJson]) => {
          newMultiBooking.waitings[userId] = WaitingListCustomer.fromJson(
            customerJson,
            userId,
            newMultiBooking.workerId,
            newMultiBooking.bookingDate
          );
        }
      );
    }
    if (json["paymentRequest"] != null) {
      newMultiBooking.paymentRequest = BookingPaymentRequestData.fromJson(
        json["paymentRequest"]
      );
    }

    return newMultiBooking;
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};
    data["workerGender"] = genderToStr[this.workerGender];
    if (this.note != "") {
      data["note"] = this.note;
    }

    data["businessName"] = this.businessName;

    data["treatment"] = this.treatment.toJson();

    if (this.adress != "") {
      data["adress"] = this.adress;
    }
    if (this.recurrenceTimeId != null) {
      data["recurrenceTimeId"] = this.recurrenceTimeId;
    }
    data["isMulti"] = this.isMulti;
    data["bookingDate"] = dateIsoStr(this.bookingDate);

    data["workerId"] = this.workerId.toString();
    data["workerName"] = this.workerName;
    data["buisnessId"] = this.buisnessId;
    data["bookingHistory"] = {};
    Object.entries(this.bookingHistory).forEach(([id, bookingHistoryItem]) => {
      data["bookingHistory"][id] = bookingHistoryItem.toJson();
    });

    data["shopIcon"] = this.shopIcon.toJson();

    data["createdAt"] = dateIsoStr(this.createdAt);
    if (this.recurrenceEvent != null) {
      data["RE"] = this.recurrenceEvent!.toJson({});
    }
    if (this.recurrenceEventRefInfo != null) {
      data["RERI"] = this.recurrenceEventRefInfo!.toJson({
        saveStartDate: true,
        saveException: false,
        saveEnd: false,
      });
    }
    if (this.recurrenceRef != null) {
      data["recurrenceRef"] = this.recurrenceRef;
    }
    if (this.recurrenceFatherDate != null) {
      data["recurreneFatherDate"] = this.recurrenceFatherDate;
    }
    if (!this.showWaitingList) {
      data["showWaitingList"] = this.showWaitingList;
    }

    if (Object.values(this.users).length > 0) {
      data["users"] = {};
      Object.entries(this.users).forEach(([bookingUserId, user]) => {
        data["users"][bookingUserId] = user.toJson();
      });
    }

    if (Object.values(this.waitings).length > 0) {
      data["waitings"] = {};
      Object.entries(this.waitings).forEach(([userId, customer]) => {
        data["waitings"][userId] = customer.toJson();
      });
    }
    if (this.paymentRequest != null) {
      data["paymentRequest"] = this.paymentRequest!.toJson();
    }

    data["bookingHistory"] = {};
    Object.entries(this.bookingHistory).forEach(([id, bookingHistoryItem]) => {
      data["bookingHistory"][id] = bookingHistoryItem.toJson();
    });

    return data;
  }
}
