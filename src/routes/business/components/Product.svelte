<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import type { ProductModel } from "$lib/models/business/ProductModel";

  import { translate } from "$lib/utils/translate";

  export let product: ProductModel;
  export let index: number;
  export let productId: string;

  const felx: string = index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse";
</script>

<!-- background settings -->
<div
  class="flex {felx} flex-col sm:w-full justify-start items-center px-2 w-min"
>
  <!-- product card -->
  <div
    class="card card-compact bg-base-100 shadow-xl md:w-[280px] xs:w-[180px] w-[200px]"
  >
    <!-- card image -->
    <figure>
      <img src={product.imageUrl} alt={product.name} />
    </figure>

    <!-- card below data -->
    <div class="card-body">
      <h2 class="card-title text-sm sm:text-lg">{product.name}</h2>
      <p class="text-xs sm:text-sm">
        {translate("price")}: {product.price}
      </p>

      <!-- details button -->
      <div class="card-actions justify-end">
        <button
          class="btn btn-primary"
          on:click={() => goto(`${base}/business/product/${productId}`)}
        >
          {translate("details")}
        </button>
      </div>
    </div>
  </div>

  <!-- in wide screens display the description beside the card -->
  <p class="mx-6 py-4 md:text-xl sm:text-lg max-w-56 dis hidden sm:block">
    {product.description}
  </p>
</div>
