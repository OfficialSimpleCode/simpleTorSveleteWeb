<script>
  import { maintananceAnimation } from "$lib/consts/resources";
  import { containerRadius } from "$lib/consts/sizes";
  import { _, translate } from "$lib/utils/translate";
  import LottieAnimation from "./custom_components/LottieAnimation.svelte";
</script>

<main class="w-full h-full">
  <div
    class="flex flex-col items-center pt-20 px-10 h-full gap-5 text-center justify-center"
  >
    <!-- maintanance animation -->
    <LottieAnimation size="xl4" animationFile={maintananceAnimation} />

    <!-- title -->
    <h1 class="text-md">{translate("maintenanceDescription", $_)}</h1>

    <!-- reload button -->
    <button
      class="btn btn-md text-lg btn-primary py-1 px-10 {containerRadius}"
      on:click={() => {
        location.reload();
      }}>{translate("Reload", $_)}</button
    >
  </div>
</main>
