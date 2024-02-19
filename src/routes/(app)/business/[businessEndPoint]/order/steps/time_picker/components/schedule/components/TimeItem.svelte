<script lang="ts">
  import { scheuleItemWidthClass } from "$lib/consts/css_classes";
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import type TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
  import { dateIsoStr, dateToTimeStr } from "$lib/utils/times_utils";
  import pkg from "uuid";
  import { onTimeItemClick } from "../../../helpers/on_tap_time_obj";
  const { v4 } = pkg;
  export let timeObj: TimePickerObj;

  $: isPicked =
    $bookingMakerStore.date != null &&
    timeObj.displayDate != null &&
    dateIsoStr($bookingMakerStore.date) === dateIsoStr(timeObj.displayDate);
  const id =
    timeObj.displayDate != null ? dateIsoStr(timeObj.displayDate) : v4();
</script>

<button
  {id}
  class="btn {isPicked
    ? 'bg-base-200'
    : 'bg-primary'} hover:bg-primary hover:opacity-90 {scheuleItemWidthClass} {isPicked
    ? 'outline outline-1'
    : ''}"
  on:click={() => onTimeItemClick(timeObj)}
>
  <h3>
    {timeObj.displayDate != null ? dateToTimeStr(timeObj.displayDate) : ""}
  </h3>
</button>
