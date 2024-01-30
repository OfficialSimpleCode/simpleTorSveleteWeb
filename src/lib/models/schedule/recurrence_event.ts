import { monthDifference } from "$lib/utils/dates_utils";
import { addDuration, diffDuration } from "$lib/utils/duration_utils";
import { setEquals } from "$lib/utils/general_utils";
import { durationToString } from "$lib/utils/string_utils";
import {
  dateIsoStr,
  dateStrToDate,
  dateToDateStr,
  getStartOfWeek,
  setToMidNight,
} from "$lib/utils/times_utils";
import { translate } from "$lib/utils/translate";
import { addMonths, format } from "date-fns";
import { Duration } from "../core/duration";
import { SplayTreeSet } from "../general/splay_tree_set";

export enum FreqRecurrence {
  years,
  months,
  weeks,
  days,
}

export const freqRecurrenceToStr: { [key in FreqRecurrence]: string } = {
  [FreqRecurrence.years]: "years",
  [FreqRecurrence.months]: "months",
  [FreqRecurrence.weeks]: "weeks",
  [FreqRecurrence.days]: "days",
};

export const freqRecurrenceFromStr: { [key: string]: FreqRecurrence } = {
  ["years"]: FreqRecurrence.years,
  ["months"]: FreqRecurrence.months,
  ["weeks"]: FreqRecurrence.weeks,
  ["days"]: FreqRecurrence.days,
};

export const freqRecurrenceToSyncfuStr: { [key in FreqRecurrence]: string } = {
  [FreqRecurrence.years]: "YEARLY",
  [FreqRecurrence.months]: "MONTHLY",
  [FreqRecurrence.weeks]: "WEEKLY",
  [FreqRecurrence.days]: "DAILY",
};

export enum RecurrenceEventEnd {
  endless,
  date,
  repeats,
}

export const recurrenceEventEndToStr: { [key in RecurrenceEventEnd]: string } =
  {
    [RecurrenceEventEnd.endless]: "endless",
    [RecurrenceEventEnd.date]: "date",
    [RecurrenceEventEnd.repeats]: "repeats",
  };

export const synfuWeekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

export const freqRecurrenceToDuration: {
  [key in FreqRecurrence]: Duration;
} = {
  [FreqRecurrence.years]: new Duration({ days: 365 }),
  [FreqRecurrence.months]: new Duration({ days: 30 }),
  [FreqRecurrence.weeks]: new Duration({ days: 7 }),
  [FreqRecurrence.days]: new Duration({ days: 1 }),
};

export default class RecurrenceEvent {
  //-------------------- start ---------------------------
  start?: Date;
  //---------------------end vars ------------------------
  endDate?: Date; // only if  "RecurrenceEventEnd.date"
  repeats: number = 10; // only if  "RecurrenceEventEnd.repeats"
  //-------------------- jumps --------------------------
  interval: number = 1;
  freqRecurrence: FreqRecurrence = FreqRecurrence.days;

  ///only if the freqRecurrence is on weekly and its declare
  ///which days of the week we need to repeat
  weekDays: SplayTreeSet<number> = new SplayTreeSet();

  /// The condition to end this event (amount of repets\date\endless)
  endOption: RecurrenceEventEnd = RecurrenceEventEnd.repeats;

  ///exception dates that not included in the RecurrenceEvent
  exceptionDates: Set<Date> = new Set();

  /// end date for ui porpuses
  customEndDate?: Date;

  constructor({
    start,
    endOption = RecurrenceEventEnd.repeats,
    endDate,
    repeats = 10,
    interval = 1,
    weekDays = new SplayTreeSet<number>(),
    customEndDate,
    freqRecurrence = FreqRecurrence.days,
    exceptionDates = new Set(),
  }: {
    endOption?: RecurrenceEventEnd;
    start?: Date;
    endDate?: Date;
    repeats?: number;
    weekDays?: SplayTreeSet<number>;
    interval?: number;
    customEndDate?: Date;
    freqRecurrence?: FreqRecurrence;
    exceptionDates?: Set<Date>;
  }) {
    this.start = start;
    this.weekDays = weekDays;
    this.endOption = endOption;
    this.endDate = endDate;
    this.repeats = repeats;
    this.interval = interval;
    this.customEndDate = customEndDate;
    this.freqRecurrence = freqRecurrence;
    this.exceptionDates = exceptionDates;
  }

  static fromJson(
    json: { [key: string]: any },
    startTime?: Date
  ): RecurrenceEvent {
    const newObj = new RecurrenceEvent({});
    newObj.start = startTime;
    if (json["ED"]) {
      newObj.endDate = dateStrToDate(json["ED"]);
      newObj.endOption = RecurrenceEventEnd.date;
    } else if (json["R"]) {
      newObj.repeats = json["R"];
      newObj.endOption = RecurrenceEventEnd.repeats;
    } else {
      newObj.endOption = RecurrenceEventEnd.endless;
    }

    newObj.interval = json["I"] || 1;

    newObj.weekDays = new SplayTreeSet(json["WD"] || []);

    newObj.exceptionDates = new Set(
      Object.keys(json["EDA"] || {}).map(dateStrToDate)
    );

    newObj.freqRecurrence =
      freqRecurrenceFromStr[json["FR"]] || FreqRecurrence.days;

    return newObj;
  }

  toJson({
    saveStartDate = false,
    saveEnd = true,
    saveException = true,
  }: {
    saveStartDate?: boolean;
    saveEnd?: boolean;
    saveException?: boolean;
  }): Record<string, any> {
    const data: Record<string, any> = {};

    if (saveEnd && this.endDate && this.endOption === RecurrenceEventEnd.date) {
      data["ED"] = dateToDateStr(this.endDate);
    }

    if (saveEnd && this.endOption === RecurrenceEventEnd.repeats) {
      data["R"] = this.repeats;
    }

    if (this.interval !== 1) {
      data["I"] = this.interval;
    }

    if (
      this.weekDays.size > 0 &&
      this.freqRecurrence === FreqRecurrence.weeks
    ) {
      data["WD"] = [...this.weekDays];
    }

    if (saveException && this.exceptionDates.size > 0) {
      data["EDA"] = {};
      this.exceptionDates.forEach((date) => {
        data["EDA"][dateToDateStr(date)] = "";
      });
    }

    if (saveStartDate && this.start) {
      data["SD"] = dateIsoStr(this.start);
    }

    data["FR"] = freqRecurrenceToStr[this.freqRecurrence];

    return data;
  }

  static fromRecurrenceEvent(
    recurrenceEvent: RecurrenceEvent
  ): RecurrenceEvent {
    return new RecurrenceEvent({
      start: recurrenceEvent.start,
      endDate: recurrenceEvent.endDate,
      repeats: recurrenceEvent.repeats,
      interval: recurrenceEvent.interval,
      freqRecurrence: recurrenceEvent.freqRecurrence,
      weekDays: new SplayTreeSet(recurrenceEvent.weekDays),
      endOption: recurrenceEvent.endOption,
      exceptionDates: new Set(recurrenceEvent.exceptionDates),
    });
  }

  isEqual(recurrenceEvent: RecurrenceEvent): boolean {
    if (
      !this.start ||
      !recurrenceEvent.start ||
      this.start.getTime() !== recurrenceEvent.start.getTime()
    ) {
      return false;
    }

    if (
      (this.endDate?.getTime() || 0) !==
      (recurrenceEvent.endDate?.getTime() || 0)
    ) {
      return false;
    }

    return (
      this.repeats === recurrenceEvent.repeats &&
      this.interval === recurrenceEvent.interval &&
      this.freqRecurrence === recurrenceEvent.freqRecurrence &&
      setEquals(recurrenceEvent.weekDays, this.weekDays) &&
      setEquals(recurrenceEvent.exceptionDates, this.exceptionDates) &&
      this.endOption === recurrenceEvent.endOption
    );
  }

  ///Get the syncfusion calendar template for the event
  get syncfuString(): string {
    let resp = `FREQ=${freqRecurrenceToSyncfuStr[this.freqRecurrence]};`;

    if (this.freqRecurrence === FreqRecurrence.months && this.start) {
      resp += `BYMONTHDAY=${this.start.getDate()};`;
    }

    if (this.freqRecurrence === FreqRecurrence.years && this.start) {
      resp += `BYMONTHDAY=${this.start.getDate()};BYMONTH=${
        this.start.getMonth() + 1
      };`;
    }

    resp += `INTERVAL=${this.interval};`;

    if (
      this.freqRecurrence === FreqRecurrence.weeks &&
      this.weekDays.size > 0
    ) {
      resp += "BYDAY=";

      this.weekDays.forEach((index) => {
        if (index < synfuWeekDays.length) {
          resp += synfuWeekDays[index] + ",";
        }
      });

      resp = resp.slice(0, -1) + ";";
    }

    if (
      this.customEndDate &&
      (this.endOption === RecurrenceEventEnd.endless ||
        (this.endOfTheEvent && this.endOfTheEvent > new Date()))
    ) {
      const date = new Date(
        this.customEndDate.getFullYear(),
        this.customEndDate!.getMonth(),
        this.customEndDate!.getDate(),
        this.start?.getHours() ?? 0,
        this.start?.getMinutes() ?? 0
      );

      resp += `UNTIL=${format(date, "yyyyMMdd'T'HHmmss'Z'")}`;
    } else {
      switch (this.endOption) {
        case RecurrenceEventEnd.endless:
          break;
        case RecurrenceEventEnd.date:
          if (this.endDate) {
            const date = new Date(
              this.endDate.getFullYear(),
              this.endDate!.getMonth(),
              this.endDate!.getDate(),
              this.start?.getHours() ?? 0,
              this.start?.getMinutes() ?? 0
            );

            resp += `UNTIL=${format(date, "yyyyMMdd'T'HHmmss'Z'")}`;
          }
          break;
        case RecurrenceEventEnd.repeats:
          resp += `COUNT=${this.repeats}`;
          break;
      }
    }

    return resp;
  }

  ///Calculate how many times the event will accure
  ///if the event is endless return undefined
  get accurances(): number | undefined {
    if (!this.start) {
      return undefined;
    }

    if (this.endOption === RecurrenceEventEnd.endless) {
      return undefined;
    }

    //repeats option
    //return the repeats subtract by the exception dates
    if (this.endOption === RecurrenceEventEnd.repeats) {
      //subtract the exception dates
      return this.repeats - this.exceptionDates.size;
    }
    //date option
    //claculate how many times the event will accure base
    // on the interval and the end date
    if (this.endOption === RecurrenceEventEnd.date && this.endDate) {
      let exceptionLength = 0;

      //consider exception only the excption that before the end date
      this.exceptionDates.forEach((date) => {
        if (date <= this.endDate!) {
          exceptionLength++;
        }
      });

      if (this.freqRecurrence === FreqRecurrence.weeks) {
        //find the start week repeats
        let startWeekRepeats = 0;
        const startWeekSunday = getStartOfWeek(this.start);
        this.weekDays.forEach((day) => {
          if (
            this.isAccureInDate({
              date: addDuration(startWeekSunday, new Duration({ days: day })),
              considerException: false,
            })
          ) {
            startWeekRepeats++;
          }
        });

        const diff = Math.abs(
          addDuration(startWeekSunday, new Duration({ days: 6 })).getTime() -
            getStartOfWeek(this.endDate).getTime()
        );
        const weekRepeats = Math.floor(
          diff / this.rangeBetweenInterval.inMilliseconds
        );

        const lastWeekSunday = getStartOfWeek(this.endDate);
        let lastWeekRepeats = 0;

        if (
          setToMidNight(lastWeekSunday).getTime() !==
          setToMidNight(startWeekSunday).getTime()
        ) {
          this.weekDays.forEach((day) => {
            if (
              this.isAccureInDate({
                date: addDuration(lastWeekSunday, new Duration({ days: day })),
                considerException: false,
              })
            ) {
              lastWeekRepeats++;
            }
          });
        }

        const repeatsSum =
          weekRepeats * this.weekDays.size + lastWeekRepeats + startWeekRepeats;

        return repeatsSum - exceptionLength;
      } else if (this.freqRecurrence === FreqRecurrence.months) {
        const monthsDiff = monthDifference(this.start, this.endDate);
        const monthsJumps = Math.floor(monthsDiff / this.interval);
        return monthsJumps - exceptionLength;
      } else {
        // find the diffrence between the start and the end
        // and divide it by the range between interval
        const diff = this.start.getTime() - this.endDate.getTime();
        const jumps = Math.floor(
          Math.abs(diff) / this.rangeBetweenInterval.inDays
        );
        return jumps - exceptionLength;
      }
    }

    return undefined;
  }

  get rangeBetweenInterval(): Duration {
    return new Duration({
      minutes:
        freqRecurrenceToDuration[this.freqRecurrence].inMinutes * this.interval,
    });
  }

  get endOfTheEvent(): Date | undefined {
    const rangeBetween = this.rangeBetweenInterval;
    if (
      this.endOption === RecurrenceEventEnd.date &&
      this.endDate !== undefined
    ) {
      return this.endDate ?? undefined;
    } else if (this.endOption === RecurrenceEventEnd.repeats) {
      if (this.freqRecurrence === FreqRecurrence.weeks) {
        let startWeekRepeats = 0;
        const startWeekDay =
          this.start!.getDay() === 7 ? 0 : this.start!.getDay();
        this.weekDays.forEach((day) => {
          if (day >= startWeekDay) {
            startWeekRepeats++;
          }
        });

        const repeatsLeft = this.repeats - startWeekRepeats;
        const weekJumps = Math.ceil(repeatsLeft / this.weekDays.size);
        const daysJumps = repeatsLeft % this.weekDays.size;
        const startWithWeekJumps = addDuration(
          this.start!,
          new Duration({ minutes: rangeBetween.inMinutes * weekJumps })
        );

        const sunday = getStartOfWeek(startWithWeekJumps);
        this.weekDays = new SplayTreeSet<number>(
          this.weekDays,
          (a, b) => a - b
        );
        try {
          return addDuration(
            sunday,
            new Duration({
              days:
                daysJumps - 1 < 0
                  ? this.weekDays.last
                  : this.weekDays.elementAt(daysJumps - 1),
            })
          );
        } catch (e) {
          return undefined;
        }
      } else if (this.freqRecurrence === FreqRecurrence.months) {
        return addMonths(this.start!, (this.repeats - 1) * this.interval);
      } else {
        return addDuration(
          this.start!,
          new Duration({
            minutes: rangeBetween.inMinutes * (this.repeats - 1),
          })
        );
      }
    }
    return undefined;
  }

  get explainText(): string {
    if (this.start === undefined) {
      return "";
    }
    let resp = "";
    const rangeBetween = new Duration({
      minutes:
        freqRecurrenceToDuration[this.freqRecurrence].inMinutes * this.interval,
    });

    switch (this.freqRecurrence) {
      case FreqRecurrence.years:
        resp += translate("yearTamplate")
          .replaceAll("DURATION", durationToString(rangeBetween))
          .replaceAll("DATE", format(this.start!, "dd/MM"));
        break;
      case FreqRecurrence.months:
        resp += translate("monthTemplate")
          .replaceAll("DURATION", durationToString(rangeBetween))
          .replaceAll("DATE", this.start!.getDate().toString());
        break;
      case FreqRecurrence.weeks:
        let daysString = "";
        this.weekDays.forEach((day) => {
          daysString += translate(synfuWeekDays[day]) + ", ";
        });
        daysString = daysString.substring(0, daysString.length - 2);
        resp += translate("weekTemplate")
          .replaceAll("DURATION", durationToString(rangeBetween))
          .replaceAll("DAYS", daysString)
          .replaceAll(
            "AMOUNT",
            translate(
              Object.keys(this.weekDays).length === 1 ? "onDay" : "onDays"
            )
          );
        break;
      case FreqRecurrence.days:
        resp += translate("dayTemplate").replaceAll(
          "DURATION",
          durationToString(rangeBetween)
        );
        break;
    }
    const endOfEventTemp = this.endOfTheEvent;
    if (endOfEventTemp !== undefined) {
      resp += ` ${translate("until")} ${dateToDateStr(endOfEventTemp!)}`;
    }
    return resp;
  }

  isAccureInDate({
    date,
    considerException = true,
  }: {
    date: Date;
    considerException?: boolean;
  }): boolean {
    if (this.start === undefined || setToMidNight(this.start!) > date) {
      return false;
    }
    const eventEnd = this.endOfTheEvent;
    if (eventEnd !== undefined && eventEnd < setToMidNight(date)) {
      return false;
    }
    if (considerException && this.exceptionDates.has(setToMidNight(date))) {
      return false;
    }
    const rangeBetween = new Duration({
      minutes:
        freqRecurrenceToDuration[this.freqRecurrence].inMinutes * this.interval,
    });
    const intervalFromStart = diffDuration(date, setToMidNight(this.start!));
    const startWeekDay = this.start!.getDay() === 7 ? 0 : this.start!.getDay();
    const dateWeekDay = date.getDay() === 7 ? 0 : date.getDay();
    if (this.freqRecurrence === FreqRecurrence.weeks) {
      const maxDelta = 7 - startWeekDay;
      const minDelta = rangeBetween.inDays - startWeekDay;
      const restOFdays =
        (intervalFromStart.inDays + rangeBetween.inDays) % rangeBetween.inDays;
      return (
        (restOFdays < maxDelta || restOFdays >= minDelta) &&
        this.weekDays.has(dateWeekDay)
      );
    }
    if (this.freqRecurrence === FreqRecurrence.months) {
      const monthsDiffrence = monthDifference(this.start!, date);
      return (
        this.start!.getDate() === date.getDate() &&
        monthsDiffrence % this.interval === 0
      );
    }
    return intervalFromStart.inDays % rangeBetween.inDays === 0;
  }

  addRangeBetween(date: Date): Date {
    //TODO UTC
    //we need to convert to utc to avoid day light saving time
    // const utcDate = addDuration(
    //   dateToUtc(date),
    //   new Duration({ minutes: date.getTimezoneOffset() })
    // );

    if (this.freqRecurrence === FreqRecurrence.months) {
      return addMonths(date, this.interval);
    } else {
      return addDuration(date, this.rangeBetweenInterval);
    }
  }

  overlapingDatesWith(event: RecurrenceEvent): Set<Date> {
    if (this.start === undefined || event.start === undefined) {
      return new Set([new Date(0)]);
    }
    if (this.endOfTheEvent === undefined && event.endOfTheEvent === undefined) {
      return new Set([new Date(0)]);
    }
    const overlappingDates = new Set<Date>();
    const sortedEvents = this._getOptimalEventToPassOver(this, event);
    const eventForIteration = sortedEvents[0];
    const eventToCheck = sortedEvents[1];
    let datePointer = eventForIteration.start!;
    while (
      setToMidNight(datePointer) <=
      setToMidNight(eventForIteration.endOfTheEvent!)
    ) {
      if (eventForIteration.freqRecurrence === FreqRecurrence.weeks) {
        const sunday = getStartOfWeek(datePointer);
        eventForIteration.weekDays.forEach((dayToCheck) => {
          const dateToCheck = addDuration(
            sunday,
            new Duration({ days: dayToCheck })
          );
          if (
            eventToCheck.isAccureInDate({ date: dateToCheck }) &&
            eventForIteration.isAccureInDate({ date: dateToCheck })
          ) {
            overlappingDates.add(setToMidNight(dateToCheck));
          }
        });
      } else {
        if (
          eventToCheck.isAccureInDate({ date: datePointer }) &&
          eventForIteration.isAccureInDate({ date: datePointer })
        ) {
          overlappingDates.add(setToMidNight(datePointer));
        }
      }
      datePointer = this.addRangeBetween(datePointer);
    }
    return overlappingDates;
  }

  get isRelevant(): boolean {
    return this.endOfTheEvent === undefined || this.endOfTheEvent! > new Date();
  }

  nearestFutureAccurenceDate(
    date: Date,
    { needToBeAfterStart = true }: { needToBeAfterStart?: boolean } = {}
  ): Date | undefined {
    console.log("eeeeeeeeeeeee", this.endOfTheEvent);
    if (this.endOfTheEvent != undefined && date > this.endOfTheEvent!) {
      return undefined;
    }

    if (
      this.start === undefined ||
      (date < this.start! &&
        needToBeAfterStart &&
        this.isAccureInDate({ date: this.start! }))
    ) {
      return this.start;
    }

    const delta = diffDuration(date, this.start!).inDays;

    if (this.freqRecurrence === FreqRecurrence.weeks) {
      const jumpsToReachDate = Math.floor(
        delta / this.rangeBetweenInterval.inDays
      );
      let nearestDate = addDuration(
        this.start!,
        new Duration({
          days: jumpsToReachDate * this.rangeBetweenInterval.inDays,
        })
      );

      let sunday: Date = getStartOfWeek(nearestDate);
      for (const dayToCheck of this.weekDays) {
        const dateToCheck = addDuration(
          sunday,
          new Duration({ days: dayToCheck })
        );

        if (
          dateToCheck >= date &&
          (this.endOfTheEvent === undefined ||
            nearestDate <= this.endOfTheEvent!)
        ) {
          return dateToCheck;
        }
      }
      nearestDate = addDuration(nearestDate, this.rangeBetweenInterval);
      sunday = getStartOfWeek(nearestDate);
      for (const dayToCheck of this.weekDays) {
        const dateToCheck = addDuration(
          sunday,
          new Duration({ days: dayToCheck })
        );
        if (
          dateToCheck >= date &&
          (this.endOfTheEvent === undefined ||
            nearestDate <= this.endOfTheEvent!)
        ) {
          return dateToCheck;
        }
      }
      return undefined;
    }
    const jumpsToReachDate = Math.ceil(
      delta / this.rangeBetweenInterval.inDays
    );
    let nearestDate = addDuration(
      this.start!,
      new Duration({
        days: jumpsToReachDate * this.rangeBetweenInterval.inDays,
      })
    );

    if (nearestDate < date) {
      nearestDate = this.addRangeBetween(nearestDate);
    }
    const end = this.endOfTheEvent;

    while (
      !this.isAccureInDate({ date: nearestDate }) &&
      (end === undefined || nearestDate < end)
    ) {
      console.log(this.isAccureInDate({ date: nearestDate }));

      nearestDate = this.addRangeBetween(nearestDate);
    }
    if (end === undefined || nearestDate <= end) {
      return nearestDate;
    }
    return undefined;
  }

  private _getOptimalEventToPassOver(
    first: RecurrenceEvent,
    second: RecurrenceEvent
  ): RecurrenceEvent[] {
    if (
      first.endOfTheEvent === undefined &&
      second.endOfTheEvent !== undefined
    ) {
      return [second, first];
    }
    if (
      first.endOfTheEvent !== undefined &&
      second.endOfTheEvent === undefined
    ) {
      return [first, second];
    } else {
      if ((second.jumps ?? 99999) < (first.jumps ?? 99999)) {
        return [second, first];
      } else {
        return [first, second];
      }
    }
  }

  get jumps(): number | undefined {
    if (this.start === undefined || this.endOfTheEvent === undefined) {
      return undefined;
    }
    const duration = new Duration({
      milliseconds: this.start!.getTime() - this.endOfTheEvent.getTime(),
    });
    const iterations = duration.inMinutes / this.rangeBetweenInterval.inMinutes;

    // Multiply by the number of times the event happens every iteration
    // If the event is daily, monthly, or yearly, then multiply by 1 (if weekDays is empty)
    return Math.ceil(iterations * Math.max(this.weekDays.size, 1));
  }

  toString(): string {
    return JSON.stringify(this, undefined, 2);
  }
}
