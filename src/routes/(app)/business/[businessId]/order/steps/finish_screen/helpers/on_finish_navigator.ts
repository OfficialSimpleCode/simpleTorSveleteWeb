import { bookingMakerStore } from "$lib/controllers/booking_controller";
import { get } from "svelte/store";

import { addBooking } from "./add_booking";
import { signToMulti } from "./sign_to_multi";
import { updateBooking } from "./update_booking";

export async function onFinishNavigator({
  clientNote,
}: {
  clientNote: string;
}) {
  console.log("3333333333");
  if (get(bookingMakerStore).isMultiEvent) {
    await signToMulti({
      clientNote: clientNote,
      freeFromPayment: false,
      payAll: false,
    });
  } else if (!get(bookingMakerStore).isUpdate) {
    await addBooking({ clientNote: clientNote });
  } else {
    await updateBooking({ clientNote: clientNote });
  }
}
