<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";
  import OrderCard from "../components/OrderCard.svelte";

  export let bookings: Booking[];
</script>

{#each bookings as booking}
  <OrderCard {booking} />
{/each}
