import BookingHelper from "$lib/helpers/booking/booking_helper";
import MultiBookingHelper from "$lib/helpers/multi_booking/multi_booking_helper";
import type Booking from "$lib/models/booking/booking_model";
import type WorkerModel from "$lib/models/worker/worker_model";

export async function deleteBooking({
  booking,
  worker,
}: {
  booking: Booking;
  worker: WorkerModel | undefined;
}): Promise<boolean> {
  //TODO delete dialog
  if (worker == null) {
    return await BookingHelper.GI().deleteBookingOnlyFromUserDoc({
      booking: booking,
    });
  } else {
    let resp = undefined;
    if (booking.isMultiRef) {
      resp = await MultiBookingHelper.GI().signOutUserUserAction({
        booking: booking,
        worker: worker,
      });
    } else {
      resp = await BookingHelper.GI().deleteBooking({
        booking: booking,
        worker: worker,
      });
    }

    return resp != null;
  }
}
