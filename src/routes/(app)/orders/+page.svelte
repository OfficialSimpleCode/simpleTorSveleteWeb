<script>
  import { page } from "$app/stores";
  import { _, translate } from "$lib/utils/translate";
  import MyBookingsPage from "./MyBookingsPage.svelte";
</script>

<svelte:head>
  <!-- business title -->
  <title
    >Simple Tor | ניהול תורים | מערכת לניהול תורים | {translate(
      "order",
      $_
    )}</title
  >

  <!-- the url for search to display for this site -->
  <link rel="canonical" href={`${$page.url.origin}/orders`} />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="Simple Tor | ניהול תורים | מערכת לניהול תורים | {translate(
      'order',
      $_
    )}"
  />
</svelte:head>

<MyBookingsPage />
