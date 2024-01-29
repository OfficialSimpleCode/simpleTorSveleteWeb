import BookingHelper from "$lib/helpers/booking/booking_helper";
import type Booking from "$lib/models/booking/booking_model";

export async function deleteNotAvaliableBusinessBooking({
  booking,
}: {
  booking: Booking;
}): Promise<void> {
  //TODO
  const resp = true; ///await this.deleteBookingWithoutBusiness(booking.businessName);

  if (resp === true) {
    await deleteFromUser({ booking });
  }
}

export async function deleteNotAvaliableWorkerBooking({
  booking,
}: {
  booking: Booking;
}): Promise<void> {
  //TODO
  const resp = true; //await this.deleteBookingWithoutWorker(booking.workerName);

  if (resp === true) {
    await await deleteFromUser({ booking });
  }
}

export async function deleteFromUser({
  booking,
}: {
  booking: Booking;
}): Promise<void> {
  await BookingHelper.GI().deleteBookingOnlyFromUserDoc({
    booking,
    deleteFromPassed: false,
  });
}
