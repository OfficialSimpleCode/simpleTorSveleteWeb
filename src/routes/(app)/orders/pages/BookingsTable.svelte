<script lang="ts">
  import Booking from "$lib/models/booking/booking_model";
  import { userStore } from "$lib/stores/User";
  import { _, translate } from "$lib/utils/translate";
  import TableRow from "../components/TableRow.svelte";

  export let forceOpenBookingSheet: boolean;
  export let shimmerEffect: boolean;

  $: bookings = $userStore.bookingsToShow ?? [];
</script>

<table class="table h-full">
  <thead>
    <tr>
      <th>{translate("business", $_)}</th>
      <th>{translate("worker", $_)}</th>
      <th>{translate("treatments", $_)}</th>
      <th>{translate("details", $_)}</th>
      <th>{translate("dateAndTime", $_)}</th>
      <th>{translate("status", $_)}</th>
      <!-- <th></th> -->
    </tr>
  </thead>
  <tbody>
    {#if shimmerEffect}
      <TableRow
        booking={new Booking({})}
        {forceOpenBookingSheet}
        {shimmerEffect}
      />
      <TableRow
        booking={new Booking({})}
        {forceOpenBookingSheet}
        {shimmerEffect}
      />
    {:else}
      {#each bookings as booking}
        <TableRow {booking} {forceOpenBookingSheet} {shimmerEffect} />
      {/each}
    {/if}
  </tbody>
</table>
