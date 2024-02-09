import BookingController, {
  bookingMakerStore,
} from "$lib/controllers/booking_controller";
import { get } from "svelte/store";

import { addBooking } from "./add_booking";
import { handlePhoneVerification } from "./handle_phone_verification";
import { signToMulti } from "./sign_to_multi";
import { updateBooking } from "./update_booking";

export async function onFinishNavigator({
  clientNote,
  verificationDialog,
}: {
  clientNote: string;
  verificationDialog: HTMLDialogElement;
}) {
  //phone verification handler before booking
  BookingController.phoneVerificationResult = await handlePhoneVerification(
    verificationDialog
  );
  if (BookingController.phoneVerificationResult == null) {
    return false;
  }
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
