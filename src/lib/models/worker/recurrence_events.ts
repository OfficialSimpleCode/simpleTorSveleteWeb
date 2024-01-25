import {
  dateStrToDate,
  dateToDateStr,
  dateToDayStr,
  dateToMonthStr,
} from "$lib/utils/times_utils/times_utils";
import type { Unsubscribe } from "firebase/auth";
import type BusinessModel from "../business/business_model";
import Event from "../schedule/calendar_event";
import Vacation from "../schedule/vacation";

export default class RecurrenceEvents {
  listener?: Unsubscribe;
  recurrenceEvents: Record<string, Record<string, Event>> = {};
  vacationsEvents: Record<string, Event> = {};

  constructor() {}

  get recurrenceEventsList(): Event[] {
    const events: Event[] = [];
    Object.entries(this.recurrenceEvents).forEach(([date, dayEvents]) => {
      events.push(...Object.values(dayEvents));
    });
    return events;
  }

  get recurrenceEventsListWithOutVacations(): Event[] {
    const events: Event[] = [];
    Object.entries(this.recurrenceEvents).forEach(([date, dayEvents]) => {
      Object.entries(dayEvents).forEach(([_, event]) => {
        if (!event.isVacation) {
          events.push(event);
        }
      });
    });
    return events;
  }

  setRecurrenceEvents(
    json: Record<string, any>,
    workerId: string,
    businessModel: BusinessModel,
    { putBreaks = true }: { putBreaks?: boolean } = {}
  ): void {
    this.recurrenceEvents = {};
    this.vacationsEvents = {};

    Object.entries(json).forEach(([dateString, times]) => {
      this.recurrenceEvents[dateString] = {};

      const date = dateStrToDate(dateString);

      Object.entries<Record<string, any>>(times).forEach(
        ([timeId, eventJson]) => {
          let recurrenceTimeId: string = "";
          let timeStr = "";

          if (typeof timeId === "string") {
            const timeSplited = timeId.split("_");
            if (timeSplited.length === 2) {
              recurrenceTimeId = timeSplited[1];
            }
            timeStr = timeSplited[0];
          }

          const event = Event.fromJson({
            json: eventJson,
            timeStr,
            businessModel,
            newTimeId: recurrenceTimeId,
            dayString: dateToDayStr(date),
            monthString: dateToMonthStr(date),
            workerId,
          });

          if (event.isVacation) {
            this.vacationsEvents[dateToDateStr(event.from)] = event;
          }

          if (!putBreaks && event.isBreak) {
            return;
          }

          this.recurrenceEvents[dateString][timeId] = event;
        }
      );
    });
  }

  vacationInDate(date: Date): Vacation | undefined {
    for (const event of Object.values(this.vacationsEvents)) {
      if (event.recurrenceEvent?.isAccureInDate({ date })) {
        return Vacation.fromEvent(event);
      }
    }
    return undefined;
  }
}
