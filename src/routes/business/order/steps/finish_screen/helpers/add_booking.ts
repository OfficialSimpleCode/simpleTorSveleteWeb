import { goto } from "$app/navigation";
import { base } from "$app/paths";
import BookingController from "$lib/controllers/booking_controller";
import BookingHelper from "$lib/helpers/booking/booking_helper";

export async function addBooking({ clientNote }: { clientNote: string }) {
  const worker = BookingController.worker;
  if (worker === undefined) {
    return;
  }
  const booking = BookingController.bookingFromValues;

  const result = await BookingHelper.GI().addBooking({
    booking: booking,
    worker: worker,
    clientNote: clientNote,
  });
  if (result) {
    //jump to my bookings page after succedded with the order
    goto(`${base}/appointments`);
  }
}
