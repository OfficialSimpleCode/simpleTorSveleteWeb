<script lang="ts">
  import { scheuleItemWidthClass } from "$lib/consts/css_classes";
  import { weekdays } from "$lib/consts/times";
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import { Duration } from "$lib/models/core/duration";
  import { addDuration } from "$lib/utils/duration_utils";
  import { dateToDateStr, setToMidNight } from "$lib/utils/times_utils";
  import { _, translate } from "$lib/utils/translate";
  export let index: number;
  $: date = $bookingMakerStore.timePickerDisplayDates[index];
  $: isToday = dateToDateStr(new Date()) === dateToDateStr(date);
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
  class="flex flex-col flex-1 gap-1 border-y-[1px] min-w-[60px] {isActive
    ? ''
    : 'opacity-50'} rounded-[2px] items-center justify-center py-[6px] {scheuleItemWidthClass} "
>
  <div
    class="rounded-full {isToday
      ? 'bg-primary text-primary-content'
      : 'bg-base-100'} flex flex-col items-center justify-center w-[30px]"
  >
    <h3>{date.getDate()}</h3>
  </div>

  <h3
    class="text-sm opacity-70 text-ellipsis overflow-hidden mx-3 w-full text-center"
  >
    {translate(weekdays[date.getDay()], $_)}
  </h3>
</div>
