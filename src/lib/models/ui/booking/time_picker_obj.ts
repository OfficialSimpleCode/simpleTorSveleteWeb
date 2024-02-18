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
    this.id = v4();
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

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};
    data["from"] = this.from;
    data["id"] = this.id;

    if (this.displayDate != null) {
      data["displayDate"] = this.displayDate;
    }

    data["isWaitingList"] = this.isWaitingList;

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
