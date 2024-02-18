<script lang="ts">
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import DayColumn from "./components/DayColumn.svelte";
  import ScheduleNavBar from "./components/ScheduleNavBar.svelte";
</script>

<ScheduleNavBar />

<div class="flex flex-row gap-[3px]">
  {#each Object.keys($bookingMakerStore.timePickerObjects) as dateStr}
    <DayColumn {dateStr} />
  {/each}
</div>
