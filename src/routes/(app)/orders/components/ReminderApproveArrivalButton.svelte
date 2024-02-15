<script lang="ts">
  import { BookingStatuses } from "$lib/consts/booking";
  import Booking from "$lib/models/booking/booking_model";
  import { Duration } from "$lib/models/core/duration";
  import { workersStore } from "$lib/stores/Workers";
  import { addDuration } from "$lib/utils/duration_utils";
  import { _, translate } from "$lib/utils/translate";
  import { confirmArrival } from "../helpers/confirm_arrival";
  import ActionsContainer from "./ActionsContainer.svelte";

  export let booking: Booking;
  export let bgColor: string = "bg-base-300";

  let loading = false;
  const worker = $workersStore[booking.workerId];
  const cantConfirm =
    worker != null &&
    addDuration(
      new Date(),
      new Duration({ minutes: worker.minutesBeforeBookingToConfirm })
    ) < (booking.recurrenceChildDate ?? booking.bookingDate);

  async function onclick() {
    if (loading) {
      return;
    }
    loading = true;
    try {
      await confirmArrival(booking, cantConfirm);
    } finally {
      loading = false;
    }
  }
</script>

{#if booking.status === BookingStatuses.approved}
  <ActionsContainer
    {loading}
    active={!cantConfirm}
    text={booking.confirmedArrival && booking.recurrenceEvent == null
      ? translate("ConfirmedArrival", $_)
      : translate("ConfirmArrival", $_)}
    icon={booking.confirmedArrival && booking.recurrenceEvent == null
      ? "mdi:check-circle-outline"
      : "mdi:checkbox-blank-circle-outline"}
    onClick={onclick}
    {bgColor}
  />
{/if}
