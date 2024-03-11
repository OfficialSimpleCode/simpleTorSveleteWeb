import type { BookingMaker } from "$lib/controllers/booking_controller";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";

export function hasTooManyTickets(bookingMaker: BookingMaker): boolean {
  console.log("333333333333333333333333333333333333333333333");
  if (!bookingMaker.isMultiEvent) {
    console.log("222222222222222222222222222222222222222222");
    return false;
  }
  let counterForSameEvent = 0;
  const user = UserInitializer.GI().user;
  Object.values(user.bookings.futureBookings).forEach((monthBookings) => {
    Object.values(monthBookings).forEach((booking) => {
      console.log(booking.bookingId);
      console.log(
        booking.bookingDate.getTime() === bookingMaker.date?.getTime(),
        booking.cancelDate == null,
        booking.workerId === bookingMaker.workerId,
        booking.buisnessId === BusinessInitializer.GI().business.businessId,
        booking.isMultiRef,
        Object.values(booking.treatments)[0].id ===
          Object.values(bookingMaker.services)[0].id
      );
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
  console.log("eeeeeeeeeeeeeee", counterForSameEvent);
  return (
    counterForSameEvent >=
    Object.values(bookingMaker.services)[0].maxTicketsForUser
  );
}
