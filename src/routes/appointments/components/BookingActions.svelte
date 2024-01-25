<script lang="ts">
  import { BookingStatuses } from "$lib/consts/booking";
  import type Booking from "$lib/models/booking/booking_model";
  import { _ } from "svelte-i18n";
  export let booking: Booking;
</script>

<div
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
</div>
