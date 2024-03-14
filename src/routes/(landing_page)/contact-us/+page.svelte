<script>
  import { page } from "$app/stores";
  import { _, translate } from "$lib/utils/translate";
  import ContactUS from "./sections/ContactUs.svelte";
</script>

<svelte:head>
  <!-- business title -->
  <title
    >{translate("simpleTorWebTitle", $_, false)} | {translate(
      "contactUs",
      $_,
      false
    )}</title
  >

  <!-- the url for search to display for this site -->
  <link rel="canonical" href={`${$page.url.origin}/contact-us`} />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="{translate('simpleTorWebTitle', $_, false)} | {translate(
      'contactUs',
      $_,
      false
    )}"
  />
</svelte:head>
<main class="w-full h-full">
  <ContactUS />
</main>
