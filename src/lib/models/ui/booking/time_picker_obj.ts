import { Duration } from "$lib/models/core/duration";
import RecurrenceEvent from "$lib/models/schedule/recurrence_event";
import { addDuration } from "$lib/utils/duration_utils";

export default class TimePickerObj {
  displayDate?: Date;
  from: Date = new Date(0);
  maxParticipants: number = 0;
  currentParticipants: number = 0;
  showParticipants: boolean = true;
  isWaitingList: boolean = false;
  showMultiWaitingList: boolean = true;
  duration: Duration = new Duration({});
  isMulti: boolean = false;
  recurrenceMultiEvent?: RecurrenceEvent;
  fatherRecurrenceMultiEventDate?: Date;
  recurrenceFatherBookingId?: string;
  recurrenceTimeId?: string;
  isVacation: boolean = false;
  isHoliday: boolean = false;
  signedPaymentRequestId?: string;

  constructor({
    displayDate,
    maxParticipants = 1,
    currentParticipants = 0,

    isMulti = false,
    isHoliday = false,
    signedPaymentRequestId,
    isVacation = false,
    recurrenceTimeId,
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
    this.displayDate = displayDate;
    this.maxParticipants = maxParticipants;
    this.currentParticipants = currentParticipants;
    this.isMulti = isMulti;
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
      signedPaymentRequestId: other.signedPaymentRequestId,
      maxParticipants: other.maxParticipants,
      currentParticipants: other.currentParticipants,
      showParticipants: other.showParticipants,
      recurrenceFatherBookingId: other.recurrenceFatherBookingId,
      recurrenceMultiEvent: other.recurrenceMultiEvent,
      fatherRecurrenceMultiEventDate: other.fatherRecurrenceMultiEventDate,
    });
    clonedTimePickerObj.from = other.from;
    clonedTimePickerObj.duration = other.duration;
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

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};
    data["id"] = this.from.toISOString();
    data["from"] = this.from;
    data["duration"] = this.duration.inMinutes;

    data["to"] = addDuration(this.from, this.duration);

    data["displayDate"] = this.displayDate ?? "";
    if (this.recurrenceTimeId != undefined) {
      data["recurrenceTimeId"] = this.recurrenceTimeId;
    }
    if (this.recurrenceFatherBookingId != undefined) {
      data["recurrenceFatherBookingId"] = this.recurrenceFatherBookingId;
    }

    if (this.fatherRecurrenceMultiEventDate != undefined) {
      data["fatherRecurrenceMultiEventDate"] =
        this.fatherRecurrenceMultiEventDate;
    }

    if (this.recurrenceMultiEvent != undefined) {
      data["recurrenceMultiEvent"] = this.recurrenceMultiEvent!.toJson({});
    }

    if (!this.showMultiWaitingList) {
      data["showMultiWaitingList"] = this.showMultiWaitingList;
    }

    if (this.isVacation) {
      data["isVacation"] = this.isVacation;
    }
    if (this.isHoliday) {
      data["isHoliday"] = this.isHoliday;
    }
    if (this.isMulti) {
      data["isMulti"] = this.isMulti;
    }
    if (this.signedPaymentRequestId != undefined) {
      data["signedPaymentRequestId"] = this.signedPaymentRequestId;
    }
    if (this.maxParticipants != 0) {
      data["maxParticipants"] = this.maxParticipants;
    }
    if (this.currentParticipants != 0) {
      data["currentParticipants"] = this.currentParticipants;
    }
    if (!this.showParticipants) {
      data["showParticipants"] = this.showParticipants;
    }

    return data;
  }

  private dateToTimeStr(date: Date): string {
    // Implement your date to time string conversion logic here
    return "";
  }
}
