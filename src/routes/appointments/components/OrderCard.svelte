<script lang="ts">
  import { pushState } from "$app/navigation";
  import { page } from "$app/stores";
  import type Booking from "$lib/models/booking/booking_model";
  import { businessStore } from "$lib/stores/Business";
  import { translate } from "$lib/utils/translate";
  import { ChevronLeft, ChevronRight, Icon } from "svelte-hero-icons";
  import BookingActions from "../components/BookingActions.svelte";
  import BookingDetails from "../components/BookingDetails.svelte";
  import CircleIcons from "../components/CircleIcons.svelte";
  import BookingSheet from "../components/booking-sheet/BookingSheet.svelte";
  import TopIndicators from "./TopIndicators.svelte";

  export let booking: Booking;

  let onlyWorker = $businessStore.businessId !== booking.buisnessId;
  let bookingDialog: HTMLDialogElement;

  function openBookingSheet() {
    pushState("", {
      showModal: true,
    });
    setTimeout(() => bookingDialog.showModal(), 100);
  }
  const isNow: boolean = booking.isRightNow || true;
</script>

<!-- booking shhet and dialog -->
{#if $page.state.showModal}
  <BookingSheet bind:dialog={bookingDialog} {booking} />
{/if}

<button
  on:click={openBookingSheet}
  class="card bg-base-200 w-full hover:bg-base-300 px-3 py-3 relative {isNow
    ? 'border border-base-300'
    : ''}
    {booking.recurrenceEvent ?? booking.recurrenceEventRefInfo ? 'pt-6' : ''}"
>
  <TopIndicators {isNow} {booking}></TopIndicators>

  <!-- icons, name, arrow (above the divider)  -->
  <div class="flex flex-row w-full justify-between items-center">
    <!-- like a listTile widget -->
    <div class="flex flex-row items-center">
      <CircleIcons {booking}></CircleIcons>
      <!-- string date -> business name, worker -->
      <div class="flex flex-col items-start">
        <h1>
          {booking.treatmentsToStringNotDetailed +
            (onlyWorker ? "" : ` ${translate("to")} ${booking.businessName}`)}
        </h1>
        <h1>
          {`${translate("with")} ${booking.workerName}`}
        </h1>
      </div>
    </div>
    <!-- arrow icon -->
    <Icon
      src={document.dir == "ltr" ? ChevronRight : ChevronLeft}
      size="26px"
    />
  </div>

  <!-- divider -->
  <div class="h-[1px] w-full bg-slate-300 opacity-35 my-4"></div>

  <!-- booking details and actions (below the divider) -->
  <div class="flex flex-row justify-between w-full items-center">
    <BookingDetails {booking}></BookingDetails>
    <div class="w-2"></div>
    <BookingActions {booking}></BookingActions>
  </div>
</button>
