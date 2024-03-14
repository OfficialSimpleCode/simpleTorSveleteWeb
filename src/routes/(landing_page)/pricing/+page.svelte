<script>
  import { page } from "$app/stores";
  import { _, translate } from "$lib/utils/translate";
  import GoodToKnow from "./sections/GoodToKnow.svelte";
  import Offers from "./sections/Offers.svelte";
  import OffersFaq from "./sections/OffersFaq.svelte";
</script>

<svelte:head>
  <!-- business title -->
  <title
    >{translate("simpleTorWebTitle", $_, false)} | {translate(
      "pricing",
      $_,
      false
    )}</title
  >

  <!-- the url for search to display for this site -->
  <link rel="canonical" href={`${$page.url.origin}/pricing`} />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="{translate('simpleTorWebTitle', $_, false)} | {translate(
      'pricing',
      $_,
      false
    )}"
  />
</svelte:head>
<main class="w-full h-full">
  <Offers />
  <GoodToKnow />
  <OffersFaq />
</main>
