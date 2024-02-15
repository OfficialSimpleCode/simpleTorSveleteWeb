import { DeleteOption } from "$lib/consts/booking";
import BookingHelper from "$lib/helpers/booking/booking_helper";
import MultiBookingHelper from "$lib/helpers/multi_booking/multi_booking_helper";
import type Booking from "$lib/models/booking/booking_model";
import { Duration } from "$lib/models/core/duration";
import { ShowToast } from "$lib/stores/ToastManager";
import { workersStore } from "$lib/stores/Workers";
import { addDuration } from "$lib/utils/duration_utils";
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
  //TODO delete dialog
  if (worker == null) {
    return await BookingHelper.GI().deleteBookingOnlyFromUserDoc({
      booking: booking,
    });
  }

  //user need the worker permmision to delete update the booking status
  //update the need cancel to the opposite of the current
  if (deleteOption === DeleteOption.needConfirmation) {
    const loadingResp = booking.isMultiRef
      ? await MultiBookingHelper.GI().updateNeedCancel({
          worker: worker,
          booking: booking,
          needCancel: true,
        })
      : await BookingHelper.GI().updateNeedCancel({
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
    }

    return true;
  }
  let resp = undefined;
  let msg: string = "";
  if (booking.recurrenceEvent != null && booking.recurrenceChildDate != null) {
    resp = await BookingHelper.GI().addExceptionDateToRecurreceBooking({
      recurrenceBooking: booking,
      date: booking.recurrenceChildDate!,
      worker,
      workerAction: false,
    });
    msg = translate(
      addDuration(
        booking.currentDisplayDate,
        new Duration({ minutes: booking.totalMinutes })
      ) < new Date()
        ? "successfullydeletedBooking"
        : "successfullyCanceledBooking"
    );
  }
  if (booking.isMultiRef) {
    resp = await MultiBookingHelper.GI().signOutUserUserAction({
      booking: booking,
      worker: worker,
    });
    msg = translate("signOutSuccessfully");
  } else {
    resp = await BookingHelper.GI().deleteBooking({
      booking: booking,
      worker: worker,
    });
  }
  msg = translate(
    booking.isPassed
      ? "successfullydeletedBooking"
      : "successfullyCanceledBooking"
  );
  if (msg != "") {
    ShowToast({ status: "success", text: msg });
  }

  return resp != null;
}
