<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";

  import { _, translate } from "$lib/utils/translate";
  import TableRow from "../components/TableRow.svelte";

  export let bookings: Booking[];
  export let forceOpenBookingSheet: boolean;
</script>

<table class="table">
  <thead>
    <tr>
      <th>{translate("business", $_)}</th>
      <th>{translate("worker", $_)}</th>
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
