<script lang="ts">
  import { weekDays } from "$lib/consts/worker_schedule";
  import { getDayString } from "$lib/utils/string_utils";
  import { dateToDateStr, dateToTimeStr } from "$lib/utils/times_utils";
  import { _, translate } from "$lib/utils/translate";
  import GeneralIcon from "./custom_components/GeneralIcon.svelte";

  export let date: Date;
  export let dayVertical: boolean = true;
  export let showTodayAndTommrow: boolean = false;

  $: timeStr = dateToTimeStr(date);
  $: dayStr = dateToDateStr(date);
</script>

<div
  class="flex flex-row items-center justify-center text-center bg-base-300 py-6 px-4 rounded-lg w-min text-nowrap"
>
  <!-- first elemnt the full date + the day name -->
  <div class="flex flex-row items-center justify-center gap-2">
    <!-- icon -->
    <GeneralIcon icon="mdi:date-range" size={22}></GeneralIcon>
    <div class="flex {dayVertical ? 'flex-col' : 'flex-row'} text-primary">
      <!-- date -->
      <p dir="ltr" class="whitespace-nowrap">{dayStr}</p>
      <p>
        {dayVertical
          ? showTodayAndTommrow
            ? getDayString(date)
            : translate(weekDays[date.getDay()], $_)
          : `  (${
              showTodayAndTommrow
                ? getDayString(date)
                : translate(weekDays[date.getDay()], $_)
            })`}
      </p>
    </div>
  </div>

  <!-- padding between -->
  <div class="w-8"></div>

  <!-- the second elemnt - the time -->
  <div class="flex flex-row gap-2 justify-center text-center">
    <!-- icon -->
    <GeneralIcon icon="mdi:clock-time-three-outline" size={22}></GeneralIcon>
    <p dir="ltr" class="text-primary">{timeStr}</p>
  </div>

  <div class="flex flex-row"></div>
</div>
