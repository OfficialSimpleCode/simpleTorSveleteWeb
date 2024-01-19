import {
  BookingReminderType,
  BookingStatuses,
  NotificationType,
  OrderingOptions,
} from "$lib/consts/booking";
import { Gender } from "$lib/consts/gender";
import { NotificationOption } from "$lib/consts/notification";
import type BookingInvoiceData from "../booking/booking_invoice_data";
import type BookingTransactionModel from "../booking/booking_transaction";
import type CustomerData from "../general/customer_data";
import type Debt from "../schedule/debt";
// import { v4 as uuid } from "uuid";
import type WorkerModel from "../worker/worker_model";

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
  lastTimeNotifyOnDebt: Date | null = null;
  clientMail: string = "";
  finishInvoices: boolean = false;
  showAdressAlert: boolean = false;
  userBookingId: string = "";
  showPhoneAlert: boolean = false;
  cancelDate: Date | null = null;
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
  userDeleted: boolean = false;

  constructor() {}

  copyDataToOrder(params: {
    worker: WorkerModel;
    needToHoldOn: boolean;
    workerAction: boolean;
    bookingDate: Date;
    addToCalendar: boolean;
    noteText?: string;
  }): void {
    const {
      worker,
      needToHoldOn,
      workerAction,
      bookingDate,
      addToCalendar,
      noteText = "",
    } = params;

    this.clientNote = noteText;
    if (needToHoldOn) {
      this.status = BookingStatuses.waiting;
    } else {
      this.status = BookingStatuses.approved;
    }
    this.showAdressAlert = worker.notifications.showAdressAlert;
    this.showPhoneAlert = worker.notifications.showPhoneAlert;
    if (!workerAction && !needToHoldOn) {
      if (bookingDate.getTime() - Date.now() < 60 * 60 * 1000) {
        this.confirmedArrival = true;
      }
    }
    this.signOnDeviceCalendar = addToCalendar;
    this.workerNotificationOption = worker.notifications.notificationOption;
    this.workerRemindersTypes = new Map(worker.notifications.remindersTypes);
    worker.notifications.remindersTypes.forEach((type, minutes) => {
      if (bookingDate.getTime() < Date.now()) {
        return;
      }
      if (
        type === BookingReminderType.confirmArrival &&
        this.confirmedArrival
      ) {
        return;
      }
      if (bookingDate.getTime() - minutes * 60 * 1000 < Date.now() + 1000) {
        this.remindersTypes.set(
          type,
          Math.abs(
            Math.floor((Date.now() - bookingDate.getTime()) / 1000 / 60 / 2)
          ) -
            (Math.abs(
              Math.floor((Date.now() - bookingDate.getTime()) / 1000 / 60 / 2)
            ) %
              5)
        );
        if (this.remindersTypes.get(type)! < 10) {
          this.remindersTypes.delete(type);
        }
      } else {
        this.remindersTypes.set(type, minutes);
      }
    });

    this.orderingOptions = OrderingOptions.web;

    this.isUserExist = true;
    if (!workerAction) {
      this.userFcms = new Set(UserInitializer().user.userPublicData.fcmsTokens);
      this.isVerifiedPhone = UserInitializer().user.isVerifiedPhone;
      const clientAt = UserInitializer().user.userPublicData.clientAt;
      this.addToClientAt =
        !clientAt.has(BusinessInitializer().business.businessId) ||
        !clientAt
          .get(BusinessInitializer().business.businessId)!
          .has(worker.id);
    } else {
      const customer = worker.customers.customersData.get(this.customerId);
      this.addToClientAt = (customer?.amoutOfBookings || 0) <= 0;
      this.isVerifiedPhone = customer?.isVerifiedPhone || false;
    }
    if (this.createdAt.getTime() === new Date(0).getTime()) {
      this.createdAt = new Date();
    }
    if (this.userBookingId === "") {
      //this.userBookingId = uuid();
    }
    this.notificationType = sendMessageForMulti(this, worker);
  }

  get toCustomerData(): CustomerData {
    return {
      name: this.customerName,
      phoneNumber: this.customerPhone,
      isVerifiedPhone: this.isVerifiedPhone,
      email: this.clientMail,
      customerUuid: this.customerId,
      gender: this.userGender,
    };
  }

  get isDepositTransaction(): boolean {
    let resp = false;
    this.transactions.forEach((_, transaction) => {
      resp = transaction.type === PaymentTypes.deposit;
    });
    return resp;
  }

  get transactionsTotalPaymentAmount(): number {
    let amount = 0;
    this.transactions.forEach((_, transaction) => {
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
    this.debts.forEach((key, debt) => {
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
    this.transactions.forEach((_, transaction) => {
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
    return {
      name: this.customerName,
      userId: this.customerId,
      gender: this.userGender,
      isExist: this.isUserExist,
      isVerifiedPhone: this.isVerifiedPhone,
      phone: this.customerPhone,
    };
  }

  get toBooking(): Booking {
    const newInvoices: Map<string, BookingInvoiceData> = new Map();
    this.invoices.forEach((id, invoice) => {
      newInvoices.set(id, BookingInvoiceData.fromBookingInvoiceData(invoice));
    });
    const newTransactions: Map<string, BookingTransactionModel> = new Map();
    this.transactions.forEach((id, transaction) => {
      newTransactions.set(
        id,
        BookingTransactionModel.fromTransaction(transaction)
      );
    });
    return ({
      customerName: this.customerName,
      customerPhone: this.customerPhone,
      showAdressAlert: this.showAdressAlert,
      showPhoneAlert: this.showPhoneAlert,
      orderingOptions: this.orderingOptions,
      isUserExist: this.isUserExist,
      needCancel: this.needCancel,
      userGender: this.userGender,
      userDeleted: this.userDeleted,
      bookingId: this.userBookingId,
      signOnDeviceCalendar: this.signOnDeviceCalendar,
      finishInvoices: this.finishInvoices,
      cancelDate: this.cancelDate,
      isVerifiedPhone: this.isVerifiedPhone,
      customerId: this.customerId,
      clientNote: this.clientNote,
      lastTimeNotifyOnDebt: this.lastTimeNotifyOnDebt,
      debts: this.debts,
      status: this.status,
      confirmedArrival: this.confirmedArrival,
      clientMail: this.clientMail,
      notificationType: this.notificationType,
      userFcms: new Set(this.userFcms),
      workerNotificationOption: this.workerNotificationOption,
    }.workerRemindersTypes =
      new Map(this.workerRemindersTypes).createdAt =
      this.createdAt.invoices =
      newInvoices.transactions =
        newTransactions);
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
    json: any,
    userBookingId: string,
    workerId: string
  ): MultiBookingUser {
    const multiBookingUser = new MultiBookingUser({
      customerName: json["customerName"] || "",
      customerId: json["customerId"] || "",
      customerPhone: json["customerPhone"] || this.customerId,
      needCancel: json["needCancel"] || false,
      remindersTypes: json["remindersTypes"]
        ? new Map(
            Object.entries(json["remindersTypes"]).map(([type, minutes]) => [
              bookingReminderTypeFromStr[type],
              minutes,
            ])
          )
        : new Map([
            [BookingReminderType.regular, json["minutesBeforeNotify"] || 60],
          ]),
      workerRemindersTypes: json["workerRemindersTypes"]
        ? new Map(
            Object.entries(json["workerRemindersTypes"]).map(
              ([type, minutes]) => [bookingReminderTypeFromStr[type], minutes]
            )
          )
        : new Map(),
      signOnDeviceCalendar: json["signOnDeviceCalendar"] || false,
      userDeleted: json["userDeleted"] || false,
      isVerifiedPhone: json["isVerifiedPhone"] || false,
      clientMail: json["clientMail"] || "",
      clientNote: json["clientNote"] || "",
      userBookingId: userBookingId,
      orderingOptions:
        orderingOptionsFromStr[json["orderingOptions"]] || OrderingOptions.app,
      debts: json["debts"]
        ? new Map(
            Object.entries(json["debts"]).map(([id, debtJson]) => [
              id,
              Debt.fromJson(debtJson, id),
            ])
          )
        : new Map(),
      finishInvoices: json["finishInvoices"] || false,
      cancelDate: json["cancelDate"] ? new Date(json["cancelDate"]) : null,
      wasWaiting: json["wasWaiting"] || false,
      isUserExist: json["isUserExist"] || true,
      lastTimeNotifyOnDebt: json["lastTimeNotifyOnDebt"]
        ? new Date(json["lastTimeNotifyOnDebt"])
        : null,
      invoices: json["invoices"]
        ? new Map(
            Object.entries(json["invoices"]).map(([id, invoiceJson]) => [
              id,
              BookingInvoiceData.fromJson(invoiceJson, id, workerId),
            ])
          )
        : new Map(),
      userGender: genderFromStr[json["userGender"]] || Gender.anonymous,
      status:
        bookingsMassageKeys[json["status"].toString()] ||
        BookingStatuses.approved,
      confirmedArrival: json["confirmedArrival"] || false,
      showAdressAlert: json["showAdressAlert"] || false,
      showPhoneAlert: json["showPhoneAlert"] || false,
      notificationType:
        notificationTypeFromStr[json["notificationType"]] ||
        NotificationType.none,
      workerNotificationOption:
        notificationOptionFromStr[json["workerNotificationOption"]] ||
        NotificationOption.PushOrSMS,
      userFcms: json["userFcms"]
        ? new Set(json["userFcms"])
        : json["deviceFCM"] && json["deviceFCM"] !== ""
        ? new Set([json["deviceFCM"]])
        : new Set(),
      createdAt: json["createdAt"] ? new Date(json["createdAt"]) : new Date(0),
      transactions: json["transactions"]
        ? new Map(
            Object.entries(json["transactions"]).map(
              ([id, transactionJson]) => [
                id,
                BookingTransactionModel.fromJson(transactionJson, id),
              ]
            )
          )
        : new Map(),
    });

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
      data["cancelDate"] = this.cancelDate.toISOString();
    }
    data["remindersTypes"] = {};
    this.remindersTypes.forEach((reminder, minutes) => {
      data["remindersTypes"][bookingReminderTypeToStr[reminder]] = minutes;
    });
    data["workerRemindersTypes"] = {};
    this.workerRemindersTypes.forEach((reminder, minutes) => {
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
      this.invoices.forEach((id, invoice) => {
        data["invoices"][id] = invoice.toJson();
      });
    }
    if (this.debts.size > 0) {
      data["debts"] = {};
      this.debts.forEach((id, debt) => {
        data["debts"][id] = debt.toJson();
      });
    }
    if (this.lastTimeNotifyOnDebt) {
      data["lastTimeNotifyOnDebt"] = this.lastTimeNotifyOnDebt.toISOString();
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
    data["createdAt"] = this.createdAt.toISOString();
    if (this.transactions.size > 0) {
      data["transactions"] = {};
      this.transactions.forEach((id, transaction) => {
        data["transactions"][id] = transaction.toJson();
      });
    }
    return data;
  }

  toString(): string {
    return JSON.stringify(this, null, "  ");
  }
}
