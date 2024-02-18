<script lang="ts">
  import type TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
  import HolidayItem from "./HolidayItem.svelte";
  import MultiEventItem from "./MultiEventItem.svelte";
  import TimeItem from "./TimeItem.svelte";
  import VacationItem from "./VacationItem.svelte";
  import WaitingListItem from "./WaitingListItem.svelte";

  export let timeObj: TimePickerObj;
</script>

{#if timeObj.isHoliday}
  <HolidayItem {timeObj} />
{:else if timeObj.isVacation}
  <VacationItem {timeObj} />
{:else if timeObj.isWaitingList}
  <WaitingListItem {timeObj} />
{:else if timeObj.isMulti}
  <MultiEventItem {timeObj} />
{:else}
  <TimeItem {timeObj} />
{/if}
