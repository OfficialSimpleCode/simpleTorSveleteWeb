import { bookingMakerStore } from "$lib/controllers/booking_controller";
import { get } from "svelte/store";

import type PublicCustomer from "$lib/models/worker/public_customer";
import { addBooking } from "./add_booking";
import { signToMulti } from "./sign_to_multi";
import { updateBooking } from "./update_booking";

export async function onFinishNavigator({
  downloadAppDialog,
  publicCustomer,
}: {
  downloadAppDialog: HTMLDialogElement;
  publicCustomer: PublicCustomer;
}) {
  if (get(bookingMakerStore).isMultiEvent) {
    await signToMulti({
      freeFromPayment: publicCustomer.freeFromPayments,
      payAll: false,
      downloadAppDialog: downloadAppDialog,
    });
  } else if (!get(bookingMakerStore).isUpdate) {
    await addBooking({
      freeFromPayment: publicCustomer.freeFromPayments,
      payAll: false,
      downloadAppDialog: downloadAppDialog,
    });
  } else {
    await updateBooking();
  }
}
