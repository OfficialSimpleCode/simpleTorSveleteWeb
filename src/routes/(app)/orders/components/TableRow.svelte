<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";
  import { pushDialog } from "$lib/utils/general_utils";
  import BookingActions from "./BookingActions.svelte";
  import BookingDateAndTime from "./BookingDateAndTime.svelte";
  import BookingPriceAndDuration from "./BookingPriceAndDuration.svelte";
  import CircleIcons from "./CircleIcons.svelte";
  import DeleteBookingWithoutBusinessDialog from "./DeleteBookingWithoutBusinessDialog.svelte";
  import BookingSheet from "./booking-sheet/BookingSheet.svelte";
  export let shimmerEffect: boolean;
  export let booking: Booking;
  export let forceOpenBookingSheet: boolean;

  let bookingDialog: HTMLDialogElement;
  let deleteBookingWithoutBusinessDialog: HTMLDialogElement;

  function openBookingSheet() {
    if (shimmerEffect) {
      return;
    }
    pushDialog(bookingDialog);
  }
</script>

<!-- booking shhet and dialog -->
{#if !shimmerEffect}
  <BookingSheet bind:dialog={bookingDialog} {booking} {forceOpenBookingSheet} />

  <DeleteBookingWithoutBusinessDialog
    bind:dialog={deleteBookingWithoutBusinessDialog}
    mainDialog={bookingDialog}
    {booking}
  />
{/if}
<tr
  on:click={openBookingSheet}
  class="group bg-base-200 hover:bg-base-300 hover:bg-opacity-20 cursor-pointer border border-base-300 {shimmerEffect
    ? 'animate-pulse'
    : ''}"
>
  <td>
    <div class="flex flex-row justify-center items-center">
      <CircleIcons {booking} {shimmerEffect} />
      {#if shimmerEffect}
        <div class="flex flex-col">
          <div class="bg-base-content opacity-10 h-4 w-[100px] rounded-md" />
          <div
            class="bg-base-content opacity-10 h-4 w-[60px] rounded-md mt-1"
          />
        </div>
      {:else}
        <p class="text-lg w-full">{booking.businessName}</p>
      {/if}
    </div>
  </td>

  <td class="text-lg">
    {#if shimmerEffect}
      <div class="bg-base-content opacity-10 h-4 w-[100px] rounded-md" />
    {:else}
      {booking.workerName}
    {/if}
  </td>

  <td class="text-lg">
    {#if shimmerEffect}
      <div class="flex flex-col">
        <div class="bg-base-content opacity-10 h-4 w-[100px] rounded-md" />
        <div class="bg-base-content opacity-10 h-4 w-[60px] rounded-md mt-1" />
      </div>
    {:else}
      {booking.treatmentsToStringDetailed}
    {/if}
  </td>

  <td class="min-w-[145px]">
    <!-- svelte-ignore missing-declaration -->
    <BookingPriceAndDuration {booking} isRow={false} {shimmerEffect} />
  </td>
  <td>
    <BookingDateAndTime {booking} {shimmerEffect} />
  </td>

  <td class="text-nowrap">
    <BookingActions
      {booking}
      {shimmerEffect}
      mainDialog={bookingDialog}
      {forceOpenBookingSheet}
      {deleteBookingWithoutBusinessDialog}
    />
  </td>
</tr>
