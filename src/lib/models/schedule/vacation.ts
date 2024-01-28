import { dateToDateStr } from "$lib/utils/times_utils";
import Event from "../schedule/calendar_event";
import RecurrenceEvent, { RecurrenceEventEnd } from "./recurrence_event";

export default class Vacation {
  start: Date = new Date(0);
  end: Date = new Date(0);
  id: string = "";
  createdAt?: Date;
  workerId: string = "";
  addedToDeviceCalendar: boolean = false;
  colorIndex: number = 1;
  title: string = "";
  recurrenceObj?: RecurrenceEvent;

  constructor({});
  constructor({
    end,
    start,
    title = "",
    id = "",
    workerId = "",
  }: {
    end: Date;
    start: Date;
    title?: string;
    id?: string;
    workerId?: string;
  }) {
    this.start = start;
    this.end = end;
    this.title = title;
    this.id = id;
    this.workerId = workerId;
    this.recurrenceObj = new RecurrenceEvent({
      start: start,
      endDate: end,
      endOption: RecurrenceEventEnd.date,
    });
  }

  isOneDay(): boolean {
    return dateToDateStr(this.end) === dateToDateStr(this.start);
  }

  static fromEvent(event: Event): Vacation {
    const newObj = new Vacation({});
    newObj.start = event.from;
    if (event.recurrenceEvent?.endDate) {
      newObj.end = event.recurrenceEvent!.endDate!;
    }
    newObj.title = event.eventName;
    newObj.createdAt = event.vacationCreatedAt;
    newObj.id = event.vacationId;
    newObj.recurrenceObj = event.recurrenceEvent;
    newObj.addedToDeviceCalendar = event.vacationAddedToDeviceCalendar;
    newObj.colorIndex = event.colorIndex;
    newObj.workerId = event.ids.length > 0 ? event.ids[0] : "";
    return newObj;
  }

  static fromVacation(other: Vacation): Vacation {
    const newObj = new Vacation({});
    newObj.start = other.start;
    newObj.end = other.end;
    newObj.addedToDeviceCalendar = other.addedToDeviceCalendar;
    newObj.id = other.id;
    newObj.createdAt = other.createdAt;
    newObj.workerId = other.workerId;
    newObj.title = other.title;
    newObj.colorIndex = other.colorIndex;
    return newObj;
  }
}
