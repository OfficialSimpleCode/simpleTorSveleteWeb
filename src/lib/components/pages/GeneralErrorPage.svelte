<script>
  import { generalErrorAnimation } from "$lib/consts/resources";
  import { _, translate } from "$lib/utils/translate";

  import LottieAnimation from "../custom_components/LottieAnimation.svelte";
</script>

<svelte:head>
  <!-- Title -->
  <title>{translate("error", $_)}</title>
  <!-- icon im the window -->
  <link rel="icon" href="/AppIcon.png" />
</svelte:head>

<div class="flex flex-col gap-4 items-center pt-14">
  <LottieAnimation
    animationFile={generalErrorAnimation}
    size="xl6"
    loop={true}
  />
  <div class="flex flex-col gap-1 px-3">
    <h3 class="text-2xl text-center">{translate("error", $_)}</h3>
    <p class="text-md text-center opacity-70">
      {translate("uploadFailed", $_)}
    </p>
  </div>
</div>
