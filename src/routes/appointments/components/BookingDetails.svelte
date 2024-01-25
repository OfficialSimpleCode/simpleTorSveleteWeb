<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";
  import { Duration } from "$lib/models/core/duration";
  import { durationFormated } from "$lib/utils/string_utils";
  import { _ } from "svelte-i18n";

  export let booking: Booking;
</script>

<div class="flex flex-col text-start max-w-[70%]">
  <!-- date and time of the booking -->
  <p>vdsvnofsnvofidn v fd jdf vodnsfo vf d vs od j</p>

  <!-- data: durstion, price -->
  <div class="flex flex-rox gap-5">
    <p>
      {`${$_("treatmentDuration").replaceAll(
        "DURATION",
        durationFormated(new Duration({ minutes: booking.totalMinutes }))
      )}`}
    </p>
    <p>
      {`${$_("treatmentPrice").replaceAll(
        "PRICE",
        booking.totalPrice.toString()
      )}`}
    </p>
  </div>
</div>
