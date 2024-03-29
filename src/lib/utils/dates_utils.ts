import { Religion, holidays } from "$lib/consts/worker_schedule";
import type Booking from "$lib/models/booking/booking_model";
import type WorkerModel from "$lib/models/worker/worker_model";

import { weekdays } from "$lib/consts/times";
import { Duration } from "$lib/models/core/duration";
import type MultiBooking from "$lib/models/multi_booking/multi_booking";
import type BreakModel from "$lib/models/schedule/break_model";
import { addDays, addMonths, startOfWeek } from "date-fns";
import { addDuration, subDuration } from "./duration_utils";
import {
  dateStrToDate,
  dateToDateStr,
  dateToMonthStr,
  dateToTimeStr,
  dateToUtc,
  getStartOfWeek,
  timeStrToDate,
} from "./times_utils";

export function setTo1970(dateTime: Date): Date {
  return timeStrToDate(dateToTimeStr(dateTime));
}

export function setToMidNight(dateTime: Date): Date {
  return dateStrToDate(dateToDateStr(dateTime));
}

export function setToStartOfMonth(dateTime: Date): Date {
  return new Date(dateTime.getFullYear(), dateTime.getMonth(), 1);
}

export function setToStartOfYear(dateTime: Date): Date {
  return new Date(dateTime.getFullYear(), 0, 1);
}

export function getHolidayNames(
  worker: WorkerModel,
  date: Date
): { [key in Religion]?: string } {
  const holidaysString: { [key in Religion]?: string } = {};
  worker.religions.forEach((religion) => {
    let dateString = dateToDateStr(date);

    switch (religion) {
      case Religion.christian:
        dateString = dateString.substring(0, dateString.length - 4) + "0000";
        if (holidays[religion]?.[dateString] != null) {
          holidaysString[religion] = holidays[religion]![dateString];
        }
        return;
      default:
        if (holidays[religion]![dateString] != null) {
          holidaysString[religion] = holidays[religion]![dateString]!;
        }
        return;
    }
  });
  return holidaysString;
}

export function convertStringToTime(strTimes: string[] | null): Date[] {
  if (strTimes == null) return [];
  const times: Date[] = [];
  strTimes.forEach((element) => {
    times.push(timeStrToDate(element));
  });
  return times;
}

export function convertStringToDateTime(strTimes: string[] | null): Date[] {
  if (strTimes == null) return [];
  const times: Date[] = [];
  strTimes.forEach((element) => {
    times.push(dateStrToDate(element));
  });
  return times;
}

export function getWeekOf(day: Date): Date[] {
  let weekDays: Date[] = [];
  const firstDayOfWeek = startOfWeek(day, { weekStartsOn: 1 });
  // adding the days
  for (let index = 0; index < 7; index++) {
    let indexDate = addDays(firstDayOfWeek, index);
    weekDays.push(indexDate);
  }
  return weekDays;
}

export function isDateOverlappingWorkTime(
  worker: WorkerModel,
  date: Date
): boolean {
  const workDay = worker.shiftsFor({ day: date });
  const date1970 = setTo1970(date);
  let isOverlapping = false;
  for (let i = 0; i < workDay.length; i += 2) {
    if (workDay.length <= i + 1) {
      continue;
    }
    const start = timeStrToDate(workDay[i]);
    const end = timeStrToDate(workDay[i + 1]);
    if (date1970 >= start && date1970 <= end) {
      isOverlapping = true;
      break;
    }
  }
  return isOverlapping;
}

export function firstDayOfTheMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function monthDifference(date1: Date, date2: Date): number {
  let years = date1.getFullYear() - date2.getFullYear();
  let months = date1.getMonth() - date2.getMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return Math.abs(years * 12 + months);
}

export function laterDate(date1: Date | null, date2: Date | null): Date | null {
  if (date1 === null && date2 === null) {
    return null;
  }
  if (date1 === null) {
    return date2;
  }
  if (date2 === null) {
    return date1;
  }

  return date2 > date1 ? date2 : date1;
}

export function dateToRemindBooking(booking: Booking, minutes: number): Date {
  return subDuration(
    dateToUtc(booking.bookingDate),
    new Duration({ minutes: minutes })
  );
}
///Get break Return the date that need to notify the worker about it
///in utc time
export function dateToNotifyBreak(breakModel: BreakModel): Date {
  return subDuration(
    dateToUtc(breakModel.bookingDate),
    new Duration({ minutes: breakModel.minutesNotification })
  );
}

export function dateToRemindMultiBooking(
  multiBooking: MultiBooking,
  minutes: number
): Date {
  return dateToUtc(
    subDuration(multiBooking.bookingDate, new Duration({ minutes: minutes }))
  );
}

export function allMonthBetween(date1: Date, date2: Date): Set<string> {
  const months = new Set<string>();
  let tempStart = date1 < date2 ? date1 : date2;
  const end = date1 < date2 ? date2 : date1;
  while (!(setToStartOfMonth(tempStart) > setToStartOfMonth(end))) {
    months.add(dateToMonthStr(tempStart));
    tempStart = addMonths(setToStartOfMonth(tempStart), 1);
  }
  return months;
}

export function getWeekdayFromDate(date: Date): string {
  // Get the day of the week (0-6)
  var dayOfWeek = date.getDay();

  // Get the weekday name
  var weekdayName = weekdays[dayOfWeek];

  return weekdayName;
}

export function allWeekDays(date: Date): Date[] {
  let finalList: Date[] = [];
  let firstDate = getStartOfWeek(date);
  for (let i = 0; i < 7; i++) {
    finalList.push(firstDate);
    firstDate = addDuration(firstDate, new Duration({ days: 1 }));
  }
  return finalList;
}

///Utc delta time is diffrent in some dates because of the light day saving time
///Ex: utcDeltaMinutes(DateTime(2024,2,4)) == 120 and
///utcDeltaMinutes(DateTime(2024,5,10)) == 180
///need to give the func the date you want to calculate the utcDeltaMinutes for
///and not some random date
export function utcDeltaMinutes(date: Date): number {
  return Math.abs(date.getTimezoneOffset());
}

// enum CustomDurationOptions {
//   last30Days,
//   last7Days,
//   lastYear,
//   custom,
//   fromBeginOfWorker
// }

// const customDurationOptionsToStr: { [key in CustomDurationOptions]: string } = {
//   [CustomDurationOptions.last30Days]: "last30Days",
//   [CustomDurationOptions.last7Days]: "last7Days",
//   [CustomDurationOptions.lastYear]: "lastYear",
//   [CustomDurationOptions.custom]: "custom",
//   [CustomDurationOptions.fromBeginOfWorker]: "fromBeginOfWorker"
// };

// class CustomDateRange {
//   option: CustomDurationOptions;
//   start: Date;
//   end: Date;

//   constructor(option: CustomDurationOptions, start: Date, end: Date) {
//     this.option = option;
//     this.start = start;
//     this.end = end;
//   }

//   toPickerDateRange(): PickerDateRange {
//     return new PickerDateRange(this.end, this.start);
//   }

//   toDateTimeRange(): DateTimeRange {
//     return new DateTimeRange(this.start, this.end);
//   }

//   isTheSame(range: CustomDateRange): boolean {
//     return this.start.getTime() === range.start.getTime() && this.end.getTime() === range.end.getTime();
//   }
// }

// // Assuming PickerDateRange and DateTimeRange are defined elsewhere in your TypeScript code.
// // If not, you would need to define these classes or use appropriate types from a library.
