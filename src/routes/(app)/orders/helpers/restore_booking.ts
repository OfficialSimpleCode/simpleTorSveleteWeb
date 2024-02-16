import BookingHelper from "$lib/helpers/booking/booking_helper";
import MultiBookingHelper from "$lib/helpers/multi_booking/multi_booking_helper";
import type Booking from "$lib/models/booking/booking_model";
import { workersStore } from "$lib/stores/Workers";
import { get } from "svelte/store";

export async function restoreBooking(booking: Booking) {
  const worker = get(workersStore)[booking.workerId];
  if (worker == null) {
    return;
  }

  if (booking.isMultiRef) {
    await MultiBookingHelper.GI().updateNeedCancel({
      booking: booking,
      needCancel: false,
      worker: worker,
    });
  } else {
    await BookingHelper.GI().updateNeedCancel({
      booking: booking,
      needCancel: false,
      worker: worker,
    });
  }
}