import { goto } from "$app/navigation";
import { base } from "$app/paths";
import BookingController from "$lib/controllers/booking_controller";
import BookingHelper from "$lib/helpers/booking/booking_helper";
import { pushDialog } from "$lib/utils/general_utils";

export async function addBooking({
  clientNote,
  freeFromPayment,
  payAll,
  downloadAppDialog,
}: {
  clientNote: string;
  freeFromPayment: boolean;
  payAll: boolean;
  downloadAppDialog: HTMLDialogElement;
}) {
  const worker = BookingController.worker;
  if (worker == null) {
    return;
  }
  const booking = BookingController.bookingFromValues;

  //if there is need to push the payment flow
  const payInAdvance =
    (booking.priceInAdvance.amount > 0 && !freeFromPayment) || payAll;
  let result;
  if (!payInAdvance) {
    result = await BookingHelper.GI().addBooking({
      booking: booking,
      worker: worker,
      clientNote: clientNote,
    });
  } else {
    //TODO handle payment before pay
    pushDialog(downloadAppDialog);
    return;
  }

  if (result != null) {
    //jump to my bookings page after succedded with the order
    goto(`${base}/appointments`);
  }
}
