<script lang="ts">
  import DownloadAppButton from "$lib/components/custom_components/DownloadAppButton.svelte";
  import CheckIcon from "./CheckIcon.svelte";
  export let title: string;
  export let sunTitle: string;
  export let price: number;
  export let includesList: string[];
</script>

<div
  class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
>
  <!-- title and subtitle -->
  <h3 class="mb-4 text-2xl font-semibold">{title}</h3>
  <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
    {sunTitle}
  </p>

  <!-- price and period -->
  <div class="flex justify-center items-baseline my-8">
    <span class="mr-2 text-5xl font-extrabold">{price}₪</span>
    <span class="text-gray-500 dark:text-gray-400">/בחודש</span>
  </div>
  <!-- list of what includes in the subscription -->
  <ul role="list" class="mb-8 space-y-4 text-left">
    {#each includesList as item}
      <!-- include item -->
      <li class="flex items-center space-x-3">
        <CheckIcon />
        <p><span>{item}</span></p>
      </li>
    {/each}
  </ul>

  <!-- download the app button -->
  <DownloadAppButton textTransKey="start" />
</div>
