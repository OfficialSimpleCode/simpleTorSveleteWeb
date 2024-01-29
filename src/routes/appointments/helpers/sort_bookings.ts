import UserInitializer from "$lib/initializers/user_initializer";
import Booking from "$lib/models/booking/booking_model";
import type UserBookings from "$lib/models/user/bookings";
import { setToMidNight } from "$lib/utils/dates_utils";

export function sortMyBookings(): Booking[] {
  const bookingsCollection: UserBookings = UserInitializer.GI().user.bookings;
  const futureBookings: Record<string, Booking> = {}; // { "dd-MM-yyyy": { bookingId : Booking() } }

  ///{id: {current booking id: alreaest date of his children }}
  const alreadyApearRecurrence: Record<string, Record<string, Date>> = {};

  console.log("bookingsCollection.recurrence", bookingsCollection.recurrence);

  Object.entries(bookingsCollection.recurrence ?? {}).forEach(
    ([bookingId, booking]) => {
      // if (!MyBookingsUIController().filterBookings.value.isValid(booking)) {
      //   return;
      // }

      if (!booking.recurrenceEvent) {
        return;
      }
      console.log("eeeeeeeeeeeeeee");
      const dateOfNearestBooking =
        booking.recurrenceEvent.nearestFutureAccurenceDate(new Date(), {
          needToBeAfterStart: false,
        });
      console.log("2222222222222222222");
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
  console.log(
    "bookingsCollection.futureBookings",
    bookingsCollection.futureBookings
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
  console.log("bookingsList", bookingsList);

  return bookingsList;
}
