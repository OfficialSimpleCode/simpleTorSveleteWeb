import { ErrorsController } from "$lib/controllers/errors_controller";
import BookingHelper from "$lib/helpers/booking/booking_helper";
import BusinessInitializer from "$lib/initializers/business_initializer";
import Booking from "$lib/models/booking/booking_model";

export async function deleteTreatment(
  booking: Booking,
  treatmentIndex: string
) {
  if (booking.treatments[treatmentIndex] == null) {
    return false;
  }

  //   if (needDialog &&
  //     await deleteTreatmentDialog(context, bookingListener.value,
  //             bookingListener.value.treatments[treatmentIndex]!) !=
  //         true) {
  //   return false;
  // }

  // //make sure user know that the booking will seprate from
  // // the reccurence booking
  // if ((bookingListener.value.recurrenceEvent != null ||
  //     bookingListener.value.recurrenceRef != null)) {
  //   if (await newBookingFromReccurenceDialog(context) != true) {
  //     return false;
  //   }
  // }

  const worker = BusinessInitializer.GI().workers[booking.workerId];
  if (worker == null) {
    return false;
  }

  //prepare the new booking - delete the treatment
  const newBooking = Booking.fromBooking(booking);
  if (booking.treatments[treatmentIndex]!.count > 1) {
    newBooking.treatments[treatmentIndex]!.count -= 1;
  } else {
    delete newBooking.treatments[treatmentIndex];
  }

  BusinessInitializer.GI().cancelAllWorkersRegularListenings();
  const resp = await BookingHelper.GI().updateBooking({
    newBooking: newBooking,
    oldBooking: booking,
    newWorker: worker,
    oldWorker: worker,
    oldBookingDateForReccurence: booking.recurrenceChildDate,
  });
  if (!resp) {
    ErrorsController.displayError();
  }
  return resp;

  //TODO handle split treatment
}
