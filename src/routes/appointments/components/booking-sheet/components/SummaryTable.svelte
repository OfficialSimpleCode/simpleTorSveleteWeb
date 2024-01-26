<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";
  import { translate } from "$lib/utils/translate";
  import TableItem from "./TableItem.svelte";

  export let booking: Booking;
  booking.bookingDate;
</script>

<div class="flex flex-col gap-2 justify-start w-full">
  <TableItem fieldTranslateKey="price" value={booking.totalPrice.toString()}
  ></TableItem>
  <TableItem
    fieldTranslateKey="duration"
    value={booking.totalMinutes.toString()}
  ></TableItem>
  <TableItem
    fieldTranslateKey="treatments"
    value={booking.treatments.size === 1
      ? booking.treatments.values().next().value.nameForBooking
      : `${booking.treatmentLength} ${translate("treatments")}`}
  ></TableItem>
</div>
