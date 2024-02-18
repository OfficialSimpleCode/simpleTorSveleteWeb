<script lang="ts">
  import { weekdays } from "$lib/consts/times";
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import { dateStrToDate, dateToDateStr } from "$lib/utils/times_utils";
  import { translate } from "$lib/utils/translate";
  import ItemNavigator from "./ItemNavigator.svelte";

  export let dateStr: string;

  const date = dateStrToDate(dateStr);
  const isToday = dateToDateStr(new Date()) === dateStr;
</script>

<div class="flex flex-col gap-[4px]">
  <div class="flex flex-col gap-1 outline items-center justify-center p-1">
    <div
      class="rounded-full h-[30px] w-[30px] {isToday
        ? 'bg-primary'
        : 'bg-base-100'} flex flex-col items-center justify-center"
    >
      <h3>{date.getDate()}</h3>
    </div>

    <h3 class="text-sm opacity-70">{translate(weekdays[date.getDay()])}</h3>
  </div>
  {#each $bookingMakerStore.timePickerObjects[dateStr] ?? [] as timeObj}
    <ItemNavigator {timeObj} />
  {/each}
</div>
