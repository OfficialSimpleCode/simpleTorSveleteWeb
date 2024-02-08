<script lang="ts">
  import { BookingStatuses } from "$lib/consts/booking";
  import Booking from "$lib/models/booking/booking_model";
  import { Duration } from "$lib/models/core/duration";
  import type WorkerModel from "$lib/models/worker/worker_model";
  import { addDuration } from "$lib/utils/duration_utils";
  import { _, translate } from "$lib/utils/translate";
  import { confirmArrival } from "../helpers/confirm_arrival";
  import ActionsContainer from "./ActionsContainer.svelte";

  export let booking: Booking;
  export let bgColor: string = "bg-base-300";
  export let currentWorker: WorkerModel | undefined;
  let loading = false;

  const cantConfirm =
    currentWorker != null &&
    addDuration(
      new Date(),
      new Duration({ minutes: currentWorker.minutesBeforeBookingToConfirm })
    ) < (booking.recurrenceChildDate ?? booking.bookingDate);

  async function onclick() {
    if (loading) {
      return;
    }
    loading = true;
    try {
      await confirmArrival(booking, currentWorker, cantConfirm);
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
  ></ActionsContainer>
{/if}
