<script lang="ts">
  import Booking from "$lib/models/booking/booking_model";
  import { userStore } from "$lib/stores/User";
  import OrderCard from "../components/OrderCard.svelte";

  export let forceOpenBookingSheet: boolean;
  export let shimmerEffect: boolean;

  $: bookings = $userStore.bookingsToShow ?? [];
</script>

{#if shimmerEffect}
  <OrderCard
    booking={new Booking({})}
    {forceOpenBookingSheet}
    {shimmerEffect}
  />
  <OrderCard
    booking={new Booking({})}
    {forceOpenBookingSheet}
    {shimmerEffect}
  />
{:else}
  {#each bookings as booking}
    <OrderCard {booking} {forceOpenBookingSheet} {shimmerEffect} />
  {/each}
{/if}
