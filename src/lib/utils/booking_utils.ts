import {
  BookingReminderType,
  BookingStatuses,
  needToRemindAnyWayDuration,
} from "$lib/consts/booking";
import { GeneralData } from "$lib/helpers/general_data";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";
import Booking from "$lib/models/booking/booking_model";
import { Duration } from "$lib/models/core/duration";
import type WorkerModel from "$lib/models/worker/worker_model";
import { addDuration, subDuration } from "./duration_utils";

export async function checkForReminders(): Promise<{
  [key in BookingReminderType]?: Booking[];
}> {
  // Make sure that the workers are loaded
  if (GeneralData.currentBusinesssId !== "") {
    let count = 0;
    while (BusinessInitializer.GI().workers.isEmpty && count < 10) {
      count++;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  const finalMap: { [key in BookingReminderType]?: Booking[] } = {};
  const user = UserInitializer.GI().user;

  const regularBookings: Map<string, Booking> = new Map();
  const recurrenceBookings = user.bookings.recurrence || {};
  for (const bookings of Object.values(user.bookings.futureBookings)) {
    for (const [key, booking] of Object.entries(bookings)) {
      regularBookings.set(key, booking);
    }
  }

  // Consider the recurrence bookings that happened today
  for (const [_, booking] of Object.entries(recurrenceBookings)) {
    if (
      booking.buisnessId !== BusinessInitializer.GI().business.businessId ||
      booking.status !== BookingStatuses.approved
    ) {
      continue;
    }

    if (booking.recurrenceEvent == null) {
      continue;
    }

    const worker = BusinessInitializer.GI().workers[booking.workerId];
    if (worker == null) {
      continue;
    }

    const maxMinutesToRemind =
      worker.notifications.remindersTypes.size === 0
        ? 0
        : Math.max(...Object.values(worker.notifications.remindersTypes));

    let start = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay(),
      booking.bookingDate.getHours(),
      booking.bookingDate.getMinutes()
    );

    while (
      start <
      addDuration(new Date(), new Duration({ minutes: maxMinutesToRemind }))
    ) {
      if (start < new Date()) {
        start = new Date(start.getTime() + 24 * 60 * 60 * 1000); // Add one day
        continue;
      }

      if (!booking.recurrenceEvent.isAccureInDate({ date: start })) {
        start = new Date(start.getTime() + 24 * 60 * 60 * 1000); // Add one day
        continue;
      }

      const bookingToAdd = Booking.fromBooking(booking);
      bookingToAdd.bookingDate = start;
      let alreadyAddRegular = false;

      if (subDuration(start, needToRemindAnyWayDuration) < new Date()) {
        alreadyAddRegular = true;

        finalMap[BookingReminderType.regular] ??= [];

        finalMap[BookingReminderType.regular]!.push(bookingToAdd);
      }

      for (const [type, minutes] of booking.remindersTypes) {
        if (BookingReminderType.regular === type && alreadyAddRegular) {
          continue;
        }

        if (worker.notifications.remindersTypes.get(type) == null) {
          continue;
        }

        if (
          subDuration(
            start,
            new Duration({
              minutes: worker.notifications.remindersTypes.get(type),
            })
          ) < new Date()
        ) {
          continue;
        }

        finalMap[type] ||= [];
        finalMap[type]!.push(bookingToAdd);
      }

      start = addDuration(start, new Duration({ days: 1 })); // Add one day
    }
  }

  // Iterate the regular bookings
  for (const [_, booking] of regularBookings) {
    if (
      booking.buisnessId !== BusinessInitializer.GI().business.businessId ||
      booking.status !== BookingStatuses.approved
    ) {
      continue;
    }

    const worker = BusinessInitializer.GI().workers[booking.workerId];

    if (worker == null) {
      continue;
    }

    if (booking.bookingDate < new Date()) {
      continue;
    }

    let alreadyAddRegular = false;
    if (
      subDuration(booking.bookingDate, needToRemindAnyWayDuration) < new Date()
    ) {
      alreadyAddRegular = true;
      finalMap[BookingReminderType.regular] ||= [];
      finalMap[BookingReminderType.regular]!.push(booking);
    }

    for (const [type, minutes] of booking.remindersTypes) {
      if (worker.notifications.remindersTypes.get(type) == null) {
        continue;
      }

      if (BookingReminderType.regular === type && alreadyAddRegular) {
        continue;
      }

      if (
        subDuration(
          booking.bookingDate,
          new Duration({
            minutes: worker.notifications.remindersTypes.get(type),
          })
        ) >= new Date()
      ) {
        continue;
      }
    }
  }

  return finalMap;
}

export function needToHoldOn(bookingDate: Date, worker: WorkerModel): boolean {
  const duration = new Date();
  duration.setMinutes(duration.getMinutes() + worker.onHoldMinutes);

  return duration.getTime() > bookingDate.getTime();
}
