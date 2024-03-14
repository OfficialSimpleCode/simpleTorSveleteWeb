<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";
  import BookingDateAndTime from "./BookingDateAndTime.svelte";
  import BookingPriceAndDuration from "./BookingPriceAndDuration.svelte";
  export let shimmerEffect: boolean = false;
  export let booking: Booking;
</script>

<div class="flex flex-col text-start max-w-[70%]">
  <!-- date and time of the booking -->
  <BookingDateAndTime {booking} {shimmerEffect} />

  <!-- padding -->
  <div class="h-2"></div>

  <!-- data: durstion, price -->
  <BookingPriceAndDuration {booking} {shimmerEffect} />
</div>
