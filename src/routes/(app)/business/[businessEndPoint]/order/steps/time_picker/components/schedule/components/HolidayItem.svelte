<script lang="ts">
  import LottieAnimation from "$lib/components/custom_components/LottieAnimation.svelte";
  import {
    bookingMakerButton,
    scheuleItemWidthClass,
  } from "$lib/consts/css_classes";
  import { vacationAnimation } from "$lib/consts/resources";
  import BookingController from "$lib/controllers/booking_controller";
  import type TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
  import { getHolidayNames } from "$lib/utils/dates_utils";
  import { _, translate } from "$lib/utils/translate";

  export let timeObj: TimePickerObj;

  const holidays: string[] = Object.values(
    getHolidayNames(BookingController.worker, timeObj.from)
  );
</script>

<button
  class="{bookingMakerButton}  flex flex-col gap-3 {scheuleItemWidthClass} min-h-[140px] sm:min-h-[160px]"
>
  <LottieAnimation animationFile={vacationAnimation} size="lg" />
  {#each holidays as holiday}
    <h3 class="text-xs sm:text-sm text-center">{translate(holiday, $_)}</h3>
  {/each}
</button>
