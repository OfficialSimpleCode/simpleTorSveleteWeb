<script lang="ts">
  import { pushState } from "$app/navigation";
  import { page } from "$app/stores";
  import CustomArrow from "$lib/components/custom_components/CustomArrow.svelte";
  import type Booking from "$lib/models/booking/booking_model";
  import type WorkerModel from "$lib/models/worker/worker_model";
  import { businessStore } from "$lib/stores/Business";
  import { workersStore } from "$lib/stores/Workers";
  import { _, translate } from "$lib/utils/translate";
  import BookingActions from "./BookingActions.svelte";
  import BookingDetails from "./BookingDetails.svelte";
  import CircleIcons from "./CircleIcons.svelte";
  import TopIndicators from "./TopIndicators.svelte";
  import BookingSheet from "./booking-sheet/BookingSheet.svelte";

  export let booking: Booking;
  export let forceOpenBookingSheet: boolean;

  let bookingDialog: HTMLDialogElement;

  let currentWorker: WorkerModel | undefined;

  if (booking.buisnessId === $businessStore.businessId) {
    currentWorker = $workersStore[booking.workerId]!;
  }

  function openBookingSheet() {
    pushState("", {
      showModal: true,
    });
    setTimeout(() => bookingDialog.showModal(), 100);
  }
  const isNow: boolean = booking.isRightNow;
</script>

<!-- booking shhet and dialog -->
{#if $page.state.showModal}
  <BookingSheet bind:dialog={bookingDialog} {booking} {currentWorker} />
{/if}

<button
  on:click={openBookingSheet}
  class="card bg-base-200 w-full hover:bg-base-300 hover:bg-opacity-20 px-3 py-3 relative {isNow
    ? 'border border-base-300'
    : ''}
    {booking.recurrenceEvent ?? booking.recurrenceEventRefInfo ? 'pt-2' : ''}"
>
  <TopIndicators {isNow} {booking}></TopIndicators>

  <!-- icons, name, arrow (above the divider)  -->
  <div class="flex flex-row w-full justify-between items-center">
    <!-- like a listTile widget -->
    <div class="flex flex-row items-center">
      <CircleIcons {booking}></CircleIcons>
      <!-- string date -> business name, worker -->
      <div class="flex flex-col items-start text-start">
        <h1>
          {booking.treatmentsToStringNotDetailed +
            ` ${translate("to", $_)} ${booking.businessName}`}
        </h1>
        <h1>
          {`${translate("with", $_)} ${booking.workerName}`}
        </h1>
      </div>
    </div>
    <!-- arrow icon -->
    <CustomArrow />
  </div>

  <!-- divider -->
  <div class="h-[1px] w-full bg-slate-300 opacity-25 my-3"></div>

  <!-- booking details and actions (below the divider) -->
  <div class="flex flex-row justify-between w-full items-center">
    <BookingDetails {booking} />
    <div class="w-2"></div>
    <BookingActions {booking} {currentWorker} {forceOpenBookingSheet} />
  </div>
</button>
