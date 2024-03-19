import type { BookingMaker } from "$lib/controllers/booking_controller";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";

export function hasTooManyTickets(bookingMaker: BookingMaker): boolean {
  if (!bookingMaker.isMultiEvent) {
    return false;
  }
  let counterForSameEvent = 0;
  const user = UserInitializer.GI().user;
  Object.values(user.bookings.futureBookings).forEach((monthBookings) => {
    Object.values(monthBookings).forEach((booking) => {
      if (
        booking.bookingDate.getTime() === bookingMaker.date?.getTime() &&
        booking.cancelDate == null &&
        booking.workerId === bookingMaker.workerId &&
        booking.buisnessId === BusinessInitializer.GI().business.businessId &&
        booking.isMultiRef &&
        Object.values(booking.treatments)[0].id ===
          Object.values(bookingMaker.services)[0].id
      ) {
        counterForSameEvent++;
      }
    });
  });

  return (
    counterForSameEvent >=
    Object.values(bookingMaker.services)[0].maxTicketsForUser
  );
}
