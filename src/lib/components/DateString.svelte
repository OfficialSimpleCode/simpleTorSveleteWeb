<script lang="ts">
  import { weekDays } from "$lib/consts/worker_schedule";
  import { getDayString } from "$lib/utils/string_utils";
  import { translate } from "$lib/utils/translate";
  import { format } from "date-fns";
  import GeneralIcon from "./GeneralIcon.svelte";

  export let date: Date;
  export let dayVertical: boolean = true;
  export let showTodayAndTommrow: boolean = false;

  const timeStr: string = format(date, "HH:mm");
  const dayStr: string = format(date, "dd-MM-yyyy");
  const dayOfWeekStr: string = translate(weekDays[date.getDay()]);
</script>

<div class="flex flex-row items-center justify-center text-center">
  <!-- first elemnt the full date + the day name -->
  <div class="flex flex-row items-center justify-center gap-2">
    <!-- icon -->
    <GeneralIcon icon="mdi:date-range" size={22}></GeneralIcon>
    <div class="flex {dayVertical ? 'flex-col' : 'flex-row'}">
      <!-- date -->
      <p dir="ltr">{dayStr}</p>
      <p>
        {dayVertical
          ? showTodayAndTommrow
            ? getDayString(date)
            : dayOfWeekStr
          : `  (${showTodayAndTommrow ? getDayString(date) : dayOfWeekStr})`}
      </p>
    </div>
  </div>

  <!-- padding between -->
  <div class="w-8"></div>

  <!-- the second elemnt - the time -->
  <div class="flex flex-row gap-2 justify-center text-center">
    <!-- icon -->
    <GeneralIcon icon="mdi:clock-time-three-outline" size={22}></GeneralIcon>
    <p dir="ltr">{timeStr}</p>
  </div>

  <div class="flex flex-row"></div>
</div>
