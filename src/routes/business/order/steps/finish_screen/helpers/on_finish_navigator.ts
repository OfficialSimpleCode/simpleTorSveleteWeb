import { bookingMakerStore } from "$lib/controllers/booking_controller";
import { get } from "svelte/store";

import { addBooking } from "./add_booking";
import { updateBooking } from "./update_booking";

export async function onFinishNavigator({
  clientNote,
}: {
  clientNote: string;
}) {
  if (!get(bookingMakerStore).isUpdate) {
    console.log("eeeeeeeeeee");
    await addBooking({ clientNote: clientNote });
  } else {
    console.log("2222222222222222");
    await updateBooking({ clientNote: clientNote });
  }
}
