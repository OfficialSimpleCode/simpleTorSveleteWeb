import { goto } from "$app/navigation";
import { base } from "$app/paths";
import BookingController, {
  bookingMakerStore,
} from "$lib/controllers/booking_controller";
import { ErrorsController } from "$lib/controllers/errors_controller";
import BookingHelper from "$lib/helpers/booking/booking_helper";
import BusinessInitializer from "$lib/initializers/business_initializer";
import { businessStore } from "$lib/stores/Business";
import { get } from "svelte/store";

export async function updateBooking() {
  const newWorker = BookingController.worker;
  if (newWorker === undefined) {
    return;
  }
  const oldWorkerId = get(bookingMakerStore).oldBooking!.workerId;
  const oldWorker = BusinessInitializer.GI().workers[oldWorkerId];

  const booking = BookingController.bookingFromValues;

  const result = await BookingHelper.GI().updateBooking({
    oldBooking: get(bookingMakerStore).oldBooking!,
    newBooking: booking,
    oldWorker: oldWorker,
    newWorker: newWorker,
    newClientNote: get(bookingMakerStore).note,
  });
  if (result) {
    //jump to my bookings page after succedded with the order
    if (get(businessStore) != null) {
      goto(`${base}/business/${get(businessStore)!.url}/orders`);
    } else {
      goto(`${base}/orders`);
    }
  } else {
    ErrorsController.displayError();
  }
}
