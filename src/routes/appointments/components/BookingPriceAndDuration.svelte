<script lang="ts">
  import Booking from "$lib/models/booking/booking_model";
  import { Duration } from "$lib/models/core/duration";
  import { durationFormated } from "$lib/utils/string_utils";
  import { translate } from "$lib/utils/translate";

  export let booking: Booking;
  export let isRow: boolean = true;
</script>

<div class="flex {isRow ? 'flex-rox' : 'flex-col'} gap-3">
  <p>
    {`${translate("treatmentDuration").replaceAll(
      "DURATION",
      durationFormated(new Duration({ minutes: booking.totalMinutes }))
    )}`}
  </p>
  <p>
    {`${translate("treatmentPrice").replaceAll(
      "PRICE",
      booking.totalPrice.toString()
    )}`}
  </p>
</div>
