import { Gender } from "$lib/consts/gender";
import type { Religion } from "$lib/consts/worker_schedule";
import { addDuration } from "$lib/utils/duration_utils";

import {
  dateIsoStr,
  dateStrToDate,
  timeStrToDate,
} from "$lib/utils/times_utils";
import { translate } from "$lib/utils/translate";
import type BusinessModel from "../business/business_model";
import { Duration } from "../core/duration";
import type IconData from "../general/icon_data";
import RecurrenceEvent from "./recurrence_event";

export default class Event {
  eventName: string = "";
  from: Date = new Date(0);
  to: Date = new Date(0);
  colorIndex: number = -1;
  isBreak: boolean = false;
  eventIndex: number = 0;
  eventsBelong: number = 1;
  partOfRecurrence: boolean = false;
  treatmentName: string = "";
  transactionCounter: number = 0;
  wantDelete: boolean = false;
  onHold: boolean = false;
  hasInvoice: boolean = false;
  durationMinutes: number = 0;
  breakNotificaiton: boolean = false;
  minutesBreakNotification: number = 60;
  extraData: any;
  note: string | undefined;
  ids: string[] = [];

  recurrenceEvent?: RecurrenceEvent;
  timeId?: string;
  hasDebt: boolean = false;
  confirmArrival: boolean = false;
  treatmentId?: string;
  isMulti: boolean = false;
  currentParticipants: number = 0;
  debtCounter: number = 0;
  onHoldCounter: number = 0;
  invoiceCoverCounter: number = 0;
  transactionsPerUser: number = 0;
  wantDeleteCounter: number = 0;
  confirmedArrivalAmount: number = 0;
  recurrenceFatherBookingId?: string;
  recurrenceBreakFatherDate?: string;
  blockSchedule: boolean = true;
  recurrenceBreakRefInfo?: RecurrenceEvent;
  breakIconData?: IconData;
  breakBusinessName?: string;
  breakFatherRecurrenceId?: string;
  breakBusinessId?: string;
  breakAddedToDeviceCalendar: boolean = false;
  breakId: string = "";
  vacationId: string = "";
  belongTreatments: number = 1;
  vacationCreatedAt?: Date = undefined;
  isVacation: boolean = false;
  vacationAddedToDeviceCalendar: boolean = false;
  vacationEndTemp?: Date;
  isHoliday: boolean = false;
  holidayReligion?: Religion;
  subTreatmentName: string = "";
  totalBookingMinutes: number = 0;
  waitingListCounter: number = 1;
  isWaitingList: boolean = false;
  waitingListCustomerGender: Gender = Gender.male;
  customerPhoneWaitingList: string = "";
  constructor() {}

  static fromJson({
    json,
    timeStr,
    dayString,
    monthString,
    workerId,
    businessModel,
    newTimeId,
  }: {
    json: Record<string, any>;
    timeStr: string;
    dayString: string;
    monthString: string;
    workerId: string;
    businessModel: BusinessModel | undefined;
    newTimeId: string | undefined;
  }): Event {
    const newObj = new Event();
    newObj.eventName = json["p"] ?? "";
    newObj.eventIndex = json["i"] ?? 0;
    newObj.onHold = json["oH"] ?? false;
    newObj.eventsBelong = json["EB"] ?? 1;
    newObj.wantDelete = json["wD"] ?? false;
    newObj.isVacation = json["IV"] ?? false;
    if (newObj.isVacation && newObj.eventName === "") {
      newObj.eventName = translate("Vacation");
    }
    newObj.vacationId = newTimeId ?? "";
    newObj.breakFatherRecurrenceId = json["BFRI"] ?? "";
    newObj.vacationAddedToDeviceCalendar = json["VATDC"] ?? false;
    newObj.blockSchedule = json["BS"] ?? true;
    newObj.transactionCounter = json["TC"] ?? 0;
    newObj.transactionsPerUser = json["TPU"] ?? 0;
    newObj.hasDebt = json["HD"] ?? false;
    newObj.debtCounter = json["DC"] ?? 0;
    newObj.treatmentId = json["TID"];
    newObj.confirmArrival = json["CA"] ?? false;
    newObj.confirmedArrivalAmount = json["CAA"] ?? 0;
    newObj.durationMinutes = json["d"] ?? 0;
    newObj.treatmentName = json["TN"] ?? "";
    newObj.hasInvoice = json["Hi"] ?? false;
    newObj.invoiceCoverCounter = json["ICC"] ?? 0;
    newObj.note = json["N"];
    newObj.recurrenceFatherBookingId = json["RFBI"];
    newObj.wantDeleteCounter = json["WDC"] ?? 0;
    newObj.onHoldCounter = json["OHC"] ?? 0;
    newObj.isMulti = json["IM"] ?? false;
    newObj.currentParticipants = json["CP"] ?? 0;
    newObj.breakNotificaiton = json["BN"] ?? false;
    newObj.partOfRecurrence = json["POR"] ?? false;
    newObj.minutesBreakNotification = json["MBN"] ?? 60;
    newObj.recurrenceBreakRefInfo = json["RBRI"]
      ? RecurrenceEvent.fromJson(json["RBRI"])
      : undefined;
    newObj.recurrenceBreakFatherDate = json["RBFD"];
    const isBreak = json["IB"] ?? false;
    const time = timeStrToDate(timeStr);
    const date = dateStrToDate(`${dayString}-${monthString}`);
    newObj.from = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    );
    if (json["RTI"] != null) {
      newObj.timeId = json["RTI"] ?? "";
    } else {
      newObj.timeId = newTimeId;
    }

    newObj.to = addDuration(
      newObj.from,
      new Duration({ minutes: newObj.durationMinutes })
    );
    newObj.recurrenceEvent = json["RE"]
      ? RecurrenceEvent.fromJson(json["RE"], newObj.from)
      : undefined;

    newObj.colorIndex = json["c"] ?? (newObj.isVacation ? 1 : 0);
    newObj.ids = [workerId];
    newObj.isHoliday = false;
    newObj.subTreatmentName = "";
    newObj.totalBookingMinutes = 0;
    newObj.waitingListCounter = 1;
    newObj.isWaitingList = false;
    newObj.waitingListCustomerGender = Gender.male;
    newObj.customerPhoneWaitingList = "";

    if (isBreak) {
      newObj.breakIconData = businessModel?.design.shopIconData;
      newObj.breakBusinessName = businessModel?.shopName;
      newObj.breakBusinessId = businessModel?.businessId;
    }
    if (json["VE"]) {
      newObj.vacationEndTemp = dateStrToDate(json["VE"]);
    }
    return newObj;
  }

  get endOfBooking(): Date {
    return addDuration(
      this.from,
      new Duration({ minutes: this.totalBookingMinutes })
    );
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data["p"] = this.eventName;
    data["d"] = this.durationMinutes;
    data["c"] = this.colorIndex;
    if (this.minutesBreakNotification !== 60) {
      data["MBN"] = this.minutesBreakNotification;
    }
    if (this.breakNotificaiton) {
      data["BN"] = this.breakNotificaiton;
    }
    if (this.onHoldCounter > 0) {
      data["OHC"] = this.onHoldCounter;
    }
    if (this.confirmArrival) {
      data["CA"] = this.confirmArrival;
    }
    if (this.confirmedArrivalAmount > 0) {
      data["CAA"] = this.confirmedArrivalAmount;
    }
    if (!this.blockSchedule) {
      data["BS"] = this.blockSchedule;
    }
    if (this.treatmentId != null) {
      data["TID"] = this.treatmentId;
    }
    if (this.wantDeleteCounter > 0) {
      data["WDC"] = this.wantDeleteCounter;
    }
    if (this.hasDebt) {
      data["HD"] = this.hasDebt;
    }
    if (this.transactionCounter > 0) {
      data["TC"] = this.transactionCounter;
    }
    if (this.transactionsPerUser > 0) {
      data["TPU"] = this.transactionsPerUser;
    }
    if (this.debtCounter > 0) {
      data["DC"] = this.debtCounter;
    }
    if (this.invoiceCoverCounter > 0) {
      data["ICC"] = this.invoiceCoverCounter;
    }
    if (this.eventsBelong !== 1) {
      data["EB"] = this.eventsBelong;
    }
    if (this.isBreak) {
      data["IB"] = this.isBreak;
    }
    if (this.breakId !== "") {
      data["BI"] = this.breakId;
    }
    if (this.eventIndex !== 0) {
      data["i"] = this.eventIndex;
    }
    if (this.treatmentName !== "") {
      data["TN"] = this.treatmentName;
    }
    if (this.onHold) {
      data["oH"] = this.onHold;
    }
    if (this.isMulti) {
      data["IM"] = this.isMulti;
    }
    if (this.currentParticipants > 0) {
      data["CP"] = this.currentParticipants;
    }
    if (this.wantDelete) {
      data["wD"] = this.wantDelete;
    }
    if (this.hasInvoice) {
      data["Hi"] = this.hasInvoice;
    }
    if (this.recurrenceEvent != null) {
      data["RE"] = this.recurrenceEvent!.toJson({});
    }
    if (this.note != null && this.note !== "") {
      data["N"] = this.note;
    }
    if (this.partOfRecurrence) {
      data["POR"] = this.partOfRecurrence;
    }
    if (this.recurrenceFatherBookingId != null) {
      data["RFBI"] = this.recurrenceFatherBookingId;
    }
    if (this.isVacation) {
      data["IV"] = this.isVacation;
    }
    if (this.breakFatherRecurrenceId != null) {
      data["BFRI"] = this.breakFatherRecurrenceId;
    }
    if (this.vacationAddedToDeviceCalendar) {
      data["VATDC"] = this.vacationAddedToDeviceCalendar;
    }
    if (this.vacationCreatedAt != null) {
      data["VCA"] = dateIsoStr(this.vacationCreatedAt!);
    }
    if (this.breakAddedToDeviceCalendar) {
      data["BATDC"] = this.breakAddedToDeviceCalendar;
    }
    if (this.timeId != null && this.recurrenceEvent == null) {
      data["RTI"] = this.timeId;
    }
    if (this.recurrenceBreakFatherDate != null) {
      data["RBFD"] = this.recurrenceBreakFatherDate;
    }
    if (this.recurrenceBreakRefInfo != null) {
      data["RBRI"] = this.recurrenceBreakRefInfo.toJson({
        saveStartDate: false,
        saveEnd: true,
        saveException: false,
      });
    }
    if (this.subTreatmentName !== "") {
      data["STN"] = this.subTreatmentName;
    }
    if (this.totalBookingMinutes !== this.durationMinutes) {
      data["TBM"] = this.totalBookingMinutes;
    }
    if (this.belongTreatments > 1) {
      data["BTR"] = this.belongTreatments;
    }
    return data;
  }

  toString(): string {
    return JSON.stringify(this, undefined, 2);
  }
}
