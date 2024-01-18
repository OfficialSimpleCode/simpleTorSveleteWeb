// For schedule items such as break, booking, and multi booking
export default abstract class ScheduleItem {
  date: Date = new Date(0);

  workerId: string = "";
  workerName: string = "";
  workerPhone: string = "";
  buisnessId: string = "";
  businessName: string = "";

  //recurrenceEvent?: RecurrenceEvent;

  // Contain the event id of the recurrence father
  recurrenceRef?: string;

  recurrenceFatherDate?: string;
  //recurrenceEventRefInfo?: RecurrenceEvent;

  // Only for when deleting a worker and need to know his id for deleting the breaks
  recurrenceNotificationsLastDate?: Date;

  // For UI - when we want to display a recurrence booking with
  // another date (one of the dates of the children)
  recurrenceChildDate?: Date;

  constructor({
    workerId = "",
    workerName = "",
    businessName = "",
    buisnessId = "",
    workerPhone = "",
  }: {
    workerId?: string;
    workerName?: string;
    businessName?: string;
    buisnessId?: string;
    workerPhone?: string;
  } = {}) {
    this.workerId = workerId;
    this.workerName = workerName;
    this.businessName = businessName;
    this.buisnessId = buisnessId;
    this.workerPhone = workerPhone;
  }
}
