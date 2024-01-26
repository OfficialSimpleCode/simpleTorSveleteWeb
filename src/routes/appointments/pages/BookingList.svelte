<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";
  import OrderCard from "../components/OrderCard.svelte";

  export let ordersByDate: [string, Record<string, Booking>][];
</script>

{#each ordersByDate as [date, bookingMap]}
  {#each Object.entries(bookingMap) as [id, booking]}
    <OrderCard {booking} />
  {/each}
{/each}
