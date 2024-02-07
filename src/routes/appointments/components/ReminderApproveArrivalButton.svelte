<script lang="ts">
  import { BookingStatuses } from "$lib/consts/booking";
  import Booking from "$lib/models/booking/booking_model";
  import type WorkerModel from "$lib/models/worker/worker_model";
  import { _, translate } from "$lib/utils/translate";
  import { confirmArrival } from "../helpers/confirm_arrival";
  import ActionsContainer from "./ActionsContainer.svelte";

  export let booking: Booking;
  export let bgColor: string = "bg-base-300";
  export let currentWorker: WorkerModel | undefined;
  let loading = false;

  async function onclick() {
    if (loading) {
      return;
    }
    loading = true;
    try {
      await confirmArrival(booking, currentWorker);
    } finally {
      loading = false;
    }
  }
</script>

{#if booking.status === BookingStatuses.approved}
  <ActionsContainer
    {loading}
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
