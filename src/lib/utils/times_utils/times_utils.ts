import { format, parse } from "date-fns";

import { logger } from "$lib/consts/application_general.js";
import { WindowSpaces } from "$lib/consts/worker.js";
import type Booking from "$lib/models/booking/booking_model.js";
import type WorkerModel from "$lib/models/worker/worker_model.js";
import { isHoliday } from "../dates_utils.js";
import { translate } from "../string_utilitis.js";
/**
 * Checks if the given time should be skipped based on the booking date and optional todayCheck.
 * @param pointerWork - The time to check.
 * @param bookingDate - The booking date in the format 'dd-MM-yyyy'.
 * @param todayCheck - Optional flag to override today's check.
 * @returns Whether the time should be skipped.
 */
function shouldSkip(
  pointerWork: Date,
  bookingDate: string,
  todayCheck?: boolean
): boolean {
  const currentTime: string = format(new Date(), "HH:mm");
  const isToday: boolean =
    todayCheck ?? bookingDate === format(new Date(), "dd-MM-yyyy");
  const timePassed: boolean =
    pointerWork < parse(currentTime, "HH:mm", new Date());

  return isToday && timePassed;
}

/**
 * Checks if the given time has already passed for a specific booking date.
 * @param time - The time to check.
 * @param bookingDate - The booking date in the format 'dd-MM-yyyy'.
 * @returns Whether the time has already passed.
 */
export function timeIsAlreadyPassed(time: Date, bookingDate: string): boolean {
  const currentTime: string = format(new Date(), "HH:mm");
  const isToday: boolean = bookingDate === format(new Date(), "dd-MM-yyyy");
  const timePassed: boolean = time < parse(currentTime, "HH:mm", new Date());

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
): TimeSegmentsMap {
  const timesSegments: TimeSegmentsMap = {};
  let lastTime: Date = startTime;
  const treatment: Treatment = Treatment.fromTreatmentsMap(booking.treatments);

  treatment.times.forEach((timeIndex, timeData) => {
    // Adding the break before the treatment
    lastTime = new Date(lastTime.getTime() + timeData.breakMinutes * 60000);

    // Adding the break before - start of the treatment
    timesSegments[timeIndex] = {
      start: lastTime,
      duration: { minutes: timeData.workMinutes },
    };

    // Adding the time of the treatment
    lastTime = new Date(lastTime.getTime() + timeData.workMinutes * 60000);
  });

  return timesSegments;
}

/**
 * Generates a reversed map of time segments with start and duration based on treatment times.
 * @param booking - The booking information.
 * @param endTime - The end time for the segments.
 * @returns The reversed map of time segments.
 */
// export function generateReversedTimeSegmentsMap(
//   booking: Booking,
//   endTime: Date
// ): TimeSegmentsMap {
//   const timesSegments: TimeSegmentsMap = {};
//   const treatment: Treatment = Treatment.fromTreatmentsMap(booking.treatments);
//   let lastTime: Date = new Date(
//     endTime.getTime() - treatment.totalMinutes * 60000
//   );

//   treatment.times.forEach((timeIndex, timeData) => {
//     // Adding the break before the treatment
//     lastTime = new Date(lastTime.getTime() + timeData.breakMinutes * 60000);

//     // Adding the break before - start of the treatment
//     timesSegments[timeIndex] = {
//       start: lastTime,
//       duration: { minutes: timeData.workMinutes },
//     };

//     // Adding the time of the treatment
//     lastTime = new Date(lastTime.getTime() + timeData.workMinutes * 60000);
//   });

//   return timesSegments;
// }

/**
 * Calculates the minutes to jump over forbidden times.
 * @param forbiddenTimesPointers - Pointers to forbidden times.
 * @param timeSegments - The map of time segments.
 * @param forbiddenTimes - List of forbidden times.
 * @returns The minutes to jump over forbidden times.
 */
// export function minutesToJumpOverForbbiden(
//   forbiddenTimesPointers: number[],
//   timeSegments: TimeSegmentsMap,
//   forbiddenTimes: Date[]
// ): number {
//   let minutesToJump: number = 0; // 0 represents allowed time
//   let segmentIndex: number = 0;
//   const segments: TimeData[] = Object.values(timeSegments);

//   forbiddenTimesPointers.forEach((pointer) => {
//     const startSegment: Date = segments[segmentIndex].start;
//     const endSegment: Date = new Date(
//       startSegment.getTime() + segments[segmentIndex].duration.minutes * 60000
//     );

//     for (pointer; pointer < forbiddenTimes.length; pointer += 2) {
//       if (pointer + 1 >= forbiddenTimes.length) break;
//       const status: string = durationStrikings(
//         forbiddenTimes[pointer],
//         forbiddenTimes[pointer + 1],
//         startSegment,
//         endSegment
//       );

//       if (status === "STRIKE") {
//         // If strike, the end of forbidden time must be after the start of the segment
//         const currentDifference: number =
//           endSegment.getTime() - forbiddenTimes[pointer + 1].getTime();
//         // Set the jump to the highest option
//         minutesToJump = max(minutesToJump, currentDifference / 60000);
//         break;
//       }

//       if (status === "BEFORE") break;
//     }

//     // Passing to the next time segment
//     segmentIndex += 1;
//   });

//   return minutesToJump;
// }

/**
 * Calculates the minutes to jump over forbidden times in reverse order.
 * @param forbiddenTimesPointers - Pointers to forbidden times.
 * @param timeSegments - The map of time segments.
 * @param forbiddenTimes - List of forbidden times.
 * @returns The minutes to jump over forbidden times in reverse order.
 */
// export function minutesToJumpOverForbbidenReverse(
//   forbiddenTimesPointers: number[],
//   timeSegments: TimeSegmentsMap,
//   forbiddenTimes: Date[]
// ): number {
//   let minutesToJump: number = 0; // 0 represents allowed time
//   const segments: TimeData[] = Object.values(timeSegments);
//   let segmentIndex: number = segments.length - 1;

//   forbiddenTimesPointers.forEach((pointer) => {
//     const startSegment: Date = segments[segmentIndex].start;
//     const endSegment: Date = new Date(
//       startSegment.getTime() + segments[segmentIndex].duration.minutes * 60000
//     );

//     for (pointer; pointer >= 0; pointer -= 2) {
//       if (pointer - 1 < 0) break;
//       const status: string = durationStrikings(
//         forbiddenTimes[pointer - 1],
//         forbiddenTimes[pointer],
//         startSegment,
//         endSegment
//       );

//       if (status === "STRIKE") {
//         // If strike, the start of forbidden time must be before the end of the segment
//         const currentDifference: number =
//           endSegment.getTime() - forbiddenTimes[pointer - 1].getTime();
//         // Set the jump to the highest option
//         minutesToJump = max(minutesToJump, currentDifference / 60000);
//         break;
//       }

//       if (status === "AFTER") break;
//     }

//     // Passing to the next time segment
//     segmentIndex -= 1;
//   });

//   return minutesToJump;
// }

/**
 * Adds duration to all segments in the given map.
 * @param timeSegments - The map of time segments.
 * @param minutes - The duration to add.
 */
function addMinutesToAllSegments(
  timeSegments: TimeSegmentsMap,
  minutes: number
): void {
  Object.values(timeSegments).forEach((timeData) => {
    timeData.start = new Date(timeData.start.getTime() + minutes * 60000);
  });
}

/**
 * Returns a list of relevant multi-event times for the given worker, date, and treatment.
 * @param worker - The worker model.
 * @param dateForCheck - The date for checking relevance.
 * @param treatment - The treatment for filtering relevant times.
 * @returns List of relevant multi-event times.
 */
// export function relevantMultiEventTime({
//   worker,
//   dateForCheck,
//   treatment,
// }: {
//   worker: WorkerModel;
//   dateForCheck: Date;
//   treatment: Treatment;
// }): TimePickerObj[] {
//   const finalTimes: TimePickerObj[] = [];

//   // Check if the date is in the worker's close calendar date
//   if (dateToDateStr(worker.closeCalendarDate ?? new Date(0)) === dateToDateStr(dateForCheck)) {
//     return finalTimes;
//   }

//   // Check if the worker's calendar is closed
//   if (!worker.openCalendar) {
//     return finalTimes;
//   }

//   // Retrieve multi-event times for the specified date
//   const workerTimes = worker.multiEventsTimes.times[dateToDateStr(dateForCheck)] ?? {};

//   // Iterate through the times and filter relevant ones
//   Object.entries(workerTimes).forEach(([timeStr, timeObj]) => {
//     if (timeObj.treatmentId === treatment.id && timeObj.index === 0) {
//       const startTime = timeStrToDate(timeStr);
//       const displayDate = new Date(
//         dateForCheck.getFullYear(),
//         dateForCheck.getMonth(),
//         dateForCheck.getDate(),
//         startTime.getHours(),
//         startTime.getMinutes()
//       );

//       // Check if the display date is before the current time
//       if (displayDate < new Date()) {
//         return;
//       }

//       const maxParticipants = timeObj.maxParticipants ?? treatment.participants;

//       finalTimes.push({
//         isMulti: true,
//         showMultiWaitingList: timeObj.showWaitingList,
//         signedPaymentRequestId: timeObj.paymentRequestId,
//         displayDate,
//         maxParticipants,
//         isWaitingList: maxParticipants <= timeObj.currentPaticipants,
//         currentParticipants: timeObj.currentPaticipants,
//         showParticipants: treatment.showParticipants,
//       });
//     }
//   });

//   // Iterate through recurrence events and filter relevant ones
//   worker.recurrence.recurrenceEvents.forEach((dateStr, eventsDay) => {
//     eventsDay.forEach((timeStr, event) => {
//       if (
//         !event.isMulti ||
//         event.recurrenceEvent === null ||
//         event.treatmentId !== treatment.id ||
//         !event.recurrenceEvent.isAccureInDate({ date: dateForCheck }) ||
//         event.eventIndex !== 0
//       ) {
//         return;
//       }

//       const startTime = timeStrToDate(timeStr);
//       const displayDate = new Date(
//         dateForCheck.getFullYear(),
//         dateForCheck.getMonth(),
//         dateForCheck.getDate(),
//         startTime.getHours(),
//         startTime.getMinutes()
//       );

//       finalTimes.push({
//         displayDate,
//         isMulti: true,
//         recurrenceTimeId: event.timeId,
//         recurrenceFatherBookingId: event.recurrenceFatherBookingId,
//         maxParticipants: treatment.participants,
//         currentParticipants: event.currentParticipants,
//         isWaitingList: treatment.participants <= event.currentParticipants,
//         showParticipants: treatment.showParticipants,
//         recurrenceMultiEvent: event.recurrenceEvent,
//         fatherRecurrenceMultiEventDate: event.from,
//       });
//     });
//   });

//   // Sort the final times by display date
//   finalTimes.sort((a, b) => a.displayDate!.getTime() - b.displayDate!.getTime());

//   return finalTimes;
// }

/**
 * Returns a list of relevant hours for the given worker, booking, and optional parameters.
 * @param worker - The worker model.
 * @param booking - The booking information.
 * @param options - Optional parameters for customization.
 * @returns List of relevant hours.
 */
// function relevantHoures(
//   worker: WorkerModel | null | undefined,
//   booking: Booking,
//   options: {
//     isUpdate?: boolean;
//     oldBooking?: Booking | null;
//     workerSheet?: boolean;
//     reverse?: boolean;
//     workerAction?: boolean;
//     amoutLimit?: number;
//     recurrenceSkipDate?: Date;
//   } = {}
// ): TimePickerObj[] {
//   const finalTimes: TimePickerObj[] = [];

//   // Return empty array if worker is null or undefined
//   if (!worker) {
//     return finalTimes;
//   }

//   // Check if all day is taken
//   if (isAllDayTaken(worker, booking.bookingDate, options.workerAction, options.workerSheet)) {
//     return finalTimes;
//   }

//   const bookingDate = format(booking.bookingDate, 'dd-MM-yyyy');
//   const work = convertStringToTime(worker.shiftsFor({ day: booking.bookingDate }));

//   const takenHoures = alreadyTakenHoures(worker, bookingDate, {
//     isUpdate: options.isUpdate,
//     workerAction: options.workerAction,
//     oldBooking: options.oldBooking,
//     recurrenceSkipDate: options.recurrenceSkipDate,
//   });

//   const forbbidenTimes = takenHoures;
//   forbbidenTimes.sort();
//   work.sort();

//   const treatment = Treatment.fromTreatmentsMap(booking.treatments);

//   // Call the reverse algorithm if specified
//   if (options.reverse) {
//     return reverseRelevantHoures(
//       worker,
//       work,
//       forbbidenTimes,
//       bookingDate,
//       treatment,
//       Booking.fromBooking(booking),
//       {
//         workerSheet: options.workerSheet,
//         amoutLimit: options.amoutLimit,
//       }
//     );
//   }

//   const forbiddenTimesPointers = List.generate(treatment.times.keys.length, (index) => 0);

//   // Calculate the current legal time (end with 0 or 5)
//   let currentTime = getTimeDevideByFive(new Date(), { inCheckFormat: true });

//   // Iterate over the work times
//   let i = 0;
//   for (let j = 0; j < work.length; j += 2) {
//     let pointerWork = work[j];
//     const endWork = work[j + 1];

//     // Skipping to the current time
//     if (shouldSkip(pointerWork, bookingDate)) {
//       switch (durationStrikings(currentTime, currentTime, pointerWork, endWork)) {
//         case 'BEFORE':
//           // Current is later
//           logger.d("Alg duration status - BEFORE");
//           continue;
//         case 'AFTER':
//           // Current is passed
//           logger.d("Alg duration status - AFTER");
//           break;
//         case 'STRIKE':
//           // Current is in this section
//           logger.d("Alg duration status - STRIKE");
//           break;
//       }
//       pointerWork = currentTime;
//     }

//     // Generate optional treatment starting at 'pointerWork'
//     const timeSegments = generateTimeSegmentsMap(booking, pointerWork);

//     // Pass over the current time stamp
//     while (!((timeSegments.values.last['start'] as Date)
//       .add(timeSegments.values.last['duration']))
//       .isAfter(endWork)) {
//       i++;
//       if (i > 500) {
//         logger.e('Infinity loop in times algorithm - stopping');
//         break;
//       }

//       // Get time to jump to the next optional time
//       const minutesToJump = minutesToJumpOverForbbiden(
//         forbiddenTimesPointers, timeSegments, forbbidenTimes
//       );

//       // Calculate the default jump time
//       const jump = getJump(
//         timeSegments.values.first['start'] as Date,
//         forbbidenTimes,
//         forbiddenTimesPointers,
//         worker
//       );

//       // If the jump is set to 0, no need to jump - allowed time
//       const allowedTime = minutesToJump === 0;

//       // Add the time and save place for short bookings
//       if (allowedTime) {
//         const timeToAdd = timeSegments.values.first['start'] as Date;
//         const dateToAdd = new Date(
//           booking.bookingDate.getFullYear(),
//           booking.bookingDate.getMonth(),
//           booking.bookingDate.getDate(),
//           timeToAdd.getHours(),
//           timeToAdd.getMinutes()
//         );

//         // Adding only the first time (start of the treatment)
//         finalTimes.push({ displayDate: dateToAdd });

//         // If there is an amount limit and we reached it, return the times
//         if (options.amoutLimit !== undefined && options.amoutLimit >= finalTimes.length) {
//           return finalTimes;
//         }

//         // For worker when editing customer booking,
//         // we don't need to optimize the times by the shorter turn
//         // because the worker can already set a turn every 5 minutes in the task
//         if (options.workerSheet) {
//           addMinutesToAllSegments(timeSegments, 5);
//         } else {
//           addMinutesToAllSegments(timeSegments, jump);
//         }
//       } else {
//         // Finish passing all over the forbidden times
//         // (pointer of the first segment end time is out of the list)
//         if (forbbidenTimes.length - 1 < forbiddenTimesPointers[0] + 1) {
//           if (options.workerSheet) {
//             addMinutesToAllSegments(timeSegments, 5);
//           } else {
//             addMinutesToAllSegments(timeSegments, jump);
//           }
//         }
//         // Jump to the end of the current forbidden time -> save time complexity
//         else {
//           // If strike, adding the best time (longest)
//           addMinutesToAllSegments(timeSegments, minutesToJump);
//         }
//       }
//     }
//   }

//   return finalTimes;
// }

/**
 * Checks if all day is taken based on various conditions.
 * @param worker - The worker model.
 * @param date - The date to check.
 * @param workerAction - Indicates if it's a worker action.
 * @param workerSheet - Indicates if it's a worker sheet.
 * @returns True if all day is taken, false otherwise.
 */
function isAllDayTaken(
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
  if (!workerAction && worker.recurrence.vacationInDate(date) !== null) {
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
 * Generates relevant hours in reverse order based on specified conditions.
 * @param worker - The worker model.
 * @param work - List of work shifts.
 * @param forbbidenTimes - List of forbidden times.
 * @param bookingDate - The booking date.
 * @param treatment - The treatment information.
 * @param booking - The booking details.
 * @param options - Optional parameters for customization.
 * @returns List of relevant hours in reverse order.
 */
// function reverseRelevantHoures(
//   worker: WorkerModel,
//   work: Date[],
//   forbbidenTimes: Date[],
//   bookingDate: string,
//   treatment: Treatment,
//   booking: Booking,
//   options: {
//     workerSheet?: boolean;
//     amoutLimit?: number;
//   } = {}
// ): TimePickerObj[] {
//   const finalTimes: TimePickerObj[] = [];

//   // Check if all day is taken
//   if (isAllDayTaken(worker, booking.bookingDate, false, options.workerSheet)) {
//     return finalTimes;
//   }

//   // Initialize forbidden times pointers to the end of the times
//   const forbiddenTimesPointers = List.generate(
//     treatment.times.keys.length,
//     (index) => forbbidenTimes.length - 1
//   );

//   // Initialize iteration variables
//   let i = 0;

//   // Iterate over work times starting from the end
//   for (let j = work.length - 1; j >= 0; j -= 2) {
//     const endShift = work[j];
//     const startShift = work[j - 1];

//     // Generate optional treatment starting at 'pointerWork'
//     const timeSegments = generateReversedTimeSegmentsMap(booking, endShift);

//     // Pass over the current time stamp
//     while (!(timeSegments.values.first['start'] as Date).isBefore(startShift)) {
//       i++;
//       if (i > 500) {
//         logger.e('Infinity loop in times algorithm - stopping');
//         break;
//       }

//       // Stop iteration if the start time of the booking is passed
//       if (timeIsAlreadyPassed(timeSegments.values.first['start'] as Date, bookingDate)) {
//         break;
//       }

//       // Get time to jump to the next optional time
//       const minutesToJump = minutesToJumpOverForbbidenReverse(
//         forbiddenTimesPointers,
//         timeSegments,
//         forbbidenTimes
//       );

//       // Calculate the default jump time
//       const jump = getJumpReversed(
//         timeSegments.values.first['start'] as Date,
//         forbbidenTimes,
//         forbiddenTimesPointers,
//         worker
//       );

//       // Check if this set to 0 -> no need to jump - allowed time
//       const allowedTime = minutesToJump === 0;

//       // Add the time and save a place for short bookings
//       if (allowedTime) {
//         const timeToAdd = timeSegments.values.first['start'] as Date;
//         const dateToAdd = new Date(
//           booking.bookingDate.getFullYear(),
//           booking.bookingDate.getMonth(),
//           booking.bookingDate.getDate(),
//           timeToAdd.getHours(),
//           timeToAdd.getMinutes()
//         );

//         // Adding only the first time (start of the treatment)
//         finalTimes.push({ displayDate: dateToAdd });

//         // If there is an amount limit and we reached it, return the times
//         if (options.amoutLimit !== undefined && options.amoutLimit >= finalTimes.length) {
//           return finalTimes;
//         }

//         /* For a worker when editing customer booking,
//         we don't need to optimize the times by the shorter turn
//         because the worker already can set a turn every 5 minutes in the task */
//         if (options.workerSheet) {
//           addMinutesToAllSegments(timeSegments, -5);
//         } else {
//           addMinutesToAllSegments(timeSegments, -jump);
//         }
//       } else {
//         // Finish passing all over the forbidden times
//         // (pointer of the first segment end time is out of the list)
//         if (forbiddenTimesPointers[0] < 0) {
//           if (options.workerSheet) {
//             addMinutesToAllSegments(timeSegments, -5);
//           } else {
//             addMinutesToAllSegments(timeSegments, -jump);
//           }
//         }
//         // Jump to the end of the current forbidden time -> save time complexity
//         else {
//           // If strike, adding the best time (longest)
//           addMinutesToAllSegments(timeSegments, -minutesToJump);
//         }
//       }
//     }
//   }

//   return finalTimes;
// }

/**
 * Calculates the jump time for the forward algorithm.
 * @param currentTime - The current time.
 * @param forbbidenTimes - List of forbidden times.
 * @param indexesInForbidden - Indexes in the forbidden times list.
 * @param worker - The worker model.
 * @returns The calculated jump time.
 */
function getJump(
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
  const afterAdding = new Date(currentTime.getTime() + defaultAdding * 60000);
  if (
    indexesInForbidden.length <= 0 ||
    indexesInForbidden[0] + 1 >= forbbidenTimes.length
  ) {
    return defaultAdding;
  }

  const nextForbidden = forbbidenTimes[indexesInForbidden[0]];
  const endForbidden = forbbidenTimes[indexesInForbidden[0] + 1];
  if (
    nextForbidden.getTime() > currentTime.getTime() &&
    nextForbidden.getTime() < afterAdding.getTime()
  ) {
    return endForbidden.getTime() - currentTime.getTime();
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
function getJumpReversed(
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
  const afterAdding = new Date(currentTime.getTime() - defaultAdding * 60000);
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

/**
 * Finds problematic dates for the recurrence event based on existing bookings and worker constraints.
 * @param worker - The worker model.
 * @param booking - The booking details.
 * @param timeToOrderOn1970Format - The time to order in the 1970 format.
 * @param options - Optional parameters for customization.
 * @returns Set of problematic dates.
 */
// function optionalTimeForRecurrence(
//   worker: WorkerModel,
//   booking: Booking,
//   timeToOrderOn1970Format: Date,
//   options: {
//     isUpdate?: boolean;
//     oldBooking?: Booking | null;
//     isBreakUpdate?: boolean;
//     oldBreak?: BreakModel | null;
//     defaultWork?: Date[] | null;
//     defaultVacations?: Date[] | null;
//     defaultBreaks?: Date[] | null;
//     defaultTakenHoures?: Date[] | null;
//     defaultForbbidenTimes?: Date[] | null;
//     allowAllDay?: boolean;
//   } = {}
// ): Set<Date> {
//   const problematicDates: Set<Date> = new Set();

//   booking.bookingsEventsAsEvents.forEach((bookingEventTime, bookingEvent) => {
//     worker.recurrence.recurrenceEvents.forEach((date, recurrenceByHour) => {
//       recurrenceByHour.forEach((hour, event) => {
//         if (!event.recurrenceEvent || !bookingEvent.recurrenceEvent) {
//           return;
//         }
//         if (event.isBreak && !event.blockSchedule) {
//           return;
//         }
//         if (event.isVacation && options.allowAllDay) {
//           return;
//         }
//         if (
//           durationStrikings(
//             setTo1970(bookingEvent.from),
//             setTo1970(bookingEvent.to),
//             setTo1970(event.from),
//             setTo1970(event.to)
//           ) !== 'STRIKE'
//         ) {
//           problematicDates.addAll(
//             overlapingDates(
//               booking.recurrenceEvent!,
//               event.recurrenceEvent!
//             )
//           );
//         }
//       });
//     });
//   });

//   // Find the closest date to iterate on and put it as the end of the iteration
//   let lastDate = firstDate(
//     booking.recurrenceEvent!.endOfTheEvent,
//     worker.workerPublicData.lastBookingTimeDate
//   );

//   if (!lastDate) {
//     logger.e('Cannot find the closest date to pass on');
//     return problematicDates;
//   }

//   // In a week mode, jump with the start date and go back to start of the week
//   if (booking.recurrenceEvent!.freqRecurrence === FreqRecurrence.weeks) {
//     lastDate = booking.recurrenceEvent!.addRangeBetween(lastDate);
//   }

//   // Passing over the dates of the recurrence event
//   let datePointer = booking.recurrenceEvent!.start!;

//   while (!setToMidNight(datePointer).isAfter(setToMidNight(lastDate))) {
//     // In case the booking is weekly, need to check all the days that are in the "weekDays" var
//     if (booking.recurrenceEvent!.freqRecurrence === FreqRecurrence.weeks) {
//       // Find the start of the week
//       const sunday = getStartOfWeek(datePointer);

//       // Iterate on weekDays and check every date
//       booking.recurrenceEvent!.weekDays.forEach((dayToCheck) => {
//         const dateToCheck = sunday.add(Duration(days: dayToCheck));
//         const bookingForCheck = Booking.fromBooking(booking);
//         bookingForCheck.bookingDate = dateToCheck;

//         // Make sure that the recurrence will occur on this date
//         // Need to verify that the date is not in the exception dates
//         if (
//           !booking.recurrenceEvent!.isAccureInDate(date: dateToCheck)
//         ) {
//           return;
//         }

//         if (
//           !isOptionalTimeForBooking(
//             worker,
//             bookingForCheck,
//             timeToOrderOn1970Format,
//             { allowAllDay: options.allowAllDay }
//           )
//         ) {
//           problematicDates.add(setToMidNight(dateToCheck));
//         }
//       });
//     } else {
//       // Regular case: the booking is daily, monthly, or yearly
//       const bookingForCheck = Booking.fromBooking(booking);
//       bookingForCheck.bookingDate = datePointer;

//       // Make sure that the recurrence will occur on this date
//       // Need to verify that the date is not in the exception dates
//       if (booking.recurrenceEvent!.isAccureInDate(date: datePointer)) {
//         if (
//           !isOptionalTimeForBooking(
//             worker,
//             bookingForCheck,
//             timeToOrderOn1970Format,
//             { allowAllDay: options.allowAllDay }
//           )
//         ) {
//           problematicDates.add(setToMidNight(datePointer));
//         }
//       }
//     }

//     datePointer = booking.recurrenceEvent!.addRangeBetween(datePointer);
//   }

//   return problematicDates;
// }

/**
 * Finds overlapping dates between two recurrence events.
 * @param first - The first recurrence event.
 * @param second - The second recurrence event.
 * @returns Set of overlapping dates.
 */
// export function overlapingDates(first: RecurrenceEvent, second: RecurrenceEvent): Set<Date> {
//   const firstIsWeek = first.freqRecurrence === FreqRecurrence.weeks;
//   const secondIsWeek = second.freqRecurrence === FreqRecurrence.weeks;

//   // Different types, just need to check the dates
//   if (firstIsWeek !== secondIsWeek) {
//     // No option to predict overlapping (not the same type and endless)
//     if (!first.endOfTheEvent && !second.endOfTheEvent) {
//       return new Set([new Date(0)]); // Both endless
//     }

//     // Finding the optimal event to check (less repeats -> shorter for loop)
//     return first.overlappingDatesWith(second);
//   } else {
//     // The same type (week & week) || (other & other)
//     if (
//       firstIsWeek &&
//       secondIsWeek &&
//       first.weekDays.intersection(second.weekDays).isEmpty
//     ) {
//       return new Set(); // No overlapping dates
//     }

//     // Finally return the list of the overlapping dates
//     return first.overlappingDatesWith(second);
//   }
// }

/**
 * Checks if a given time is optional for booking based on worker constraints.
 * @param worker - The worker model.
 * @param booking - The booking details.
 * @param timeToOrderOn1970Format - The time to order in the 1970 format.
 * @param options - Optional parameters for customization.
 * @returns True if the time is optional, false otherwise.
 */
// export function isOptionalTimeForBooking(
//   worker: WorkerModel | null,
//   booking: Booking,
//   timeToOrderOn1970Format: Date,
//   options: {
//     isUpdate?: boolean;
//     oldBooking?: Booking | null;
//     recurrenceSkipDate?: Date | null;
//     defaultWork?: Date[] | null;
//     defaultVacations?: Date[] | null;
//     defaultBreaks?: Date[] | null;
//     defaultTakenHoures?: Date[] | null;
//     defaultForbbidenTimes?: Date[] | null;
//     allowAllDay?: boolean;
//   } = {}
// ): boolean {
//   if (!worker) return false;

//   // Free day -> holiday
//   if (!options.allowAllDay && worker.closeScheduleOnHolidays && isHoliday(worker, booking.bookingDate)) {
//     logger.d("Holiday is a free day for this worker -> don't generate times");
//     return false;
//   }

//   if (!options.allowAllDay && worker.isClosingDate(booking.bookingDate)) {
//     logger.d("This day is closing by the worker");
//     return false;
//   }

//   // Every date checked in this func needs to be on the 1970 year
//   timeToOrderOn1970Format = setTo1970(timeToOrderOn1970Format);

//   if (options.allowAllDay) {
//     options.defaultWork = [
//       new Date('1970-01-01T00:00'),
//       new Date('1970-01-01T23:59')
//     ];
//   }

//   // Vars to make code cleaner
//   const bookingDate = DateFormat('dd-MM-yyyy').format(booking.bookingDate);

//   // Relevant times to calculate
//   const work = options.defaultWork ?? convertStringToTime(worker.shiftsFor({ day: booking.bookingDate }));
//   const takenHoures = options.defaultTakenHoures ?? alreadyTakenHoures(worker, bookingDate, {
//     recurrenceSkipDate: options.recurrenceSkipDate,
//     workerAction: options.allowAllDay,
//     isUpdate: options.isUpdate,
//     oldBooking: options.oldBooking
//   });
//   const forbbidenTimes = options.defaultForbbidenTimes ?? takenHoures;

//   // Sorting the lists
//   if (!options.defaultWork) {
//     work.sort();
//   }
//   if (!options.defaultForbbidenTimes) {
//     forbbidenTimes.sort();
//   }

//   // Get rid of earlier times - not necessary
//   forbbidenTimes = getOnlyEqualOrAfter(forbbidenTimes, timeToOrderOn1970Format);

//   // Fill this list with 0, those will be the pointers on each time segment
//   const treatment = Treatment.fromTreatmentsMap(booking.treatments);
//   const forbiddenTimesPointers = Array.from({ length: treatment.times.keys.length }, (_, index) => 0);

//   // Pass over the work times
//   for (let j = 0; j < work.length; j += 2) {
//     let pointerWork = work[j];
//     const endWork = work[j + 1];

//     // If we passed the time - failed to set booking in this time
//     if (pointerWork > timeToOrderOn1970Format) {
//       break;
//     }

//     // Jumping to the relevant time section
//     if (endWork <= timeToOrderOn1970Format) {
//       continue;
//     }

//     // The "timeToOrder" has to be in this time section - jumping to it
//     pointerWork = timeToOrderOn1970Format;

//     // Validate the treatment isn't kept after the work session is done
//     if (pointerWork.addMinutes(treatment.totalMinutes).isAfter(endWork) && !workerBookingOnMidnight(endWork, booking)) {
//       AppErrors().error = Errors.endOfWork;
//       return false;
//     }

//     // Now in the relevant time section setting the start time
//     // Generate given booking starting at 'pointerWork'
//     const timeSegments = generateTimeSegmentsMap(booking, pointerWork);

//     // Getting time to jump if one or more time segments striking with forbidden
//     const minutesToJump = minutesToJumpOverForbidden(forbiddenTimesPointers, timeSegments, forbbidenTimes);
//     const allowedTime = minutesToJump === 0;

//     // The restrict of set booking is because the user is just paying
//     if (!allowedTime && isBlockFromMiddlePaymentUser(booking, timeToOrderOn1970Format, bookingDate, worker, timeSegments)) {
//       AppErrors().error = Errors.currentlyOrderingForTime;
//       return false;
//     }

//     return allowedTime;
//   }

//   return false;
// }

/**
 * Checks if the booking end is on midnight and it's a worker action.
 * @param endWork - The end time of the work.
 * @param booking - The booking details.
 * @returns True if the booking end is on midnight and it's a worker action, false otherwise.
 */
// export function workerBookingOnMidnight(endWork: Date, booking: Booking): boolean {
//   const endOfBooking = booking.bookingDate.addMinutes(booking.totalMinutes);
//   return (
//     endWork.getTime() === timeStrToDate("23:59").getTime() &&
//     endOfBooking.getHours() === 0 &&
//     endOfBooking.getMinutes() === 0
//   );
// }

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
// export function isBlockFromMiddlePaymentUser(
//   booking: Booking,
//   timeToOrder: Date,
//   date: string,
//   worker: WorkerModel,
//   timeSegments: Map<string, Map<string, any>>
// ): boolean {
//   // Day isn't on middle payment times
//   if (!worker.workerPublicData.duringPaymentBookingsTime[date]) {
//     return false;
//   }

//   // Create a list of [start, end] from duringPaymentBookingsTime
//   const hours: Date[] = [];
//   worker.workerPublicData.duringPaymentBookingsTime[date].forEach(
//     (startTime: string, details: any) => {
//       try {
//         const start = DateFormat('HH:mm').parse(startTime);
//         const end = start.addMinutes(details[1]);
//         hours.push(start, end);
//       } catch (e) {
//         const msg =
//           "Error while creating the during payment list, illegal list";
//         logger.e(`${msg} -> ${details}\n${e}`);
//       }
//     }
//   );

//   // Get rid of earlier times - not necessary
//   const forbiddenTimes = getOnlyEqualOrAfter(hours, timeToOrder);

//   // Fill this list with 0; these will be the pointers on each time segment
//   const treatment = Treatment.fromTreatmentsMap(booking.treatments);
//   const forbiddenTimesPointers = Array.from(
//     { length: treatment.times.keys.length },
//     (_, index) => 0
//   );

//   // Getting time to jump if one or more time segments striking with forbidden
//   const minutesToJump = minutesToJumpOverForbidden(
//     forbiddenTimesPointers,
//     timeSegments,
//     forbiddenTimes
//   );

//   return minutesToJump !== 0;
// }

/**
 * Filters and returns the list of times equal to or after the specified start time.
 * @param times - List of times.
 * @param startTime - Start time.
 * @returns Filtered list of times.
 */
// export function getOnlyEqualOrAfter(times: Date[], startTime: Date): Date[] {
//   const filteredList: Date[] = [];
//   for (let i = 0; i < times.length; i += 2) {
//     if (!times[i + 1].isBefore(startTime)) {
//       filteredList.push(times[i], times[i + 1]);
//     }
//   }
//   return filteredList;
// }

/**
 * Gets the list of booking times from the treatment.
 * @param booking - The booking details.
 * @returns List of booking times.
 */
// export function getBookingTimes(booking: Booking): Date[] {
//   const times: Date[] = [];
//   const treatment = Treatment.fromTreatmentsMap(booking.treatments);
//   treatment.times.forEach((timeNumber, timeData) => {
//     timeData.workMinutes;
//     // Add your logic for processing timeData or adjust the code accordingly
//   });
//   return times;
// }

/**
 * Generates a list of already taken hours based on worker constraints.
 * @param worker - The worker model.
 * @param bookingDate - The booking date.
 * @param options - Options for customization.
 * @returns List of already taken hours.
 */
// export function alreadyTakenHoures(
//   worker: WorkerModel,
//   bookingDate: string,
//   options: {
//     isUpdate?: boolean;
//     workerAction?: boolean;
//     oldBooking?: Booking | null;
//     recurrenceSkipDate?: Date | null;
//   } = {}
// ): Date[] {
//   const taken: Date[] = [];
//   const dateToBook = DateFormat('dd-MM-yyyy').parse(bookingDate);

//   // Adding all the "booking times" to the "taken hours" list
//   if (worker.workerPublicData.bookingsTimes[bookingDate]) {
//     worker.workerPublicData.bookingsTimes[bookingDate]!.forEach(
//       (key: string, details: any) => {
//         const start = DateFormat('HH:mm').parse(key);
//         taken.push(start, start.add(Duration(minutes: details)));
//       }
//     );
//   }

//   const datesToSkipRecurrence = new Set<string>();

//   if (
//     options.isUpdate &&
//     options.oldBooking &&
//     options.oldBooking.recurrenceEvent &&
//     options.recurrenceSkipDate
//   ) {
//     options.oldBooking.bookingsEventsAsEvents.forEach((time, event) => {
//       const timeDate = DateFormat("HH:mm").parse(time);
//       datesToSkipRecurrence.add(
//         DateTime(
//           options.recurrenceSkipDate!.year,
//           options.recurrenceSkipDate!.month,
//           options.recurrenceSkipDate!.day,
//           timeDate.hour,
//           timeDate.minute
//         ).toString()
//       );
//     });
//   }

//   // Determine if vacation already added to the taken hours
//   let vacationAdded = false;

//   // Adding all the recurrence "bookings' times" to the "taken list"
//   worker.recurrence.recurrenceEvents.forEach((date, eventByHour) => {
//     eventByHour.forEach((hour, event) => {
//       // No need to consider break that does not block the schedule
//       if (!event.blockSchedule && event.isBreak) {
//         return;
//       }

//       // Vacation doesn't block the schedule for the worker
//       if (event.isVacation && options.workerAction) {
//         return;
//       }

//       // If there is already vacation in the taken list, no need to add more times,
//       // as the entire day is taken
//       if (vacationAdded) {
//         return;
//       }

//       if (
//         options.isUpdate &&
//         options.oldBooking &&
//         options.oldBooking.recurrenceEvent
//       ) {
//         const hourTime = DateFormat("HH:mm").parse(hour);
//         const dateToCheck = dateToBook.add(
//          new Duration({hours: hourTime.hour, minutes: hourTime.minute})
//         );

//         if (datesToSkipRecurrence.has(dateToCheck.toString())) {
//           return;
//         }
//       }

//       // Adding only events that occur on the booking date
//       if (!event.recurrenceEvent) {
//         return;
//       }

//       if (event.recurrenceEvent.isAccureInDate(date: dateToBook)) {
//         const start = DateFormat('HH:mm').parse(hour);

//         // If the event is vacation, no need to keep all the events;
//         // the entire day is taken
//         if (event.isVacation) {
//           vacationAdded = true;
//           taken.length = 0; // Clear the array
//         }

//         taken.push(start, start.add(Duration(minutes: event.durationMinutes)));
//       }
//     });
//   });

//   // Update -> allows you to see hours that your turn block
//   // Remove the first of (start, end), so if duplicate doesn't matter
//   // since this is the same index -> [1,5,4,4,7,8] remove [1,4] while sort()
//   // the index stays the same -> [4,5,7,8].
//   // oldBooking.recurrenceEvent == null -> in recurrence, we ignore the booking
//   // in advance, no need to remove; it never added
//   if (
//     options.isUpdate &&
//     options.oldBooking &&
//     options.oldBooking.workerId === worker.id &&
//     !options.oldBooking.recurrenceEvent
//   ) {
//     // Make sure to remove the old times only if it is the same day
//     const oldDate = setToMidNight(options.oldBooking.bookingDate);

//     if (dateToBook.difference(oldDate).inSeconds === 0) {
//       // To make it in 1970 - date
//       let startTime = setTo1970(options.oldBooking.bookingDate);

//       // Pass over the timeSegments and remove all the segments
//       const treatment = Treatment.fromTreatmentsMap(
//         options.oldBooking.treatments
//       );

//       treatment.times.forEach((timeIndex, timeData) => {
//         startTime = startTime.add(Duration(minutes: timeData.breakMinutes));
//         const endTime = startTime.add(Duration(minutes: timeData.workMinutes));

//         taken.splice(taken.indexOf(startTime), 2);
//         taken.splice(taken.indexOf(endTime), 2);
//         startTime = endTime;
//       });
//     }
//   }

//   return taken;
// }

/**
 * Gets all free times for a worker on a specific date.
 * @param worker - The worker model.
 * @param dateToCheck - The date to check.
 * @returns List of all free times.
 */
// export function allFreeTimes(worker: WorkerModel, dateToCheck: Date): Date[] {
//   const allDayTimes: Date[] = [];
//   const freeTimes: Date[] = [];
//   const shifts = convertStringToTime(worker.shiftsFor({ day: dateToCheck }));
//   const shiftsStarts = new Set<Date>();
//   const shiftsEnds = new Set<Date>();

//   shifts.forEach((time, index) => {
//     allDayTimes.push(time);

//     if (index % 2 === 0) {
//       shiftsStarts.add(time);
//     } else {
//       shiftsEnds.add(time);
//     }
//   });

//   const taken = eventsTimes(worker, dateToCheck);
//   const takenStarts = new Set<Date>();
//   const takenEnds = new Set<Date>();

//   taken.forEach((time, index) => {
//     allDayTimes.push(time);

//     if (index % 2 === 0) {
//       takenStarts.add(time);
//     } else {
//       takenEnds.add(time);
//     }
//   });

//   allDayTimes.sort();

//   let isBlock = false;
//   let insideShift = false;

//   allDayTimes.forEach((time) => {
//     if (takenStarts.has(time)) {
//       if (!isBlock && insideShift) {
//         freeTimes.push(time);
//       }
//       isBlock = true;
//     }

//     if (takenEnds.has(time)) {
//       isBlock = false;
//       if (!isBlock && insideShift) {
//         freeTimes.push(time);
//       }
//     }

//     if (shiftsStarts.has(time)) {
//       insideShift = true;
//       if (!isBlock && insideShift) {
//         freeTimes.push(time);
//       }
//     }

//     if (shiftsEnds.has(time)) {
//       if (!isBlock && insideShift) {
//         freeTimes.push(time);
//       }
//       insideShift = false;
//     }
//   });

//   return freeTimes;
// }

/**
 * Gets the list of breaks for today based on the worker's breaks.
 * @param day - The day to check.
 * @param breaks - The worker's breaks.
 * @param options - Options for customization.
 * @returns List of breaks for today.
 */
// export function getTodayListOfBreaks(
//   day: string,
//   breaks: Map<string, BreakModel>,
//   options: { isUpdate?: boolean; breakModel?: BreakModel } = {}
// ): Date[] {
//   const todayBreaks: Date[] = [];
//   const dateToCheck = DateFormat('dd-MM-yyyy').parse(day);

//   breaks.forEach((key, breakModel) => {
//     // Adding the recurrence breaks
//     const isAccureReccurnece =
//       breakModel.recurrenceEvent &&
//       breakModel.recurrenceEvent.isAccureInDate(date: dateToCheck);

//     // Adding the "break times" from the "breaks list"
//     if (breakModel.day === day || isAccureReccurnece) {
//       const start = DateFormat('HH:mm').parse(breakModel.start);
//       todayBreaks.push(start, start.add(breakModel.duration));
//     }
//   });

//   if (options.isUpdate) {
//     const start = DateFormat('HH:mm').parse(options.breakModel!.start);
//     todayBreaks.splice(todayBreaks.indexOf(start), 2);
//   }

//   return todayBreaks;
// }

// /// Get `time` and return the same time rounded up to 5 minutes
// export function getTimeDevideByFive(time: Date, inCheckFormat: boolean = false): Date {
//   const minutes = time.getMinutes();
//   const tens = Math.floor(minutes / 10);
//   const ones = minutes % 10;
//   const amountOfFives = Math.ceil(ones / 5);

//   if (inCheckFormat) {
//     return new Date(1970, 0, 1, time.getHours(), tens * 10 + amountOfFives * 5);
//   }

//   return new Date(
//     time.getFullYear(),
//     time.getMonth(),
//     time.getDate(),
//     time.getHours(),
//     tens * 10 + amountOfFives * 5
//   );
// }

// export function getValidDataTimeToCheck(time: Date): Date {
//   const minutes = parseInt(time.toLocaleTimeString().slice(3, 5));
//   const hours = parseInt(time.toLocaleTimeString().slice(0, 2));
//   return new Date(1970, 0, 1, hours, minutes);
// }

// export function getFakeBookingToCheck(
//   treatmentName: string,
//   treatment: Treatment,
//   date: Date
// ): Booking {
//   const newTreatment = new Treatment(
//     treatmentName,
//     treatment.price,
//     Object.assign({}, treatment.times)
//   );

//   return new Booking({ userFcms: {}, debts: {} })
//     .setBookingDate(date)
//     .setTreatments({ "": newTreatment });
// }

// export function getFakeBookingFromTime(day: string, start: string, end: string, workerId: string = ""): Booking {
//   const startEvent = new Date(`1970-01-01T${start}`);
//   const endEvent = new Date(`1970-01-01T${end}`);
//   const totalMinutes = Math.floor((endEvent.getTime() - startEvent.getTime()) / (60 * 1000));

//   const treatment = new Treatment({
//     times: { 0: new TreatmentTime({ workMinutes: totalMinutes }) },
//   });

//   return new Booking({ userFcms: {}, debts: {} })
//     .setBookingDate(new Date(day))
//     .setWorkerId(workerId)
//     .setTreatments({ "": treatment });
// }

/// Get `closestEvent` and `event` Return if the event is after
/// in less than 10 minutes
// export function isRightAfterEvent(
//   event: Event,
//   closestEvent: Event | null
// ): boolean {
//   if (closestEvent === null) {
//     return false;
//   }

//   return (
//     closestEvent.to.getTime() - event.from.getTime() < 10 * 60 * 1000 &&
//     closestEvent.to.getTime() - event.from.getTime() >= 0
//   );
// }

export function dateToTimeStr(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}

export function dateToStrAccoridngToFormat(date: Date, format: string): string {
  console.log("TODO LanguageHelper().currentLaguageCode");
  return new Intl.DateTimeFormat("he", {
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}

export function dateToDayStr(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date);
}

export function dateToMonthStr(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function dateToCustomDayAndMonthStr(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "numeric",
  }).format(date);
}

export function dateToCustomDayAndMonthAndHourStr(
  date: Date,
  showHours: boolean
): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "numeric",
    hour: showHours ? "numeric" : undefined,
    minute: showHours ? "numeric" : undefined,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function dateToCustomYearAndDayAndMonthAndHourStr(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "numeric",
    year: "2-digit",
    hour: "numeric",
    minute: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function dateToDateStr(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function timeStrToDate(date: string): Date {
  return new Date(`1970-01-01T${date}`);
}

export function dateStrToDate(date: string): Date {
  return new Date(date);
}

export function monthStrToDate(date: string): Date {
  return new Date(date);
}

export function conversStrToDateTime(day: Date, strTime: string): Date {
  const time = new Date(`1970-01-01T${strTime}`);
  return new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate(),
    time.getHours(),
    time.getMinutes()
  );
}

export function convers1970DateTimeToDay(day: Date, dateFrom1970: Date): Date {
  return new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate(),
    dateFrom1970.getHours(),
    dateFrom1970.getMinutes()
  );
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

// export function getFakeBookingFromBreak(breakModel: BreakModel): Booking {
//   const treatment = new Treatment({
//     times: { 0: new TreatmentTime({ workMinutes: breakModel.duration }) },
//   });
//   const date = new Date(breakModel.day);
//   const time = new Date(breakModel.start);

//   return new Booking({ userFcms: {}, debts: {} })
//     .setRecurrenceEvent(breakModel.recurrenceEvent)
//     .setBookingDate(
//       new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes())
//     )
//     .setWorkerId(breakModel.workerId)
//     .setTreatments({ "": treatment });
// }

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

export function addMonths(date: Date, months: number): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth() + months,
    date.getDate(),
    date.getHours(),
    date.getMinutes()
  );
}

export function durationStrikings(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): string {
  if (
    start1.getTime() < start2.getTime() &&
    end1.getTime() < start2.getTime()
  ) {
    return "NO_STRIKE";
  } else if (
    start1.getTime() > end2.getTime() &&
    end1.getTime() > end2.getTime()
  ) {
    return "NO_STRIKE";
  } else {
    return "STRIKE";
  }
}

export function convertStringToTime(times: string[]): Date[] {
  const convertedTimes: Date[] = [];
  for (let i = 0; i < times.length; i++) {
    convertedTimes.push(timeStrToDate(times[i])); // Assuming timeStrToDate is defined
  }
  return convertedTimes;
}

/**
 * Get `start` and `end` Return the end date of
 * the event that overlapping with this range
 */
// export function findOverlapingEvent(
//   worker: WorkerModel,
//   start: Date,
//   end: Date
// ): Date {
//   // Find which event is overlapping with the date range
//   const day = dateToDayStr(start);
//   const month = dateToMonthStr(start);

//   // Find the recurrence event that happened that day
//   const eventsFromRecurrence: Event[] = [];
//   worker.recurrence.recurrenceEvents.forEach((day, dayEvents) => {
//     dayEvents.forEach((time, event) => {
//       if (
//         event.recurrenceEvent !== null &&
//         event.recurrenceEvent.isAccureInDate({ date: start })
//       ) {
//         const eventStart = new Date(
//           start.getFullYear(),
//           start.getMonth(),
//           start.getDate(),
//           event.from.hour,
//           event.from.minute
//         );
//         const eventEnd = new Date(
//           start.getFullYear(),
//           start.getMonth(),
//           start.getDate(),
//           event.to.hour,
//           event.to.minute
//         );
//         eventsFromRecurrence.push({ ...event, from: eventStart, to: eventEnd });
//       }
//     });
//   });

//   let todayEvents: Event[] = [];
//   if (
//     worker.events.allEvents[month] !== null &&
//     worker.events.allEvents[month]![day] !== null
//   ) {
//     todayEvents = Object.values(worker.events.allEvents[month]![day]!);
//   }

//   if (
//     todayEvents.length === 0 &&
//     Object.keys(worker.events.breakEvents).length === 0 &&
//     eventsFromRecurrence.length === 0
//   ) {
//     return start;
//   }

//   const events = [
//     ...todayEvents,
//     ...eventsFromRecurrence,
//     ...Object.values(worker.events.breakEvents),
//   ];
//   events = events.filter(
//     (event) => dateToDateStr(event.from) === dateToDateStr(start)
//   );
//   events.sort((a, b) => a.from.getTime() - b.from.getTime());

//   let newDate = start;
//   let closestToStartEvent: Event | undefined;

//   for (const event of events) {
//     // Take the end of the event that overlaps with the time
//     if (
//       (isRightAfterEvent(event, closestToStartEvent) ||
//         !event.from.getTime() > start.getTime()) &&
//       event.to.getTime() > start.getTime() &&
//       event.to.getTime() < end.getTime()
//     ) {
//       closestToStartEvent = event;
//       newDate = event.to;
//     }
//   }

//   return newDate;
// }
