<script lang="ts">
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";
  import type Booking from "$lib/models/booking/booking_model";
  import RecurrenceEvent from "$lib/models/schedule/recurrence_event";

  import { _, translate } from "$lib/utils/translate";

  export let booking: Booking;
  export let showRecurranceLink: boolean = false;
  export let absolute: boolean = false;

  const recurrenceEvent: RecurrenceEvent | undefined =
    booking.recurrenceEvent ?? booking.recurrenceEventRefInfo;

  const recurrenceInfo: RecurrenceEvent =
    recurrenceEvent != null
      ? RecurrenceEvent.fromRecurrenceEvent(recurrenceEvent!)
      : new RecurrenceEvent({});
  // recurrenceInfo.exceptionDates = SplayTreeSet.from({});
  // recurrenceInfo.endOption = RecurrenceEventEnd.endless;
</script>

{#if recurrenceEvent != null}
  <!-- recurrance indicator -->
  <div
    class="{absolute
      ? 'absolute'
      : ''} text-end w-full px-8 top-[3px] opacity-70 pb-2"
  >
    <div class="flex flex-col items-center">
      <!-- only the indicator about it -->
      <div class="flex flex-wrap items-center justify-center px-8">
        <GeneralIcon icon="mdi:repeat"></GeneralIcon>
        <p>
          {translate(
            booking.isMultiRef ? "recurringEvent" : "recurringBooking",
            $_
          ) + " - "}
        </p>
        <p>{recurrenceInfo.explainText}</p>
      </div>

      <!-- click to see all -->
      <p class="text-primary {showRecurranceLink ? '' : 'hidden'}">
        {translate("watchAllRecurrence")}
      </p>
    </div>
  </div>
{/if}
