<script lang="ts">
  import type { ProductModel } from "$lib/models/business/product_model";
  import { businessStore } from "$lib/stores/Business";
  import { workersStore } from "$lib/stores/Workers";
  import { _, translate } from "$lib/utils/translate";

  import Product from "../components/Product.svelte";

  let products: Map<string, ProductModel> = $businessStore.design.products;

  let workersStories: Record<string, StoryImageData> = {};

  workersStore.subscribe((workers) => {
    workersStories = {};
    Object.values(workers).forEach((worker) => {
      Object.entries(worker.storyImages).forEach(([imageId, image]) => {
        workersStories[imageId] = { imageUrl: image, workerId: worker.id };
      });
    });
  });
</script>

{#if products.size > 0}
  <div
    class="flex flex-col items-center justify-center w-full pb-14 pt-10 {Object.entries(
      workersStories
    ).length > 0
      ? 'bg-base-100'
      : 'bg-base-300'}  px-2 sm:px-16 gap-4"
  >
    <!-- products title -->
    <h1 class="text-center font-bold text-2xl pb-2">
      {$businessStore.design.productsTitle
        ? $businessStore.design.productsTitle
        : translate("ourProducts", $_)}
    </h1>

    <div class="flex flex-wrap justify-center items-center gap-8">
      <!-- products list -->
      {#each products as [productId, product], index (productId)}
        <Product {product} {index} {productId}></Product>
      {/each}
    </div>
  </div>
{/if}
