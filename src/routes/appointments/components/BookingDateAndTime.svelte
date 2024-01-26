<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";

  export let booking: Booking;
</script>

<div class="flex flex-col text-start max-w-[70%]">
  <!-- date and time of the booking -->
  <p>{booking.bookingDate}</p>
</div>
