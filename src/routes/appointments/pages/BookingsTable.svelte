<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";

  import { translate, _ } from "$lib/utils/translate";
  import TableRow from "../components/TableRow.svelte";

  export let bookings: Booking[];
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
      <TableRow {booking} />
    {/each}
  </tbody>
</table>
