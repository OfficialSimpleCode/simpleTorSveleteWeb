<script lang="ts">
  import { BookingStatuses } from "$lib/consts/booking";
  import type Booking from "$lib/models/booking/booking_model";
  import { businessStore } from "$lib/stores/Business";
  import AttentionIndicatorUserBooking from "./AttentionIndicatorUserBooking.svelte";
  import LoadBusinessBookingButton from "./LoadBusinessBookingButton.svelte";
  import ReminderApproveArrivalButton from "./ReminderApproveArrivalButton.svelte";

  export let booking: Booking;
  export let bgColor: string = "bg-base-300";

  const showAttention =
    !booking.isPassed &&
    (booking.status !== BookingStatuses.approved || booking.needCancel);
  const forceOpenBookingSheet: boolean = false;
  const a: boolean = booking.buisnessId != $businessStore.businessId;
  console.log("bid", booking.buisnessId, "shopId", $businessStore.businessId);
</script>

<!-- the business isn't loaded -->
{#if booking.buisnessId !== $businessStore.businessId}
  <LoadBusinessBookingButton {booking} {bgColor}></LoadBusinessBookingButton>
{:else if booking.recurrenceEvent === undefined || forceOpenBookingSheet}
  {#if showAttention}
    <AttentionIndicatorUserBooking {booking} {bgColor}
    ></AttentionIndicatorUserBooking>
  {:else}
    <ReminderApproveArrivalButton {booking} {bgColor}
    ></ReminderApproveArrivalButton>
  {/if}
{:else}
  <!-- nothing to display -->
{/if}
