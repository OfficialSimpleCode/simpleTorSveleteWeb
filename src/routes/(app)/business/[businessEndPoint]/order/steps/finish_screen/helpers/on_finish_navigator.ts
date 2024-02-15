import { bookingMakerStore } from "$lib/controllers/booking_controller";
import { get } from "svelte/store";

import { addBooking } from "./add_booking";
import { signToMulti } from "./sign_to_multi";
import { updateBooking } from "./update_booking";

export async function onFinishNavigator({
  downloadAppDialog,
}: {
  downloadAppDialog: HTMLDialogElement;
}) {
  console.log("3333333333");
  if (get(bookingMakerStore).isMultiEvent) {
    await signToMulti({
      freeFromPayment: false,
      payAll: false,
      downloadAppDialog: downloadAppDialog,
    });
  } else if (!get(bookingMakerStore).isUpdate) {
    await addBooking({
      freeFromPayment: false,
      payAll: false,
      downloadAppDialog: downloadAppDialog,
    });
  } else {
    await updateBooking();
  }
}
