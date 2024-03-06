<script lang="ts">
  import { userStore } from "$lib/stores/User";
  import OrderCard from "../components/OrderCard.svelte";

  export let forceOpenBookingSheet: boolean;

  $: bookings = $userStore.bookingsToShow ?? [];
</script>

{#each bookings as booking}
  <OrderCard {booking} {forceOpenBookingSheet} />
{/each}
