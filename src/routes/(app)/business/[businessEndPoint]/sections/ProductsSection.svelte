<script lang="ts">
  import { businessStore } from "$lib/stores/Business";
  import { workersStore } from "$lib/stores/Workers";
  import { isNotEmpty } from "$lib/utils/core_utils";
  import { _, translate } from "$lib/utils/translate";

  import Product from "../components/Product.svelte";

  $: products = $businessStore?.design.products ?? {};

  let workersStories: Record<string, StoryImageData> = {};

  $: workersStore.subscribe((workers) => {
    workersStories = {};
    Object.values(workers).forEach((worker) => {
      Object.entries(worker.storyImages).forEach(([imageId, image]) => {
        workersStories[imageId] = { imageUrl: image, workerId: worker.id };
      });
    });
  });
  $: onBackground = Object.entries(workersStories).length > 0;
</script>

{#if isNotEmpty(products)}
  <div
    class="flex flex-col items-center justify-center w-full pb-14 pt-10 {onBackground
      ? 'bg-base-100'
      : 'bg-base-200'}  px-2 sm:px-16 gap-4"
  >
    <!-- products title -->
    <h2 class="text-center font-bold text-2xl pb-2">
      {$businessStore?.design.productsTitle
        ? $businessStore.design.productsTitle
        : translate("ourProducts", $_)}
    </h2>

    <div class="flex flex-wrap justify-center items-center gap-8">
      <!-- products list -->
      {#each Object.entries(products) as [productId, product], index (productId)}
        <Product {product} {index} {productId} {onBackground}></Product>
      {/each}
    </div>
  </div>
{/if}
