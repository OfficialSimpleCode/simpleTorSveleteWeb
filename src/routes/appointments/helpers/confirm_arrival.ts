import BookingHelper from "$lib/helpers/booking/booking_helper";
import type Booking from "$lib/models/booking/booking_model";
import { Duration } from "$lib/models/core/duration";
import type WorkerModel from "$lib/models/worker/worker_model";
import { ShowToast } from "$lib/stores/ToastManager";
import { addDuration } from "$lib/utils/duration_utils";
import { durationToString } from "$lib/utils/string_utils";
import { translate } from "$lib/utils/translate";

export async function confirmArrival(
  booking: Booking,
  currentWorker: WorkerModel | undefined
): Promise<void> {
  if (booking.confirmedArrival || booking.isPassed || currentWorker == null) {
    return;
  }
  const cantConfirm =
    currentWorker != null &&
    addDuration(
      new Date(),
      new Duration({ minutes: currentWorker.minutesBeforeBookingToConfirm })
    ) < (booking.recurrenceChildDate ?? booking.bookingDate);

  //check if the booking date is not too far from now
  if (cantConfirm) {
    ShowToast({
      text: translate("confirmOnlyOnDay", undefined, false).replaceAll(
        "DURATION",
        durationToString(
          new Duration({
            minutes: currentWorker!.minutesBeforeBookingToConfirm,
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
    worker: currentWorker!,
  });
}
