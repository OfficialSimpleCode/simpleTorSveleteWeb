import { goto } from "$app/navigation";
import { base } from "$app/paths";
import BookingController, {
  bookingMakerStore,
} from "$lib/controllers/booking_controller";
import { ErrorsController } from "$lib/controllers/errors_controller";
import BookingHelper from "$lib/helpers/booking/booking_helper";
import BusinessInitializer from "$lib/initializers/business_initializer";
import { get } from "svelte/store";

export async function updateBooking() {
  const newWorker = BookingController.worker;
  if (newWorker === undefined) {
    return;
  }
  const oldWorkerId = BookingController.bookingToUpdate!.workerId;
  const oldWorker = BusinessInitializer.GI().workers[oldWorkerId];

  const booking = BookingController.bookingFromValues;

  const result = await BookingHelper.GI().updateBooking({
    oldBooking: BookingController.bookingToUpdate!,
    newBooking: booking,
    oldWorker: oldWorker,
    newWorker: newWorker,
    newClientNote: get(bookingMakerStore).note,
  });
  if (result) {
    //jump to my bookings page after succedded with the order
    goto(`${base}/appointments`);
  } else {
    ErrorsController.displayError();
  }
}
