import BookingController, {
  bookingMakerStore,
} from "$lib/controllers/booking_controller";
import { ErrorsController } from "$lib/controllers/errors_controller";
import { openOrdersPage } from "$lib/controllers/page_controller";
import BookingHelper from "$lib/helpers/booking/booking_helper";
import BusinessInitializer from "$lib/initializers/business_initializer";
import { get } from "svelte/store";

export async function updateBooking() {
  const newWorker = BookingController.worker;
  if (newWorker == null) {
    return;
  }
  const bookingMakerData = get(bookingMakerStore);
  const oldWorkerId = bookingMakerData.oldBooking!.workerId;
  const oldWorker = BusinessInitializer.GI().workers[oldWorkerId];

  const booking = BookingController.bookingFromValues;

  const result = await BookingHelper.GI().updateBooking({
    oldBooking: bookingMakerData.oldBooking!,
    newBooking: booking,
    oldWorker: oldWorker,
    oldBookingDateForReccurence:
      bookingMakerData.oldBooking!.recurrenceChildDate,
    newWorker: newWorker,
    newClientNote: bookingMakerData.note,
  });
  if (result) {
    //update the finish prperty
    bookingMakerStore.update((value) => {
      value.finish = true;
      return value;
    });

    //jump to my bookings page after succedded with the order
    await openOrdersPage();
  } else {
    ErrorsController.displayError();
  }
}
