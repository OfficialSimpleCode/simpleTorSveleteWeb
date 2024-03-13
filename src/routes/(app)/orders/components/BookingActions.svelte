<script lang="ts">
  import { BookingStatuses } from "$lib/consts/booking";
  import type Booking from "$lib/models/booking/booking_model";
  import { businessStore } from "$lib/stores/Business";
  import AttentionIndicatorUserBooking from "./AttentionIndicatorUserBooking.svelte";
  import LoadBusinessBookingButton from "./LoadBusinessBookingButton.svelte";
  import ReminderApproveArrivalButton from "./ReminderApproveArrivalButton.svelte";

  export let booking: Booking;
  export let bgColor: string = "bg-base-300";
  export let mainDialog: HTMLDialogElement;
  export let forceOpenBookingSheet: boolean;
  export let deleteBookingWithoutBusinessDialog: HTMLDialogElement;
  $: showAttention =
    !booking.isPassed &&
    (booking.status !== BookingStatuses.approved || booking.needCancel);
</script>

<!-- the business isn't loaded -->
{#if $businessStore == null || booking.buisnessId !== $businessStore.businessId}
  <LoadBusinessBookingButton
    {booking}
    {mainDialog}
    {bgColor}
    bind:deleteBookingWithoutBusinessDialog
  />
{:else if booking.recurrenceEvent == null || forceOpenBookingSheet}
  {#if showAttention}
    <AttentionIndicatorUserBooking {booking} {bgColor} />
  {:else}
    <ReminderApproveArrivalButton {booking} {bgColor} />
  {/if}
{:else}
  <!-- nothing to display -->
{/if}
