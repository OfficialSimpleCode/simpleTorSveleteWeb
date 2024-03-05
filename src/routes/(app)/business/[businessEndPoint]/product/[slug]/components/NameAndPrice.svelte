<script lang="ts">
  import type { ProductModel } from "$lib/models/business/product_model";
  export let product: ProductModel;
</script>

<div class="bottom-7 left-14">
  <!-- price badge -->
  <span
    class="indicator-item inline-flex items-center rounded-md px-3 py-1 text-sm xs:text-md font-medium ring-1 ring-inset ring-primary backdrop-blur-md"
  >
    {product.price}
  </span>
</div>
