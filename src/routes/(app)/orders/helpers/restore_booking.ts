import { ErrorsController } from "$lib/controllers/errors_controller";
import BookingHelper from "$lib/helpers/booking/booking_helper";
import type Booking from "$lib/models/booking/booking_model";
import { workersStore } from "$lib/stores/Workers";
import { get } from "svelte/store";

export async function restoreBooking(booking: Booking) {
  const worker = get(workersStore)[booking.workerId];
  if (worker == null) {
    return;
  }

  const resp = await BookingHelper.GI().updateNeedCancel({
    booking: booking,
    needCancel: false,
    worker: worker,
  });
  if (!resp) {
    ErrorsController.displayError();
  }
}
