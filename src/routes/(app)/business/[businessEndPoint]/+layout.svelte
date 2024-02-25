<script lang="ts">
  import {
    BusinessesTypes,
    businessTypeToStr,
  } from "$lib/consts/business_types";
  import { businessStore } from "$lib/stores/Business";
  import { _, translate } from "$lib/utils/translate";

  import { themeStore } from "$lib/controllers/theme_controller.js";
  import BusinessInitializer from "$lib/initializers/business_initializer.js";
  import { onMount } from "svelte";

  export let data;
  BusinessInitializer.GI().loadedBusinessJson = data.business;
  BusinessInitializer.GI().loadBusiness(data.businessId);

  onMount(() => {
    if (
      $businessStore != null &&
      ($themeStore == null ||
        $businessStore?.design.pickedTheme.id != $themeStore.id)
    ) {
      const theme = $businessStore?.design.pickedTheme;
      theme.onBusiness = true;
      $themeStore = theme;
    }
  });
</script>

<svelte:head>
  <title>
    {$businessStore?.shopName} | {translate(
      businessTypeToStr[$businessStore?.businesseType ?? BusinessesTypes.Other],
      $_
    )}
  </title>
  <meta
    name="description"
    content={$businessStore?.businessSummary ??
      translate(
        businessTypeToStr[
          $businessStore?.businesseType ?? BusinessesTypes.Other
        ],
        $_
      )}
  />
  <link
    rel="icon"
    href={$businessStore?.design.shopIconUrl}
    type="image/x-icon"
  />
  <meta name="author" content={$businessStore?.ownersName} />
  <meta
    property="og:title"
    content="{$businessStore?.shopName ?? ''} | {translate(
      businessTypeToStr[$businessStore?.businesseType ?? BusinessesTypes.Other],
      $_
    )}"
  />
  <meta property="og:image" content={$businessStore?.design.shopIconUrl} />
  <meta
    property="og:description"
    content={$businessStore?.businessSummary ??
      translate(
        businessTypeToStr[
          $businessStore?.businesseType ?? BusinessesTypes.Other
        ],
        $_
      )}
  />
</svelte:head>

<slot />
