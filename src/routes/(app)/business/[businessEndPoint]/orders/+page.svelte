<script>
  import { page } from "$app/stores";
  import {
    BusinessesTypes,
    businessTypeToStr,
  } from "$lib/consts/business_types";
  import { businessStore } from "$lib/stores/Business";
  import { _, translate } from "$lib/utils/translate";
  import MyBookingsPage from "../../../orders/MyBookingsPage.svelte";
</script>

<svelte:head>
  <!-- business title -->
  <title>
    {$businessStore?.shopName} | {translate(
      businessTypeToStr[$businessStore?.businesseType ?? BusinessesTypes.Other],
      $_
    )} | {translate("orders", $_)}
  </title>

  <!-- the url for search to display for this site -->
  <link
    rel="canonical"
    href={`${$page.url.origin}/business/${$businessStore?.url}/orders`}
  />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="{$businessStore?.shopName} | {translate(
      businessTypeToStr[$businessStore?.businesseType ?? BusinessesTypes.Other],
      $_
    )} | {translate('orders', $_)}"
  />
</svelte:head>

<MyBookingsPage />
