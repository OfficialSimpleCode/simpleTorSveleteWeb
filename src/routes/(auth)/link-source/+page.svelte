<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { LoginReason } from "$lib/consts/auth";
  import { isConnectedStore } from "$lib/stores/User";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";
  import LoginPage from "../components/login/LoginPage.svelte";
  onMount(() => {
    isConnectedStore.subscribe((value) => {
      if (value === false) {
        goto(`${base}/login`);
      }
    });
  });
</script>

<svelte:head>
  <!-- business title -->
  <title
    >Simple Tor | ניהול תורים | מערכת לניהול תורים | {translate(
      "addAuthProvider",
      $_
    )}</title
  >

  <!-- the url for search to display for this site -->
  <link rel="canonical" href={`${$page.url.origin}/link-source`} />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="Simple Tor | ניהול תורים | מערכת לניהול תורים | {translate(
      'addAuthProvider',
      $_
    )}"
  />
</svelte:head>

<LoginPage loginReason={LoginReason.linkProvider} />
