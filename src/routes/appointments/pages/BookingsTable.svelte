<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";

  import { translate } from "$lib/utils/translate";
  import TableRow from "../components/TableRow.svelte";

  export let ordersByDate: [string, Record<string, Booking>][];
</script>

<table class="table">
  <thead>
    <tr>
      <th>{translate("business")}</th>
      <th>{translate("worker")}</th>
      <th>{translate("details")}</th>
      <th>{translate("dateAndTime")}</th>
      <th>{translate("status")}</th>
      <!-- <th></th> -->
    </tr>
  </thead>
  <tbody>
    {#each ordersByDate as [date, bookingMap]}
      {#each Object.entries(bookingMap) as [id, booking]}
        <TableRow {booking} />
      {/each}
    {/each}
  </tbody>
</table>
