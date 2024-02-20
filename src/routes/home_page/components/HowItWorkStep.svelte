<script lang="ts">
  import CustomArrow from "$lib/components/custom_components/CustomArrow.svelte";
  import LottieAnimation from "$lib/components/custom_components/LottieAnimation.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  export let imageSrc: string;
  export let titleTransKey: string;
  export let subTitleTransKey: string;
  export let stepNumber: number;
  export let withArrow: boolean = true;
</script>

<div
  class="lg:max-w-[300px] sx:max-w-full max-w-[300px] flex items-center gap-4 bg-base-300 xs:px-4 md:px-2 py-2 {containerRadius} border-2 hover:scale-105 sm:hover:scale-110 hover:border-primary border-base-300 transform transition-transform duration-300"
>
  <div class="flex flex-col justify-center items-center gap-10 mx-auto">
    <!-- step image -->
    <div class="lg:col-span-5 lg:flex px-10 py-5">
      <!-- <img src={imageSrc} alt="mockup" /> -->
      <!-- <DeviceMock mediaSrc={imageSrc} uuid={`HowItWorks-${stepNumber}`} /> -->
      <LottieAnimation loop animationFile={imageSrc} size="xl3" />
    </div>

    <div class="flex flex-row justify-center items-center gap-3 px-4">
      <!-- number and circle -->
      <div
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-solid border-primary"
      >
        <span class="text-base font-bold leading-7">{stepNumber}</span>
      </div>

      <!-- step title and sub title -->
      <div class="flex flex-col max-w-[320px] mb-4">
        <!-- title -->
        <h3 class="text-lg font-bold">
          {titleTransKey}
        </h3>
        <!-- sub title -->
        <p class="text-sm opacity-70">
          {subTitleTransKey}
        </p>
      </div>
    </div>
  </div>
</div>

<!-- arrow seperator -->
<div
  class="flex justify-center {withArrow ? '' : 'hidden'} lg:rotate-0 -rotate-90"
>
  <CustomArrow />
</div>

<!-- <div class="rotate-90 lg:rotate-0 {withArrow ? '' : 'hidden'}">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="43"
    height="42"
    viewBox="0 0 43 42"
    fill="none"
  >
    <g clip-path="url(#clip0_3346_6663)">
      <path
        d="M16.9242 11.7425C16.2417 12.425 16.2417 13.5275 16.9242 14.21L23.7142 21L16.9242 27.79C16.2417 28.4725 16.2417 29.575 16.9242 30.2575C17.6067 30.94 18.7092 30.94 19.3917 30.2575L27.4242 22.225C28.1067 21.5425 28.1067 20.44 27.4242 19.7575L19.3917 11.725C18.7267 11.06 17.6067 11.06 16.9242 11.7425Z"
        fill="#68769F"
      />
    </g>
    <defs>
      <clipPath id="clip0_3346_6663">
        <rect
          width="42"
          height="42"
          fill="white"
          transform="translate(0.666748)"
        />
      </clipPath>
    </defs>
  </svg>
</div> -->
