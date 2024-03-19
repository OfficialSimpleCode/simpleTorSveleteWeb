<script lang="ts">
  import DownloadAppButton from "$lib/components/custom_components/DownloadAppButton.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  import { _, translate } from "$lib/utils/translate";
  import CheckIcon from "./CheckIcon.svelte";
  export let title: string;
  export let sunTitle: string;
  export let price: number;
  export let includesList: string[];

  export let bestSeller: boolean = false;
  export let extraOverSub: string | undefined = undefined;
</script>

<div
  class="flex flex-col bg-base-300 py-6 px-4 mx-auto max-w-lg text-center rounded-lg border-2 {bestSeller
    ? 'border-primary'
    : 'border-gray-500'} shadow hover:scale-105 transform transition-transform duration-300"
>
  <!-- title and subtitle -->
  <h3 class="mb-4 text-2xl font-semibold">{title}</h3>
  <p class="opacity-70">
    {sunTitle}
  </p>

  <!-- price and period -->
  <div class="flex justify-center items-baseline mt-6">
    <div class="flex flex-col">
      <span class="mr-2 text-5xl font-extrabold">{price}₪</span>
    </div>
    <span class="opacity-70">/{translate("inMonth", $_, false)}</span>
  </div>
  <span class="opacity-70 text-sm px-1 mb-6"
    >({translate("notIncludeVAT", $_, false)})</span
  >
  <!-- download the app button -->
  <DownloadAppButton textTransKey={"start"} />
  <!-- list of what includes in the subscription -->
  <ul role="list" class="mb-8 space-y-2 pt-5">
    {#if extraOverSub != null}
      <li
        class="flex flex-col items-center space-x-3 justify-center font-extrabold text-md mb-2 text-center"
      >
        <div class="bg-base-200 px-5 py-1 mb-4 {containerRadius}">
          <span class="font-extrabold"
            >{translate("everythingInOtherSubs", $_, false).replaceAll(
              "SUB",
              extraOverSub
            )}</span
          >
        </div>
      </li>
    {/if}
    {#each includesList as item}
      <!-- include item -->
      <li class="flex items-center space-x-3 text-start">
        <CheckIcon />
        <p class="px-2"><span>{translate(item, $_, false)}</span></p>
      </li>
    {/each}
  </ul>
</div>
