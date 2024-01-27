<script lang="ts">
  import type { ProductModel } from "$lib/models/business/ProductModel";
  import { businessStore } from "$lib/stores/Business";

  import Product from "../components/Product.svelte";

  let products: Map<string, ProductModel> = $businessStore.design.products;
</script>

<div
  class="flex flex-col items-center justify-center w-full pb-14 pt-10 bg-base-300 px-2 sm:px-16 gap-4"
>
  <!-- products title -->
  <h1 class="text-center font-bold text-2xl pb-2">Our Products</h1>

  <div class="flex flex-wrap justify-center items-center gap-8">
    <!-- products list -->
    {#each products as [productId, product], index (productId)}
      <Product {product} {index} {productId}></Product>
    {/each}
  </div>
</div>
