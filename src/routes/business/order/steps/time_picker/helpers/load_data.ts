import { dayLightSavingTimes } from "$lib/consts/schedule";
import {
  minutesIn24Hours,
  minutesInHour,
  timeHeight,
  waitingListHeight,
} from "$lib/consts/times";
import { WindowSpaces } from "$lib/consts/worker";
import BookingController, {
  bookingMakerStore,
} from "$lib/controllers/booking_controller";
import Booking from "$lib/models/booking/booking_model";
import { Duration } from "$lib/models/core/duration";
import TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
import type WorkerModel from "$lib/models/worker/worker_model";
import { relevantHoures } from "$lib/utils/available_times_utils/relevant_hours";
import { relevantMultiEventTime } from "$lib/utils/available_times_utils/relevant_multi_event_times";
import { setToMidNight } from "$lib/utils/dates_utils";
import { addDuration } from "$lib/utils/duration_utils";
import { dateToDateStr, isHoliday } from "$lib/utils/times_utils";
import { get } from "svelte/store";

export function loadBookingMakerTimeData(
  visibleDates: Date[],
  worker: WorkerModel | undefined,
  timeIntervalHeight: number[],
  isUpdateSheet?: boolean,
  oldBooking?: Booking,
  oldBookingForReccurence?: Date
): void {
  const bookingMaker = get(bookingMakerStore);
  BookingController.visibleDates = visibleDates;
  console.log(bookingMaker);
  if (worker === null) {
    return;
  }
  // empty the current events
  BookingController.timePickerObjects = [];
  //remember the first date that user saw in the screen
  if (visibleDates.length > 1) {
    BookingController.firstDateToShow = visibleDates[0];
  }
  const lastDateTemp = lastDate(worker);
  if (lastDateTemp === undefined) {
    return;
  }
  const daysTimes: Record<string, TimePickerObj[]> = {};
  let maxLen = 0;
  // setting the new days data
  visibleDates.forEach((visibleDate, index) => {
    // generate only for days the user allowed to order

    if (
      visibleDate >= lastDateTemp ||
      visibleDate < setToMidNight(new Date())
    ) {
      return;
    }
    // get the times for this booking
    let dayTimes: TimePickerObj[] = [];
    if (bookingMaker.isMultiEvent === true) {
      if (Object.keys(bookingMaker.services).length === 1) {
        dayTimes = relevantMultiEventTime({
          worker: worker!,
          dateForCheck: visibleDate,
          treatment: Object.values(bookingMaker.services)[0],
        });
      }
    } else {
      // create the booking for searching tims
      const booking: Booking = BookingController.bookingFromValues;
      booking.bookingDate = visibleDate;
      dayTimes = [];
      switch (worker!.windowSpaces) {
        case WindowSpaces.first:
          dayTimes = relevantHoures({
            worker: worker!,
            booking: Booking.fromBooking(booking),
            isUpdate: isUpdateSheet,
            oldBooking: oldBooking,
            recurrenceSkipDate: oldBookingForReccurence,
            amoutLimit: 1,
          });
          break;
        case WindowSpaces.last:
          dayTimes = relevantHoures({
            worker: worker,
            booking: Booking.fromBooking(booking),
            isUpdate: isUpdateSheet,
            oldBooking: oldBooking,
            recurrenceSkipDate: oldBookingForReccurence,
            reverse: true,
            amoutLimit: 1,
          });
          break;
        case WindowSpaces.edges:
          dayTimes = getEdgeTimes(
            worker!,
            booking,
            oldBooking,
            isUpdateSheet,
            oldBookingForReccurence
          );
          break;
        default:
          dayTimes = relevantHoures({
            worker: worker,
            booking: Booking.fromBooking(booking),
            isUpdate: isUpdateSheet,
            oldBooking: oldBooking,
            recurrenceSkipDate: oldBookingForReccurence,
          });

          break;
      }
    }
    // no times founded
    if (dayTimes.length <= 0) {
      daysTimes[dateToDateStr(visibleDate)] = [];

      return;
    }
    // save the times list for this day
    daysTimes[dateToDateStr(visibleDate)] = dayTimes;

    // save the length if is higher then current
    maxLen = Math.max(maxLen, daysTimes[dateToDateStr(visibleDate)].length);
  });

  // normalize the len to not cause heigth of 0 or very low like 20
  maxLen = Math.max(maxLen + 1, 15); // adding 1 to put padding at the end

  maxLen += worker!.showWaitingListWhenThereIsChoises ? 4 : 0;
  // fix the calendar timeIntervalHour size
  fixCalendartSizes(maxLen, timeIntervalHeight);
  const minutesForWaitingsList = minutesForWithingList(timeIntervalHeight);
  console.log(maxLen);
  Object.entries(daysTimes).forEach(([visibleDateStr, timeList]) => {
    const visibleDate = new Date(visibleDateStr);
    if (worker!.recurrence.vacationInDate(visibleDate) != undefined) {
      if (worker!.showVacations) {
        const newTimePickerObj = new TimePickerObj({
          displayDate: undefined,
          isVacation: true,
        });
        newTimePickerObj.from = visibleDate;
        newTimePickerObj.duration = new Duration({
          minutes: Math.floor(minutesForWaitingsList * 1.3),
        });
        BookingController.timePickerObjects.push(newTimePickerObj.toJson());
      }
      return;
    }
    if (isHoliday(worker!, visibleDate) && worker!.closeScheduleOnHolidays) {
      const newTimePickerObj = new TimePickerObj({
        displayDate: undefined,
        isHoliday: true,
      });
      newTimePickerObj.from = visibleDate;
      newTimePickerObj.duration = new Duration({
        minutes: Math.floor(minutesForWaitingsList * 1.3),
      });
      BookingController.timePickerObjects.push(newTimePickerObj.toJson());
      return;
    }
    const eventMinutes = Math.floor(minutesIn24Hours / maxLen);
    console.log(eventMinutes);
    // put the events inside the events timePickerObjects to display them nex frame
    let minutesToPresent = 0;
    timeList.forEach((timeObj, index) => {
      if (bookingMaker.isMultiEvent !== true || timeObj.hasFreePlace) {
        const minutesToAdd =
          timeObj.showParticipants && timeObj.isMulti
            ? Math.ceil(eventMinutes * 1.5)
            : eventMinutes;
        let dateToPut = addDuration(
          visibleDate,
          new Duration({ minutes: minutesToPresent })
        );
        // Patch for the DateTime(2023, 10, 29) when the
        // clock is moving to winter clock = Daylight saving time
        if (
          dayLightSavingTimes.has(visibleDate) &&
          dateToPut > addDuration(visibleDate, new Duration({ hours: 1 }))
        ) {
          dateToPut = addDuration(dateToPut, new Duration({ hours: 1 }));
        }
        const newTimePickerObj = TimePickerObj.fromTimePickerObj(timeObj);

        newTimePickerObj.from = dateToPut;
        newTimePickerObj.duration = new Duration({ minutes: minutesToAdd });

        BookingController.timePickerObjects.push(newTimePickerObj.toJson());
        minutesToPresent += minutesToAdd;
      } else {
        if (
          bookingMaker.isMultiEvent === true &&
          !timeObj.showMultiWaitingList
        ) {
          return;
        }
        const newTimePickerObj = new TimePickerObj({
          ...timeObj,
          isWaitingList: true,
        });

        newTimePickerObj.from = addDuration(
          visibleDate,
          new Duration({ minutes: minutesToPresent })
        );
        newTimePickerObj.duration = new Duration({
          minutes: Math.ceil(minutesForWaitingsList * 1.1),
        });
        BookingController.timePickerObjects.push(newTimePickerObj.toJson());
        minutesToPresent += Math.ceil(minutesForWaitingsList * 1.1);
      }
    });
    if (
      (timeList.length === 0 || worker!.showWaitingListWhenThereIsChoises) &&
      bookingMaker.isMultiEvent != true
    ) {
      const newTimePickerObj = new TimePickerObj({
        displayDate: undefined,
        isWaitingList: true,
      });
      newTimePickerObj.from = addDuration(
        visibleDate,
        new Duration({ minutes: minutesToPresent })
      );
      (newTimePickerObj.duration = new Duration({
        minutes: minutesForWaitingsList,
      })),
        BookingController.timePickerObjects.push(newTimePickerObj.toJson());
      return;
    }
  });
}

function getEdgeTimes(
  worker: WorkerModel,
  booking: Booking,
  oldBooking?: Booking,
  isUpdateSheet?: boolean,
  oldBookingForReccurence?: Date
): TimePickerObj[] {
  const first = relevantHoures({
    worker: worker,
    booking: Booking.fromBooking(booking),
    isUpdate: isUpdateSheet,
    oldBooking: oldBooking,
    recurrenceSkipDate: oldBookingForReccurence,
    amoutLimit: 1,
  });
  const last = relevantHoures({
    worker: worker,
    booking: Booking.fromBooking(booking),
    reverse: true,
    isUpdate: isUpdateSheet,
    oldBooking: oldBooking,
    recurrenceSkipDate: oldBookingForReccurence,
    amoutLimit: 1,
  });
  const finalTimes = new Set<TimePickerObj>();
  if (first.length > 0) {
    finalTimes.add(first[0]);
  }
  if (last.length > 0) {
    finalTimes.add(last[0]);
  }
  return Array.from(finalTimes);
}

function fixCalendartSizes(
  longestList: number,
  timeIntervalHeight: number[]
): void {
  if (longestList === 0) {
    return;
  }
  // divide the day minutes to all the events
  const eventMinutes = Math.floor(minutesIn24Hours / longestList);
  // calculate the neccessary heigth for hour to display "timeHeight" to time
  timeIntervalHeight[0] = timeHeight * (minutesInHour / eventMinutes);
}

function minutesForWithingList(timeIntervalHeight: number[]): number {
  // divide the day minutes to all the events
  const housrToGetHeight = waitingListHeight / timeIntervalHeight[0];
  // calculate the neccessary heigth for hour to display "timeHeight" to time
  return Math.ceil(housrToGetHeight * minutesInHour);
}

function lastDate(worker: WorkerModel | undefined): Date | undefined {
  if (worker === undefined) {
    return undefined;
  }
  return addDuration(
    setToMidNight(new Date()),
    new Duration({ days: worker.daysToAllowBookings })
  );
}
