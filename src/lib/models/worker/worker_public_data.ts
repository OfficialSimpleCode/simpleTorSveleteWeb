import {
  dateToDateStr,
  dateToTimeStr,
} from "$lib/utils/times_utils/times_utils";

import { Timestamp, type Unsubscribe } from "firebase/firestore";

export default class WorkerPublicData {
  bookingsTimes: Record<string, Record<string, number>> = {};
  lastBookingTimeDate?: Date;
  duringPaymentBookingsTime: Record<
    string,
    Record<string, [Timestamp, number]>
  > = {};
  listener?: Unsubscribe;

  constructor() {}

  findLastBookingsTimesDate(): Date | undefined {
    let lastDate: Date | undefined;
    Object.entries(this.bookingsTimes).forEach(([dateStr, bookings]) => {
      const currentDate = new Date(dateStr);
      if (
        Object.keys(bookings).length > 0 &&
        (!lastDate || currentDate > lastDate)
      ) {
        lastDate = currentDate;
      }
    });
    return lastDate;
  }

  setWorkerPublicData(json: Record<string, any>, includeVacation = true): void {
    this.duringPaymentBookingsTime = {};
    this.bookingsTimes = {};

    // Assuming dayLightSavingTimes is defined somewhere
    dayLightSavingTimes.forEach((date) => {
      date = new Date(date.getTime() + 60 * 60 * 1000); // Add 1 hour
      this.bookingsTimes[dateToDateStr(date)] = { [dateToTimeStr(date)]: 60 };
    });

    if (json["bookingsTimes"] != undefined) {
      Object.entries<Record<string, any>>(json["bookingsTimes"]!).forEach(
        ([dateString, times]) => {
          const date = new Date(dateString);
          const lastWeek = new Date();
          lastWeek.setDate(lastWeek.getDate() - 7);

          if (date >= lastWeek && Object.keys(times).length != 0) {
            this.bookingsTimes[dateString] = {};

            Object.entries(times).forEach(([time, duration]) => {
              if (time.includes("00:00v")) {
                if (includeVacation) {
                  this.bookingsTimes[dateString] = { "00:00": 1439 };
                }
              } else {
                if (
                  time !== "00:00" ||
                  this.bookingsTimes[dateString]["00:00"] != 1439
                ) {
                  this.bookingsTimes[dateString][time] = duration as number;
                }
              }
            });

            if (
              Object.keys(times).length > 0 &&
              date > (this.lastBookingTimeDate || new Date(0))
            ) {
              this.lastBookingTimeDate = date;
            }
          }
        }
      );
    }

    if (json["duringPaymentBookingsTime"] !== null) {
      Object.entries(json["duringPaymentBookingsTime"]).forEach(
        ([dateString, times]) => {
          const date = new Date(dateString);
          const lastWeek = new Date();
          lastWeek.setDate(lastWeek.getDate() - 7);

          if (date >= lastWeek) {
            Object.entries(
              times as Record<string, [Timestamp, number]>
            ).forEach(([bookingTime, details]) => {
              if (
                details.length === 2 &&
                details[0] instanceof Timestamp &&
                details[0].toDate().getTime() > Date.now() &&
                typeof details[1] === "number"
              ) {
                if (dateString in this.bookingsTimes) {
                  this.bookingsTimes[dateString]![bookingTime] = details[1];
                } else {
                  this.bookingsTimes[dateString] = {
                    [bookingTime]: details[1],
                  };
                }

                if (date > (this.lastBookingTimeDate || new Date(0))) {
                  this.lastBookingTimeDate = date;
                }

                if (dateString in this.duringPaymentBookingsTime) {
                  this.duringPaymentBookingsTime[dateString]![bookingTime] =
                    details;
                } else {
                  this.duringPaymentBookingsTime[dateString] = {
                    [bookingTime]: details,
                  };
                }
              }
            });
          }
        }
      );
    }
  }

  emptyBookingTimesDatesInMonth(monthString: string): void {
    Object.entries(this.bookingsTimes).forEach(([dayString, _]) => {
      if (dayString.includes(monthString)) {
        this.bookingsTimes[dayString] = {};
      }
    });
  }

  toWorkerPublicDataJson(): Record<
    string,
    Record<string, Record<string, unknown>>
  > {
    const data: Record<string, Record<string, Record<string, unknown>>> = {};
    data["bookingsTimes"] = {};

    Object.entries(this.bookingsTimes).forEach(([date, map]) => {
      data["bookingsTimes"][date] = {};
      Object.entries(map).forEach(([time, duration]) => {
        data["bookingsTimes"][date]![time] = duration;
      });
    });

    data["duringPaymentBookingsTime"] = {};
    Object.entries(this.duringPaymentBookingsTime).forEach(([date, map]) => {
      data["duringPaymentBookingsTime"][date] = {};
      Object.entries(map).forEach(([time, details]) => {
        data["duringPaymentBookingsTime"][date]![time] = details;
      });
    });

    return data;
  }
}
