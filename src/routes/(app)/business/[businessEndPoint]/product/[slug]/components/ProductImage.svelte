<script lang="ts">
  import type { ProductModel } from "$lib/models/business/product_model";
  export let product: ProductModel;
</script>

<!-- image -->
<div class="indicator w-full flex items-center justify-center">
  <img
    class=" xs:rounded-xl md:max-h-[600px]"
    src={product.imageUrl}
    alt={product.name}
  />
  <!-- price badge -->
  <span
    class="top-7 left-14 indicator-item inline-flex items-center rounded-md px-3 py-1 text-sm xs:text-md font-medium ring-1 ring-inset ring-primary backdrop-blur-md"
  >
    {product.price}
  </span>
</div>
