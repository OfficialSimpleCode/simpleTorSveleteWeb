<script lang="ts">
  import LottieAnimation from "$lib/components/custom_components/LottieAnimation.svelte";
  import {
    bookingMakerButton,
    scheuleItemWidthClass,
  } from "$lib/consts/css_classes";
  import { vacationAnimation } from "$lib/consts/resources";
  import type TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
  import { _, translate } from "$lib/utils/translate";

  export let timeObj: TimePickerObj;
</script>

<button
  class="{bookingMakerButton} flex flex-col gap-3 {scheuleItemWidthClass} h-[140px] sm:h-[160px]"
  on:click={() => {}}
>
  <LottieAnimation animationFile={vacationAnimation} size="lg" />
  <h3 class="text-xs sm:text-sm text-center">{translate("Vacation", $_)}</h3>
</button>
