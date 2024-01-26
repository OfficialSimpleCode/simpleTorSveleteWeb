<script lang="ts">
  import { BookingStatuses } from "$lib/consts/booking";
  import type Booking from "$lib/models/booking/booking_model";
  import { businessStore } from "$lib/stores/Business";
  import AttentionIndicatorUserBooking from "./AttentionIndicatorUserBooking.svelte";
  import LoadBusinessBookingButton from "./LoadBusinessBookingButton.svelte";
  import ReminderApproveArrivalButton from "./ReminderApproveArrivalButton.svelte";
  export let booking: Booking;

  const showAttention =
    !booking.isPassed &&
    (booking.status !== BookingStatuses.approved || booking.needCancel);
  const forceOpenBookingSheet: boolean = false;

  console.log("bid", booking.buisnessId, "shopId", $businessStore.businessId);
</script>

<!-- the business isn't loaded -->
{#if booking.buisnessId !== $businessStore.businessId}
  <LoadBusinessBookingButton {booking}></LoadBusinessBookingButton>
{:else if booking.recurrenceEvent === null || forceOpenBookingSheet}
  {#if showAttention}
    <AttentionIndicatorUserBooking {booking}></AttentionIndicatorUserBooking>
  {:else}
    <ReminderApproveArrivalButton {booking}></ReminderApproveArrivalButton>
  {/if}
{:else}
  <!-- nothing to display -->
{/if}

<!-- <div
  class:bg-warning={booking.status == BookingStatuses.waiting}
  class:text-warning-content={booking.status == BookingStatuses.waiting}
  class:bg-success={booking.status == BookingStatuses.approved}
  class:text-success-content={booking.status == BookingStatuses.approved}
  class="flex text-sm rounded-xl px-2 py-4 text-center items-center"
>
  {#if booking.status == BookingStatuses.waiting}
    {$_("waiting")}
  {:else if booking.status == "approved"}
    {$_("approved")}
  {/if}
</div> -->
