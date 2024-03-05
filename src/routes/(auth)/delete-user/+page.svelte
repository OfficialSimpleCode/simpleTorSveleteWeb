<script lang="ts">
  import { page } from "$app/stores";
  import { LoginReason } from "$lib/consts/auth";
  import { _, translate } from "$lib/utils/translate";
  import LoginPage from "../components/login/LoginPage.svelte";
</script>

<svelte:head>
  <!-- business title -->
  <title
    >Simple Tor | ניהול תורים | מערכת לניהול תורים | {translate(
      "deleteUser",
      $_
    )}</title
  >

  <!-- the url for search to display for this site -->
  <link rel="canonical" href={`${$page.url.origin}/delete-user`} />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="Simple Tor | ניהול תורים | מערכת לניהול תורים | {translate(
      'deleteUser',
      $_
    )}"
  />
</svelte:head>

<LoginPage loginReason={LoginReason.deleteUser} />
