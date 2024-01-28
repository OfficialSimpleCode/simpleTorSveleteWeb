<script lang="ts">
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";
  import type Booking from "$lib/models/booking/booking_model";
  import RecurrenceEvent from "$lib/models/schedule/recurrence_event";
  import { translate } from "$lib/utils/translate";

  export let isNow: Boolean;
  export let booking: Booking;

  const recurrenceEvent: RecurrenceEvent | undefined =
    booking.recurrenceEvent ?? booking.recurrenceEventRefInfo;

  const recurrenceInfo: RecurrenceEvent =
    recurrenceEvent != null
      ? RecurrenceEvent.fromRecurrenceEvent(recurrenceEvent!)
      : new RecurrenceEvent({});
  // recurrenceInfo.exceptionDates = SplayTreeSet.from({});
  // recurrenceInfo.endOption = RecurrenceEventEnd.endless;
</script>

<!-- now indicator -->
<div class="absolute text-end w-full px-8 top-[3px] {!isNow ? '' : 'hidden'}">
  <GeneralIcon icon="mdi:timer-pause-outline"></GeneralIcon>
</div>

{#if recurrenceEvent != null}
  <!-- recurrance indicator -->
  <div class="absolute text-end w-full px-8 top-[3px] opacity-70">
    <div class="flex flex-wrap items-center justify-center">
      <GeneralIcon icon="mdi:repeat"></GeneralIcon>
      <p>
        {translate(booking.isMultiRef ? "recurringEvent" : "recurringBooking") +
          " - "}
      </p>
      <p>{recurrenceInfo.explainText}</p>
    </div>
  </div>
{/if}
