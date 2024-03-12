<script lang="ts">
  import type { ProductModel } from "$lib/models/business/product_model";
  export let product: ProductModel;
</script>

<!-- image -->
<div class="indicator flex flex-col items-center justify-center w-full">
  <img
    class="relative md:rounded-xl object-cover shadow-xl w-full"
    src={product.imageUrl}
    alt={product.name}
  />

  <!-- price badge -->
  <div
    class="absolute bottom-3 left-2 rounded-md px-3 py-1 backdrop-blur-md bg-base-100 bg-opacity-60 border-[1px]"
  >
    <p class=" rounded-md px-3 py-1 text-sm xs:text-md w-full text-end">
      {product.price}
    </p>
  </div>
</div>
