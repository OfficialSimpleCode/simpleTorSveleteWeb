<script lang="ts">
  import { BookingStatuses } from "$lib/consts/booking";
  import Booking from "$lib/models/booking/booking_model";
  import { Duration } from "$lib/models/core/duration";
  import { addDuration } from "$lib/utils/duration_utils";
  import { translate } from "$lib/utils/translate";
  import { CheckCircle, PlayCircle } from "svelte-hero-icons";
  import ActionsContainer from "./ActionsContainer.svelte";

  export let booking: Booking;

  function confirmArrival(): void {
    if (booking.confirmedArrival || booking.isPassed) {
      return;
    }

    //check if the booking date is not too far from now
    if (cantConfirm) {
      //   CustomToast(
      //           type: ToastType.info,
      //           context: context,
      //           msg: translate("confirmOnlyOnDay", needGender: false)
      //               .replaceAll(
      //                   "DURATION",
      //                   durationToString(Duration(
      //                       minutes: worker.minutesBeforeBookingToConfirm))))
      //       .init();
      return;
    }

    // update confirmation
    // confirmBookingArrival(
    //     context: context,
    //     afterConfirm: afterConfirm,
    //     booking: booking,
    //     updateUi: updateUi);
  }

  const minutesBeforeBookingToConfirm = 150; // worker.minutesBeforeBookingToConfirm
  const cantConfirm =
    addDuration(
      new Date(),
      new Duration({ minutes: minutesBeforeBookingToConfirm })
    ) < (booking.recurrenceChildDate ?? booking.bookingDate);
</script>

{#if booking.status !== BookingStatuses.approved}
  <ActionsContainer
    text={booking.confirmedArrival && booking.recurrenceEvent !== null
      ? translate("ConfirmedArrival")
      : translate("ConfirmArrival")}
    icon={booking.confirmedArrival && booking.recurrenceEvent !== null
      ? CheckCircle
      : PlayCircle}
    onClick={confirmArrival}
  ></ActionsContainer>
{/if}
