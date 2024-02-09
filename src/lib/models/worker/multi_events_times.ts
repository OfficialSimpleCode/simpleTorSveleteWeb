import { dateStrToDate } from "$lib/utils/times_utils";
import { addDays } from "date-fns";
import type { Unsubscribe } from "firebase/firestore";
import MultiBookingTime from "../multi_booking/multi_booking_time";

export default class MultiEventsTimes {
  times: Record<string, Record<string, MultiBookingTime>> = {};
  duringPaymentsTimes: Record<string, Record<string, MultiBookingTime>> = {};
  listener?: Unsubscribe;
  lastBookingTimeDate?: Date;

  constructor() {}

  static fromJson(json: Record<string, any>): MultiEventsTimes {
    const instance = new MultiEventsTimes();
    instance.setData(json);
    return instance;
  }

  setData(json: Record<string, any>, includeDuringPayment = true): void {
    this.times = {};

    if (json["eventsTimes"] !== null) {
      Object.entries(json["eventsTimes"]).forEach(([dateString, timesJson]) => {
        const date = dateStrToDate(dateString);
        const lastWeek = addDays(new Date(), -7);

        if (
          date >= lastWeek &&
          timesJson instanceof Object &&
          Object.keys(timesJson).length > 0
        ) {
          this.times[dateString] = {};

          Object.entries(timesJson).forEach(([timeStr, timeJson]) => {
            this.times[dateString]![timeStr] =
              MultiBookingTime.fromJson(timeJson);
          });
        }
      });
    }

    if (json["eventsTimeDuringPayment"] != null && includeDuringPayment) {
      Object.entries<Record<string, any>>(
        json["eventsTimeDuringPayment"]
      ).forEach(([dateString, dayTimes]) => {
        const date = dateStrToDate(dateString);
        const lastWeek = addDays(new Date(), -7);

        if (date >= lastWeek) {
          Object.entries<Record<string, any>>(dayTimes).forEach(
            ([bookingTime, details]) => {
              const timeObj = MultiBookingTime.fromJson(details);
              if (
                timeObj.expiredDate !== null &&
                timeObj.expiredDate!.getTime() > Date.now()
              ) {
                this.times[dateString] ??= {};
                if (this.times[dateString]![bookingTime] === null) {
                  const newTimeObj =
                    MultiBookingTime.fromMultiBookingTime(timeObj);
                  newTimeObj.expiredDate = undefined;
                  this.times[dateString]![bookingTime] = newTimeObj;
                } else {
                  this.times[dateString]![bookingTime]!.currentParticipants +=
                    timeObj.currentParticipants;
                }

                if (date > (this.lastBookingTimeDate || new Date(0))) {
                  this.lastBookingTimeDate = date;
                }

                this.duringPaymentsTimes[dateString] ??= {};
                this.duringPaymentsTimes[dateString]![bookingTime] = timeObj;
              }
            }
          );
        }
      });
    }
  }

  // emptyBookingTimesDatesInMonth(monthString: string): void {
  //   this.times.forEach((_, dayString) => {
  //     if (dayString.includes(monthString)) {
  //       this.times.set(dayString, new Map());
  //     }
  //   });
  // }

  toJson(): Record<string, Record<string, any>> {
    const data: Record<string, Record<string, any>> = {};
    data["eventsTimes"] = {};

    Object.entries(this.times).forEach(([date, map]) => {
      data["eventsTimes"][date] = {};
      Object.entries(map).forEach(([timeStr, timeObj]) => {
        data["eventsTimes"][date]![timeStr] = timeObj.toJson();
      });
    });

    return data;
  }
}
