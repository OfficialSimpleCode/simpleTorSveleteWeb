import { format, startOfWeek } from "date-fns";

import Booking from "$lib/models/booking/booking_model.js";
import { Duration } from "$lib/models/core/duration.js";
import type WorkerModel from "$lib/models/worker/worker_model.js";

import { addDuration } from "./duration_utils.js";

import { Religion, holidays } from "$lib/consts/worker_schedule.js";
import moment from "moment";
import Event from "../models/schedule/calendar_event.js";
import { translate } from "./translate.js";

/**
 * Checks if the booking end is on midnight and it's a worker action.
 * @param endWork - The end time of the work.
 * @param booking - The booking details.
 * @returns True if the booking end is on midnight and it's a worker action, false otherwise.
 */
export function workerBookingOnMidnight(
  endWork: Date,
  booking: Booking
): boolean {
  const endOfBooking = addDuration(
    booking.bookingDate,
    new Duration({ minutes: booking.totalMinutes })
  );
  return (
    endWork.getTime() === timeStrToDate("23:59").getTime() &&
    endOfBooking.getHours() === 0 &&
    endOfBooking.getMinutes() === 0
  );
}

/**
 * Filters and returns the list of times equal to or after the specified start time.
 * @param times - List of times.
 * @param startTime - Start time.
 * @returns Filtered list of times.
 */
export function getOnlyEqualOrAfter(times: Date[], startTime: Date): Date[] {
  const filteredList: Date[] = [];
  for (let i = 0; i < times.length; i += 2) {
    if (times[i + 1] >= startTime) {
      filteredList.push(times[i], times[i + 1]);
    }
  }
  return filteredList;
}

export function getValidDataTimeToCheck(time: Date): Date {
  const minutes = parseInt(time.toLocaleTimeString().slice(3, 5));
  const hours = parseInt(time.toLocaleTimeString().slice(0, 2));
  return new Date(1970, 0, 1, hours, minutes);
}

/// Get `closestEvent` and `event` Return if the event is after
/// in less than 10 minutes
export function isRightAfterEvent(
  event: Event,
  closestEvent: Event | null
): boolean {
  if (closestEvent === null) {
    return false;
  }

  return (
    closestEvent.to.getTime() - event.from.getTime() < 10 * 60 * 1000 &&
    closestEvent.to.getTime() - event.from.getTime() >= 0
  );
}

export function dateToTimeStr(date: Date): string {
  return format(date, "HH:mm");
}

export function dateToStrAccoridngToFormat(
  date: Date,
  stringFormat: string
): string {
  return format(date, stringFormat, {
    //locale: LanguageHelper().currentLaguageCode
  });
}

export function dateToDayStr(date: Date): string {
  return format(date, "dd");
}

export function dateToMonthStr(date: Date): string {
  return format(date, "MM-yyyy");
}

export function dateToCustomDayAndMonthStr(date: Date): string {
  return format(date, "dd/M");
}

export function dateToCustomDayAndMonthAndHourStr(
  date: Date,
  showHours: boolean
): string {
  return showHours ? format(date, "dd/M H:mm") : format(date, "dd/M");
}

export function dateToCustomYearAndDayAndMonthAndHourStr(date: Date): string {
  return format(date, "dd/M/yy H:mm");
}

export function dateToDateStr(date: Date, sparateSign: string = "-"): string {
  return format(date, `dd${sparateSign}MM${sparateSign}yyyy`);
}

export function dateToDateStrCustomPattern(
  date: Date,
  pattern: string
): string {
  return format(date, pattern);
}

export function timeStrToDate(dateStr: string): Date {
  const date = moment(dateStr, "HH:mm").toDate();
  date.setFullYear(1970);
  date.setMonth(0);
  date.setDate(1);
  return date;
}

export function dateStrToDate(date: string, sparateSign: string = "-"): Date {
  const [day, month, year] = date.split(sparateSign).map(Number);

  // Month in JavaScript Date object is 0-indexed, so subtract 1 from the parsed month.
  return new Date(year, month - 1, day);
}

export function dateStrToDateWithTwoDigit(
  date: string,
  sparateSign: string = "-"
): Date {
  let [day, month, year] = date.split(sparateSign).map(Number);
  year = year + 2000;
  // Month in JavaScript Date object is 0-indexed, so subtract 1 from the parsed month.
  return new Date(year, month - 1, day);
}

export function monthStrToDate(date: string): Date {
  return moment(date, "MM-yyyy").toDate();
}

export function laterDate(date1: Date | null, date2: Date | null): Date | null {
  if (date1 === null && date2 === null) {
    return null;
  }
  if (date1 === null) {
    return date2!;
  }
  if (date2 === null) {
    return date1;
  }
  if (date1 > date2) {
    return date1;
  }
  return date2;
}

export function firstDate(date1: Date | null, date2: Date | null): Date | null {
  if (date1 === null && date2 === null) {
    return null;
  }
  if (date1 === null) {
    return date2!;
  }
  if (date2 === null) {
    return date1;
  }
  if (date1 < date2) {
    return date1;
  }
  return date2;
}

export function partOfDay(date: Date): string {
  if (
    (date.getHours() >= 19 && date.getHours() <= 23) ||
    (date.getHours() >= 0 && date.getHours() <= 2)
  ) {
    return translate("night");
  }

  if (date.getHours() >= 3 && date.getHours() <= 4) {
    return translate("beforeMorning");
  }

  if (date.getHours() >= 5 && date.getHours() <= 11) {
    return translate("morning");
  }

  return translate("noon");
}

export function isWeekend(date: Date): boolean {
  return date.getDay() === 6 || date.getDay() === 0; // Saturday or Sunday
}

export function setToStartOfYear(date: Date): Date {
  return new Date(date.getFullYear(), 0, 1);
}

export function setToStartOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function setToMidNight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function setTo1970(date: Date): Date {
  return new Date(1970, 0, 1, date.getHours(), date.getMinutes());
}

export function convertStringToTime(times: string[]): Date[] {
  const convertedTimes: Date[] = [];
  for (let i = 0; i < times.length; i++) {
    convertedTimes.push(timeStrToDate(times[i])); // Assuming timeStrToDate is defined
  }
  return convertedTimes;
}

export function getStartOfWeek(date: Date): Date {
  // Get the start of the week (Sunday) for the given date
  const startOfTheWeek = startOfWeek(date, { weekStartsOn: 0 }); // Assuming Sunday is the first day of the week

  return startOfTheWeek;
}

export function fixDateMonth(date: Date): Date {
  const dateMonth = date.getMonth();
  date.setMonth(dateMonth + 1);
  return date;
}

export function isHoliday(worker: WorkerModel, date: Date): boolean {
  let isHoliday = false;
  worker.religions.forEach((religion) => {
    let dateString = dateToDateStr(date);
    switch (religion) {
      case Religion.christian:
        dateString = dateString.substring(0, dateString.length - 4) + "0000";
        isHoliday =
          (isHoliday || holidays[Religion.christian]?.[dateString] != null) ??
          false;
        break;
      default:
        isHoliday =
          (isHoliday || holidays[religion]?.[dateString] != null) ?? false;
        break;
    }
  });
  return isHoliday;
}

export function dateIsoStr(date: Date) {
  return `${format(date, "yyyy-MM-dd")}T${format(date, "HH:mm:ss")}.000Z`;
}

export function isoToDate(dateStr: string): Date {
  const newStr = dateStr.replace("Z", "");

  return new Date(newStr);
}

export function dateToUtc(date: Date) {
  return isoToDate(date.toISOString());
}
