import BookingController, {
  bookingMakerStore,
} from "$lib/controllers/booking_controller";
import { ErrorsController } from "$lib/controllers/errors_controller";
import { openOrdersPage } from "$lib/controllers/page_controller";
import BookingHelper from "$lib/helpers/booking/booking_helper";
import { pushDialog } from "$lib/utils/general_utils";
import { get } from "svelte/store";

export async function addBooking({
  freeFromPayment,
  payAll,
  downloadAppDialog,
}: {
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
      clientNote: get(bookingMakerStore).note,
    });
  } else {
    //TODO handle payment before pay
    pushDialog(downloadAppDialog);
    return;
  }

  if (result != null) {
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
