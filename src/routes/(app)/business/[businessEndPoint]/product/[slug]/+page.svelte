<script lang="ts">
  import { page } from "$app/stores";
  import NotFoundPage from "$lib/components/pages/NotFoundPage.svelte";
  import {
    BusinessesTypes,
    businessTypeToStr,
  } from "$lib/consts/business_types";
  import { containerRadius } from "$lib/consts/sizes";
  import { businessStore } from "$lib/stores/Business.js";
  import { _, translate } from "$lib/utils/translate";
  import BackButton from "./components/BackButton.svelte";
  import Description from "./components/Description.svelte";
  import ProductImage from "./components/ProductImage.svelte";

  $: product = $businessStore?.design.products[$page.params.slug];
</script>

<svelte:head>
  <!-- business title -->
  <title>
    {$businessStore?.shopName} | {translate(
      businessTypeToStr[$businessStore?.businesseType ?? BusinessesTypes.Other],
      $_
    )} | {product?.name}
  </title>

  <!-- the url for search to display for this site -->
  <link
    rel="canonical"
    href={`${$page.url.origin}/business/${$businessStore?.url}/product/${product?.id}`}
  />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="{$businessStore?.shopName} | {translate(
      businessTypeToStr[$businessStore?.businesseType ?? BusinessesTypes.Other],
      $_
    )} | {product?.name}"
  />
</svelte:head>

{#if product != null}
  <div class="h-screen sm:items-center sm:justify-center sm:flex sm:px-5">
    <div
      class="w-full lg:max-h-[700px] sm:max-h-[550px] sm:h-screen flex flex-col sm:flex-row-reverse max-w-[1200px] sm:px-5 mx-auto items-center sm:bg-base-200 {containerRadius}"
    >
      <ProductImage {product} />

      <Description {product} />
    </div>
    <BackButton />
  </div>
{:else}
  <NotFoundPage />
{/if}
