import BookingHelper from "$lib/helpers/booking/booking_helper";
import type Booking from "$lib/models/booking/booking_model";
import { Duration } from "$lib/models/core/duration";
import { ShowToast } from "$lib/stores/ToastManager";
import { workersStore } from "$lib/stores/Workers";
import { durationToString } from "$lib/utils/string_utils";
import { translate } from "$lib/utils/translate";
import { get } from "svelte/store";

export async function confirmArrival(
  booking: Booking,
  cantConfirm: boolean
): Promise<void> {
  const worker = get(workersStore)[booking.workerId];
  if (booking.confirmedArrival || booking.isPassed || worker == null) {
    return;
  }

  //check if the booking date is not too far from now
  if (cantConfirm) {
    ShowToast({
      text: translate("confirmOnlyOnDay", undefined, false).replaceAll(
        "DURATION",
        durationToString(
          new Duration({
            minutes: worker!.minutesBeforeBookingToConfirm,
          })
        )
      ),
      status: "info",
    });

    return;
  }

  await BookingHelper.GI().confirmBookingArrival({
    booking: booking,
    bookingDateForReccurence: booking.recurrenceChildDate,
    worker: worker!,
  });
}
