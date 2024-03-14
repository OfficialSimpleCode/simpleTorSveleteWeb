import type { Price } from "$lib/models/general/price";
import type TreatmentTime from "$lib/models/general/treatment_time";
import RecurrenceEvent from "$lib/models/schedule/recurrence_event";
import pkg from "uuid";
const { v4 } = pkg;
export default class TimePickerObj {
  displayDate?: Date;
  from: Date = new Date(0);
  maxParticipants: number = 0;
  currentParticipants: number = 0;
  showParticipants: boolean = true;
  isWaitingList: boolean = false;
  showMultiWaitingList: boolean = true;

  isMulti: boolean = false;
  recurrenceMultiEvent?: RecurrenceEvent;
  fatherRecurrenceMultiEventDate?: Date;
  recurrenceFatherBookingId?: string;
  recurrenceTimeId?: string;
  isVacation: boolean = false;
  isHoliday: boolean = false;
  id: string = "";
  signedPaymentRequestId?: string;

  //incase the worker change the event price after book it
  changedEventPrice: Price | undefined;
  //incase the worker change the event treatment durations after book it
  changedEventTimes: Map<string, TreatmentTime> | undefined;

  constructor({});
  constructor({
    displayDate,
    maxParticipants = 1,
    currentParticipants = 0,

    isMulti = false,
    isHoliday = false,

    signedPaymentRequestId,
    isVacation = false,
    recurrenceTimeId,
    changedEventPrice,
    changedEventTimes,
    showParticipants = true,
    showMultiWaitingList = true,
    recurrenceFatherBookingId,
    isWaitingList = false,
    recurrenceMultiEvent,
    fatherRecurrenceMultiEventDate,
  }: {
    displayDate?: Date;
    maxParticipants?: number;
    currentParticipants?: number;
    isMulti?: boolean;
    isHoliday?: boolean;
    changedEventTimes?: Map<string, TreatmentTime>;
    changedEventPrice?: Price;
    signedPaymentRequestId?: string;
    isVacation?: boolean;
    recurrenceTimeId?: string;
    showParticipants?: boolean;
    showMultiWaitingList?: boolean;
    recurrenceFatherBookingId?: string;
    isWaitingList?: boolean;
    recurrenceMultiEvent?: RecurrenceEvent;
    fatherRecurrenceMultiEventDate?: Date;
  }) {
    this.id = v4();
    this.displayDate = displayDate;
    this.maxParticipants = maxParticipants;
    this.currentParticipants = currentParticipants;
    this.isMulti = isMulti;
    this.changedEventPrice = changedEventPrice;
    this.changedEventTimes =
      changedEventTimes != null ? new Map(changedEventTimes) : undefined;
    this.isHoliday = isHoliday;
    this.signedPaymentRequestId = signedPaymentRequestId;
    this.isVacation = isVacation;
    this.recurrenceTimeId = recurrenceTimeId;
    this.showParticipants = showParticipants;
    this.showMultiWaitingList = showMultiWaitingList;
    this.recurrenceFatherBookingId = recurrenceFatherBookingId;
    this.isWaitingList = isWaitingList;
    this.recurrenceMultiEvent = recurrenceMultiEvent;
    this.fatherRecurrenceMultiEventDate = fatherRecurrenceMultiEventDate;
  }

  static fromTimePickerObj(other: TimePickerObj): TimePickerObj {
    const clonedTimePickerObj = new TimePickerObj({
      displayDate: other.displayDate,
      recurrenceTimeId: other.recurrenceTimeId,
      showMultiWaitingList: other.showMultiWaitingList,
      isVacation: other.isVacation,
      isHoliday: other.isHoliday,
      isMulti: other.isMulti,
      changedEventTimes:
        other.changedEventTimes != null
          ? new Map(other.changedEventTimes)
          : undefined,
      changedEventPrice: other.changedEventPrice,
      signedPaymentRequestId: other.signedPaymentRequestId,
      maxParticipants: other.maxParticipants,
      currentParticipants: other.currentParticipants,
      showParticipants: other.showParticipants,
      recurrenceFatherBookingId: other.recurrenceFatherBookingId,
      recurrenceMultiEvent: other.recurrenceMultiEvent,
      fatherRecurrenceMultiEventDate: other.fatherRecurrenceMultiEventDate,
    });
    clonedTimePickerObj.from = other.from;

    return clonedTimePickerObj;
  }

  get hasFreePlace(): boolean {
    return this.maxParticipants > this.currentParticipants;
  }

  get timeId(): string | undefined {
    if (!this.displayDate) {
      return undefined;
    }
    return this.recurrenceTimeId
      ? `${this.dateToTimeStr(this.displayDate)}_${this.recurrenceTimeId}`
      : this.dateToTimeStr(this.displayDate);
  }

  static fromScheduleEvent(event: Record<string, any>): TimePickerObj {
    const clonedTimePickerObj = new TimePickerObj({});
    clonedTimePickerObj.displayDate = event.displayDate;
    clonedTimePickerObj.recurrenceTimeId = event.recurrenceTimeId;
    clonedTimePickerObj.showMultiWaitingList = event.showMultiWaitingList;
    clonedTimePickerObj.isVacation = event.isVacation ?? false;
    clonedTimePickerObj.isHoliday = event.isHoliday ?? false;
    clonedTimePickerObj.isMulti = event.isMulti ?? false;
    clonedTimePickerObj.signedPaymentRequestId = event.signedPaymentRequestId;
    clonedTimePickerObj.maxParticipants = event.maxParticipants ?? 0;

    clonedTimePickerObj.isWaitingList = event.isWaitingList;
    clonedTimePickerObj.currentParticipants = event.currentParticipants ?? 0;
    clonedTimePickerObj.showParticipants = event.showParticipants ?? true;
    clonedTimePickerObj.recurrenceFatherBookingId =
      event.recurrenceFatherBookingId;
    if (event.recurrenceMultiEvent != undefined) {
      clonedTimePickerObj.recurrenceMultiEvent = RecurrenceEvent.fromJson(
        event.recurrenceMultiEvent
      );
    }

    clonedTimePickerObj.fatherRecurrenceMultiEventDate =
      event.fatherRecurrenceMultiEventDate;
    clonedTimePickerObj.from = event.from;

    return clonedTimePickerObj;
  }

  private dateToTimeStr(date: Date): string {
    // Implement your date to time string conversion logic here
    return "";
  }
}
