<script lang="ts">
  import { scheuleItemWidthClass } from "$lib/consts/css_classes";
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import { Duration } from "$lib/models/core/duration";
  import { addDuration } from "$lib/utils/duration_utils";
  import { dateToDateStr, setToMidNight } from "$lib/utils/times_utils";
  import ItemNavigator from "./ItemNavigator.svelte";

  export let index: number;

  $: date = $bookingMakerStore.timePickerDisplayDates[index];

  $: isActive =
    date >= setToMidNight(new Date()) &&
    date <
      setToMidNight(
        addDuration(
          new Date(),
          new Duration({ days: BookingController.worker.daysToAllowBookings })
        )
      );
</script>

<div
  class="flex flex-col gap-[4px] w-full {isActive
    ? ''
    : 'opacity-50'} {scheuleItemWidthClass}"
>
  {#each $bookingMakerStore.timePickerObjects[dateToDateStr(date)] ?? [] as timeObj}
    <ItemNavigator {timeObj} />
  {/each}
</div>
