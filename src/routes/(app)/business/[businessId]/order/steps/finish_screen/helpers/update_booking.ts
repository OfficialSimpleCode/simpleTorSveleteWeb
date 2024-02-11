import { goto } from "$app/navigation";
import { base } from "$app/paths";
import BookingController from "$lib/controllers/booking_controller";
import BookingHelper from "$lib/helpers/booking/booking_helper";
import BusinessInitializer from "$lib/initializers/business_initializer";

export async function updateBooking({ clientNote }: { clientNote: string }) {
  const newWorker = BookingController.worker;
  if (newWorker === undefined) {
    return;
  }
  const oldWorkerId = BookingController.oldBooking!.workerId;
  const oldWorker = BusinessInitializer.GI().workers[oldWorkerId];

  const booking = BookingController.bookingFromValues;

  const result = await BookingHelper.GI().updateBooking({
    oldBooking: BookingController.oldBooking!,
    newBooking: booking,
    oldWorker: oldWorker,
    newWorker: newWorker,
    newClientNote: clientNote,
  });
  if (result) {
    //jump to my bookings page after succedded with the order
    goto(`${base}/appointments`);
  }
}
