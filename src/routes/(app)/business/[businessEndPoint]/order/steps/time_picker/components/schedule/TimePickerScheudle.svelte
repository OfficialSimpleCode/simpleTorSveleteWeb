<script lang="ts">
  import { maxWidthToShow5Days } from "$lib/consts/booking_maker";
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import { screenSizeStore } from "$lib/stores/sizes";
  import {
    getForwardDays,
    loadBookingMakerTimeData,
  } from "$lib/utils/booking_maker";
  import { onMount } from "svelte";
  import DayColumn from "./components/DayColumn.svelte";
  import DayIndicator from "./components/DayIndicator.svelte";

  import { dateIsoStr } from "$lib/utils/times_utils";
  import EmptyTimePickerSchedule from "./components/EmptyTimePickerSchedule.svelte";
  import ScheduleNavBar from "./components/ScheduleNavBar.svelte";

  //listen to the screen width changes and change the amount of days that shown
  screenSizeStore.subscribe((v) => {
    let daysToShow = 7;
    if (v.width <= maxWidthToShow5Days) {
      daysToShow = 5;
    }

    if ($bookingMakerStore.numberOfShownDays !== daysToShow) {
      bookingMakerStore.update((value) => {
        value.numberOfShownDays = daysToShow;

        value.timePickerDisplayDates = getForwardDays(
          value.timePickerDisplayDates[0],
          daysToShow
        );
        loadBookingMakerTimeData();
        return value;
      });
    }
  });

  //load the times obj for the first time after choose the service
  loadBookingMakerTimeData();

  //
  onMount(() => {
    if ($bookingMakerStore.date != null) {
      const htmlObj = document.getElementById(
        dateIsoStr($bookingMakerStore.date)
      );
      if (htmlObj != null) {
        htmlObj.scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "center",
        });
      }
    }
  });

  $: isEmpty =
    Object.entries($bookingMakerStore.timePickerObjects).length === 0;
</script>

<div
  class="flex flex-col items-center justify-center gap-1 w-[95%] xs:w-[84%] sm:w-[85%]"
>
  <!-- nav bar -->
  <ScheduleNavBar />

  <!-- days indicators -->
  <div class="flex flex-row gap-[4px] w-full">
    {#each { length: $bookingMakerStore.numberOfShownDays } as _, index}
      <DayIndicator {index} />
    {/each}
  </div>

  <!-- times  -->
  {#if isEmpty}
    <EmptyTimePickerSchedule />
  {:else}
    <div
      class="grid {$bookingMakerStore.numberOfShownDays === 7
        ? 'grid-cols-7'
        : 'grid-cols-5'} w-full"
    >
      {#each { length: $bookingMakerStore.numberOfShownDays } as _, index}
        <DayColumn {index} />
      {/each}
    </div>
  {/if}
</div>
