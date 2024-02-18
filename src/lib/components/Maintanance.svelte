<script>
  import LottieAnimation from "$lib/components/LottieAnimation.svelte";
  import { maintananceAnimation } from "$lib/consts/resources";
  import { containerRadius } from "$lib/consts/sizes";
  import { _, translate } from "$lib/utils/translate";
</script>

<main class="w-full h-full">
  <div class="flex flex-col items-center py-10 px-10 h-full gap-4 text-center">
    <!-- maintanance animation -->
    <LottieAnimation
      height={300}
      width={300}
      animationFile={maintananceAnimation}
    />

    <!-- title -->
    <h1 class="text-xl">{translate("maintenanceDescription", $_)}</h1>

    <!-- reload button -->
    <a
      class="text-lg bg-primary py-1 px-10 {containerRadius}"
      href="https://google.com">{translate("Reload", $_)}</a
    >
  </div>
</main>
