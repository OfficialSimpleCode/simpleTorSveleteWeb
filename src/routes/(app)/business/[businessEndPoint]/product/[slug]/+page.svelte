<script lang="ts">
  import { page } from "$app/stores";
  import { ProductModel } from "$lib/models/business/product_model";
  import { businessStore } from "$lib/stores/Business.js";
  import { _ } from "svelte-i18n";
  import ProductImg from "./components/ProductImg.svelte";

  let product: ProductModel =
    $businessStore?.design.products[$page.params.slug]!;
</script>

<main class="h-full w-full">
  <!-- in the image section -->
  <section class="h-[calc(100%-4rem)] w-full">
    <div class="relative h-full max-h-[50%]">
      <ProductImg imageUrl={product.imageUrl} name={product.name} />

      <!-- name tag -->
      <div class=" absolute top-1 w-full text-center">
        <span
          class="badge badge-neutral badge-lg text-center text-2xl bg-base-100 p-5 bg-opacity-80"
          >{product.name}
        </span>
      </div>

      <!-- price tag -->
      <span
        class="badge badge-neutral badge-lg absolute bottom-4 right-4 text-lg"
        >{product.price}</span
      >
    </div>

    <!-- description -->
    <div class="max-h-[50%] p-2 box-border">
      <h2 class="text-xl">{product.description}</h2>
    </div>
  </section>

  <!-- back button -->
  <button
    class="btn btn-outline fixed bottom-4 right-[calc(50%-100px)] min-w-[200px]"
    on:click={() => history.back()}
  >
    {$_("back")}
  </button>
</main>
