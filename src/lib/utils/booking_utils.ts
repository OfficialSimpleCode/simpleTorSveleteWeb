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
import type UserBookings from "$lib/models/user/bookings";
import type UserModel from "$lib/models/user/user_model";
import type WorkerModel from "$lib/models/worker/worker_model";
import { setToMidNight } from "./dates_utils";
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
      new Date().getDate(),
      booking.bookingDate.getHours(),
      booking.bookingDate.getMinutes()
    );

    while (
      start <
      addDuration(new Date(), new Duration({ minutes: maxMinutesToRemind }))
    ) {
      if (start < new Date()) {
        start = addDuration(start, new Duration({ days: 1 })); // Add one day
        continue;
      }

      if (!booking.recurrenceEvent.isAccureInDate({ date: start })) {
        start = addDuration(start, new Duration({ days: 1 })); // Add one day
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

export function sortMyBookings(user: UserModel): Booking[] {
  const bookingsCollection: UserBookings = user.bookings;
  const futureBookings: Record<string, Booking> = {}; // { "dd-MM-yyyy": { bookingId : Booking() } }

  ///{id: {current booking id: alreaest date of his children }}
  const alreadyApearRecurrence: Record<string, Record<string, Date>> = {};

  Object.entries(bookingsCollection.recurrence ?? {}).forEach(
    ([bookingId, booking]) => {
      // if (!MyBookingsUIController().filterBookings.value.isValid(booking)) {
      //   return;
      // }

      if (!booking.recurrenceEvent) {
        return;
      }

      const dateOfNearestBooking =
        booking.recurrenceEvent.nearestFutureAccurenceDate(new Date(), {
          needToBeAfterStart: false,
        });

      if (!dateOfNearestBooking) {
        return;
      }

      const newBooking: Booking = Booking.fromBooking(booking);

      newBooking.recurrenceChildDate = new Date(
        dateOfNearestBooking.getFullYear(),
        dateOfNearestBooking.getMonth(),
        dateOfNearestBooking.getDate(),
        booking.bookingDate.getHours(),
        booking.bookingDate.getMinutes()
      );
      futureBookings[newBooking.bookingId] = newBooking;

      let bookingDate: Date | undefined = undefined;

      const bookingForCheck: Booking = Booking.fromBooking(newBooking);
      bookingForCheck.recurrenceChildDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        booking.bookingDate.getHours(),
        booking.bookingDate.getMinutes()
      );

      if (
        newBooking.recurrenceEvent!.isAccureInDate({ date: new Date() }) &&
        !bookingForCheck.isPassed
      ) {
        bookingDate = setToMidNight(new Date());
      } else {
        bookingDate = booking.recurrenceEvent.nearestFutureAccurenceDate(
          new Date()
        );
      }

      if (bookingDate) {
        alreadyApearRecurrence[booking.bookingId] = {
          [booking.bookingId]: bookingDate,
        };
      }
    }
  );

  Object.entries(bookingsCollection.futureBookings).forEach(
    ([monthStr, monthBcookings]) => {
      Object.entries(monthBcookings).forEach(([bookingId, booking]) => {
        //   if (!MyBookingsUIController().filterBookings.value.isValid(booking)) {
        //     return;
        //   }

        if (booking.isPassed) {
          return;
        }

        if (booking.recurrenceRef) {
          if (
            bookingsCollection.recurrence !== undefined &&
            bookingsCollection.recurrence![booking.recurrenceRef] &&
            alreadyApearRecurrence[booking.recurrenceRef] !== undefined &&
            booking.bookingDate <
              Object.values(alreadyApearRecurrence[booking.recurrenceRef]!)[0]
          ) {
            delete futureBookings[
              Object.keys(alreadyApearRecurrence[booking.recurrenceRef]!)[0]
            ];
            futureBookings[booking.bookingId] = booking;
            alreadyApearRecurrence[booking.recurrenceRef] = {
              [booking.bookingId]: booking.bookingDate,
            };
          }
          return;
        }

        futureBookings[booking.bookingId] = booking;
      });
    }
  );
  const bookingsList = Object.values(futureBookings).sort((a, b) => {
    return a.currentDisplayDate.getTime() - b.currentDisplayDate.getTime();
  });

  return bookingsList;
}
