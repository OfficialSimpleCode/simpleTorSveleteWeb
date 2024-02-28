<script lang="ts">
  import { goto } from "$app/navigation";
  import CustomArrow from "$lib/components/custom_components/CustomArrow.svelte";
  import LottieAnimation from "$lib/components/custom_components/LottieAnimation.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  import { themeStore } from "$lib/controllers/theme_controller";
  import { computeLuminance } from "$lib/utils/general_utils";
  import { onMount } from "svelte";
  export let imageSrc: string;
  export let titleTransKey: string;

  export let stepNumber: number;
  export let withArrow: boolean = true;

  let colors: string[] = ["text-blue-200", "text-pink-200", "text-green-200"];

  function habdleClick() {
    if (stepNumber < 3 && window.innerWidth < 1024) {
      goto(`#HowItWorkStep-${stepNumber + 1}`);
    }
  }
  console.log("themeStore -> ", themeStore);

  onMount(() => {
    if ($themeStore) {
      const lightMode = computeLuminance($themeStore.background) > 0.5;
      colors = lightMode
        ? ["text-blue-600", "text-pink-600", "text-green-600"]
        : ["text-blue-200", "text-pink-200", "text-green-200"];
    }
  });
</script>

<div id={`HowItWorkStep-${stepNumber}`} class="py-4 lg:py-0">
  <button
    on:click={habdleClick}
    class="bg-base-300 w-full xs:px-4 md:px-2 pb-6 {containerRadius} border-2 hover:scale-105 sm:hover:scale-105 hover:border-primary border-base-300 transform transition-transform duration-300"
  >
    <div class="flex flex-col justify-center items-center gap-10 w-full">
      <!-- step image -->
      <div class="lg:col-span-5 lg:flex px-10 py-5">
        <!-- <img src={imageSrc} alt="mockup" /> -->
        <!-- <DeviceMock mediaSrc={imageSrc} uuid={`HowItWorks-${stepNumber}`} /> -->
        <LottieAnimation loop animationFile={imageSrc} size="xl3" />
      </div>

      <div class="flex flex-row justify-center items-center gap-3">
        <!-- number and circle -->
        <!-- <div
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full {colors[
          stepNumber - 1
        ]} border-2 border-solid border-primary"
      >
        <span class="text-base font-bold leading-7">{stepNumber}</span>
      </div> -->

        <!-- step title and sub title -->
        <div
          class="flex flex-col justify-center items-centermax-w-[320px] {colors[
            stepNumber - 1
          ]} "
        >
          <!-- title -->
          <h3 class="text-lg font-bold">
            {titleTransKey}
          </h3>
          <!-- sub title -->
        </div>
      </div>
    </div>
  </button>
</div>
<!-- arrow seperator -->
<div
  class="flex justify-center {withArrow
    ? ''
    : 'hidden'} lg:rotate-0 -rotate-90 items-center"
>
  <div
    class="bg-base-300 rounded-full flex w-9 h-9 items-center justify-center"
  >
    <CustomArrow />
  </div>
</div>
