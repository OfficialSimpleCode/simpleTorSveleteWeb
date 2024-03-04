<script lang="ts">
  import type { ProductModel } from "$lib/models/business/product_model";
  export let product: ProductModel;
</script>

<!-- image -->
<div class="indicator w-full flex flex-col items-center justify-center">
  <img
    class="md:rounded-xl md:max-h-[600px] aspect-[1/1] object-cover"
    src={product.imageUrl}
    alt={product.name}
  />

  <!-- price badge -->
  <div
    class="relative flex flex-col justify-between items-center w-[90%] -top-20 rounded-md px-3 py-1 backdrop-blur-md"
  >
    <h1 class="text-xl lg:text-2xl w-full">
      {product.name}
    </h1>
    <p class="rounded-md px-3 py-1 text-sm xs:text-md w-full text-end">
      {product.price}
    </p>
  </div>
  <!-- <div
    class="relative flex flex-row justify-between items-center w-[90%] -top-10 h-0"
  >
    <h1
      class="text-xl lg:text-2xl rounded-md px-3 py-1 ring-1 ring-inset ring-primary backdrop-blur-md"
    >
      {product.name}
    </h1>
    <p
      class="rounded-md px-3 py-1 text-sm xs:text-md ring-1 ring-inset ring-primary backdrop-blur-md"
    >
      {product.price}
    </p>
  </div> -->
</div>
