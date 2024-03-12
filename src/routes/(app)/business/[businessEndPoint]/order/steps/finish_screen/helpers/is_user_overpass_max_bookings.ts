import BookingController, {
  type BookingMaker,
} from "$lib/controllers/booking_controller";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";

//check for the future booking limit
export function isUserOverPassMaxBookings(bookingMaker: BookingMaker): boolean {
  let bookingsCount: number = 0;
  Object.entries(UserInitializer.GI().user.bookings.futureBookings).forEach(
    ([monthStr, monthBookings]) => {
      Object.entries(monthBookings).forEach(([bookingId, booking]) => {
        if (
          booking.recurrenceRef == null &&
          booking.buisnessId === BusinessInitializer.GI().business.businessId &&
          booking.workerId === bookingMaker.workerId
        ) {
          bookingsCount += 1;
        }
      });
    }
  );
  return (
    BookingController.worker.maxFutureBookings <= bookingsCount &&
    bookingMaker.oldBooking == null
  );
}
