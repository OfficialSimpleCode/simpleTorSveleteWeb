<script>
  import LottieAnimation from "$lib/components/custom_components/LottieAnimation.svelte";
  import { timeAnimation } from "$lib/consts/resources";
  import { _, translate } from "$lib/utils/translate";
</script>

<div class="flex flex-col mt-8 gap-2 items-center">
  <LottieAnimation animationFile={timeAnimation} size="xl5" />
  <div class="flex flex-col gap-1 items-center">
    <h3 class="text-lg">{translate("noAvaliableTimes", $_)}</h3>
    <h3 class="text-sm opacity-70">{translate("tryNextDates", $_)}</h3>
  </div>
</div>
