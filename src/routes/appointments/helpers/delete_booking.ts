import BookingHelper from "$lib/helpers/booking/booking_helper";
import type Booking from "$lib/models/booking/booking_model";
import type WorkerModel from "$lib/models/worker/worker_model";

export async function deleteBooking({
  booking,
  worker,
  loadingState,
}: {
  booking: Booking;
  worker: WorkerModel | undefined;
  loadingState: boolean;
}) {
  loadingState = true;
  //TODO delete dialog
  if (worker == null) {
    await BookingHelper.GI().deleteBookingOnlyFromUserDoc({ booking: booking });
  } else {
    await BookingHelper.GI().deleteBooking({
      booking: booking,
      worker: worker,
    });
  }
  loadingState = false;
}
