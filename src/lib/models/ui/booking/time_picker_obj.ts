import RecurrenceEvent from "$lib/models/schedule/recurrence_event";

class TimePickerObj {
    displayDate?: Date;
    from: Date = new Date(0);
    duration: number = 0;
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
        from: other.from,
        recurrenceTimeId: other.recurrenceTimeId,
        showMultiWaitingList: other.showMultiWaitingList,
        isVacation: other.isVacation,
        isHoliday: other.isHoliday,
        duration: other.duration,
        isMulti: other.isMulti,
        signedPaymentRequestId: other.signedPaymentRequestId,
        maxParticipants: other.maxParticipants,
        currentParticipants: other.currentParticipants,
        showParticipants: other.showParticipants,
        recurrenceFatherBookingId: other.recurrenceFatherBookingId,
        recurrenceMultiEvent: other.recurrenceMultiEvent,
        fatherRecurrenceMultiEventDate: other.fatherRecurrenceMultiEventDate,
      });
  
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
  
    private dateToTimeStr(date: Date): string {
      // Implement your date to time string conversion logic here
      return '';
    }
  }
  