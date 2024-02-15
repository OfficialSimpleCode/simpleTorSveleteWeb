<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";
  import OrderCard from "../components/OrderCard.svelte";

  export let bookings: Booking[];
  export let forceOpenBookingSheet: boolean;
</script>

{#each bookings as booking}
  <OrderCard {booking} {forceOpenBookingSheet} />
{/each}
