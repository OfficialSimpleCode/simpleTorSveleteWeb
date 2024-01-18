import { BookingReminderType, BookingStatuses, NotificationType } from "$lib/consts/booking";
import { Gender } from "$lib/consts/gender";
import { dateToMonthStr } from "$lib/utils/times_utils/times_utils";
import BookingInvoiceData from "../booking/booking_invoice_data";
import type BookingPaymentRequestData from "../booking/booking_payment_request";
import BookingTransactionModel from "../booking/booking_transaction";
import IconData from "../general/icon_data";
import { Price } from "../general/price";
import Treatment from "../general/treatment_model";
import BusinessPayloadData from "../notifications/business_data_payload";
import FutureNotification from "../notifications/future_notification";
import ScheduleItem from "../schedule/schedule_item";
import MultiBookingUser from "./multi_booking_user";

export default class MultiBooking extends ScheduleItem {
  treatment: Treatment = new Treatment();
  isMulti: boolean = true;
  workerGender: Gender = Gender.anonymous;
  bookingDate: Date = new Date(0);
  note: string = "";
  bookingId: string = "";
  createdAt: Date = new Date();
  adress: string = "";
  showWaitingList: boolean = true;
  users: { [key: string]: MultiBookingUser } = {};
  waitings: { [key: string]: WaitingListCustomer } = {};
  shopIcon: IconData = new IconData();
  recurrenceTimeId?: string;
  paymentRequest?: BookingPaymentRequestData;

  constructor(
    { workerId, workerName, businessName, buisnessId, workerPhone }: {
      workerId?: string | undefined;
      workerName?: string | undefined;
      businessName?: string | undefined;
      buisnessId?: string | undefined;
      workerPhone?: string | undefined;
  }
  ){
    super({workerId:workerId,workerName:workerName,businessName:businessName,buisnessId:buisnessId,workerPhone:workerPhone});
  };

  static fromMultiBooking({
    multiBooking,
  }: {
    multiBooking: MultiBooking;
  }): MultiBooking {
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
      // newObj.recurrenceEvent = new RecurrenceEvent(
      multiBooking.recurrenceEvent;
    }
    newObj.shopIcon = multiBooking.shopIcon;
    newObj.bookingId = multiBooking.bookingId;
    newObj.workerPhone = multiBooking.workerPhone;
    newObj.treatment = new Treatment(multiBooking.treatment);
    newObj.recurrenceRef = multiBooking.recurrenceRef;
    newObj.recurrenceFatherDate = multiBooking.recurrenceFatherDate;
    newObj.workerName = multiBooking.workerName;
    newObj.buisnessId = multiBooking.buisnessId;
    newObj.createdAt = multiBooking.createdAt;
    newObj.users = {};
    for (const [userBookingId, user] of Object.entries<MultiBookingUser>(
      multiBooking.users
    )) {
      newObj.users[userBookingId] = new MultiBookingUser(user);
    }
    newObj.waitings = {};
    for (const [userId, customer] of Object.entries(multiBooking.waitings)) {
      newObj.waitings[userId] = new WaitingListCustomer(customer);
    }
    return newObj;
  }

  get onHoldUsers(): number {
    let counter = 0;
    for (const userObj of Object.values(this.users)) {
      if (
        userObj.status === BookingStatuses.waiting &&
        userObj.cancelDate === null
      ) {
        counter++;
      }
    }
    return counter;
  }
  get wantDeleteUsers(): number {
    let counter = 0;
    for (const userObj of Object.values(this.users)) {
      if (userObj.needCancel && userObj.cancelDate === null) {
        counter++;
      }
    }
    return counter;
  }
  get activeUsers(): number {
    let counter = 0;
    for (const userObj of Object.values(this.users)) {
      if (userObj.cancelDate === null) {
        counter++;
      }
    }
    return counter;
  }
  get hasTransaction(): boolean {
    for (const user of Object.values(this.users)) {
      if (user.transactions.length > 0) {
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
      this.currentDisplayDate > new Date().subtract(durationToUpdateBooking)
    );
  }
  get isPassed(): boolean {
    if (this.recurrenceEvent != null) {
      if (this.recurrenceChildDate != null) {
        return (
          this.recurrenceChildDate.add(Duration(minutes, totalMinutes + 2)) <
          new Date()
        );
      }
      const end = this.recurrenceEvent.endOfTheEvent;
      return end !== null && end < setToMidNight(new Date());
    } else {
      return (
        this.bookingDate.add(Duration(minutes, totalMinutes + 2)) < new Date()
      );
    }
  }
  get totalPaymentTransactionPrice(): Price {
    let price = new Price({
      amount: "0",
      currency: this.treatment.price.currency,
    });
    for (const userObj of Object.values(this.users)) {
      if (userObj.cancelDate !== null) {
        continue;
      }
      price.amount += userObj.transactionsTotalPaymentAmount;
    }
    return price;
  }
  get totalDepositTransactionPrice(): Price {
    let price = new Price({
      amount: "0",
      currency: this.treatment.price.currency,
    });
    for (const userObj of Object.values(this.users)) {
      if (userObj.cancelDate !== null) {
        continue;
      }
      price.amount += userObj.transactionsTotalDepositAmount;
    }
    return price;
  }
  get totalTransactions(): number {
    let counter = 0;
    for (const userObj of Object.values(this.users)) {
      if (userObj.cancelDate !== null) {
        continue;
      }
      counter += userObj.transactions.length;
    }
    return counter;
  }
  get monthStr(): string {
    return dateToMonthStr(this.bookingDate);
  }
  get totalTransactionsPerUser(): number {
    let counter = 0;
    for (const userObj of Object.values(this.users)) {
      if (userObj.cancelDate !== null || userObj.transactions.length === 0) {
        continue;
      }
      counter++;
    }
    return counter;
  }
  get invoiceWorkerInfo(): InvoiceWorkerInfo {
    return new InvoiceWorkerInfo(this.workerId, this.workerName);
  }
  remindersToFutureNotifications(
    multiBookingUser: MultiBookingUser
  ): FutureNotification[] {
    const reminders: FutureNotification[] = [];
    for (const [type, _] of Object.entries(multiBookingUser.remindersTypes)) {
      const reminderMessageTemp = reminder(multiBookingUser, type);
      if (reminderMessageTemp !== null) {
        reminders.push(reminderMessageTemp);
      }
    }
    return reminders;
  }
  reminder(
    multiBookingUser: MultiBookingUser,
    type: BookingReminderType
  ): FutureNotification | null {
    if (multiBookingUser.notificationType !== NotificationType.push) {
      return null;
    }
    if (multiBookingUser.cancelDate !== null) {
      return null;
    }
    const minutes = multiBookingUser.remindersTypes[type];
    if (minutes === 0 || minutes === null) {
      return null;
    }
    if (multiBookingUser.userFcms.length === 0) {
      return null;
    }
    const dateToNotify = dateToRemindMultiBooking(this, minutes);
    if (dateToNotify < new Date().toUtc()) {
      return null;
    }
    return new FutureNotification({
      businessName:this.businessName,
      multiBookingUser.showAdressAlert ? this.adress : "",
      true,
      this.shopIcon,
      multiBookingUser.reminderId(type),
      dateToNotify,
      totalMinutes,
      multiBookingUser.showPhoneAlert ? formatedPhone(this.workerPhone) : "",
      this.buisnessId,
      this.treatment.name,
      utcDeltaMinutes() + minutes,
      { ...multiBookingUser.userFcms }});
  }

  get businessPayloadData(): BusinessPayloadData {
    return new BusinessPayloadData({
      businessId:this.buisnessId,
     shopIcon: this.shopIcon,
  businessName:   this.businessName
  });
  }
  get toUserNotification(
    enterAction: EnterAction,
    user: MultiBookingUser
  ): UserNotification {
    return new UserNotification(user.userFcms, {
      action: enterAction,
      bookingData: {
        ...this.toBookingNotificationPayload,
        id: user.userBookingId,
      },
    });
  }
  get toBookingNotificationPayload(): BookingNotificationPayload {
    return {
      businessId: this.buisnessId,
      id: this.bookingId,
      businessName: this.businessName,
      totalMinutes: totalMinutes,
      isRecurrence: this.recurrenceEvent !== null,
      date: this.bookingDate,
      workerId: this.workerId,
      shopIcon: this.shopIcon,
    };
  }
  remindersOnUser(multiBookingUser: MultiBookingUser): {
    [key: string]: { [key: string]: any };
  } {
    const reminders: { [key: string]: { [key: string]: any } } = {};
    if (multiBookingUser.cancelDate !== null) {
      return {};
    }
    if (multiBookingUser.userFcms.length === 0) {
      return {};
    }
    if (multiBookingUser.notificationType !== NotificationType.push) {
      return {};
    }
    for (const [type, minutes] of Object.entries(
      multiBookingUser.remindersTypes
    )) {
      if (minutes <= 0) {
        continue;
      }
      const dateToNotify = dateToRemindMultiBooking(this, minutes);
      if (!dateToNotify < new Date().toUtc()) {
        if (!reminders[dateToNotify]) {
          reminders[dateToNotify] = {};
        }
        reminders[dateToNotify][multiBookingUser.reminderId(type)] = null;
      }
    }
    return reminders;
  }
  messageRemindersOnUser(multiBookingUser: MultiBookingUser): string[] {
    const reminders: string[] = [];
    if (multiBookingUser.cancelDate !== null) {
      return [];
    }
    if (multiBookingUser.userFcms.length === 0) {
      return [];
    }
    if (multiBookingUser.notificationType !== NotificationType.message) {
      return [];
    }
    for (const [type, minutes] of Object.entries(
      multiBookingUser.remindersTypes
    )) {
      if (minutes <= 0) {
        continue;
      }
      const dateToNotify = dateToRemindMultiBooking(this, minutes);
      if (!dateToNotify < new Date().toUtc()) {
        reminders.push(multiBookingUser.reminderId(type));
      }
    }
    return reminders;
  }
  copyDataToOrder({
    worker,
    customers,
    workerAction,
    newShopIcon,
    clientNote = "",
    noteText = "",
  }: {
    worker: WorkerModel;
    customers: { [key: string]: MultiBookingUsersPerCustomer } | null;
    workerAction: boolean;
    newShopIcon: IconData;
    clientNote?: string;
    noteText?: string;
  }): void {
    this.adress = BusinessInitializer().business.adress;
    this.note = noteText;
    this.shopIcon = newShopIcon;
    this.workerId = worker.id;
    this.workerPhone = worker.phone;
    this.workerName = worker.name;
    this.workerGender = worker.gender;
    if (customers !== null) {
      this.users = {};
      for (const [customerId, customer] of Object.entries(customers)) {
        for (const [bookingId, multiBookingUser] of Object.entries(
          customer.multiBookingUsers
        )) {
          multiBookingUser.copyDataToOrder({
            worker,
            bookingDate: this.bookingDate,
            noteText: clientNote,
            workerAction,
            needToHoldOn: needToHoldOn(this.bookingDate, worker, workerAction),
            addToCalendar: false,
          });
          this.users[multiBookingUser.userBookingId] = multiBookingUser;
        }
      }
    }
    this.businessName = BusinessInitializer().business.shopName;
    this.bookingId =
      this.recurrenceEvent === null
        ? dateToTimeStr(this.bookingDate)
        : Uuid().v1();
    this.buisnessId = BusinessInitializer().business.businessId;
  }
  updateBookingByBooking({
    oldMultiBooking,
    worker,
    customers,
    workerAction,
    noteText = "",
    keepRecurrence = false,
  }: {
    oldMultiBooking: MultiBooking;
    worker: WorkerModel;
    customers: { [key: string]: MultiBookingUsersPerCustomer };
    workerAction: boolean;
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
      if (userObj.cancelDate !== null) {
        canceledUsers[bookingId] = userObj;
      }
    }
    this.users = {};
    for (const [customerId, customer] of Object.entries(customers)) {
      for (const [bookingId, multiBookingUser] of Object.entries(
        customer.multiBookingUsers
      )) {
        if (previousUsers[multiBookingUser.userBookingId] !== undefined) {
          multiBookingUser = new MultiBookingUser(
            previousUsers[multiBookingUser.userBookingId]
          );
        } else {
          multiBookingUser.copyDataToOrder({
            worker,
            bookingDate: this.bookingDate,
            workerAction,
            needToHoldOn: needToHoldOn(this.bookingDate, worker, workerAction),
            addToCalendar: false,
          });
        }
        this.users[multiBookingUser.userBookingId] = multiBookingUser;
      }
    }
    this.users = { ...this.users, ...canceledUsers };
    this.waitings = {};
    if (this.saveWaitings(oldMultiBooking)) {
      for (const [customerId, customer] of Object.entries(
        oldMultiBooking.waitings
      )) {
        this.waitings[customerId] = new WaitingListCustomer(customer);
      }
    }
    this.recurrenceEvent = null;
    if (!keepRecurrence) {
      this.recurrenceFatherDate = null;
      this.recurrenceEventRefInfo = null;
      this.recurrenceRef = null;
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
  get toBookingReferncePaymentRequest(): BookingRefernce {
    return {
      id: this.bookingId,
      isMultiBooking: true,
      signNewMultiBookingUsers:
        this.paymentRequest?.signNewMultiBookingUsers ?? false,
      date: this.bookingDate,
      workerId: this.workerId,
    };
  }
  get bookingsForUsers(): { [key: string]: Booking } {
    const bookingsForUsers: { [key: string]: Booking } = {};
    for (const [bookingUserId, userObj] of Object.entries(this.users)) {
      if (userObj.cancelDate !== null && userObj.cancelDate !== new Date(0)) {
        continue;
      }
      const bookingForUser = this.createRegularBooking(bookingUserId);
      if (bookingForUser !== null) {
        bookingsForUsers[bookingUserId] = bookingForUser;
      }
    }
    return bookingsForUsers;
  }
  get createRegularBooking(bookingUserId: string): Booking | null {
    const userObj = this.users[bookingUserId];
    if (userObj === undefined) {
      return null;
    }
    const booking: Booking = new Booking(userObj.userFcms, userObj.debts);
    booking.bookingDate = this.bookingDate;
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
    booking.remindersTypes = { ...userObj.remindersTypes };
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
    booking.transactions = {};
    for (const [id, transaction] of Object.entries<BookingTransactionModel>(userObj.transactions)) {
      booking.transactions[id] = new BookingTransactionModel(transaction);
    }
    booking.invoices = {};
    for (const [id, invoice] of Object.entries<BookingInvoiceData>(userObj.invoices)) {
      booking.invoices[id] = new BookingInvoiceData(invoice);
    }
    booking.paymentRequest = this.paymentRequest;
    booking.recurrenceEvent = null;
    booking.recurrenceEventRefInfo = null;
    booking.recurrenceRef = null;
    booking.recurreneFatherDate = null;
    return booking;
  }
  get invoiceCoverCounter(): number {
    let counter = 0;
    for (const multiBookingUser of Object.values(this.users)) {
      if (
        multiBookingUser.cancelDate !== null ||
        multiBookingUser.finishInvoices ||
        multiBookingUser.invoicePriceAmount >= this.treatment.price.amount
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
        multiBookingUser.cancelDate !== null ||
        multiBookingUser.debts.length > 0
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
        multiBookingUser.cancelDate !== null ||
        multiBookingUser.confirmedArrival
      ) {
        count++;
      }
    }
    return count;
  }
}
