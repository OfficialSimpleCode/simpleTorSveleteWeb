import { logger } from "$lib/consts/application_general";
import Booking from "$lib/models/booking/booking_model";
import Treatment from "$lib/models/general/treatment_model";
import TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
import type WorkerModel from "$lib/models/worker/worker_model";
import { addDuration, durationStrikings } from "../duration_utils";
import { convertStringToTime, dateToDateStr } from "../times_utils/times_utils";
import {
  addMinutesToAllSegments,
  alreadyTakenHoures,
  generateReversedTimeSegmentsMap,
  generateTimeSegmentsMap,
  getJump,
  getJumpReversed,
  getTimeDevideByFive,
  isAllDayTaken,
  minutesToJumpOverForbbiden,
  minutesToJumpOverForbbidenReverse,
  shouldSkip,
  timeIsAlreadyPassed,
} from "./general";

/**
 * Returns a list of relevant hours for the given worker, booking, and optional parameters.
 * @param worker - The worker model.
 * @param booking - The booking information.
 * @param options - Optional parameters for customization.
 * @returns List of relevant hours.
 */
export function relevantHoures({
  worker,
  booking,
  isUpdate = false,
  oldBooking,
  workerSheet = false,
  reverse = false,
  workerAction = false,
  amoutLimit,
  recurrenceSkipDate,
}: {
  worker: WorkerModel | undefined;
  booking: Booking;
  isUpdate?: boolean;
  oldBooking?: Booking;
  workerSheet?: boolean;
  reverse?: boolean;
  workerAction?: boolean;
  amoutLimit?: number;
  recurrenceSkipDate?: Date;
}): TimePickerObj[] {
  const finalTimes: TimePickerObj[] = [];

  // Return empty array if worker is null or undefined
  if (worker === undefined) {
    return finalTimes;
  }

  // Check if all day is taken
  if (isAllDayTaken(worker, booking.bookingDate, workerAction, workerSheet)) {
    return finalTimes;
  }

  const bookingDate = dateToDateStr(booking.bookingDate);
  const work = convertStringToTime(
    worker.shiftsFor({ day: booking.bookingDate })
  );

  const takenHoures = alreadyTakenHoures({
    worker: worker,
    bookingDate: bookingDate,
    isUpdate: isUpdate,
    workerAction: workerAction,
    oldBooking: oldBooking,
    recurrenceSkipDate: recurrenceSkipDate,
  });

  const forbbidenTimes = takenHoures;
  forbbidenTimes.sort();
  work.sort();

  const treatment = Treatment.fromTreatmentsMap(booking.treatments);

  console.log("work", work);
  console.log("forbbidenTimes", forbbidenTimes);
  console.log("treatment", treatment);
  // Call the reverse algorithm if specified
  if (reverse) {
    return reverseRelevantHoures({
      worker: worker,
      work: work,
      forbbidenTimes: forbbidenTimes,
      bookingDate: bookingDate,
      treatment: treatment,
      booking: Booking.fromBooking(booking),
      workerSheet: workerSheet,
      amoutLimit: amoutLimit,
    });
  }

  const forbiddenTimesPointers: number[] = Array.from(
    { length: treatment.times.size },
    () => 0
  );

  console.log("forbiddenTimesPointers", forbiddenTimesPointers);

  // Calculate the current legal time (end with 0 or 5)
  let currentTime = getTimeDevideByFive(new Date(), true);

  console.log("currentTime", currentTime);

  // Iterate over the work times
  let i = 0;
  for (let j = 0; j < work.length; j += 2) {
    let pointerWork = work[j];
    const endWork = work[j + 1];

    console.log("pointerWork", pointerWork);
    console.log("endWork", endWork);

    // Skipping to the current time
    if (shouldSkip(pointerWork, bookingDate)) {
      switch (
        durationStrikings(currentTime, currentTime, pointerWork, endWork)
      ) {
        case "BEFORE":
          // Current is later
          logger.debug("Alg duration status - BEFORE");
          continue;
        case "AFTER":
          // Current is passed
          logger.debug("Alg duration status - AFTER");
          break;
        case "STRIKE":
          // Current is in this section
          logger.debug("Alg duration status - STRIKE");
          break;
      }
      pointerWork = currentTime;
    }

    // Generate optional treatment starting at 'pointerWork'
    const timeSegments = generateTimeSegmentsMap(booking, pointerWork);

    // saves the last and first
    const valuesArr = Array.from(timeSegments.values());
    const lastTimeSegment = valuesArr[valuesArr.length - 1];
    const firstTimeSegment = valuesArr[0];

    console.log("valuesArr", valuesArr);
    console.log("valuesArr", valuesArr);
    console.log("lastTimeSegment", lastTimeSegment);
    console.log("firstTimeSegment", firstTimeSegment);

    // Pass over the current time stamp
    while (
      addDuration(lastTimeSegment.start, lastTimeSegment.duration) <= endWork
    ) {
      i++;
      if (i > 500) {
        logger.error("Infinity loop in times algorithm - stopping");
        break;
      }

      // Get time to jump to the next optional time
      const minutesToJump = minutesToJumpOverForbbiden(
        forbiddenTimesPointers,
        timeSegments,
        forbbidenTimes
      );

      // Calculate the default jump time
      const jump = getJump(
        firstTimeSegment.start,
        forbbidenTimes,
        forbiddenTimesPointers,
        worker
      );

      // If the jump is set to 0, no need to jump - allowed time
      const allowedTime = minutesToJump === 0;

      // Add the time and save place for short bookings
      if (allowedTime) {
        const timeToAdd = firstTimeSegment.start;
        const dateToAdd = new Date(
          booking.bookingDate.getFullYear(),
          booking.bookingDate.getMonth(),
          booking.bookingDate.getDate(),
          timeToAdd.getHours(),
          timeToAdd.getMinutes()
        );

        console.log("minutesToJump", minutesToJump);
        console.log("jump", jump);
        console.log("allowedTime", allowedTime);

        // Adding only the first time (start of the treatment)
        finalTimes.push(new TimePickerObj({ displayDate: dateToAdd }));

        // If there is an amount limit and we reached it, return the times
        if (amoutLimit !== undefined && amoutLimit >= finalTimes.length) {
          return finalTimes;
        }

        // For worker when editing customer booking,
        // we don't need to optimize the times by the shorter turn
        // because the worker can already set a turn every 5 minutes in the task
        if (workerSheet) {
          addMinutesToAllSegments(timeSegments, 5);
        } else {
          console.log("BEFORE");
          timeSegments.forEach((val, _) => {
            console.log("Values for key", _);
            console.log(val.start);
            console.log(val.duration);
          });
          addMinutesToAllSegments(timeSegments, jump);
          console.log("AFTER");
          timeSegments.forEach((val, _) => {
            console.log("Values for key", _);
            console.log(val.start);
            console.log(val.duration);
          });
        }
      } else {
        // Finish passing all over the forbidden times
        // (pointer of the first segment end time is out of the list)
        if (forbbidenTimes.length - 1 < forbiddenTimesPointers[0] + 1) {
          if (workerSheet) {
            addMinutesToAllSegments(timeSegments, 5);
          } else {
            addMinutesToAllSegments(timeSegments, jump);
          }
        }
        // Jump to the end of the current forbidden time -> save time complexity
        else {
          // If strike, adding the best time (longest)
          addMinutesToAllSegments(timeSegments, minutesToJump);
        }
      }
    }
  }

  return finalTimes;
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
function reverseRelevantHoures({
  worker,
  work,
  forbbidenTimes,
  bookingDate,
  treatment,
  booking,
  workerSheet = false,
  amoutLimit,
}: {
  worker: WorkerModel;
  work: Date[];
  forbbidenTimes: Date[];
  bookingDate: string;
  treatment: Treatment;
  booking: Booking;
  workerSheet: boolean;
  amoutLimit?: number;
}): TimePickerObj[] {
  const finalTimes: TimePickerObj[] = [];

  // Check if all day is taken
  if (isAllDayTaken(worker, booking.bookingDate, false, workerSheet)) {
    return finalTimes;
  }

  // Initialize forbidden times pointers to the end of the times
  const forbiddenTimesPointers: number[] = Array.from(
    { length: treatment.times.size },
    () => forbbidenTimes.length - 1
  );
  // Initialize iteration variables
  let i = 0;

  // Iterate over work times starting from the end
  for (let j = work.length - 1; j >= 0; j -= 2) {
    const endShift = work[j];
    const startShift = work[j - 1];

    // Generate optional treatment starting at 'pointerWork'
    const timeSegments = generateReversedTimeSegmentsMap(booking, endShift);

    // saves the first
    const valuesArr = Array.from(timeSegments.values());
    const firstTimeSegment = valuesArr[0];

    // Pass over the current time stamp

    while (firstTimeSegment.start >= startShift) {
      i++;
      if (i > 500) {
        logger.error("Infinity loop in times algorithm - stopping");
        break;
      }

      // Stop iteration if the start time of the booking is passed
      if (timeIsAlreadyPassed(firstTimeSegment.start, bookingDate)) {
        break;
      }

      // Get time to jump to the next optional time
      const minutesToJump = minutesToJumpOverForbbidenReverse(
        forbiddenTimesPointers,
        timeSegments,
        forbbidenTimes
      );

      // Calculate the default jump time
      const jump = getJumpReversed(
        firstTimeSegment.start,
        forbbidenTimes,
        forbiddenTimesPointers,
        worker
      );

      // Check if this set to 0 -> no need to jump - allowed time
      const allowedTime = minutesToJump === 0;

      // Add the time and save a place for short bookings
      if (allowedTime) {
        const timeToAdd = firstTimeSegment.start;
        const dateToAdd = new Date(
          booking.bookingDate.getFullYear(),
          booking.bookingDate.getMonth(),
          booking.bookingDate.getDate(),
          timeToAdd.getHours(),
          timeToAdd.getMinutes()
        );

        // Adding only the first time (start of the treatment)
        finalTimes.push(new TimePickerObj({ displayDate: dateToAdd }));

        // If there is an amount limit and we reached it, return the times
        if (amoutLimit !== undefined && amoutLimit >= finalTimes.length) {
          return finalTimes;
        }

        /* For a worker when editing customer booking,
          we don't need to optimize the times by the shorter turn
          because the worker already can set a turn every 5 minutes in the task */
        if (workerSheet) {
          addMinutesToAllSegments(timeSegments, -5);
        } else {
          addMinutesToAllSegments(timeSegments, -jump);
        }
      } else {
        // Finish passing all over the forbidden times
        // (pointer of the first segment end time is out of the list)
        if (forbiddenTimesPointers[0] < 0) {
          if (workerSheet) {
            addMinutesToAllSegments(timeSegments, -5);
          } else {
            addMinutesToAllSegments(timeSegments, -jump);
          }
        }
        // Jump to the end of the current forbidden time -> save time complexity
        else {
          // If strike, adding the best time (longest)
          addMinutesToAllSegments(timeSegments, -minutesToJump);
        }
      }
    }
  }

  return finalTimes;
}
