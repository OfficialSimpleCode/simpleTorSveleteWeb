//if the user is not verify his phone and the worker ask for
// all the client to verify or the user will get the reminder through SMS

import BookingController, {
  bookingMakerStore,
} from "$lib/controllers/booking_controller";
import PhoneDataResult from "$lib/models/resps/phone_data_result";
import { get } from "svelte/store";

//we has to verify his phone before
export async function handlePhoneVerification(
  verificationDialog: HTMLDialogElement
): Promise<PhoneDataResult | undefined> {
  if (!get(bookingMakerStore).showVerificationAlert) {
    // Send empty phone result to avoid exiting from the booking flow
    const newPhoneResult = new PhoneDataResult();
    newPhoneResult.needToPopSheet = false;
    return newPhoneResult;
  }

  // If the worker has not marked mustVerifyPhone as true, we need to
  // verify his phone for sending SMS reminder
  if (BookingController.worker?.mustVerifyPhone !== true) {
    // const dialogResp = await needToVerifyForSendingSms({ context });
    // if (dialogResp == null) {
    //   // Send empty phone result to avoid exiting from the booking flow
    //   const newPhoneResult = new PhoneDataResult();
    //   newPhoneResult.needToPopSheet = false;
    //   return newPhoneResult;
    // }
  }

  //   const resp =
  //   // Take the phone before setting up the verification helper
  //   const dupPhone = VerificationHelper().submitedPhone;
  //   VerificationHelper().setupLogging();

  //   // If failed, exit from booking flow; cannot continue
  //   return resp != null && resp instanceof PhoneDataResult && dupPhone !== ""
  //     ? resp
  //     : null;
}
