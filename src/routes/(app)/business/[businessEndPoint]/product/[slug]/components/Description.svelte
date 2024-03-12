<script lang="ts">
  import type { ProductModel } from "$lib/models/business/product_model";
  export let product: ProductModel;
</script>

<div class="flex flex-col w-full justify-start px-5 py-5">
  <h1 class="text-xl lg:text-2xl w-full">
    {product.name}
  </h1>
  <!-- description -->
  <h2 class="text-md lg:text-lg opacity-90">{product.description}</h2>
</div>
