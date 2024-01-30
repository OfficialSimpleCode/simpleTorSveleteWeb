import BookingController from "$lib/controllers/booking_controller";

import { addBooking } from "./add_booking";
import { updateBooking } from "./update_booking";

export async function onFinishNavigator({
  clientNote,
}: {
  clientNote: string;
}) {
  if (BookingController.oldBooking == null) {
    await addBooking({ clientNote: clientNote });
  } else {
    await updateBooking({ clientNote: clientNote });
  }
}
