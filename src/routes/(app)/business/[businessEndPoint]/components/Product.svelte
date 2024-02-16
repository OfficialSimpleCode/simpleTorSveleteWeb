<script lang="ts">
  import { base } from "$app/paths";
  import { ProductModel } from "$lib/models/business/product_model";
  import { businessStore } from "$lib/stores/Business";

  import { translate } from "$lib/utils/translate";

  export let product: ProductModel;
  export let index: number;
  export let onBackground: boolean;
  export let productId: string;

  const felx: string = index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse";
</script>

<!-- background settings -->

<div class="flex {felx} flex-col sm:w-full justify-start items-center px-2">
  <a href={`${base}/business/${$businessStore.url}/product/${productId}`}>
    <!-- product card -->
    <div
      class="card card-compact {onBackground
        ? 'bg-base-300'
        : 'bg-base-100'} shadow-xl"
    >
      <!-- card image -->
      <figure>
        <img
          class="max-h-[250px] w-[250px] object-cover"
          src={product.imageUrl}
          alt={product.name}
        />
      </figure>

      <!-- card below data -->
      <div class="card-body">
        <h2 class="card-title text-sm sm:text-lg">{product.name}</h2>
        <p class="text-xs sm:text-sm">
          {translate("price")}: {product.price}
        </p>

        <!-- details button
        <div class="card-actions justify-end">
          <a
            href={`${base}/business/${$businessStore.url}/product/${productId}`}
            class="btn btn-primary"
          >
            {translate("details", $_)}
          </a>
        </div> -->
      </div>
    </div>
  </a>

  <!-- in wide screens display the description beside the card -->
  <p class="mx-6 py-4 md:text-xl sm:text-lg max-w-56 dis hidden sm:block">
    {product.description}
  </p>
</div>
