import BookingHelper from "$lib/helpers/booking/booking_helper";
import BusinessInitializer from "$lib/initializers/business_initializer";
import Booking from "$lib/models/booking/booking_model";

export async function deleteTreatment(
  booking: Booking,
  treatmentIndex: string
) {
  console.log("33333333");
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
  console.log("eeeeeeeee");
  const worker = BusinessInitializer.GI().workers[booking.workerId];
  if (worker == null) {
    return false;
  }
  console.log("1111111111");

  //prepare the new booking - delete the treatment
  const newBooking = Booking.fromBooking(booking);
  if (booking.treatments[treatmentIndex]!.count > 1) {
    newBooking.treatments[treatmentIndex]!.count -= 1;
  } else {
    delete newBooking.treatments[treatmentIndex];
  }
  console.log("1111111122222222");
  BusinessInitializer.GI().cancelAllWorkersRegularListenings();
  const resp = await BookingHelper.GI().updateBooking({
    newBooking: newBooking,
    oldBooking: booking,
    newWorker: worker,
    oldWorker: worker,
    oldBookingDateForReccurence: booking.recurrenceChildDate,
  });
  if (resp) {
    return history.back();
  }
  //TODO handle split treatment
}
