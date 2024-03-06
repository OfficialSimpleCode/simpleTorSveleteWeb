<script lang="ts">
  import { userStore } from "$lib/stores/User";
  import { _, translate } from "$lib/utils/translate";
  import TableRow from "../components/TableRow.svelte";

  export let forceOpenBookingSheet: boolean;

  $: bookings = $userStore.bookingsToShow ?? [];
</script>

<table class="table">
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
    {#each bookings as booking}
      <TableRow {booking} {forceOpenBookingSheet} />
    {/each}
  </tbody>
</table>
