<script>
  import { page } from "$app/stores";
  import { _, translate } from "$lib/utils/translate";
  import MyBookingsPage from "./MyBookingsPage.svelte";
</script>

<svelte:head>
  <!-- business title -->
  <title
    >{translate("simpleTorWebTitle", $_)} | {translate("myBookings", $_)}</title
  >

  <!-- the url for search to display for this site -->
  <link rel="canonical" href={`${$page.url.origin}/orders`} />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="{translate('simpleTorWebTitle', $_)} | {translate(
      'myBookings',
      $_
    )}"
  />
</svelte:head>

<MyBookingsPage />
