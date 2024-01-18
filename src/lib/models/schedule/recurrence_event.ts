import { translate } from "$lib/utils/string_utilitis";
import {
  dateStrToDate,
  dateToDateStr,
  setToMidNight,
} from "$lib/utils/times_utils/times_utils";
import { add, format, isAfter, set, sub } from "date-fns";

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
  years: FreqRecurrence.years,
  months: FreqRecurrence.months,
  weeks: FreqRecurrence.weeks,
  days: FreqRecurrence.days,
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
  [key in FreqRecurrence]: { days: number };
} = {
  [FreqRecurrence.years]: { days: 365 },
  [FreqRecurrence.months]: { days: 30 },
  [FreqRecurrence.weeks]: { days: 7 },
  [FreqRecurrence.days]: { days: 1 },
};

export default class RecurrenceEvent {
  //-------------------- start ---------------------------
  start?: Date | null;
  //---------------------end vars ------------------------
  endDate?: Date | null; // only if  "RecurrenceEventEnd.date"
  repeats: number = 10; // only if  "RecurrenceEventEnd.repeats"
  //-------------------- jumps --------------------------
  interval: number = 1;
  freqRecurrence: FreqRecurrence = FreqRecurrence.days;

  ///only if the freqRecurrence is on weekly and its declare
  ///which days of the week we need to repeat
  weekDays: Set<number> = new Set();

  /// The condition to end this event (amount of repets\date\endless)
  endOption: RecurrenceEventEnd = RecurrenceEventEnd.repeats;

  ///exception dates that not included in the RecurrenceEvent
  exceptionDates: Set<Date> = new Set();

  /// end date for ui porpuses
  customEndDate?: Date | null;

  constructor({
    start,
    endOption = RecurrenceEventEnd.repeats,
    endDate,
    repeats = 10,
    interval = 1,
    customEndDate,
    freqRecurrence = FreqRecurrence.days,
  }: {
    start?: Date;
    endOption?: RecurrenceEventEnd;
    endDate?: Date | null;
    repeats?: number;
    interval?: number;
    customEndDate?: Date | null;
    freqRecurrence?: FreqRecurrence;
  }) {
    this.start = start;
    this.endOption = endOption;
    this.endDate = endDate;
    this.repeats = repeats;
    this.interval = interval;
    this.customEndDate = customEndDate;
    this.freqRecurrence = freqRecurrence;
  }

  static fromJson(
    json: { [key: string]: any },
    startTime?: Date
  ): RecurrenceEvent {
    const newObj = new RecurrenceEvent({});
    newObj.start = startTime;
    newObj.endDate = json["ED"] ? new Da1te(json["ED"]) : null;
    newObj.repeats = json["R"] || 10;
    newObj.interval = json["I"] || 1;

    newObj.weekDays = new Set(json["WD"] || []);

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
      data["SD"] = this.start.toISOString();
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
      weekDays: new Set(recurrenceEvent.weekDays),
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
        (this.endOfTheEvent && isAfter(this.endOfTheEvent, new Date())))
    ) {
      const date = set(this.customEndDate, {
        hours: this.start?.getHours() || 0,
        minutes: this.start?.getMinutes() || 0,
      });

      resp += `UNTIL=${format(date, "yyyyMMdd'T'HHmmss'Z'")}`;
    } else {
      switch (this.endOption) {
        case RecurrenceEventEnd.endless:
          break;
        case RecurrenceEventEnd.date:
          if (this.endDate) {
            const date = set(this.endDate, {
              hours: this.start?.getHours() || 0,
              minutes: this.start?.getMinutes() || 0,
            });

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
  ///if the event is endless return null
  get accurances(): number | null {
    if (!this.start) {
      return null;
    }

    if (this.endOption === RecurrenceEventEnd.endless) {
      return null;
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
        if (!isAfter(date, this.endDate)) {
          exceptionLength++;
        }
      });

      if (this.freqRecurrence === FreqRecurrence.weeks) {
        //find the start week repeats
        let startWeekRepeats = 0;
        const startWeekSunday = this.getStartOfWeek(this.start);
        this.weekDays.forEach((day) => {
          if (
            this.isAccureInDate({
              date: add(startWeekSunday, { days: day }),
              considerException: false,
            })
          ) {
            startWeekRepeats++;
          }
        });

        const diff = sub(
          add(startWeekSunday, { days: 6 }),
          this.getStartOfWeek(this.endDate)
        );
        const weekRepeats = Math.floor(
          diff.getTime() / this.rangeBetweenInterval.getTime
        );

        const lastWeekSunday = this.getStartOfWeek(this.endDate);
        let lastWeekRepeats = 0;

        if (
          setToMidNight(lastWeekSunday).getTime() !==
          setToMidNight(startWeekSunday).getTime()
        ) {
          this.weekDays.forEach((day) => {
            if (
              this.isAccureInDate({
                date: add(lastWeekSunday, { days: day }),
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
        const monthsDiff = this.monthDiffrence(this.start, this.endDate);
        const monthsJumps = Math.floor(monthsDiff / this.interval);
        return monthsJumps - exceptionLength;
      } else {
        // find the diffrence between the start and the end
        // and divide it by the range between interval
        const diff = this.start.getTime() - this.endDate.getTime();
        const jumps = Math.floor(
          Math.abs(diff) / this.rangeBetweenInterval().getTime()
        );
        return jumps - exceptionLength;
      }
    }

    return null;
  }

  get rangeBetweenInterval(): Duration {
    return new Duration(
      this.freqRecurrenceToDuration[this.freqRecurrence].inMinutes *
        this.interval
    );
  }

  get endOfTheEvent(): Date | null {
    const rangeBetween = this.rangeBetweenInterval;
    if (this.endOption === RecurrenceEventEnd.date && this.endDate !== null) {
      return this.endDate;
    } else if (this.endOption === RecurrenceEventEnd.repeats) {
      if (this.freqRecurrence === FreqRecurrence.weeks) {
        let startWeekRepeats = 0;
        const startWeekDay =
          this.start!.weekday === 7 ? 0 : this.start!.weekday;
        this.weekDays.forEach((day) => {
          if (day >= startWeekDay) {
            startWeekRepeats++;
          }
        });
        const repeatsLeft = this.repeats - startWeekRepeats;
        const weekJumps = Math.ceil(repeatsLeft / this.weekDays.length);
        const daysJumps = repeatsLeft % this.weekDays.length;
        const startWithWeekJumps = this.start!.add(
          new Duration(rangeBetween.inMinutes * weekJumps)
        );
        const sunday = this.getStartOfWeek(startWithWeekJumps);
        this.weekDays = new SplayTreeSet<number>(this.weekDays, (a, b) =>
          a.compareTo(b)
        );
        try {
          return sunday.add(
            new Duration(
              daysJumps - 1 < 0
                ? this.weekDays.last
                : this.weekDays.elementAt(daysJumps - 1)
            )
          );
        } catch (e) {
          return null;
        }
      } else if (this.freqRecurrence === FreqRecurrence.months) {
        return this.addMonths(this.start!, (this.repeats - 1) * this.interval);
      } else {
        return this.start!.add(
          new Duration(rangeBetween.inMinutes * (this.repeats - 1))
        );
      }
    }
    return null;
  }

  get explainText(): string {
    if (this.start === null) {
      return "";
    }
    let resp = "";
    const rangeBetween = new Duration(
      this.freqRecurrenceToDuration[this.freqRecurrence].inMinutes *
        this.interval
    );
    switch (this.freqRecurrence) {
      case FreqRecurrence.years:
        resp += translate("yearTamplate")
          .replaceAll("DURATION", this.durationToString(rangeBetween))
          .replaceAll("DATE", new DateFormat("dd/MM").format(this.start!));
        break;
      case FreqRecurrence.months:
        resp += translate("monthTemplate")
          .replaceAll("DURATION", this.durationToString(rangeBetween))
          .replaceAll("DATE", this.start!.day.toString());
        break;
      case FreqRecurrence.weeks:
        let daysString = "";
        this.weekDays.forEach((day) => {
          daysString += translate(synfuWeekDays[day]) + ", ";
        });
        daysString = daysString.substring(0, daysString.length - 2);
        resp += translate("weekTemplate")
          .replaceAll("DURATION", this.durationToString(rangeBetween))
          .replaceAll("DAYS", daysString)
          .replaceAll(
            "AMOUNT",
            translate(this.weekDays.length === 1 ? "onDay" : "onDays")
          );
        break;
      case FreqRecurrence.days:
        resp += translate("dayTemplate").replaceAll(
          "DURATION",
          this.durationToString(rangeBetween)
        );
        break;
    }
    const endOfEventTemp = this.endOfTheEvent;
    if (endOfEventTemp !== null) {
      resp += ` ${translate("until")} ${this.dateToDateStr(endOfEventTemp)}`;
    }
    return resp;
  }

  isAccureInDate({
    date,
    considerException = true,
  }: {
    date: DateTime;
    considerException?: boolean;
  }): boolean {
    if (this.start === null || this.setToMidNight(this.start!).isAfter(date)) {
      return false;
    }
    const eventEnd = this.endOfTheEvent;
    if (eventEnd !== null && eventEnd.isBefore(this.setToMidNight(date))) {
      return false;
    }
    if (
      considerException &&
      this.exceptionDates.contains(this.setToMidNight(date))
    ) {
      return false;
    }
    const rangeBetween = new Duration(
      this.freqRecurrenceToDuration[this.freqRecurrence].inMinutes *
        this.interval
    );
    const intervalFromStart = date.difference(this.setToMidNight(this.start!));
    const startWeekDay = this.start!.weekday === 7 ? 0 : this.start!.weekday;
    const dateWeekDay = date.weekday === 7 ? 0 : date.weekday;
    if (this.freqRecurrence === FreqRecurrence.weeks) {
      const maxDelta = 7 - startWeekDay;
      const minDelta = rangeBetween.inDays - startWeekDay;
      const restOFdays =
        (intervalFromStart.inDays + rangeBetween.inDays) % rangeBetween.inDays;
      return (
        (restOFdays < maxDelta || restOFdays >= minDelta) &&
        this.weekDays.contains(dateWeekDay)
      );
    }
    if (this.freqRecurrence === FreqRecurrence.months) {
      const monthsDiffrence = this.monthDiffrence(this.start!, date);
      return (
        this.start!.day === date.day && monthsDiffrence % this.interval === 0
      );
    }
    return intervalFromStart.inDays % rangeBetween.inDays === 0;
  }

  addRangeBetween(date: Date): Date {
    const utcDate = new Date(
      date.year,
      date.month,
      date.day,
      date.hour,
      date.minute
    );
    if (this.freqRecurrence === FreqRecurrence.months) {
      return this.addMonths(utcDate, this.interval);
    } else {
      return utcDate.add(new Duration(this.rangeBetweenInterval.inMinutes));
    }
  }

  overlapingDatesWith(event: RecurrenceEvent): Set<DateTime> {
    if (this.start === null || event.start === null) {
      return new Set([new DateTime(0)]);
    }
    if (this.endOfTheEvent === null && event.endOfTheEvent === null) {
      return new Set([new DateTime(0)]);
    }
    const overlappingDates = new Set<DateTime>();
    const sortedEvents = this._getOptimalEventToPassOver(this, event);
    const eventForIteration = sortedEvents[0];
    const eventToCheck = sortedEvents[1];
    let datePointer = eventForIteration.start!;
    while (
      !this.setToMidNight(datePointer).isAfter(
        this.setToMidNight(eventForIteration.endOfTheEvent!)
      )
    ) {
      if (eventForIteration.freqRecurrence === FreqRecurrence.weeks) {
        const sunday = this.getStartOfWeek(datePointer);
        eventForIteration.weekDays.forEach((dayToCheck) => {
          const dateToCheck = sunday.add(new Duration({ days: dayToCheck }));
          if (
            eventToCheck.isAccureInDate({ date: dateToCheck }) &&
            eventForIteration.isAccureInDate({ date: dateToCheck })
          ) {
            overlappingDates.add(this.setToMidNight(dateToCheck));
          }
        });
      } else {
        if (
          eventToCheck.isAccureInDate({ date: datePointer }) &&
          eventForIteration.isAccureInDate({ date: datePointer })
        ) {
          overlappingDates.add(this.setToMidNight(datePointer));
        }
      }
      datePointer = this.addRangeBetween(datePointer);
    }
    return overlappingDates;
  }

  get isRelevant(): boolean {
    return (
      this.endOfTheEvent === null || this.endOfTheEvent!.isAfter(DateTime.now())
    );
  }

  nearestFutureAccurenceDate(
    date: DateTime,
    { needToBeAfterStart = true }: { needToBeAfterStart?: boolean } = {}
  ): DateTime | null {
    if (this.endOfTheEvent !== null && date.isAfter(this.endOfTheEvent!)) {
      return null;
    }
    if (
      this.start === null ||
      (date.isBefore(this.start!) &&
        needToBeAfterStart &&
        this.isAccureInDate({ date: this.start! }))
    ) {
      return this.start;
    }
    const delta = date.difference(this.start!).inDays;
    if (this.freqRecurrence === FreqRecurrence.weeks) {
      const jumpsToReachDate = Math.floor(
        delta / this.rangeBetweenInterval.inDays
      );
      let nearestDate = this.start!.add(
        new Duration({
          days: jumpsToReachDate * this.rangeBetweenInterval.inDays,
        })
      );
      const sunday = this.getStartOfWeek(nearestDate);
      for (const dayToCheck of this.weekDays) {
        const dateToCheck = sunday.add(new Duration({ days: dayToCheck }));
        if (
          !dateToCheck.isBefore(date) &&
          (this.endOfTheEvent === null ||
            !nearestDate.isAfter(this.endOfTheEvent!))
        ) {
          return dateToCheck;
        }
      }
      nearestDate = nearestDate.add(this.rangeBetweenInterval);
      const sunday = this.getStartOfWeek(nearestDate);
      for (const dayToCheck of this.weekDays) {
        const dateToCheck = sunday.add(new Duration({ days: dayToCheck }));
        if (
          !dateToCheck.isBefore(date) &&
          (this.endOfTheEvent === null ||
            !nearestDate.isAfter(this.endOfTheEvent!))
        ) {
          return dateToCheck;
        }
      }
      return null;
    }
    const jumpsToReachDate = Math.ceil(
      delta / this.rangeBetweenInterval.inDays
    );
    let nearestDate = this.start!.add(
      new Duration({
        days: jumpsToReachDate * this.rangeBetweenInterval.inDays,
      })
    );
    if (nearestDate.isBefore(date)) {
      nearestDate = this.addRangeBetween(nearestDate);
    }
    const end = this.endOfTheEvent;
    while (
      !this.isAccureInDate({ date: nearestDate }) &&
      (end === null || nearestDate.isBefore(end))
    ) {
      nearestDate = this.addRangeBetween(nearestDate);
    }
    if (end === null || !nearestDate.isAfter(end)) {
      return nearestDate;
    }
    return null;
  }

  private _getOptimalEventToPassOver(
    first: RecurrenceEvent,
    second: RecurrenceEvent
  ): RecurrenceEvent[] {
    if (first.endOfTheEvent === null && second.endOfTheEvent !== null) {
      return [second, first];
    }
    if (first.endOfTheEvent !== null && second.endOfTheEvent === null) {
      return [first, second];
    } else {
      if ((second.jumps ?? 99999) < (first.jumps ?? 99999)) {
        return [second, first];
      } else {
        return [first, second];
      }
    }
  }

  private getStartOfWeek(date: DateTime): DateTime {
    const dayOfWeek = date.weekday;
    const diff = (dayOfWeek - 1 + 7) % 7;
    return date.subtract(new Duration({ days: diff }));
  }

  private setToMidNight(date: DateTime): DateTime {
    return new DateTime(date.year, date.month, date.day);
  }

  private addMonths(date: DateTime, months: number): DateTime {
    const newMonth = ((date.month + months - 1) % 12) + 1;
    const yearDiff = Math.floor((date.month + months - 1) / 12);
    return new DateTime(
      date.year + yearDiff,
      newMonth,
      date.day,
      date.hour,
      date.minute
    );
  }

  private monthDiffrence(date1: DateTime, date2: DateTime): number {
    return (date2.year - date1.year) * 12 + date2.month - date1.month;
  }

  private durationToString(duration: Duration): string {
    const hours = Math.floor(duration.inMinutes / 60);
    const minutes = duration.inMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  private dateToDateStr(date: DateTime): string {
    return `${date.day}/${date.month}/${date.year}`;
  }
}
