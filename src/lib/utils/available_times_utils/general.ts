import { logger } from "$lib/consts/application_general";
import { WindowSpaces } from "$lib/consts/worker";
import Booking from "$lib/models/booking/booking_model";
import { Duration } from "$lib/models/core/duration";
import Treatment from "$lib/models/general/treatment_model";
import TreatmentTime from "$lib/models/general/treatment_time";
import type RecurrenceEvent from "$lib/models/schedule/recurrence_event";
import { FreqRecurrence } from "$lib/models/schedule/recurrence_event";
import type WorkerModel from "$lib/models/worker/worker_model";
import {
  addDuration,
  diffDuration,
  durationStrikings,
  subDuration,
} from "../duration_utils";
import { setIntersecation } from "../general_utils";

import {
  dateIsoStr,
  dateStrToDate,
  dateToDateStr,
  dateToTimeStr,
  getOnlyEqualOrAfter,
  isHoliday,
  setTo1970,
  setToMidNight,
  timeStrToDate,
} from "../times_utils";

export interface TimeSegment {
  start: Date;
  duration: Duration;
}

/**
 * Checks if all day is taken based on various conditions.
 * @param worker - The worker model.
 * @param date - The date to check.
 * @param workerAction - Indicates if it's a worker action.
 * @param workerSheet - Indicates if it's a worker sheet.
 * @returns True if all day is taken, false otherwise.
 */
export function isAllDayTaken(
  worker: WorkerModel,
  date: Date,
  workerAction: boolean,
  workerSheet: boolean
): boolean {
  // All day is taken if the worker's schedule is closed on holidays and it's a holiday
  if (worker.closeScheduleOnHolidays && isHoliday(worker, date)) {
    logger.debug(
      "Holiday is a free day for this worker -> don't generate times"
    );
    return true;
  }

  // All day is taken if it's not a worker action and there is a vacation on the date
  if (!workerAction && worker.recurrence.vacationInDate(date) != undefined) {
    logger.debug(
      "Vacation is a free day for this worker -> don't generate times"
    );
    return true;
  }

  // All day is taken if it's not a worker sheet and the worker is closing on the date
  if (!workerSheet && worker.isClosingDate(date)) {
    logger.debug("This day is closing by the worker");
    return true;
  }

  // All day is not taken in other cases
  return false;
}

/**
 * Calculates the minutes to jump over forbidden times.
 * @param forbiddenTimesPointers - Pointers to forbidden times.
 * @param timeSegments - The map of time segments.
 * @param forbiddenTimes - List of forbidden times.
 * @returns The minutes to jump over forbidden times.
 */
export function minutesToJumpOverForbbiden(
  forbiddenTimesPointers: number[],
  timeSegments: Map<string, TimeSegment>,
  forbiddenTimes: Date[]
): number {
  let minutesToJump: number = 0; // 0 represents allowed time
  let segmentIndex: number = 0;

  const segments: TimeSegment[] = Array.from(timeSegments.values());

  forbiddenTimesPointers.forEach((pointer) => {
    const startSegment: Date = segments[segmentIndex].start;
    const endSegment: Date = addDuration(
      startSegment,
      segments[segmentIndex].duration
    );

    for (pointer; pointer < forbiddenTimes.length; pointer += 2) {
      if (pointer + 1 >= forbiddenTimes.length) break;
      const status: string = durationStrikings(
        forbiddenTimes[pointer],
        forbiddenTimes[pointer + 1],
        startSegment,
        endSegment
      );

      if (status === "STRIKE") {
        // If strike, the end of forbidden time must be after the start of the segment
        const currentDifference: Duration = diffDuration(
          forbiddenTimes[pointer + 1],
          startSegment
        );
        // Set the jump to the highest option
        minutesToJump = Math.max(minutesToJump, currentDifference.inMinutes);
        break;
      }

      if (status === "BEFORE") break;
    }

    // Passing to the next time segment
    segmentIndex += 1;
  });

  return minutesToJump;
}

/**
 * Calculates the minutes to jump over forbidden times in reverse order.
 * @param forbiddenTimesPointers - Pointers to forbidden times.
 * @param timeSegments - The map of time segments.
 * @param forbiddenTimes - List of forbidden times.
 * @returns The minutes to jump over forbidden times in reverse order.
 */
export function minutesToJumpOverForbbidenReverse(
  forbiddenTimesPointers: number[],
  timeSegments: Map<string, TimeSegment>,
  forbiddenTimes: Date[]
): number {
  let minutesToJump: number = 0; // 0 represents allowed time
  const segments: TimeSegment[] = Object.values(timeSegments);
  let segmentIndex: number = segments.length - 1;

  forbiddenTimesPointers.forEach((pointer) => {
    const startSegment: Date = segments[segmentIndex].start;
    const endSegment: Date = addDuration(
      startSegment,
      segments[segmentIndex].duration
    );

    for (pointer; pointer >= 0; pointer -= 2) {
      if (pointer - 1 < 0) break;
      const status: string = durationStrikings(
        forbiddenTimes[pointer - 1],
        forbiddenTimes[pointer],
        startSegment,
        endSegment
      );

      if (status === "STRIKE") {
        // If strike, the start of forbidden time must be before the end of the segment
        const currentDifference: number = diffDuration(
          endSegment,
          forbiddenTimes[pointer - 1]
        ).inMinutes;
        // Set the jump to the highest option
        minutesToJump = Math.max(minutesToJump, currentDifference);
        break;
      }

      if (status === "AFTER") break;
    }

    // Passing to the next time segment
    segmentIndex -= 1;
  });

  return minutesToJump;
}

/**
 * Adds duration to all segments in the given map.
 * @param timeSegments - The map of time segments.
 * @param minutes - The duration to add.
 */
export function addMinutesToAllSegments(
  timeSegments: Map<string, TimeSegment>,
  minutes: number
): void {
  timeSegments.forEach((timeSegment, key) => {
    timeSegment.start = addDuration(
      timeSegment.start,
      new Duration({ minutes: minutes })
    );
    timeSegments.set(key, timeSegment);
  });
}

/**
 * Calculates the jump time for the forward algorithm.
 * @param currentTime - The current time.
 * @param forbbidenTimes - List of forbidden times.
 * @param indexesInForbidden - Indexes in the forbidden times list.
 * @param worker - The worker model.
 * @returns The calculated jump time.
 */
export function getJump(
  currentTime: Date,
  forbbidenTimes: Date[],
  indexesInForbidden: number[],
  worker: WorkerModel
): number {
  const defaultAdding =
    worker.windowSpaces === WindowSpaces.custom
      ? worker.customWindowMinute
      : worker.windowSpaces === WindowSpaces.longestTreatment
      ? worker.longestBookingTime
      : worker.shortBookingTime;

  /* If the default jump is passing over the next forbidden - 
    coming back to end forbidden to save holes in schedule */
  const afterAdding = addDuration(
    currentTime,
    new Duration({ minutes: defaultAdding })
  );
  if (
    indexesInForbidden.length <= 0 ||
    indexesInForbidden[0] + 1 >= forbbidenTimes.length
  ) {
    return defaultAdding;
  }

  const nextForbidden = forbbidenTimes[indexesInForbidden[0]];
  const endForbidden = forbbidenTimes[indexesInForbidden[0] + 1];
  if (nextForbidden > currentTime && nextForbidden < afterAdding) {
    return new Duration({
      milliseconds: endForbidden.getTime() - currentTime.getTime(),
    }).inMinutes;
  }

  return defaultAdding;
}

/**
 * Calculates the jump time for the reverse algorithm.
 * @param currentTime - The current time.
 * @param forbbidenTimes - List of forbidden times.
 * @param indexesInForbidden - Indexes in the forbidden times list.
 * @param worker - The worker model.
 * @returns The calculated jump time.
 */
export function getJumpReversed(
  currentTime: Date,
  forbbidenTimes: Date[],
  indexesInForbidden: number[],
  worker: WorkerModel
): number {
  const defaultAdding =
    worker.windowSpaces === WindowSpaces.custom
      ? worker.customWindowMinute
      : worker.windowSpaces === WindowSpaces.longestTreatment
      ? worker.longestBookingTime
      : worker.shortBookingTime;

  /* If the default jump is passing over the next forbidden - 
    coming back to end forbidden to save holes in schedule */
  const afterAdding = subDuration(
    currentTime,
    new Duration({ minutes: defaultAdding })
  );
  if (
    indexesInForbidden.length <= 0 ||
    indexesInForbidden[0] + 1 >= forbbidenTimes.length
  ) {
    return defaultAdding;
  }

  const nextForbidden = forbbidenTimes[indexesInForbidden[0]];
  if (
    nextForbidden.getTime() < currentTime.getTime() &&
    nextForbidden.getTime() > afterAdding.getTime()
  ) {
    return currentTime.getTime() - nextForbidden.getTime();
  }

  return defaultAdding;
}

export function getFakeBookingFromTime(
  day: string,
  start: string,
  end: string,
  workerId: string = ""
): Booking {
  const startEvent = timeStrToDate(start);
  const endEvent = timeStrToDate(end);
  const totalMinutes = Math.floor(
    (endEvent.getTime() - startEvent.getTime()) / (60 * 1000)
  );

  const treatment = new Treatment({
    times: new Map([["0", new TreatmentTime({ workMinutes: totalMinutes })]]),
  });
  const booking = new Booking({});
  booking.bookingDate = new Date(day);
  booking.workerId = workerId;
  booking.treatments = { "": treatment };
  return booking;
}

/**
 * Generates a list of already taken hours based on worker constraints.
 * @param worker - The worker model.
 * @param bookingDate - The booking date.
 * @param options - Options for customization.
 * @returns List of already taken hours.
 */
export function alreadyTakenHoures({
  worker,
  bookingDate,
  oldBooking,
  recurrenceSkipDate,
  isUpdate = false,
  workerAction = false,
}: {
  worker: WorkerModel;
  bookingDate: string;
  oldBooking?: Booking;
  recurrenceSkipDate?: Date | null;
  isUpdate: boolean;
  workerAction: boolean;
}): Date[] {
  const taken: Date[] = [];
  const dateToBook = dateStrToDate(bookingDate);

  // Adding all the "booking times" to the "taken hours" list
  if (worker.workerPublicData.bookingsTimes[bookingDate]) {
    Object.entries(worker.workerPublicData.bookingsTimes[bookingDate]!).forEach(
      ([key, details]) => {
        const start = timeStrToDate(key);
        taken.push(
          start,
          addDuration(start, new Duration({ minutes: details }))
        );
      }
    );
  }

  const datesToSkipRecurrence = new Set<string>();

  if (
    isUpdate &&
    oldBooking &&
    oldBooking.recurrenceEvent &&
    recurrenceSkipDate
  ) {
    oldBooking.bookingsEventsAsEvents.forEach((event, time) => {
      const timeDate = timeStrToDate(time);
      datesToSkipRecurrence.add(
        dateIsoStr(
          new Date(
            recurrenceSkipDate!.getFullYear(),
            recurrenceSkipDate!.getMonth(),
            recurrenceSkipDate!.getDate(),
            timeDate.getHours(),
            timeDate.getMinutes()
          )
        )
      );
    });
  }

  // Determine if vacation already added to the taken hours
  let vacationAdded = false;

  // Adding all the recurrence "bookings' times" to the "taken list"
  Object.entries(worker.recurrence.recurrenceEvents).forEach(
    ([date, eventByHour]) => {
      Object.entries(eventByHour).forEach(([hour, event]) => {
        // No need to consider break that does not block the schedule
        if (!event.blockSchedule && event.isBreak) {
          return;
        }

        // Vacation doesn't block the schedule for the worker
        if (event.isVacation && workerAction) {
          return;
        }

        // If there is already vacation in the taken list, no need to add more times,
        // as the entire day is taken
        if (vacationAdded) {
          return;
        }

        if (isUpdate && oldBooking && oldBooking.recurrenceEvent) {
          const hourTime = timeStrToDate(hour);
          const dateToCheck = addDuration(
            dateToBook,
            new Duration({
              hours: hourTime.getHours(),
              minutes: hourTime.getMinutes(),
            })
          );

          if (datesToSkipRecurrence.has(dateIsoStr(dateToCheck))) {
            return;
          }
        }

        // Adding only events that occur on the booking date
        if (!event.recurrenceEvent) {
          return;
        }

        if (event.recurrenceEvent.isAccureInDate({ date: dateToBook })) {
          const start = timeStrToDate(hour);

          // If the event is vacation, no need to keep all the events;
          // the entire day is taken
          if (event.isVacation) {
            vacationAdded = true;
            taken.length = 0; // Clear the array
          }

          taken.push(
            start,
            addDuration(start, new Duration({ minutes: event.durationMinutes }))
          );
        }
      });
    }
  );

  // Update -> allows you to see hours that your turn block
  // Remove the first of (start, end), so if duplicate doesn't matter
  // since this is the same index -> [1,5,4,4,7,8] remove [1,4] while sort()
  // the index stays the same -> [4,5,7,8].
  // oldBooking.recurrenceEvent == null -> in recurrence, we ignore the booking
  // in advance, no need to remove; it never added
  if (
    isUpdate &&
    oldBooking &&
    oldBooking.workerId === worker.id &&
    !oldBooking.recurrenceEvent
  ) {
    // Make sure to remove the old times only if it is the same day
    const oldDate = setToMidNight(oldBooking.bookingDate);

    if (dateToBook.getTime() / 1000 - oldDate.getTime() / 1000 === 0) {
      // To make it in 1970 - date
      let startTime = setTo1970(oldBooking.bookingDate);

      // Pass over the timeSegments and remove all the segments
      const treatment = Treatment.fromTreatmentsMap(oldBooking.treatments);

      treatment.times.forEach((timeData, timeIndex) => {
        startTime = addDuration(
          startTime,
          new Duration({ minutes: timeData.breakMinutes })
        );
        const endTime = addDuration(
          startTime,
          new Duration({ minutes: timeData.workMinutes })
        );

        taken.splice(taken.indexOf(startTime), 2);
        taken.splice(taken.indexOf(endTime), 2);
        startTime = endTime;
      });
    }
  }

  return taken;
}

/**
 * Checks if the given time should be skipped based on the booking date and optional todayCheck.
 * @param pointerWork - The time to check.
 * @param bookingDate - The booking date in the format 'dd-MM-yyyy'.
 * @param todayCheck - Optional flag to override today's check.
 * @returns Whether the time should be skipped.
 */
export function shouldSkip(
  pointerWork: Date,
  bookingDate: string,
  todayCheck?: boolean
): boolean {
  const currentTime: string = dateToTimeStr(new Date());
  const isToday: boolean =
    todayCheck ?? bookingDate === dateToDateStr(new Date());
  const timePassed: boolean = pointerWork < timeStrToDate(currentTime);

  return isToday && timePassed;
}

/**
 * Checks if the given time has already passed for a specific booking date.
 * @param time - The time to check.
 * @param bookingDate - The booking date in the format 'dd-MM-yyyy'.
 * @returns Whether the time has already passed.
 */
export function timeIsAlreadyPassed(time: Date, bookingDate: string): boolean {
  const currentTime: string = dateToTimeStr(new Date());
  const isToday: boolean = bookingDate === dateToDateStr(new Date());
  const timePassed: boolean = time < timeStrToDate(currentTime);

  return isToday && timePassed;
}

/**
 * Generates a map of time segments with start and duration based on treatment times.
 * @param booking - The booking information.
 * @param startTime - The start time for the segments.
 * @returns The map of time segments.
 */
export function generateTimeSegmentsMap(
  booking: Booking,
  startTime: Date
): Map<string, TimeSegment> {
  const timesSegments: Map<string, TimeSegment> = new Map();
  let lastTime: Date = startTime;

  const treatment: Treatment = Treatment.fromTreatmentsMap(booking.treatments);

  treatment.times.forEach((timeData, timeIndex) => {
    // Adding the break before the treatment
    lastTime = addDuration(
      lastTime,
      new Duration({ minutes: timeData.breakMinutes })
    );

    // Adding the break before - start of the treatment
    timesSegments.set(timeIndex, {
      start: lastTime,
      duration: new Duration({ minutes: timeData.workMinutes }),
    });

    // Adding the time of the treatment
    lastTime = addDuration(
      lastTime,
      new Duration({ minutes: timeData.workMinutes })
    );
  });

  return timesSegments;
}

/**
 * Generates a reversed map of time segments with start and duration based on treatment times.
 * @param booking - The booking information.
 * @param endTime - The end time for the segments.
 * @returns The reversed map of time segments.
 */
export function generateReversedTimeSegmentsMap(
  booking: Booking,
  endTime: Date
): Map<string, TimeSegment> {
  const timesSegments: Map<string, TimeSegment> = new Map();
  const treatment: Treatment = Treatment.fromTreatmentsMap(booking.treatments);
  let lastTime: Date = subDuration(
    endTime,
    new Duration({ minutes: treatment.totalMinutes })
  );

  treatment.times.forEach((timeData, timeIndex) => {
    // Adding the break before the treatment
    lastTime = addDuration(
      lastTime,
      new Duration({ minutes: timeData.breakMinutes })
    );

    // Adding the break before - start of the treatment
    timesSegments.set(timeIndex, {
      start: lastTime,
      duration: new Duration({ minutes: timeData.workMinutes }),
    });

    // Adding the time of the treatment
    lastTime = addDuration(
      lastTime,
      new Duration({ minutes: timeData.workMinutes })
    );
  });

  return timesSegments;
}

/**
 * Creates fake "taken hours" only from "middle-payment" times.
 * If it still strikes, this is the reason for the block.
 * @param booking - The booking details.
 * @param timeToOrder - The time to order.
 * @param date - The booking date.
 * @param worker - The worker model.
 * @param timeSegments - Map of time segments.
 * @returns True if the time is blocked, false otherwise.
 */
export function isBlockFromMiddlePaymentUser(
  booking: Booking,
  timeToOrder: Date,
  date: string,
  worker: WorkerModel,
  timeSegments: Map<string, TimeSegment>
): boolean {
  // Day isn't on middle payment times
  if (!worker.workerPublicData.duringPaymentBookingsTime[date]) {
    return false;
  }

  // Create a list of [start, end] from duringPaymentBookingsTime
  const hours: Date[] = [];
  Object.entries(
    worker.workerPublicData.duringPaymentBookingsTime[date]
  ).forEach(([startTime, details]) => {
    try {
      const start = timeStrToDate(startTime);
      const end = addDuration(start, new Duration({ minutes: details[1] }));
      hours.push(start, end);
    } catch (e) {
      const msg = "Error while creating the during payment list, illegal list";
      logger.error(`${msg} -> ${details}\n${e}`);
    }
  });

  // Get rid of earlier times - not necessary
  const forbiddenTimes = getOnlyEqualOrAfter(hours, timeToOrder);

  // Fill this list with 0; these will be the pointers on each time segment
  const treatment = Treatment.fromTreatmentsMap(booking.treatments);
  const forbiddenTimesPointers = Array.from(
    { length: treatment.times.keys.length },
    (_, index) => 0
  );

  // Getting time to jump if one or more time segments striking with forbidden
  const minutesToJump = minutesToJumpOverForbbiden(
    forbiddenTimesPointers,
    timeSegments,
    forbiddenTimes
  );

  return minutesToJump !== 0;
}

// /// Get `time` and return the same time rounded up to 5 minutes
export function getTimeDevideByFive(
  time: Date,
  inCheckFormat: boolean = false
): Date {
  const minutes = time.getMinutes();
  const tens = Math.floor(minutes / 10);
  const ones = minutes % 10;
  const amountOfFives = Math.ceil(ones / 5);

  if (inCheckFormat) {
    return new Date(1970, 0, 1, time.getHours(), tens * 10 + amountOfFives * 5);
  }

  return new Date(
    time.getFullYear(),
    time.getMonth(),
    time.getDate(),
    time.getHours(),
    tens * 10 + amountOfFives * 5
  );
}
export function getFakeBookingToCheck(
  treatmentName: string,
  treatment: Treatment,
  date: Date
): Booking {
  const newTreatment = new Treatment({
    name: treatmentName,
    price: treatment.price,
    times: Object.assign({}, treatment.times),
  });
  const booking = new Booking({});
  booking.bookingDate = date;
  booking.treatments = { "": newTreatment };
  return booking;
}

/**
 * Finds overlapping dates between two recurrence events.
 * @param first - The first recurrence event.
 * @param second - The second recurrence event.
 * @returns Set of overlapping dates.
 */
export function overlapingDates(
  first: RecurrenceEvent,
  second: RecurrenceEvent
): Set<Date> {
  const firstIsWeek = first.freqRecurrence === FreqRecurrence.weeks;
  const secondIsWeek = second.freqRecurrence === FreqRecurrence.weeks;

  // Different types, just need to check the dates
  if (firstIsWeek !== secondIsWeek) {
    // No option to predict overlapping (not the same type and endless)
    if (!first.endOfTheEvent && !second.endOfTheEvent) {
      return new Set([new Date(0)]); // Both endless
    }

    // Finding the optimal event to check (less repeats -> shorter for loop)
    return first.overlapingDatesWith(second);
  } else {
    // The same type (week & week) || (other & other)
    if (
      firstIsWeek &&
      secondIsWeek &&
      setIntersecation(first.weekDays, second.weekDays).size === 0
    ) {
      return new Set(); // No overlapping dates
    }

    // Finally return the list of the overlapping dates
    return first.overlapingDatesWith(second);
  }
}
