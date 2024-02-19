<script lang="ts">
  import LottieAnimation from "$lib/components/custom_components/LottieAnimation.svelte";
  import { scheuleItemWidthClass } from "$lib/consts/css_classes";
  import { vacationAnimation } from "$lib/consts/resources";
  import { containerRadius } from "$lib/consts/sizes";
  import type TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
  import { _, translate } from "$lib/utils/translate";

  export let timeObj: TimePickerObj;
</script>

<section
  class="flex flex-col bg-primary {containerRadius} {scheuleItemWidthClass} h-[180px] sm:h-[220px] justify-center"
>
  <LottieAnimation animationFile={vacationAnimation} size="lg" />
  <h3 class="text-xs sm:text-sm text-center">{translate("Vacation", $_)}</h3>
</section>
