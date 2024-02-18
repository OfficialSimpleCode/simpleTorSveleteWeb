<script lang="ts">
  import LottieAnimation from "$lib/components/custom_components/LottieAnimation.svelte";
  import { scheuleItemWidthClass } from "$lib/consts/css_classes";
  import { vacationAnimation } from "$lib/consts/resources";
  import type TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
  import { translate } from "$lib/utils/translate";

  export let timeObj: TimePickerObj;
</script>

<section class="flex flex-col {scheuleItemWidthClass} h-[180px] sm:h-[220px]">
  <LottieAnimation animationFile={vacationAnimation} size="lg" />
  <h3>{translate("vacation")}</h3>
</section>
