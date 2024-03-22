<script lang="ts">
  import CustomArrow from "$lib/components/custom_components/CustomArrow.svelte";
  import type Booking from "$lib/models/booking/booking_model";
  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  import BookingActions from "./BookingActions.svelte";
  import BookingDetails from "./BookingDetails.svelte";
  import CircleIcons from "./CircleIcons.svelte";
  import DeleteBookingWithoutBusinessDialog from "./DeleteBookingWithoutBusinessDialog.svelte";
  import TopIndicators from "./TopIndicators.svelte";
  import BookingSheet from "./booking-sheet/BookingSheet.svelte";
  export let shimmerEffect: boolean;
  export let booking: Booking;
  export let forceOpenBookingSheet: boolean;

  let bookingDialog: HTMLDialogElement;
  let deleteBookingWithoutBusinessDialog: HTMLDialogElement;

  function openBookingSheet(event: MouseEvent) {
    if (shimmerEffect) {
      return;
    }
    pushDialog(bookingDialog);
  }
</script>

{#if !shimmerEffect}
  <!-- booking shhet and dialog -->
  <BookingSheet bind:dialog={bookingDialog} {booking} {forceOpenBookingSheet} />

  <DeleteBookingWithoutBusinessDialog
    bind:dialog={deleteBookingWithoutBusinessDialog}
    mainDialog={bookingDialog}
    {booking}
  />
{/if}
<button
  on:click={openBookingSheet}
  class="card bg-base-200 w-full hover:bg-base-300 hover:bg-opacity-20 px-3 py-3 relative {shimmerEffect
    ? 'animate-pulse'
    : ''} {booking.isRightNow
    ? 'border border-base-content border-opacity-30'
    : ''} 
    {booking.recurrenceEvent ?? booking.recurrenceEventRefInfo ? 'pt-2' : ''}"
>
  {#if !shimmerEffect}
    <TopIndicators isNow={booking.isRightNow} {booking} />
  {/if}
  <!-- icons, name, arrow (above the divider)  -->
  <div class="flex flex-row w-full justify-between items-center">
    <!-- like a listTile widget -->
    <div class="flex flex-row items-center">
      <CircleIcons {booking} {shimmerEffect} />
      <!-- string date -> business name, worker -->
      <div class="flex flex-col items-start text-start">
        {#if shimmerEffect}
          <div class="bg-base-content opacity-10 h-4 w-[130px] rounded-md" />
          <div
            class="bg-base-content opacity-10 h-4 w-[200px] mt-1 rounded-md"
          />
        {:else}
          <h3>
            {booking.treatmentsToStringNotDetailed +
              ` ${translate("to", $_)} ${booking.businessName}`}
          </h3>
          <h4>
            {`${translate("with", $_)} ${booking.workerName}`}
          </h4>
        {/if}
      </div>
    </div>
    <!-- arrow icon -->
    <div class="{shimmerEffect ? 'opacity-20' : ''} ">
      <CustomArrow />
    </div>
  </div>

  <!-- divider -->
  <div class="h-[1px] w-full bg-slate-300 opacity-25 my-3"></div>

  <!-- booking details and actions (below the divider) -->
  <div class="flex flex-row justify-between w-full items-center">
    <BookingDetails {booking} {shimmerEffect} />
    <div class="w-2"></div>
    <BookingActions
      {booking}
      {shimmerEffect}
      mainDialog={bookingDialog}
      {forceOpenBookingSheet}
      {deleteBookingWithoutBusinessDialog}
    />
  </div>
</button>
