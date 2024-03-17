<script lang="ts">
  import LottieAnimation from "$lib/components/custom_components/LottieAnimation.svelte";
  import { themeStore } from "$lib/controllers/theme_controller";
  import { computeLuminance } from "$lib/utils/general_utils";

  export let imageSrc: string;
  export let titleTransKey: string;
  export let subTitleTransKey: string;
  export let stepNumber: number;
  export let withDivider: boolean = true;

  let colors: string[] = ["text-blue-200", "text-pink-200", "text-green-200"];

  themeStore.subscribe((value) => {
    if (value == null) {
      return;
    }
    const lightMode = computeLuminance($themeStore.background) > 0.5;
    colors = lightMode
      ? ["text-blue-600", "text-pink-600", "text-green-600"]
      : ["text-blue-300", "text-pink-300", "text-green-300"];
  });
</script>

<div class="flex flex-col items-center justify-center">
  <!-- circle with the step number -->
  <div
    class="flex items-center justify-center w-32 h-32 mx-auto bg-base-100 rounded-full shadow p-4"
  >
    <!-- step animation -->
    <LottieAnimation loop animationFile={imageSrc} size="xl3" />
  </div>
  <span class="text-2xl mt-6 {colors[stepNumber - 1]}">{stepNumber}</span>
  <!-- step title -->
  <h3 class="text-xl {colors[stepNumber - 1]}">
    {titleTransKey}
  </h3>
  <!-- step text -->
  <p class="mt-2 md:text-lg opacity-70 max-w-xs {colors[stepNumber - 1]}">
    {subTitleTransKey}
  </p>
  {#if withDivider}
    <div
      class="h-[1px] w-[220px] bg-base-300 mt-14 rounded-full md:hidden block"
    ></div>
  {/if}
</div>
