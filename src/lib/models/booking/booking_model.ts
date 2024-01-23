import { logger } from "$lib/consts/application_general";
import {
  BookingReminderType,
  BookingStatuses,
  NotificationType,
  OrderingOptions,
  bookingReminderTypeFromStr,
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
import { setToMidNight } from "$lib/utils/dates_utils";
import {
  addDuration,
  diffDuration,
  subDuration,
} from "$lib/utils/duration_utils";
import { sendMessage } from "$lib/utils/notifications_utils";
import {
  dateToMonthStr,
  dateToTimeStr,
} from "$lib/utils/times_utils/times_utils";
import { phoneToDocId } from "$lib/utils/user";
import pkg from "uuid";
import BusinessModel from "../business/business_model";
import { Duration } from "../core/duration";
import { defaultCurrency } from "../general/currency_model";
import IconData from "../general/icon_data";
import { Price } from "../general/price";
import Treatment from "../general/treatment_model";
import type MultiBooking from "../multi_booking/multi_booking";
import BookingReferencePaymentObj from "../payment_hyp/booking_reference";
import Event from "../schedule/calendar_event";
import Debt from "../schedule/debt";
import RecurrenceEvent from "../schedule/recurrence_event";
import ScheduleItem from "../schedule/schedule_item";
import type UserModel from "../user/user_model";
import WorkerModel from "../worker/worker_model";
import BookingInvoiceData from "./booking_invoice_data";
import BookingPaymentRequestData from "./booking_payment_request";
import BookingTransactionModel from "./booking_transaction";
const { v4 } = pkg;

export default class Booking extends ScheduleItem {
  customerName: string = "";
  customerPhone: string = "";
  customerId: string = "";
  orderingOptions: OrderingOptions = OrderingOptions.app;
  isVerifiedPhone: boolean = false;
  isUserExist: boolean = true;
  notificationType: NotificationType = NotificationType.none;
  workerNotificationOption: NotificationOption = NotificationOption.PushOrSMS;
  workerRemindersTypes: Map<BookingReminderType, number> = new Map();
  workerDeleted: boolean = false;
  clientMail: string = "";
  showAdressAlert: boolean = false;
  showPhoneAlert: boolean = false;
  signOnDeviceCalendar: boolean = false;
  isMultiRef: boolean = false;
  cancelDate?: Date;
  lastTimeNotifyOnDebt?: Date;
  adress: string = "";
  wasWaiting: boolean = false;
  bookingDate: Date = new Date(0);
  note: string = "";
  needCancel: boolean = false;
  treatments: Map<string, Treatment> = new Map();
  userGender: Gender = Gender.anonymous;
  workerGender: Gender = Gender.anonymous;
  status: BookingStatuses = BookingStatuses.approved;
  confirmedArrival: boolean = false;
  bookingId: string = "";
  userFcms: Set<string> = new Set();
  clientNote: string = "";

  shopIcon: IconData = new IconData();

  remindersTypes: Map<BookingReminderType, number> = new Map();
  createdAt: Date = new Date();

  finishInvoices: boolean = false;
  invoices: Map<string, BookingInvoiceData> = new Map();

  transactions: Map<string, BookingTransactionModel> = new Map();

  recurrenceTimeId?: string;
  recurreneFatherDate?: string;

  debts: Map<string, Debt> = new Map();

  addToClientAt: boolean = false;
  paymentRequest?: BookingPaymentRequestData;

  userDeleted: boolean = false;

  fatherMultiBooking?: MultiBooking;
  fatherRecurrenceBooking?: Booking;

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

  static empty(): Booking {
    return new Booking({});
  }

  static fromBooking(booking: Booking): Booking {
    const newBooking = new Booking({});

    newBooking.customerName = booking.customerName;
    newBooking.customerPhone = booking.customerPhone;
    newBooking.customerId = booking.customerId;
    newBooking.workerPhone = booking.workerPhone;
    newBooking.workerGender = booking.workerGender;
    newBooking.userGender = booking.userGender;
    newBooking.businessName = booking.businessName;
    newBooking.buisnessId = booking.buisnessId;
    newBooking.bookingId = booking.bookingId;
    newBooking.workerGender = booking.workerGender;
    newBooking.shopIcon = booking.shopIcon;

    newBooking.recurrenceTimeId = booking.recurrenceTimeId;
    newBooking.note = booking.note;
    newBooking.workerRemindersTypes = { ...booking.workerRemindersTypes };
    newBooking.signOnDeviceCalendar = booking.signOnDeviceCalendar;
    newBooking.userDeleted = booking.userDeleted;
    newBooking.workerNotificationOption = booking.workerNotificationOption;
    newBooking.paymentRequest = booking.paymentRequest;
    newBooking.remindersTypes = { ...booking.remindersTypes };
    newBooking.isVerifiedPhone = booking.isVerifiedPhone;
    newBooking.workerDeleted = booking.workerDeleted;
    newBooking.finishInvoices = booking.finishInvoices;
    newBooking.adress = booking.adress;
    newBooking.addToClientAt = booking.addToClientAt;
    newBooking.showAdressAlert = booking.showAdressAlert;
    newBooking.showPhoneAlert = booking.showPhoneAlert;
    newBooking.orderingOptions = booking.orderingOptions;
    newBooking.isUserExist = booking.isUserExist;
    newBooking.isMultiRef = booking.isMultiRef;
    newBooking.needCancel = booking.needCancel;
    newBooking.userGender = booking.userGender;
    newBooking.bookingDate = booking.bookingDate;
    // if (booking.recurrenceEventRefInfo !== undefined) {
    //   newBooking.recurrenceEventRefInfo = RecurrenceEvent.fromRecurrenceEvent(
    //     booking.recurrenceEventRefInfo!
    //   );
    // }
    // if (booking.recurrenceEvent !== undefined) {
    //   newBooking.recurrenceEvent = RecurrenceEvent.fromRecurrenceEvent(
    //     booking.recurrenceEvent!
    //   );
    // }
    newBooking.recurrenceNotificationsLastDate =
      booking.recurrenceNotificationsLastDate;
    newBooking.cancelDate = booking.cancelDate;
    newBooking.customerId = booking.customerId;
    newBooking.workerPhone = booking.workerPhone;
    newBooking.lastTimeNotifyOnDebt = booking.lastTimeNotifyOnDebt;
    booking.debts.forEach((debt, id) => {
      newBooking.debts.set(id, Debt.fromDebt(debt));
    });

    newBooking.treatments = new Map();
    booking.treatments.forEach((treatment, index) => {
      const tempTreatment = Treatment.fromTreatment(treatment);
      tempTreatment.index = index;
      newBooking.treatments.set(index, treatment);
    });

    newBooking.invoices = new Map();
    booking.invoices.forEach((invoice, id) => {
      newBooking.invoices.set(
        id,
        BookingInvoiceData.fromBookingInvoiceData(invoice)
      );
    });

    newBooking.clientNote = booking.clientNote;
    newBooking.status = booking.status;
    newBooking.confirmedArrival = booking.confirmedArrival;
    newBooking.createdAt = booking.createdAt;
    newBooking.clientMail = booking.clientMail;
    newBooking.workerName = booking.workerName;
    newBooking.buisnessId = booking.buisnessId;

    newBooking.notificationType = booking.notificationType;
    newBooking.userFcms = new Set(booking.userFcms);

    newBooking.recurreneFatherDate = booking.recurreneFatherDate;
    newBooking.recurrenceRef = booking.recurrenceRef;
    newBooking.transactions = new Map();
    booking.transactions.forEach((transaction, id) => {
      newBooking.transactions.set(
        id,
        BookingTransactionModel.fromTransaction(transaction)
      );
    });

    return newBooking;
  }

  static fromJson(json: Record<string, any>, id: string): Booking {
    try {
      const newBooking = new Booking({});

      newBooking.workerGender =
        genderFromStr[json["workerGender"]] || Gender.anonymous;
      newBooking.customerName = json["customerName"] || "";
      newBooking.note = json["note"] || "";
      newBooking.bookingId = id;
      newBooking.signOnDeviceCalendar = json["signOnDeviceCalendar"] || false;
      newBooking.userDeleted = json["userDeleted"] || false;
      newBooking.workerDeleted = json["workerDeleted"] || false;
      newBooking.customerId = json["customerId"] || json["customerPhone"] || "";
      newBooking.workerPhone = json["workerPhone"] || "";
      newBooking.customerPhone = json["customerPhone"] || "";
      newBooking.recurrenceTimeId = json["recurrenceTimeId"];
      newBooking.workerId = json["workerId"] || json["workerPhone"] || "";

      newBooking.adress = json["adress"] || "";
      if (json["shopIcon"] != null) {
        newBooking.shopIcon = IconData.fromJson(json["shopIcon"]);
      }
      newBooking.isVerifiedPhone = json["isVerifiedPhone"] || false;
      if (
        newBooking.customerId == newBooking.customerPhone &&
        newBooking.customerId.length == 14
      ) {
        newBooking.isVerifiedPhone = true;
      }
      newBooking.isMultiRef = json["isMultiRef"] || false;
      newBooking.needCancel = json["needCancel"] || false;
      if (json["lastTimeNotifyOnDebt"] != null) {
        newBooking.lastTimeNotifyOnDebt = new Date(
          json["lastTimeNotifyOnDebt"]
        );
      }
      newBooking.finishInvoices = json["finishInvoices"] || false;
      if (json["remindersTypes"] != null) {
        Object.entries<number>(json["remindersTypes"]).forEach(
          ([type, minutes]) => {
            if (bookingReminderTypeFromStr[type] != null) {
              newBooking.remindersTypes.set(
                bookingReminderTypeFromStr[type],
                minutes
              );
            }
          }
        );
      } else {
        newBooking.remindersTypes = new Map([
          BookingReminderType.regular,
          json["minutesBeforeNotify"] || 60,
        ]);
      }
      if (json["workerRemindersTypes"] != null) {
        Object.entries<number>(json["workerRemindersTypes"]).forEach(
          ([type, minutes]) => {
            if (bookingReminderTypeFromStr[type] != null) {
              newBooking.workerRemindersTypes.set(
                bookingReminderTypeFromStr[type],
                minutes
              );
            }
          }
        );
      }
      newBooking.clientMail = json["clientMail"] || "";
      if (json["recurrenceNotificationsLastDate"] != null) {
        newBooking.recurrenceNotificationsLastDate = new Date(
          json["recurrenceNotificationsLastDate"]
        );
      }

      newBooking.clientNote = json["clientNote"] || "";
      newBooking.recurreneFatherDate = json["recurreneFatherDate"];
      newBooking.recurrenceRef = json["recurrenceRef"];
      if (json["orderingOptions"] != null) {
        newBooking.orderingOptions =
          orderingOptionsFromStr[json["orderingOptions"]] ||
          OrderingOptions.app;
      }
      if (json["debts"] != null) {
        Object.entries(json["debts"]).forEach(([id, debtJson]) => {
          newBooking.debts.set(id, Debt.fromJson(debtJson, id));
        });
      }
      if (json["cancelDate"] != null) {
        newBooking.cancelDate = new Date(json["cancelDate"]);
      }
      newBooking.wasWaiting = json["wasWaiting"] || false;
      newBooking.isUserExist = json["isUserExist"] || true;
      if (json["invoices"] != null) {
        Object.entries<Record<string, any>>(json["invoices"]).forEach(
          ([id, invoiceJson]) => {
            newBooking.invoices.set(
              id,
              BookingInvoiceData.fromJson(invoiceJson, id, newBooking.workerId)
            );
          }
        );
      }
      if (json["userGender"] != null) {
        newBooking.userGender =
          genderFromStr[json["userGender"]] || Gender.anonymous;
      }
      newBooking.status =
        bookingsMassageKeys[json["status"].toString()] ||
        BookingStatuses.approved;
      newBooking.confirmedArrival = json["confirmedArrival"] || false;
      if (json["bookingDate"] != null) {
        newBooking.bookingDate = new Date(json["bookingDate"]) || new Date(0);
      }
      if (json["treatments"] != null) {
        newBooking.treatments = new Map();
        let index = 0;
        Object.entries(json["treatments"]).forEach(([_, __]) => {
          const treatmentJson = json["treatments"][index.toString()];
          newBooking.treatments.set(
            index.toString(),
            Treatment.fromJson(treatmentJson, index.toString())
          );
          index += 1;
        });
      } else if (json["treatment"] != null) {
        const tempTreatment = Treatment.fromJson(json["treatment"], "0");
        newBooking.treatments.set("0", tempTreatment);
      }

      newBooking.showAdressAlert = json["showAdressAlert"] || false;
      newBooking.showPhoneAlert = json["showPhoneAlert"] || false;
      newBooking.workerName = json["workerName"] || "";
      newBooking.businessName = json["businessName"] || "";
      newBooking.buisnessId = json["buisnessId"] || "";
      if (json["notificationType"] != null) {
        newBooking.notificationType =
          notificationTypeFromStr[json["notificationType"]] ||
          NotificationType.push;
      } else {
        if (json["withMessage"] || false) {
          newBooking.notificationType = NotificationType.message;
        } else {
          newBooking.notificationType = NotificationType.push;
        }
      }
      if (json["workerNotificationOption"] != null) {
        newBooking.workerNotificationOption =
          notificationOptionFromStr[json["workerNotificationOption"]] ||
          NotificationOption.PushOrSMS;
      }
      if (json["userFcms"] != null) {
        json["userFcms"].forEach((fcm: string) => {
          newBooking.userFcms.add(fcm);
        });
      } else if (json["deviceFCM"] != null && json["deviceFCM"] != "") {
        newBooking.userFcms = new Set([json["deviceFCM"]]);
      }
      if (json["createdAt"] != null) {
        newBooking.createdAt = new Date(json["createdAt"]) || new Date(0);
      }
      if (json["RE"] != null) {
        newBooking.recurrenceEvent = RecurrenceEvent.fromJson(
          json["RE"],
          newBooking.bookingDate
        );
      }
      if (json["RERI"] != null) {
        newBooking.recurrenceEventRefInfo = RecurrenceEvent.fromJson(
          json["RERI"]
        );
      }
      newBooking.transactions = new Map();
      if (json["transactions"] != null) {
        Object.entries<Record<string, any>>(json["transactions"]).forEach(
          ([id, transactionJson]) => {
            newBooking.transactions.set(
              id,
              BookingTransactionModel.fromJson(transactionJson, id)
            );
          }
        );
      }
      if (json["paymentRequest"] != null) {
        newBooking.paymentRequest = BookingPaymentRequestData.fromJson(
          json["paymentRequest"]
        );
      }
      return newBooking;
    } catch (e) {
      logger.error(`Error loading booking doc ${id}: ${e}`);
      return new Booking({});
    }
  }
  get treatmentLength(): number {
    return Array.from(this.treatments.values()).reduce(
      (previousValue, treatment) => treatment.count + previousValue,
      0
    );
  }
  get canSendMessage(): boolean {
    return (
      this.isVerifiedPhone || this.orderingOptions === OrderingOptions.byWorker
    );
  }

  get treatmentsToStringNotDetailed(): string {
    if (this.treatmentLength === 1) {
      return this.treatments.values().next().value.name;
    } else if (this.treatments.size === 1) {
      return `${this.treatments.values().next().value.name}x${
        this.treatmentLength
      }`;
    } else {
      return `${this.treatments.values().next().value.name}+${
        this.treatmentLength - 1
      }`;
    }
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

      return end !== null && end < setToMidNight(new Date());
    } else {
      return (
        addDuration(
          this.bookingDate,
          new Duration({ minutes: this.totalMinutes + 2 })
        ) < new Date()
      );
    }
  }
  get totalMinutes(): number {
    let minutes = 0;
    this.treatments.forEach((treatment, _) => {
      minutes += treatment.totalMinutesForBooking;
    });
    return minutes;
  }

  get customerHashPhone(): string {
    return phoneToDocId(this.customerPhone);
  }

  get bookingWorkTimes(): Map<string, number> {
    const bookingWorkTimesMap: Map<string, number> = new Map();
    let lastTime = this.bookingDate;

    Object.values(this.treatments).forEach((treatment: any) => {
      // Generate the treatment as time as the counter
      Array.from({ length: treatment.count }).forEach(() => {
        Object.values(treatment.times).forEach((timeData: any) => {
          // Adding the break before the segment
          lastTime = addDuration(
            lastTime,
            new Duration({ minutes: timeData.breakMinutes })
          );

          bookingWorkTimesMap.set(
            dateToTimeStr(lastTime),
            timeData.workMinutes
          );
          // Jumping to the end of the segment
          lastTime = addDuration(
            lastTime,
            new Duration({ minutes: timeData.workMinutes })
          );
        });
      });
    });

    return bookingWorkTimesMap;
  }

  get totalEventsCount(): number {
    let counter = 0;
    Object.values(this.treatments).forEach((treatment) => {
      counter += treatment.times.length * treatment.count;
    });
    return counter;
  }

  get invoicesCoverPrice(): boolean {
    const totalInvoiceAmount = Object.values(this.invoices).reduce(
      (previousValue, invoice) => previousValue + invoice.amount,
      0.0
    );

    return (
      this.finishInvoices ||
      (this.invoices.size > 0 && totalInvoiceAmount >= this.totalPrice.amount)
    );
  }

  get totalPrice(): Price {
    let totalPrice = new Price({ amount: "0", currency: defaultCurrency });

    Object.values(this.treatments).forEach((treatment: Treatment) => {
      totalPrice.amount += treatment.totalPriceForBooking;
      totalPrice.currency = treatment.price!.currency;
    });

    return totalPrice;
  }

  get typesOfEvents(): Map<EventFilterType, number> {
    const types: Map<EventFilterType, number> = new Map<
      EventFilterType,
      number
    >();

    if (this.recurrenceEvent !== null) {
      return new Map<EventFilterType, number>();
    }

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

  get bookingsEventsAsJson(): Map<string, any> {
    const bookingsEventsMap: Map<string, any> = new Map();
    let lastTime = this.bookingDate;
    let totalEventsOnBooking = this.totalEventsCount;
    let eventIndex = 0;
    const hasInvoice = this.invoicesCoverPrice;

    this.treatments.forEach((treatment, treatmentIndex) => {
      // Generate the treatment as time as the counter
      Array.from({ length: treatment.count }).forEach(() => {
        treatment.times.forEach((timeData, timeIndex) => {
          // Adding the break before the segment
          lastTime = addDuration(
            lastTime,
            new Duration({ minutes: timeData.breakMinutes })
          );
          const timeId =
            this.recurrenceTimeId != null && this.recurrenceEvent != null
              ? `${dateToTimeStr(lastTime)}_${this.recurrenceTimeId}`
              : dateToTimeStr(lastTime);

          const newEvent = new Event();
          newEvent.eventIndex = eventIndex;
          newEvent.treatmentId = treatment.id;
          newEvent.subTreatmentName = timeData.title;
          newEvent.totalBookingMinutes = this.totalMinutes;
          newEvent.belongTreatments = this.treatmentLength;
          newEvent.onHold = this.status === "waiting";
          newEvent.wantDelete = this.needCancel;
          newEvent.ids = [this.workerId];
          newEvent.confirmArrival = this.confirmedArrival;
          newEvent.hasDebt = this.debts.size > 0;
          newEvent.timeId =
            this.recurrenceEvent != null ? this.recurrenceTimeId : undefined;
          newEvent.treatmentName = treatment.name;
          newEvent.transactionCounter = this.transactions.size;
          newEvent.eventsBelong = totalEventsOnBooking;
          newEvent.isBreak = false;
          newEvent.partOfRecurrence = this.recurrenceRef != null;
          newEvent.hasInvoice;
          newEvent.recurrenceEvent = this.recurrenceEvent;
          newEvent.eventName = this.customerId;
          newEvent.from = lastTime;
          newEvent.durationMinutes = timeData.workMinutes;
          newEvent.colorIndex = treatment.colorIndex;
          bookingsEventsMap.set(timeId, newEvent.toJson());

          // Jumping to the end of the segment
          lastTime = addDuration(
            lastTime,
            new Duration({ minutes: timeData.workMinutes })
          );

          eventIndex += 1;
        });
      });
    });

    return bookingsEventsMap;
  }

  get monthStr(): string {
    return dateToMonthStr(this.bookingDate);
  }

  get toBookingReferencePaymentObj(): BookingReferencePaymentObj {
    return new BookingReferencePaymentObj({
      id: this.bookingId,
      isMultiBooking: false,
      date: this.bookingDate,
      workerId: this.workerId,
    });
  }

  async copyDataToOrder({
    user,
    worker,
    needToHoldOn,
    business,
    noteText = "",
    clientNoteText = "",
  }: {
    worker: WorkerModel;
    user: UserModel;

    needToHoldOn: boolean;
    business: BusinessModel;
    noteText: string;
    clientNoteText: string;
  }): Promise<void> {
    this.customerName = user.name;
    this.customerId = user.id;
    this.customerPhone = user.phoneNumber;
    this.userGender = user.gender;
    this.isVerifiedPhone = user.isVerifiedPhone;
    this.clientMail = user.userPublicData.email;
    const clientAt = user.userPublicData.clientAt;
    this.addToClientAt =
      !clientAt.hasOwnProperty(business.businessId) ||
      !clientAt.get(business.businessId)?.has(worker.id);

    this.orderingOptions = OrderingOptions.web;

    this.adress = business.adress;
    this.clientNote = clientNoteText;
    this.wasWaiting = false;
    this.note = noteText;
    this.shopIcon = business.design.shopIconData;
    this.userFcms = user.fcmsTokens;
    if (
      diffDuration(this.bookingDate, new Date()).inMinutes < 60 &&
      !needToHoldOn
    ) {
      this.confirmedArrival = true;
    }

    this.workerNotificationOption = worker.notifications.notificationOption;
    this.workerRemindersTypes = { ...worker.notifications.remindersTypes };
    for (const [type, minutes] of worker.notifications.remindersTypes) {
      if (this.isPassed) {
        continue;
      }
      if (
        type === BookingReminderType.confirmArrival &&
        this.confirmedArrival
      ) {
        continue;
      }
      if (
        subDuration(this.bookingDate, new Duration({ minutes: minutes })) <
          addDuration(new Date(), new Duration({ seconds: 1 })) &&
        this.recurrenceEvent === undefined
      ) {
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
    this.workerId = worker.id;
    this.workerPhone = worker.phone;
    this.workerName = worker.name;
    this.workerGender = worker.gender;
    this.showPhoneAlert = worker.notifications.showPhoneAlert;
    this.showAdressAlert = worker.notifications.showAdressAlert;
    this.businessName = business.shopName;
    this.bookingId = this.bookingId === "" ? v4() : this.bookingId;
    this.buisnessId = business.businessId;
    if (needToHoldOn) {
      this.status = BookingStatuses.waiting;
    } else {
      this.status = BookingStatuses.approved;
    }

    this.isVerifiedPhone = user.isVerifiedPhone;

    this.notificationType = sendMessage({ booking: this, worker: worker });
  }

  updateBookingByBooking({
    oldBooking,
    worker,
    needToHoldOn,
    business,
    newClientNote,
    keepRecurrence = false,
  }: {
    oldBooking: Booking;

    worker: WorkerModel;
    needToHoldOn: boolean;
    business: BusinessModel;

    newClientNote?: string;
    keepRecurrence: boolean;
  }): void {
    this.customerName = oldBooking.customerName;
    this.customerPhone = oldBooking.customerPhone;
    this.userGender = oldBooking.userGender;
    this.clientMail = oldBooking.clientMail;
    this.customerId = oldBooking.customerId;
    this.note = oldBooking.note;

    if (oldBooking.treatments.size > this.treatments.size) {
      const newBookingNewTreatments: Map<string, Treatment> = new Map();
      let index = 0;
      for (const [_, treatment] of Object.entries(this.treatments)) {
        newBookingNewTreatments.set(index.toString(), treatment);
        index += 1;
      }
      this.treatments = newBookingNewTreatments;
    }

    const oldBookingNewTreatments: Map<string, Treatment> = new Map(
      [...oldBooking.treatments.entries()].sort((entry1, entry2) =>
        entry1[0].localeCompare(entry2[0])
      )
    );

    oldBooking.treatments = oldBookingNewTreatments;
    if (oldBooking.customerPhone != this.customerPhone) {
      this.orderingOptions = OrderingOptions.byWorker;
    } else {
      this.orderingOptions = oldBooking.orderingOptions;
    }
    if (newClientNote != undefined) {
      this.clientNote = newClientNote;
    } else {
      this.clientNote = oldBooking.clientNote;
    }
    this.workerNotificationOption = worker.notifications.notificationOption;
    this.workerRemindersTypes = { ...worker.notifications.remindersTypes };
    worker.notifications.remindersTypes.forEach((minutes, type) => {
      if (
        subDuration(this.bookingDate, new Duration({ minutes: minutes })) <
        addDuration(new Date(), new Duration({ minutes: 1 }))
      ) {
        this.remindersTypes.set(
          type,
          Math.abs(
            Math.floor(diffDuration(new Date(), this.bookingDate).inMinutes / 2)
          )
        );
        this.remindersTypes.set(
          type,
          this.remindersTypes.get(type)! - (this.remindersTypes.get(type)! % 5)
        );
        if (this.remindersTypes.get(type)! < 10) {
          this.remindersTypes.delete(type);
        }
      }
    });
    this.debts = { ...oldBooking.debts };
    this.isUserExist = oldBooking.isUserExist;
    this.createdAt = oldBooking.createdAt;
    this.lastTimeNotifyOnDebt = oldBooking.lastTimeNotifyOnDebt;
    this.cancelDate = oldBooking.cancelDate;
    this.wasWaiting = oldBooking.wasWaiting;
    this.signOnDeviceCalendar = oldBooking.signOnDeviceCalendar;
    this.recurrenceEvent = undefined;
    this.recurrenceNotificationsLastDate = undefined;
    this.recurrenceTimeId = undefined;
    if (!keepRecurrence) {
      this.recurrenceRef = undefined;
      this.recurreneFatherDate = undefined;
      this.recurrenceEventRefInfo = undefined;
    }
    this.userDeleted = oldBooking.userDeleted;
    this.paymentRequest = oldBooking.paymentRequest;
    this.shopIcon = business.design.shopIconData;
    this.workerName = worker.name;
    this.workerGender = worker.gender;
    this.workerId = worker.id;
    this.workerPhone = worker.phone;
    this.showPhoneAlert = worker.notifications.showPhoneAlert;
    this.showAdressAlert = worker.notifications.showAdressAlert;
    this.adress = business.adress;
    this.invoices = { ...oldBooking.invoices };
    this.businessName = business.shopName;
    this.bookingId =
      oldBooking.bookingId === "" || oldBooking.recurrenceEvent != undefined
        ? v4()
        : oldBooking.bookingId;
    this.buisnessId = oldBooking.buisnessId;
    this.notificationType = oldBooking.notificationType;
    if (this.bookingDate === oldBooking.bookingDate) {
      this.status = oldBooking.status;
    } else {
      this.status = needToHoldOn
        ? BookingStatuses.waiting
        : BookingStatuses.approved;
    }
    this.confirmedArrival = false;
    if (!needToHoldOn) {
      if (diffDuration(this.bookingDate, new Date()).inMinutes < 60) {
        this.confirmedArrival = true;
      }
    }
    this.needCancel = oldBooking.needCancel;
    this.finishInvoices = oldBooking.finishInvoices;
    this.transactions = new Map();
    for (const [id, transaction] of Object.entries(oldBooking.transactions)) {
      this.transactions.set(
        id,
        BookingTransactionModel.fromTransaction(transaction)
      );
    }
  }

  get bookingsEventsAsEvents(): Map<string, Event> {
    const bookingsEventsMap: Map<string, Event> = new Map();
    let lastTime = this.bookingDate;
    let totalEventsOnBooking = this.totalEventsCount;
    let eventIndex = 0;
    const hasInvoice = this.invoicesCoverPrice;

    this.treatments.forEach((treatment, treatmentIndex) => {
      // Generate the treatment as time as the counter
      Array.from({ length: treatment.count }).forEach(() => {
        treatment.times.forEach((timeData, timeIndex) => {
          // Adding the break before the segment
          lastTime = addDuration(
            lastTime,
            new Duration({ minutes: timeData.breakMinutes })
          );
          const timeId =
            this.recurrenceTimeId != null && this.recurrenceEvent != null
              ? `${dateToTimeStr(lastTime)}_${this.recurrenceTimeId}`
              : dateToTimeStr(lastTime);

          const newEvent = new Event();
          newEvent.eventIndex = eventIndex;
          newEvent.treatmentId = treatment.id;
          newEvent.subTreatmentName = timeData.title;
          newEvent.totalBookingMinutes = this.totalMinutes;
          newEvent.belongTreatments = this.treatmentLength;
          newEvent.onHold = this.status === "waiting";
          newEvent.wantDelete = this.needCancel;
          newEvent.ids = [this.workerId];
          newEvent.confirmArrival = this.confirmedArrival;
          newEvent.hasDebt = this.debts.size > 0;
          newEvent.timeId =
            this.recurrenceEvent != null ? this.recurrenceTimeId : undefined;
          newEvent.treatmentName = treatment.name;
          newEvent.transactionCounter = this.transactions.size;
          newEvent.eventsBelong = totalEventsOnBooking;
          newEvent.isBreak = false;
          newEvent.partOfRecurrence = this.recurrenceRef != null;
          newEvent.hasInvoice;
          newEvent.recurrenceEvent = this.recurrenceEvent;
          newEvent.eventName = this.customerId;
          newEvent.from = lastTime;
          newEvent.durationMinutes = timeData.workMinutes;
          newEvent.colorIndex = treatment.colorIndex;
          bookingsEventsMap.set(timeId, newEvent);

          // Jumping to the end of the segment
          lastTime = addDuration(
            lastTime,
            new Duration({ minutes: timeData.workMinutes })
          );

          eventIndex += 1;
        });
      });
    });

    return bookingsEventsMap;
  }
  isTheSameAs({
    booking,
    customerId,
    note,
  }: {
    booking: Booking;
    customerId?: string;
    note?: string;
  }): boolean {
    let sameTreatment = true;

    if (this.treatments.size !== booking.treatments.size) {
      return false;
    }

    for (const [treatmentIndex, treatment] of this.treatments) {
      if (
        booking.treatments.get(treatmentIndex)?.id != treatment.id ||
        booking.treatments.get(treatmentIndex)?.count != treatment!.count
      ) {
        sameTreatment = false;
        break;
      }
    }

    return (
      sameTreatment &&
      booking.customerId === customerId &&
      booking.clientNote === this.clientNote &&
      booking.note === note &&
      this.bookingDate.getTime() === booking.bookingDate.getTime() &&
      this.workerId === booking.workerId
    );
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};
    data["workerGender"] = genderToStr[this.workerGender];
    data["customerName"] = this.customerName;
    data["note"] = this.note;
    data["customerId"] = this.customerId;
    if (this.wasWaiting) {
      data["wasWaiting"] = this.wasWaiting;
    }
    if (this.workerDeleted) {
      data["workerDeleted"] = this.workerDeleted;
    }
    if (this.cancelDate != null) {
      data["cancelDate"] = this.cancelDate.toString();
    }
    data["remindersTypes"] = {};
    // Object.entries<number>(this.remindersTypes).forEach(
    //   ([reminder, minutes]) => {
    //     data["remindersTypes"][bookingReminderTypeToStr[reminder]] = minutes;
    //   }
    // );
    // data["workerRemindersTypes"] = {};
    // Object.entries<number>(this.workerRemindersTypes).forEach(
    //   (reminder, minutes) => {
    //     data["workerRemindersTypes"][bookingReminderTypeToStr[reminder as ]] =
    //       minutes;
    //   }
    // );
    if (this.clientNote != "") {
      data["clientNote"] = this.clientNote;
    }
    if (this.finishInvoices) {
      data["finishInvoices"] = this.finishInvoices;
    }
    if (this.debts.size > 0) {
      data["debts"] = {};
      this.debts.forEach((debt, id) => {
        data["debts"][id] = debt.toJson();
      });
    }
    if (this.lastTimeNotifyOnDebt != null) {
      data["lastTimeNotifyOnDebt"] = this.lastTimeNotifyOnDebt.toString();
    }
    if (this.isVerifiedPhone) {
      data["isVerifiedPhone"] = this.isVerifiedPhone;
    }
    if (this.userDeleted) {
      data["userDeleted"] = this.userDeleted;
    }
    data["bookingId"] = this.bookingId;
    data["needCancel"] = this.needCancel;
    data["userGender"] = genderToStr[this.userGender];
    data["businessName"] = this.businessName;
    if (this.signOnDeviceCalendar) {
      data["signOnDeviceCalendar"] = this.signOnDeviceCalendar;
    }
    if (this.recurrenceTimeId != null) {
      data["recurrenceTimeId"] = this.recurrenceTimeId;
    }
    data["treatments"] = {};
    if (this.recurrenceRef != null) {
      data["recurrenceRef"] = this.recurrenceRef;
    }
    if (this.recurreneFatherDate != null) {
      data["recurreneFatherDate"] = this.recurreneFatherDate;
    }
    this.treatments.forEach((treatment, index) => {
      data["treatments"][index.toString()] = treatment.toJson();
    });
    data["invoices"] = {};
    this.invoices.forEach((invoice, id) => {
      data["invoices"][id] = invoice.toJson();
    });
    if (this.isMultiRef) {
      data["isMultiRef"] = this.isMultiRef;
    }
    if (!this.isUserExist) {
      data["isUserExist"] = this.isUserExist;
    }
    if (this.orderingOptions != OrderingOptions.app) {
      data["orderingOptions"] = orderingOptionsToStr[this.orderingOptions];
    }
    if (this.showAdressAlert) {
      data["showAdressAlert"] = this.showAdressAlert;
    }
    if (this.showPhoneAlert) {
      data["showPhoneAlert"] = this.showPhoneAlert;
    }
    if (this.adress != "") {
      data["adress"] = this.adress;
    }
    if (this.clientMail != "") {
      data["clientMail"] = this.clientMail;
    }
    data["customerPhone"] = this.customerPhone;
    data["status"] = bookingsMassage[this.status];
    data["confirmedArrival"] = this.confirmedArrival;
    data["bookingDate"] = this.bookingDate.toISOString();
    data["workerId"] = this.workerId.toString();
    data["workerName"] = this.workerName;
    data["buisnessId"] = this.buisnessId;
    data["shopIcon"] = this.shopIcon.toJson();
    if (this.recurrenceNotificationsLastDate != null) {
      data["recurrenceNotificationsLastDate"] =
        this.recurrenceNotificationsLastDate.toString();
    }
    data["notificationType"] = notificationTypeToStr[this.notificationType];
    data["workerNotificationOption"] =
      notificationOptionToStr[this.workerNotificationOption];
    data["userFcms"] = Array.from(this.userFcms);
    data["createdAt"] = this.createdAt.toISOString();
    // if (this.recurrenceEvent != null) {
    //   data["RE"] = this.recurrenceEvent.toJson({});
    // }
    // if (this.recurrenceEventRefInfo != null) {
    //   data["RERI"] = this.recurrenceEventRefInfo.toJson({
    //     saveStartDate: true,
    //     saveException: false,
    //     saveEnd: false,
    //   });
    // }
    data["transactions"] = {};
    this.transactions.forEach((transaction, id) => {
      data["transactions"][id] = transaction.toJson();
    });
    if (this.paymentRequest != null) {
      data["paymentRequest"] = this.paymentRequest.toJson();
    }
    return data;
  }
}
