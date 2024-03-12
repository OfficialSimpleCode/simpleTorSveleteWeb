import {
  BookingReminderType,
  BookingStatuses,
  NotificationType,
  OrderingOptions,
  bookingReminderTypeFromStr,
  bookingReminderTypeToStr,
  bookingsMassage,
  bookingsMassageKeys,
  notificationTypeFromStr,
  notificationTypeToStr,
  orderingOptionsFromStr,
  orderingOptionsToStr,
} from "$lib/consts/booking";
import { Gender, genderFromStr, genderToStr } from "$lib/consts/gender";
import {
  NotificationOption,
  notificationOptionFromStr,
  notificationOptionToStr,
} from "$lib/consts/notification";
import { EventFilterType } from "$lib/consts/worker_schedule";

import {
  addDuration,
  diffDuration,
  subDuration,
} from "$lib/utils/duration_utils";
import { sendMessageForMulti } from "$lib/utils/notifications_utils";
import { dateIsoStr, isoToDate } from "$lib/utils/times_utils";
import { phoneToDocId } from "$lib/utils/user";
import pkg from "uuid";
import BookingInvoiceData from "../booking/booking_invoice_data";
import Booking from "../booking/booking_model";
import BookingTransactionModel, {
  PaymentTypes,
} from "../booking/booking_transaction";
import type BusinessModel from "../business/business_model";
import { Duration } from "../core/duration";
import PaymentRequestUser from "../payment_hyp/payment_request/payment_request_user";
import Debt from "../schedule/debt";
import type UserModel from "../user/user_model";
import type WorkerModel from "../worker/worker_model";
const { v4 } = pkg;
export default class MultiBookingUser {
  customerName: string = "";
  customerPhone: string = "";
  isVerifiedPhone: boolean = false;
  notificationType: NotificationType = NotificationType.none;
  workerNotificationOption: NotificationOption = NotificationOption.PushOrSMS;
  workerRemindersTypes: Map<BookingReminderType, number> = new Map();
  customerId: string = "";
  orderingOptions: OrderingOptions = OrderingOptions.app;
  remindersTypes: Map<BookingReminderType, number> = new Map();
  isUserExist: boolean = true;
  signOnDeviceCalendar: boolean = false;
  lastTimeNotifyOnDebt: Date | undefined = undefined;
  clientMail: string = "";
  finishInvoices: boolean = false;
  showAdressAlert: boolean = false;
  userBookingId: string = "";
  showPhoneAlert: boolean = false;
  cancelDate: Date | undefined = undefined;
  wasWaiting: boolean = false;
  createdAt: Date = new Date(0);
  needCancel: boolean = false;
  userGender: Gender = Gender.anonymous;
  status: BookingStatuses = BookingStatuses.approved;
  confirmedArrival: boolean = false;
  userFcms: Set<string> = new Set();
  clientNote: string = "";
  invoices: Map<string, BookingInvoiceData> = new Map();
  transactions: Map<string, BookingTransactionModel> = new Map();
  debts: Map<string, Debt> = new Map();
  addToClientAt: boolean = false;

  userDeleted: boolean = false; //not saved on the json only for the
  //saving of the booking

  ///incase there are few tickets to this customer need to remind only to
  ///one ticket and there for we need to know who is the one - only
  ///for helper use
  canRemind: boolean = false;

  constructor() {}

  copyDataToOrder({
    worker,
    needToHoldOn,
    workerAction,
    bookingDate,
    business,
    user,
    noteText = "",
  }: {
    worker: WorkerModel;
    needToHoldOn: boolean;
    workerAction: boolean;
    bookingDate: Date;
    business: BusinessModel;
    user: UserModel;
    noteText?: string;
  }): void {
    this.clientNote = noteText;
    if (needToHoldOn) {
      this.status = BookingStatuses.waiting;
    } else {
      this.status = BookingStatuses.approved;
    }
    this.showAdressAlert = worker.notifications.showAdressAlert;
    this.showPhoneAlert = worker.notifications.showPhoneAlert;
    if (!workerAction && !needToHoldOn) {
      if (diffDuration(bookingDate, new Date()).inMinutes < 60) {
        this.confirmedArrival = true;
      }
    }

    this.workerNotificationOption = worker.notifications.notificationOption;
    this.workerRemindersTypes = new Map(worker.notifications.remindersTypes);
    for (const [type, minutes] of worker.notifications.remindersTypes) {
      //if the booking is passed no need to remind
      if (bookingDate < new Date()) {
        continue;
      }
      if (
        type === BookingReminderType.confirmArrival &&
        this.confirmedArrival
      ) {
        continue;
      }
      if (
        subDuration(bookingDate, new Duration({ minutes: minutes })) <
        addDuration(new Date(), new Duration({ seconds: 1 }))
      ) {
        this.remindersTypes.set(
          type,
          Math.abs(
            Math.round(diffDuration(new Date(), bookingDate).inMinutes / 2)
          )
        );
        //round to 5 or 0 the minutesBeforeNotify
        this.remindersTypes.set(
          type,
          this.remindersTypes.get(type)! - (this.remindersTypes.get(type)! % 5)
        );

        if (this.remindersTypes.get(type)! < 10) {
          this.remindersTypes.delete(type);
        }
      } else {
        this.remindersTypes.set(type, minutes);
      }
    }

    this.orderingOptions = OrderingOptions.web;

    this.isUserExist = true;

    this.userFcms = new Set(user.userPublicData.fcmsTokens);
    this.isVerifiedPhone = user.isVerifiedPhone;
    const clientAt = user.userPublicData.clientAt;
    this.addToClientAt =
      !clientAt.has(business.businessId) ||
      !clientAt.get(business.businessId)!.has(worker.id);

    if (this.createdAt.getTime() === new Date(0).getTime()) {
      this.createdAt = new Date();
    }
    if (this.userBookingId === "") {
      this.userBookingId = v4();
    }

    this.notificationType = this.canRemind
      ? sendMessageForMulti(this, worker)
      : NotificationType.none;
  }

  get isDepositTransaction(): boolean {
    let resp = false;
    this.transactions.forEach((transaction, _) => {
      resp = transaction.type === PaymentTypes.deposit;
    });
    return resp;
  }

  get transactionsTotalPaymentAmount(): number {
    let amount = 0;
    this.transactions.forEach((transaction, _) => {
      if (transaction.type === PaymentTypes.payment) {
        amount += transaction.amount;
      }
    });
    return amount;
  }

  get canSendMessage(): boolean {
    return (
      this.isVerifiedPhone || this.orderingOptions === OrderingOptions.byWorker
    );
  }

  get totalDebtAmount(): number {
    let amount = 0;
    this.debts.forEach((debt, key) => {
      amount += debt.amount;
    });
    return amount;
  }

  get invoicePriceAmount(): number {
    return Array.from(this.invoices.values()).reduce(
      (previousValue, invoice) => previousValue + invoice.amount,
      0
    );
  }

  invoicesCoverPrice(params: { totalAmount: number }): boolean {
    const { totalAmount } = params;
    return (
      this.finishInvoices ||
      (this.invoices.size > 0 &&
        Array.from(this.invoices.values()).reduce(
          (previousValue, invoice) => previousValue + invoice.amount,
          0
        ) >= totalAmount)
    );
  }

  get transactionsTotalDepositAmount(): number {
    let amount = 0;
    this.transactions.forEach((transaction, _) => {
      if (transaction.type === PaymentTypes.deposit) {
        amount += transaction.amount;
      }
    });
    return amount;
  }

  get customerHashPhone(): string {
    return phoneToDocId(this.customerPhone);
  }

  get customerPhoneAsCollection(): string {
    return this.customerPhone.replace(/-/g, "");
  }

  reminderId(type: BookingReminderType): string {
    return this.userBookingId + "__" + bookingReminderTypeToStr[type]!;
  }

  get toPaymentRequestUser(): PaymentRequestUser {
    return new PaymentRequestUser({
      name: this.customerName,
      userId: this.customerId,
      gender: this.userGender,
      isExist: this.isUserExist,
      isVerifiedPhone: this.isVerifiedPhone,
      phone: this.customerPhone,
    });
  }

  static fromMultiBookingUser(
    multiBookingUser: MultiBookingUser
  ): MultiBookingUser {
    const newMultiBookingUser = new MultiBookingUser();
    newMultiBookingUser.customerName = multiBookingUser.customerName;
    newMultiBookingUser.customerPhone = multiBookingUser.customerPhone;
    newMultiBookingUser.workerRemindersTypes = new Map(
      multiBookingUser.workerRemindersTypes
    );
    newMultiBookingUser.lastTimeNotifyOnDebt =
      multiBookingUser.lastTimeNotifyOnDebt;
    newMultiBookingUser.showAdressAlert = multiBookingUser.showAdressAlert;
    newMultiBookingUser.signOnDeviceCalendar =
      multiBookingUser.signOnDeviceCalendar;
    newMultiBookingUser.userDeleted = multiBookingUser.userDeleted;
    newMultiBookingUser.addToClientAt = multiBookingUser.addToClientAt;
    newMultiBookingUser.showPhoneAlert = multiBookingUser.showPhoneAlert;
    newMultiBookingUser.orderingOptions = multiBookingUser.orderingOptions;
    newMultiBookingUser.isVerifiedPhone = multiBookingUser.isVerifiedPhone;
    newMultiBookingUser.isUserExist = multiBookingUser.isUserExist;
    newMultiBookingUser.needCancel = multiBookingUser.needCancel;
    newMultiBookingUser.userGender = multiBookingUser.userGender;
    newMultiBookingUser.userBookingId = multiBookingUser.userBookingId;
    newMultiBookingUser.finishInvoices = multiBookingUser.finishInvoices;
    newMultiBookingUser.cancelDate = multiBookingUser.cancelDate;
    newMultiBookingUser.customerId = multiBookingUser.customerId;
    newMultiBookingUser.workerNotificationOption =
      multiBookingUser.workerNotificationOption;
    newMultiBookingUser.debts = new Map();
    multiBookingUser.debts.forEach((debt, id) => {
      newMultiBookingUser.debts.set(id, Debt.fromDebt(debt));
    });
    newMultiBookingUser.invoices = new Map();
    multiBookingUser.invoices.forEach((invoice, id) => {
      newMultiBookingUser.invoices.set(
        id,
        BookingInvoiceData.fromBookingInvoiceData(invoice)
      );
    });
    newMultiBookingUser.clientNote = multiBookingUser.clientNote;
    newMultiBookingUser.status = multiBookingUser.status;
    newMultiBookingUser.confirmedArrival = multiBookingUser.confirmedArrival;
    newMultiBookingUser.createdAt = multiBookingUser.createdAt;
    newMultiBookingUser.remindersTypes = new Map(
      multiBookingUser.remindersTypes
    );
    newMultiBookingUser.clientMail = multiBookingUser.clientMail;

    newMultiBookingUser.notificationType = multiBookingUser.notificationType;
    newMultiBookingUser.userFcms = { ...multiBookingUser.userFcms };
    newMultiBookingUser.transactions = new Map();

    multiBookingUser.transactions.forEach((transation, id) => {
      newMultiBookingUser.transactions.set(
        id,
        BookingTransactionModel.fromTransaction(transation)
      );
    });
    return newMultiBookingUser;
  }

  get combinedFcms(): string {
    let txt = "";
    this.userFcms.forEach((fcm) => {
      txt += fcm;
    });
    return txt;
  }

  get toBooking(): Booking {
    const newBooking = new Booking({});

    this.invoices.forEach((invoice, id) => {
      newBooking.invoices.set(
        id,
        BookingInvoiceData.fromBookingInvoiceData(invoice)
      );
    });

    this.transactions.forEach((transaction, id) => {
      newBooking.transactions.set(
        id,
        BookingTransactionModel.fromTransaction(transaction)
      );
    });

    newBooking.customerName = this.customerName;
    newBooking.customerPhone = this.customerPhone;
    newBooking.showAdressAlert = this.showAdressAlert;
    newBooking.showPhoneAlert = this.showPhoneAlert;
    newBooking.orderingOptions = this.orderingOptions;
    newBooking.isUserExist = this.isUserExist;
    newBooking.needCancel = this.needCancel;
    newBooking.userGender = this.userGender;
    newBooking.userDeleted = this.userDeleted;
    newBooking.bookingId = this.userBookingId;
    newBooking.signOnDeviceCalendar = this.signOnDeviceCalendar;
    newBooking.finishInvoices = this.finishInvoices;
    newBooking.cancelDate = this.cancelDate;
    newBooking.isVerifiedPhone = this.isVerifiedPhone;
    newBooking.customerId = this.customerId;
    newBooking.clientNote = this.clientNote;
    newBooking.lastTimeNotifyOnDebt = this.lastTimeNotifyOnDebt;
    newBooking.debts = this.debts;
    newBooking.status = this.status;
    newBooking.confirmedArrival = this.confirmedArrival;
    newBooking.clientMail = this.clientMail;
    newBooking.notificationType = this.notificationType;
    newBooking.userFcms = new Set(this.userFcms);
    newBooking.workerNotificationOption = this.workerNotificationOption;
    newBooking.workerRemindersTypes = this.workerRemindersTypes;
    newBooking.createdAt = this.createdAt;

    return newBooking;
  }

  get typesOfEvents(): Map<EventFilterType, number> {
    const types: Map<EventFilterType, number> = new Map();
    if (this.needCancel) {
      types.set(EventFilterType.needCancel, 1);
    }
    if (this.debts.size > 0) {
      types.set(EventFilterType.withDebts, 1);
    }
    if (this.status === BookingStatuses.waiting) {
      types.set(EventFilterType.onHold, 1);
    }
    return types;
  }

  static fromJson(
    json: Record<string, any>,
    userBookingId: string,
    workerId: string
  ): MultiBookingUser {
    const multiBookingUser = new MultiBookingUser();

    multiBookingUser.customerName = json["customerName"] || "";
    multiBookingUser.customerId = json["customerId"] || "";
    multiBookingUser.customerPhone =
      json["customerPhone"] || multiBookingUser.customerId;
    multiBookingUser.needCancel = json["needCancel"] || false;
    multiBookingUser.remindersTypes = json["remindersTypes"]
      ? new Map(
          Object.entries(json["remindersTypes"]).map(([type, minutes]) => [
            bookingReminderTypeFromStr[type],
            minutes as number,
          ])
        )
      : new Map([
          [
            BookingReminderType.regular,
            (json["minutesBeforeNotify"] || 60) as number,
          ],
        ]);
    (multiBookingUser.workerRemindersTypes = json["workerRemindersTypes"]
      ? new Map(
          Object.entries(json["workerRemindersTypes"]).map(
            ([type, minutes]) => [bookingReminderTypeFromStr[type], minutes]
          )
        )
      : new Map()),
      (multiBookingUser.signOnDeviceCalendar =
        json["signOnDeviceCalendar"] || false),
      (multiBookingUser.userDeleted = json["userDeleted"] || false);
    multiBookingUser.isVerifiedPhone = json["isVerifiedPhone"] || false;
    multiBookingUser.clientMail = json["clientMail"] || "";
    multiBookingUser.clientNote = json["clientNote"] || "";
    multiBookingUser.userBookingId = userBookingId;
    multiBookingUser.orderingOptions =
      orderingOptionsFromStr[json["orderingOptions"]] || OrderingOptions.app;
    multiBookingUser.debts = json["debts"]
      ? new Map(
          Object.entries(json["debts"]).map(([id, debtJson]) => [
            id,
            Debt.fromJson(debtJson, id),
          ])
        )
      : new Map();
    multiBookingUser.finishInvoices = json["finishInvoices"] || false;
    multiBookingUser.cancelDate = json["cancelDate"]
      ? isoToDate(json["cancelDate"])
      : undefined;
    multiBookingUser.wasWaiting = json["wasWaiting"] || false;
    multiBookingUser.isUserExist = json["isUserExist"] || true;
    multiBookingUser.lastTimeNotifyOnDebt = json["lastTimeNotifyOnDebt"]
      ? isoToDate(json["lastTimeNotifyOnDebt"])
      : undefined;
    multiBookingUser.invoices = json["invoices"]
      ? new Map(
          Object.entries<Record<string, any>>(json["invoices"]).map(
            ([id, invoiceJson]) => [
              id,
              BookingInvoiceData.fromJson(invoiceJson, id, workerId),
            ]
          )
        )
      : new Map();
    multiBookingUser.userGender =
      genderFromStr[json["userGender"]] || Gender.anonymous;
    multiBookingUser.status =
      bookingsMassageKeys[json["status"].toString()] ||
      BookingStatuses.approved;
    multiBookingUser.confirmedArrival = json["confirmedArrival"] || false;
    multiBookingUser.showAdressAlert = json["showAdressAlert"] || false;
    multiBookingUser.showPhoneAlert = json["showPhoneAlert"] || false;
    multiBookingUser.notificationType =
      notificationTypeFromStr[json["notificationType"]] ||
      NotificationType.none;
    multiBookingUser.workerNotificationOption =
      notificationOptionFromStr[json["workerNotificationOption"]] ||
      NotificationOption.PushOrSMS;
    multiBookingUser.userFcms = json["userFcms"]
      ? new Set(json["userFcms"])
      : json["deviceFCM"] && json["deviceFCM"] !== ""
      ? new Set([json["deviceFCM"]])
      : new Set();
    multiBookingUser.createdAt = json["createdAt"]
      ? isoToDate(json["createdAt"])
      : new Date(0);
    multiBookingUser.transactions = json["transactions"]
      ? new Map(
          Object.entries<Record<string, any>>(json["transactions"]).map(
            ([id, transactionJson]) => [
              id,
              BookingTransactionModel.fromJson(transactionJson, id),
            ]
          )
        )
      : new Map();

    return multiBookingUser;
  }

  toJson(): any {
    const data: any = {};
    data["customerName"] = this.customerName;
    data["customerId"] = this.customerId;
    if (this.wasWaiting) {
      data["wasWaiting"] = this.wasWaiting;
    }
    if (this.cancelDate) {
      data["cancelDate"] = dateIsoStr(this.cancelDate);
    }
    data["remindersTypes"] = {};
    this.remindersTypes.forEach((minutes, reminder) => {
      data["remindersTypes"][bookingReminderTypeToStr[reminder]] = minutes;
    });
    data["workerRemindersTypes"] = {};
    this.workerRemindersTypes.forEach((minutes, reminder) => {
      data["workerRemindersTypes"][bookingReminderTypeToStr[reminder]] =
        minutes;
    });
    if (this.userDeleted) {
      data["userDeleted"] = this.userDeleted;
    }
    if (this.signOnDeviceCalendar) {
      data["signOnDeviceCalendar"] = this.signOnDeviceCalendar;
    }
    if (this.clientNote !== "") {
      data["clientNote"] = this.clientNote;
    }
    if (this.needCancel) {
      data["needCancel"] = this.needCancel;
    }
    if (this.finishInvoices) {
      data["finishInvoices"] = this.finishInvoices;
    }
    data["userGender"] = genderToStr[this.userGender];
    if (this.invoices.size > 0) {
      data["invoices"] = {};
      this.invoices.forEach((invoice, id) => {
        data["invoices"][id] = invoice.toJson();
      });
    }
    data["notificationType"] = notificationTypeToStr[this.notificationType];
    data["workerNotificationOption"] =
      notificationOptionToStr[this.workerNotificationOption];
    if (this.debts.size > 0) {
      data["debts"] = {};
      this.debts.forEach((debt, id) => {
        data["debts"][id] = debt.toJson();
      });
    }
    if (this.lastTimeNotifyOnDebt) {
      data["lastTimeNotifyOnDebt"] = dateIsoStr(this.lastTimeNotifyOnDebt);
    }
    if (!this.isUserExist) {
      data["isUserExist"] = this.isUserExist;
    }
    if (this.orderingOptions !== OrderingOptions.app) {
      data["orderingOptions"] = orderingOptionsToStr[this.orderingOptions];
    }
    if (this.showAdressAlert) {
      data["showAdressAlert"] = this.showAdressAlert;
    }
    if (this.showPhoneAlert) {
      data["showPhoneAlert"] = this.showPhoneAlert;
    }
    if (this.clientMail !== "") {
      data["clientMail"] = this.clientMail;
    }
    data["customerPhone"] = this.customerPhone;
    if (this.status !== BookingStatuses.approved) {
      data["status"] = bookingsMassage[this.status];
    }
    if (this.confirmedArrival) {
      data["confirmedArrival"] = this.confirmedArrival;
    }
    if (this.isVerifiedPhone) {
      data["isVerifiedPhone"] = this.isVerifiedPhone;
    }
    if (this.userFcms.size > 0) {
      data["userFcms"] = Array.from(this.userFcms);
    }
    data["createdAt"] = dateIsoStr(this.createdAt);
    if (this.transactions.size > 0) {
      data["transactions"] = {};
      this.transactions.forEach((transaction, id) => {
        data["transactions"][id] = transaction.toJson();
      });
    }
    return data;
  }

  toString(): string {
    return JSON.stringify(this, null, "  ");
  }
}
