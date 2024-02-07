import { logger } from "$lib/consts/application_general";
import AppErrorsHelper from "$lib/helpers/app_errors";
import type Booking from "$lib/models/booking/booking_model";
import { Duration } from "$lib/models/core/duration";
import Treatment from "$lib/models/general/treatment_model";
import type WorkerModel from "$lib/models/worker/worker_model";
import { Errors } from "$lib/services/errors/messages";
import { addDuration } from "../duration_utils";
import {
  convertStringToTime,
  dateToDateStr,
  getOnlyEqualOrAfter,
  isHoliday,
  setTo1970,
  timeStrToDate,
  workerBookingOnMidnight,
} from "../times_utils";
import {
  alreadyTakenHoures,
  generateTimeSegmentsMap,
  isBlockFromMiddlePaymentUser,
  minutesToJumpOverForbbiden,
} from "./general";

/**
 * Checks if a given time is optional for booking based on worker constraints.
 * @param worker - The worker model.
 * @param booking - The booking details.
 * @param timeToOrderOn1970Format - The time to order in the 1970 format.
 * @param options - Optional parameters for customization.
 * @returns True if the time is optional, false otherwise.
 */
export function isOptionalTimeForBooking({
  worker,
  booking,
  timeToOrderOn1970Format,
  oldBooking,
  recurrenceSkipDate,
  defaultWork,
  defaultTakenHoures,
  defaultForbbidenTimes,
  isUpdate = false,
  allowAllDay = false,
}: {
  worker: WorkerModel | undefined;
  booking: Booking;
  timeToOrderOn1970Format: Date;
  oldBooking?: Booking;
  recurrenceSkipDate?: Date;
  defaultWork?: Date[];
  defaultTakenHoures?: Date[];
  defaultForbbidenTimes?: Date[];
  isUpdate?: boolean;
  allowAllDay?: boolean;
}): boolean {
  if (!worker) return false;

  // Free day -> holiday
  if (
    !allowAllDay &&
    worker.closeScheduleOnHolidays &&
    isHoliday(worker, booking.bookingDate)
  ) {
    logger.error(
      "Holiday is a free day for this worker -> don't generate times"
    );
    return false;
  }

  if (!allowAllDay && worker.isClosingDate(booking.bookingDate)) {
    logger.error("This day is closing by the worker");
    return false;
  }

  // Every date checked in this func needs to be on the 1970 year
  timeToOrderOn1970Format = setTo1970(timeToOrderOn1970Format);

  if (allowAllDay) {
    defaultWork = [timeStrToDate("00:00"), timeStrToDate("23:59")];
  }

  // Vars to make code cleaner
  const bookingDate = dateToDateStr(booking.bookingDate);

  // Relevant times to calculate
  console.log("defaultWork", defaultWork);
  console.log(
    "shifts",
    convertStringToTime(worker.shiftsFor({ day: booking.bookingDate }))
  );
  console.log(worker.shiftsFor({ day: booking.bookingDate }));
  const work =
    defaultWork ??
    convertStringToTime(worker.shiftsFor({ day: booking.bookingDate }));
  const takenHoures =
    defaultTakenHoures ??
    alreadyTakenHoures({
      worker: worker,
      bookingDate: bookingDate,
      isUpdate: isUpdate,
      workerAction: allowAllDay,
      oldBooking: oldBooking,
      recurrenceSkipDate: recurrenceSkipDate,
    });

  let forbbidenTimes: Date[] = defaultForbbidenTimes ?? takenHoures;

  // Sorting the lists
  if (!defaultWork) {
    work.sort();
  }
  if (!defaultForbbidenTimes) {
    forbbidenTimes.sort();
  }

  // Get rid of earlier times - not necessary
  forbbidenTimes = getOnlyEqualOrAfter(forbbidenTimes, timeToOrderOn1970Format);

  // Fill this list with 0, those will be the pointers on each time segment
  const treatment = Treatment.fromTreatmentsMap(booking.treatments);
  const forbiddenTimesPointers = Array.from(
    { length: treatment.times.keys.length },
    (_, index) => 0
  );

  console.log(treatment);
  console.log("work", work);
  // Pass over the work times
  for (let j = 0; j < work.length; j += 2) {
    console.log("Inside for");
    let pointerWork = work[j];
    const endWork = work[j + 1];

    // If we passed the time - failed to set booking in this time
    if (pointerWork > timeToOrderOn1970Format) {
      break;
    }

    // Jumping to the relevant time section
    if (endWork <= timeToOrderOn1970Format) {
      continue;
    }

    // The "timeToOrder" has to be in this time section - jumping to it
    pointerWork = timeToOrderOn1970Format;

    // Validate the treatment isn't kept after the work session is done
    if (
      addDuration(
        pointerWork,
        new Duration({ minutes: treatment.totalMinutes })
      ) > endWork &&
      !workerBookingOnMidnight(endWork, booking)
    ) {
      AppErrorsHelper.GI().error = Errors.endOfWork;

      return false;
    }

    // Now in the relevant time section setting the start time
    // Generate given booking starting at 'pointerWork'
    const timeSegments = generateTimeSegmentsMap(booking, pointerWork);

    // Getting time to jump if one or more time segments striking with forbidden
    const minutesToJump = minutesToJumpOverForbbiden(
      forbiddenTimesPointers,
      timeSegments,
      forbbidenTimes
    );
    const allowedTime = minutesToJump === 0;
    console.log("timeSegments", timeSegments);
    console.log("minutesToJump", minutesToJump);
    // The restrict of set booking is because the user is just paying
    if (
      !allowedTime &&
      isBlockFromMiddlePaymentUser(
        booking,
        timeToOrderOn1970Format,
        bookingDate,
        worker,
        timeSegments
      )
    ) {
      AppErrorsHelper.GI().error = Errors.currentlyOrderingForTime;

      return false;
    }

    return allowedTime;
  }

  return false;
}
