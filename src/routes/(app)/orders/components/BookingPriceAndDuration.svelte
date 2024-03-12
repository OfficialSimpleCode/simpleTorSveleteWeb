<script lang="ts">
  import Booking from "$lib/models/booking/booking_model";
  import { Duration } from "$lib/models/core/duration";
  import { printDuration } from "$lib/utils/string_utils";
  import { _, translate } from "$lib/utils/translate";

  export let booking: Booking;
  export let isRow: boolean = true;
</script>

<div class="flex {isRow ? 'flex-rox' : 'flex-col'} gap-1 text-sm sm:text-md">
  <p>
    {`${translate("treatmentDuration", $_).replaceAll(
      "DURATION",

      printDuration(new Duration({ minutes: booking.totalMinutes }))
    )}`}
  </p>
  <p>
    {`${translate("treatmentPrice", $_).replaceAll(
      "PRICE",
      booking.totalPrice.toString()
    )}`}
  </p>
</div>
