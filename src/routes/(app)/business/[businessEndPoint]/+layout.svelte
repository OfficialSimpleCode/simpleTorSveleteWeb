<script lang="ts">
  import {
    BusinessesTypes,
    businessTypeToStr,
  } from "$lib/consts/business_types";
  import { businessStore } from "$lib/stores/Business";
  import { _, translate } from "$lib/utils/translate";

  import Analytics from "$lib/components/analytics.svelte";
  import { ScreenController } from "$lib/controllers/screens_controller.js";
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
      ScreenController.popDownloadAppBanner();
    }
  });
</script>

<svelte:head>
  <!-- business title -->
  <title>
    {$businessStore?.shopName} | {translate(
      businessTypeToStr[$businessStore?.businesseType ?? BusinessesTypes.Other],
      $_
    )}
  </title>

  <!-- business icon -->
  <link
    rel="icon"
    href={$businessStore?.design.shopIconUrl}
    type="image/x-icon"
  />

  <!-- business description -->
  <meta
    name="description"
    content={$businessStore?.businessDescription ??
      translate(
        businessTypeToStr[
          $businessStore?.businesseType ?? BusinessesTypes.Other
        ],
        $_
      )}
  />

  <!-- the businees keywords -->
  <meta name="keywords" content={$businessStore?.keyWords.join(" ,")} />

  <!-- author -The business owner write the content  -->
  <meta name="author" content={$businessStore?.ownersName} />

  <!-- Open Graphes data (for sharin a link) -->
  <!-- description -->
  <meta
    property="og:description"
    content={$businessStore?.businessDescription ??
      translate(
        businessTypeToStr[
          $businessStore?.businesseType ?? BusinessesTypes.Other
        ],
        $_
      )}
  />
  <!-- image in the center of the link -->
  <meta property="og:image" content={$businessStore?.design.shopIconUrl} />

  <!-- icon for iphones that saves the web -->
  <link rel="apple-touch-icon" href={$businessStore?.design.shopIconUrl} />
</svelte:head>

<!-- google analytics -->
<Analytics />

<slot />
