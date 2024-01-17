import { DateFormat, addMonths } from "date-fns";

// Assuming these models are defined in other parts of your codebase
type Religion = "christian"; // Update with your actual Religion type
interface WorkerModel {
  religions: Religion[];
  shiftsFor(day: Date): string[];
}
interface BreakModel {
  day: string;
  start: string;
  minutesNotification: number;
}
interface CustomDateRange {
  start: Date;
  end: Date;
}

export function addDurationFromDateString(
  date: string,
  duration: Duration
): string {
  const dateObj = DateFormat("HH:mm").parse(date);
  dateObj.setMinutes(dateObj.getMinutes() + duration);
  return DateFormat("HH:mm").format(dateObj);
}

export function setTo1970(dateTime: Date): Date {
  return new Date(dateTime.setSeconds(0, 0));
}

export function setToMidNight(dateTime: Date): Date {
  return new Date(dateTime.setHours(0, 0, 0, 0));
}

export function setToStartOfMonth(dateTime: Date): Date {
  return new Date(dateTime.getFullYear(), dateTime.getMonth(), 1);
}

export function setToStartOfYear(dateTime: Date): Date {
  return new Date(dateTime.getFullYear(), 0, 1);
}

export function isHoliday(worker: WorkerModel, date: Date): boolean {
  let isHoliday = false;
  worker.religions.forEach((religion) => {
    let dateString = DateFormat("dd-MM-yyyy").format(date);
    switch (religion) {
      case "christian":
        dateString = dateString.substring(0, dateString.length - 4) + "0000";
        isHoliday = isHoliday || holidays.christian[dateString] !== undefined;
        return;
      default:
        isHoliday = isHoliday || holidays[religion][dateString] !== undefined;
        return;
    }
  });
  return isHoliday;
}

export function getHolidayNames(
  worker: WorkerModel,
  date: Date
): Record<Religion, string> {
  const holidaysString: Record<Religion, string> = {};
  worker.religions.forEach((religion) => {
    let dateString = DateFormat("dd-MM-yyyy").format(date);
    switch (religion) {
      case "christian":
        dateString = dateString.substring(0, dateString.length - 4) + "0000";
        if (holidays.christian[dateString] !== undefined) {
          holidaysString.christian = holidays.christian[dateString];
        }
        return;
      default:
        if (holidays[religion][dateString] !== undefined) {
          holidaysString[religion] = holidays[religion][dateString];
        }
        return;
    }
  });
  return holidaysString;
}

export function convertStringToTime(strTimes: string[] | null): Date[] {
  if (!strTimes) return [];
  const times: Date[] = [];
  strTimes.forEach((element) => {
    times.push(DateFormat("HH:mm").parse(element));
  });
  return times;
}

export function convertStringToDateTime(strTimes: string[] | null): Date[] {
  if (!strTimes) return [];
  const times: Date[] = [];
  strTimes.forEach((element) => {
    times.push(DateFormat("dd-MM-yyyy").parse(element));
  });
  return times;
}

export function getWeekOf(day: Date): Date[] {
  const weekDays: Date[] = [];
  const dayWeekConvertor = {
    7: 1,
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 6,
    6: 7,
  };

  const firstDayOfTheWeek = new Date(day);
  firstDayOfTheWeek.setDate(day.getDate() - dayWeekConvertor[day.getDay()]);

  for (let index = 0; index < 7; index++) {
    const indexDate = new Date(firstDayOfTheWeek);
    indexDate.setDate(firstDayOfTheWeek.getDate() + index);
    weekDays.push(indexDate);
  }
  return weekDays;
}

export function isDateOverlappingWorkTime(
  worker: WorkerModel,
  date: Date
): boolean {
  const workDay = worker.shiftsFor(date);
  const date1970 = setTo1970(date);

  let isOverlapping = false;

  for (let i = 0; i < workDay.length; i += 2) {
    if (workDay.length <= i + 1) {
      continue;
    }

    const start = DateFormat("HH:mm").parse(workDay[i]);
    const end = DateFormat("HH:mm").parse(workDay[i + 1]);

    if (!date1970.isBefore(start) && !date1970.isAfter(end)) {
      isOverlapping = true;
      break;
    }
  }
  return isOverlapping;
}

export function isInTheRange(range: CustomDateRange, date: Date): boolean {
  return !date.isBefore(range.start) && !date.isAfter(range.end);
}

export function firstDayOfTheMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function laterDate(date1: Date, date2: Date): Date {
  return date2.isAfter(date1) ? date2 : date1;
}

export function dateToRemindBooking(
  booking: BookingModel,
  minutes: number
): Date {
  return new Date(
    booking.bookingDate.getTime() - minutes * 60 * 1000
  ).toUTCString();
}

export function dateToRemindMultiBooking(
  multiBooking: MultiBooking,
  minutes: number
): Date {
  return new Date(
    multiBooking.bookingDate.getTime() - minutes * 60 * 1000
  ).toUTCString();
}

export function dateToNotifyBreak(breakModel: BreakModel): Date {
  const date = dateStrToDate(breakModel.day);
  const time = timeStrToDate(breakModel.start);
  const breakDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes()
  );
  return new Date(
    breakDate.getTime() - breakModel.minutesNotification * 60 * 1000
  ).toUTCString();
}

export function allMonthBetween(date1: Date, date2: Date): Set<string> {
  const months = new Set<string>();
  let tempStart = date1.getTime() < date2.getTime() ? date1 : date2;
  const end = date1.getTime() < date2.getTime() ? date2 : date1;

  while (
    !setToStartOfMonth(tempStart).getTime() > setToStartOfMonth(end).getTime()
  ) {
    months.add(dateToMonthStr(new Date(tempStart)));
    tempStart = addMonths(setToStartOfMonth(tempStart), 1).getTime();
  }
  return months;
}
