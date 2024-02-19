<script>
  import LottieAnimation from "$lib/components/custom_components/LottieAnimation.svelte";
  import { emptyAnimation } from "$lib/consts/resources";
  import { _, translate } from "$lib/utils/translate";
</script>

<div class="flex flex-col items-center">
  <LottieAnimation animationFile={emptyAnimation} size="xl4" />
  <h3 class="text-xl">
    {translate("noAvailableTretments", $_)}
  </h3>
</div>
