import { dayLightSavingTimes } from "$lib/consts/schedule";

import { WindowSpaces } from "$lib/consts/worker";
import { weekDays } from "$lib/consts/worker_schedule";
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
import {
  dateStrToDate,
  dateToDateStr,
  getStartOfWeek,
  isHoliday,
} from "$lib/utils/times_utils";
import { get } from "svelte/store";
import { length } from "./core_utils";

export function loadBookingMakerTimeData(): void {
  const bookingMaker = get(bookingMakerStore);
  const worker = BookingController.worker;
  if (worker == null) {
    return;
  }
  console.log(worker.specificRangeChanges);
  // empty the current events
  bookingMaker.timePickerObjects = {};
  //remember the first date that user saw in the screen
  if (bookingMaker.timePickerDisplayDates.length > 1) {
    BookingController.firstDateToShow = bookingMaker.timePickerDisplayDates[0];
  }
  const lastDateTemp = lastDate(worker);
  if (lastDateTemp === undefined) {
    return;
  }

  const daysTimes: Record<string, TimePickerObj[]> = {};
  let maxLen = 0;
  // setting the new days data

  bookingMaker.timePickerDisplayDates.forEach((visibleDate) => {
    // generate only for days the worker allowed to order
    if (
      visibleDate >= lastDateTemp ||
      visibleDate < setToMidNight(new Date())
    ) {
      return;
    }
    // get the times for this booking
    let dayTimes: TimePickerObj[] = [];
    if (bookingMaker.isMultiEvent) {
      if (length(bookingMaker.services) === 1) {
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
            isUpdate: bookingMaker.isUpdate,
            oldBooking: bookingMaker.oldBooking,
            recurrenceSkipDate: bookingMaker.oldBooking?.recurrenceChildDate,
            amoutLimit: 1,
          });
          break;
        case WindowSpaces.last:
          dayTimes = relevantHoures({
            worker: worker,
            booking: Booking.fromBooking(booking),
            isUpdate: bookingMaker.isUpdate,
            oldBooking: bookingMaker.oldBooking,
            recurrenceSkipDate: bookingMaker.oldBooking?.recurrenceChildDate,
            reverse: true,
            amoutLimit: 1,
          });
          break;
        case WindowSpaces.edges:
          dayTimes = getEdgeTimes(
            worker!,
            booking,
            bookingMaker.oldBooking,
            bookingMaker.isUpdate,
            bookingMaker.oldBooking?.recurrenceChildDate
          );
          break;
        default:
          dayTimes = relevantHoures({
            worker: worker,
            booking: Booking.fromBooking(booking),
            isUpdate: bookingMaker.isUpdate,
            oldBooking: bookingMaker.oldBooking,
            recurrenceSkipDate: bookingMaker.oldBooking?.recurrenceChildDate,
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
  });

  Object.entries(daysTimes).forEach(([visibleDateStr, timeList]) => {
    const visibleDate = dateStrToDate(visibleDateStr);

    bookingMaker.timePickerObjects[visibleDateStr] = [];

    if (worker!.recurrence.vacationInDate(visibleDate) != undefined) {
      if (worker!.showVacations) {
        const newTimePickerObj = new TimePickerObj({
          displayDate: undefined,
          isVacation: true,
        });
        newTimePickerObj.from = visibleDate;
        bookingMaker.timePickerObjects[visibleDateStr].push(newTimePickerObj);
      }
      return;
    }

    if (isHoliday(worker!, visibleDate) && worker!.closeScheduleOnHolidays) {
      const newTimePickerObj = new TimePickerObj({
        displayDate: undefined,
        isHoliday: true,
      });
      newTimePickerObj.from = visibleDate;
      bookingMaker.timePickerObjects[visibleDateStr].push(newTimePickerObj);

      return;
    }

    // put the events inside the events timePickerObjects to display them nex frame
    let minutesToPresent = 0;
    timeList.forEach((timeObj, index) => {
      if (bookingMaker.isMultiEvent !== true || timeObj.hasFreePlace) {
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
        newTimePickerObj.from = visibleDate;
        bookingMaker.timePickerObjects[visibleDateStr].push(newTimePickerObj);
      } else {
        if (
          bookingMaker.isMultiEvent === true &&
          !timeObj.showMultiWaitingList
        ) {
          return;
        }
        const newTimePickerObj = TimePickerObj.fromTimePickerObj(timeObj);

        newTimePickerObj.isWaitingList = true;
        newTimePickerObj.from = visibleDate;
        bookingMaker.timePickerObjects[visibleDateStr].push(newTimePickerObj);
      }
    });
    // add the waiting list option
    if (
      (timeList.length === 0 || worker!.showWaitingListWhenThereIsChoises) &&
      !worker!.waitingListExceptionDays.has(weekDays[visibleDate.getDay()]) &&
      bookingMaker.isMultiEvent != true
    ) {
      const newTimePickerObj = new TimePickerObj({
        displayDate: undefined,
        isWaitingList: true,
      });
      newTimePickerObj.from = visibleDate;
      bookingMaker.timePickerObjects[visibleDateStr].push(newTimePickerObj);
      return;
    }
    if (bookingMaker.timePickerObjects[visibleDateStr].length === 0) {
      delete bookingMaker.timePickerObjects[visibleDateStr];
    }
  });

  bookingMakerStore.set(bookingMaker);
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

function lastDate(worker: WorkerModel | undefined): Date | undefined {
  if (worker === undefined) {
    return undefined;
  }
  return addDuration(
    setToMidNight(new Date()),
    new Duration({ days: worker.daysToAllowBookings })
  );
}

export function getForwardDays(date: Date, days: number): Date[] {
  let finalList: Date[] = [];
  let firstDate = days % 7 === 0 ? getStartOfWeek(date) : date;
  for (let i = 0; i < days; i++) {
    finalList.push(firstDate);
    firstDate = addDuration(firstDate, new Duration({ days: 1 }));
  }
  return finalList;
}
