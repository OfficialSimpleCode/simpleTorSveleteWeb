import { addDuration } from "$lib/utils/duration_utils";
import type BusinessModel from "../business/business_model";
import { Duration } from "../core/duration";
import Event from "../schedule/calendar_event";
import type WorkerModel from "./worker_model";

export default class Events {
  allEvents: Record<string, Record<string, Record<string, Event>>> = {};
  breakEvents: Record<string, Event> = {};

  constructor({}: {}) {}

  setEvents(
    json: Record<string, any>,
    worker: WorkerModel,
    monthString: string,
    {
      putVacations = false,
      putBreaks = true,
      business,
    }: { putVacations?: boolean; putBreaks?: boolean; business?: BusinessModel }
  ): void {
    this.allEvents[monthString] = {};

    Object.entries<Record<string, any>>(json).forEach(([dayString, times]) => {
      this.allEvents[monthString]![dayString] = {};

      Object.entries<Record<string, any>>(times).forEach(
        ([timeIdKey, detailsJson]) => {
          let timeId: string | undefined;
          let timeStr = "";
          const timeSplited = timeIdKey.split("_");

          if (timeSplited.length === 2) {
            timeId = timeSplited[1];
          }

          timeStr = timeSplited[0];
          timeStr = timeStr.replaceAll("v", "");

          const event = Event.fromJson({
            json: detailsJson,
            timeStr: timeStr,
            dayString: dayString,
            newTimeId: timeId,
            monthString: monthString,
            businessModel: business,
            workerId: worker.id,
          });

          const finishEvent = addDuration(
            event.to,
            new Duration({ minutes: 10 })
          );

          if (
            finishEvent < new Date() &&
            finishEvent < worker.minDateForShowinData
          ) {
            return;
          }

          this.allEvents[monthString]![dayString]![timeIdKey] = event;

          if (event.isBreak && (!putBreaks || !event.blockSchedule)) {
            return;
          }

          if (event.isVacation && !putVacations) {
            return;
          }
        }
      );
    });
  }
}
