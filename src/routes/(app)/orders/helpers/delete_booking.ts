import { DeleteOption } from "$lib/consts/booking";
import { ErrorsController } from "$lib/controllers/errors_controller";
import BookingHelper from "$lib/helpers/booking/booking_helper";
import MultiBookingHelper from "$lib/helpers/multi_booking/multi_booking_helper";
import type Booking from "$lib/models/booking/booking_model";
import { ShowToast } from "$lib/stores/ToastManager";
import { workersStore } from "$lib/stores/Workers";
import { translate } from "$lib/utils/translate";
import { get } from "svelte/store";

export async function deleteBooking({
  booking,
  deleteOption,
}: {
  booking: Booking;
  deleteOption: DeleteOption;
}): Promise<boolean> {
  const worker = get(workersStore)[booking.workerId];
  if (worker == null) {
    return false;
  }

  //user need the worker permmision to delete update the booking status
  //update the need cancel to the opposite of the current
  if (deleteOption === DeleteOption.needConfirmation) {
    const loadingResp = await BookingHelper.GI().updateNeedCancel({
      worker: worker,
      booking: booking,
      needCancel: true,
      bookingDateForReccurence: booking.recurrenceChildDate,
    });

    if (loadingResp == true) {
      if (booking.recurrenceEvent != null) {
        if (booking.recurrenceChildDate != null) {
          booking = booking.createRegularBookingFromRecurrence(
            booking.recurrenceChildDate!
          );
        }
      }
      booking.needCancel = true;
    } else {
      ErrorsController.displayError();
    }

    return loadingResp;
  }
  let resp = undefined;
  let msg: string = "";
  //children of recurrence
  if (booking.recurrenceEvent != null && booking.recurrenceChildDate != null) {
    resp = await BookingHelper.GI().addExceptionDateToRecurreceBooking({
      recurrenceBooking: booking,
      date: booking.recurrenceChildDate!,
      worker,
      workerAction: false,
    });
    msg = translate(
      booking.isPassed
        ? "successfullydeletedBooking"
        : "successfullyCanceledBooking"
    );
  }
  //multi booking ref
  else if (booking.isMultiRef) {
    resp = await MultiBookingHelper.GI().signOutUserUserAction({
      booking: booking,
      worker: worker,
    });
    msg = translate("signOutSuccessfully");
  }
  //regular
  else {
    resp =
      (await BookingHelper.GI().deleteBooking({
        booking: booking,
        worker: worker,
      })) != null;
    msg = translate(
      booking.isPassed
        ? "successfullydeletedBooking"
        : "successfullyCanceledBooking"
    );
  }

  if (resp) {
    if (msg != "") {
      ShowToast({ status: "success", text: msg });
    }
  } else {
    ErrorsController.displayError();
  }

  return resp;
}
