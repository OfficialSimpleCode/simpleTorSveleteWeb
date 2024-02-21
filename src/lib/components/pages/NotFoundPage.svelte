<script>
  import { notFoundPageAnimation } from "$lib/consts/resources";
  import { _, translate } from "$lib/utils/translate";
  import LottieAnimation from "../custom_components/LottieAnimation.svelte";
</script>

<div class="flex flex-col gap-3 items-center">
  <LottieAnimation
    animationFile={notFoundPageAnimation}
    size="xl6"
    loop={true}
  />
  <div class="flex flex-col gap-1">
    <h3 class="text-2xl text-center">{translate("notFoundPage", $_)}</h3>
    <p class="text-md text-center opacity-70">
      {translate("notFoundPageExplain", $_)}
    </p>
  </div>
</div>
