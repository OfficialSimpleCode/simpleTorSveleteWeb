<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";
  import { getDayString } from "$lib/utils/string_utils";
  import {
    dateToStrAccoridngToFormat,
    dateToTimeStr,
    partOfDay,
  } from "$lib/utils/times_utils";
  import { _, translate } from "$lib/utils/translate";
  export let shimmerEffect: boolean = false;
  export let booking: Booking;
</script>

{#if shimmerEffect}
  <div class="flex flex-col">
    <div class="bg-base-content opacity-10 h-3 w-[90px] rounded-md" />
    <div class="bg-base-content opacity-10 h-3 w-[70px] rounded-md mt-1" />
  </div>
{:else}
  <!-- date and time of the booking -->
  <div class="flex flex-col text-start w-[10%] text-nowrap text-sm sm:text-md">
    <div class="flex flex-row gap-1">
      <p>
        {getDayString(booking.currentDisplayDate, translate("onDay", $_) + " ")}
      </p>
      <p dir="ltr">
        {"(" +
          dateToStrAccoridngToFormat(booking.currentDisplayDate, "dd/MM/yy") +
          ") "}
      </p>
    </div>

    <div class="flex flex-row gap-1">
      <p>{translate("at", $_)}</p>
      <p dir="ltr">{dateToTimeStr(booking.currentDisplayDate)}</p>
      <p>{`(${partOfDay(booking.currentDisplayDate)})`}</p>
    </div>
  </div>
{/if}
