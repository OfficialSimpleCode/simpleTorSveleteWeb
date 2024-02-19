<script lang="ts">
  import { scheuleItemWidthClass } from "$lib/consts/css_classes";
  import type TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
  import { dateToTimeStr } from "$lib/utils/times_utils";
  import { onTimeItemClick } from "../../../helpers/on_tap_time_obj";

  export let timeObj: TimePickerObj;
</script>

<button
  class="btn bg-primary hover:opacity-90 {scheuleItemWidthClass} flex flex-col"
  on:click={() => onTimeItemClick(timeObj)}
>
  <h3>
    {timeObj.displayDate != null ? dateToTimeStr(timeObj.displayDate) : ""}
  </h3>
  {#if timeObj.showParticipants}
    <h3>
      {`${timeObj.currentParticipants}/${timeObj.maxParticipants}`}
    </h3>
  {/if}
</button>
