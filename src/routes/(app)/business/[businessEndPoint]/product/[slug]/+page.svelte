<script lang="ts">
  import { page } from "$app/stores";
  import NotFoundPage from "$lib/components/pages/NotFoundPage.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  import { businessStore } from "$lib/stores/Business.js";
  import BackButton from "./components/BackButton.svelte";
  import Description from "./components/Description.svelte";
  import ProductImage from "./components/ProductImage.svelte";

  $: product = $businessStore?.design.products[$page.params.slug];
</script>

{#if product != null}
  <div class="h-screen md:items-center md:justify-center md:flex md:px-5">
    <div
      class="w-full h-full lg:max-h-[700px] md:max-h-[550px] md:h-screen flex flex-col md:flex-row-reverse max-w-[1200px] md:px-5 mx-auto items-center md:bg-base-200 {containerRadius}"
    >
      <ProductImage {product} />

      <Description {product} />
      <BackButton />
    </div>
  </div>
{:else}
  <NotFoundPage />
{/if}
