<script lang="ts">
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import Booking from "$lib/models/booking/booking_model";
  import { Duration } from "$lib/models/core/duration";
  import { addDuration } from "$lib/utils/duration_utils";
  import { translate } from "$lib/utils/translate";
  import RecurranceIndicator from "../../RecurranceIndicator.svelte";

  export let booking: Booking;
  const isPassed: boolean =
    addDuration(
      booking.currentDisplayDate,
      new Duration({ minutes: booking.totalMinutes })
    ) < new Date();
</script>

<div class="flex flex-col gap-1 w-full">
  {#if isPassed}
    <div class="flex flex-row justify-center w-full gap-1 items-center">
      <GeneralIcon icon="mdi:access-time" size={24}></GeneralIcon>
      <p>{translate(booking.isMultiRef ? "passedEvent" : "passedBooking")}</p>
    </div>
  {/if}

  <RecurranceIndicator {booking} showRecurranceLink={true} absolute={false} />
</div>
