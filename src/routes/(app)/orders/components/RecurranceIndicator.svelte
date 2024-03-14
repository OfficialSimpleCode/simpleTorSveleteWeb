<script lang="ts">
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import DownloadAppDialog from "$lib/components/dialogs/DownloadAppDialog.svelte";
  import type Booking from "$lib/models/booking/booking_model";
  import RecurrenceEvent, {
    RecurrenceEventEnd,
  } from "$lib/models/schedule/recurrence_event";
  import { pushDialog } from "$lib/utils/general_utils";

  import { _, translate } from "$lib/utils/translate";

  export let booking: Booking;
  export let showRecurranceLink: boolean = false;
  export let absolute: boolean = false;
  let downloadAppDialog: HTMLDialogElement;
  $: recurrenceEvent =
    booking.recurrenceEvent ?? booking.recurrenceEventRefInfo;

  $: recurrenceInfo =
    recurrenceEvent != null
      ? RecurrenceEvent.fromRecurrenceEvent(recurrenceEvent!)
      : undefined;
  $: if (recurrenceInfo) {
    recurrenceInfo!.exceptionDates = new Set();
    recurrenceInfo!.endOption = RecurrenceEventEnd.endless;
    recurrenceInfo.start = booking.bookingDate;
  }
  function onWatchRecurrenceBooking() {
    pushDialog(downloadAppDialog);
  }
</script>

{#if recurrenceInfo != null}
  <DownloadAppDialog bind:dialog={downloadAppDialog} />
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
      <button
        class="text-primary {showRecurranceLink ? '' : 'hidden'}"
        on:click={onWatchRecurrenceBooking}
      >
        {translate("watchAllRecurrence")}
      </button>
    </div>
  </div>
{/if}
