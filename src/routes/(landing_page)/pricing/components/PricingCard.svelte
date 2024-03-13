<script lang="ts">
  import DownloadAppButton from "$lib/components/custom_components/DownloadAppButton.svelte";
  import CheckIcon from "./CheckIcon.svelte";
  export let title: string;
  export let sunTitle: string;
  export let price: number;
  export let includesList: string[];
  export let isFirst: boolean = false;
  export let bestSeller: boolean = false;
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
  <div class="flex justify-center items-baseline my-8">
    <span class="mr-2 text-5xl font-extrabold">{price}₪</span>
    <span class="opacity-70">/בחודש</span>
    <span class="opacity-70 text-sm px-1">(כולל מע״מ)</span>
  </div>
  <!-- download the app button -->
  <DownloadAppButton textTransKey="start" />
  <!-- list of what includes in the subscription -->
  <ul role="list" class="mb-8 space-y-2 text-start pt-6">
    {#if !isFirst}
      <li class="flex items-center space-x-3">
        <span class="font-extrabold">כל מה שבמנויים האחרים פלוס:</span>
      </li>
    {/if}
    {#each includesList as item}
      <!-- include item -->
      <li class="flex items-center space-x-3 text-start">
        <CheckIcon />
        <p class="px-2"><span>{item}</span></p>
      </li>
    {/each}
  </ul>
</div>
