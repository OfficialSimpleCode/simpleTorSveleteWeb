<script lang="ts">
  import { page } from "$app/stores";
  import NotFoundPage from "$lib/components/pages/NotFoundPage.svelte";
  import { businessStore } from "$lib/stores/Business.js";
  import BackButton from "./components/BackButton.svelte";
  import NameAndDescription from "./components/NameAndDescription.svelte";
  import ProductImage from "./components/ProductImage.svelte";

  $: product = $businessStore?.design.products[$page.params.slug];
</script>

{#if product != null}
  <div class="w-full md:h-screen flex flex-col items-center pb-40">
    <div
      class="flex flex-col-reverse md:flex-row gap-1 md:w-[95%] justify-center items-center h-full"
    >
      <NameAndDescription {product} />
      <ProductImage {product} />
    </div>
    <BackButton />
  </div>
{:else}
  <NotFoundPage />
{/if}
