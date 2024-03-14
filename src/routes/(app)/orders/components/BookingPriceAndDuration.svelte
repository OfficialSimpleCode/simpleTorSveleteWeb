<script lang="ts">
  import Booking from "$lib/models/booking/booking_model";
  import { Duration } from "$lib/models/core/duration";
  import { printDuration } from "$lib/utils/string_utils";
  import { _, translate } from "$lib/utils/translate";
  export let shimmerEffect: boolean = false;
  export let booking: Booking;
  export let isRow: boolean = true;
</script>

{#if shimmerEffect}
  <div class="flex flex-col">
    <div class="bg-base-content opacity-10 h-3 w-[170px] rounded-md" />
    <div class="bg-base-content opacity-10 h-3 w-[80px] rounded-md mt-1" />
  </div>
{:else}
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
{/if}
