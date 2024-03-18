<script lang="ts">
  import { initialTheme } from "$lib/controllers/theme_controller";

  import { onMount } from "svelte";
  import HomePage from "./home_page/HomePage.svelte";
  onMount(() => {
    initialTheme(localStorage, document);
  });
</script>

<svelte:head>
  <!-- <title>{translate("simpleTorWebTitle", $_)}</title>
  <meta name="description" content="SimpleTor Web Application" /> -->
  <!-- <link rel="icon" href="/AppIcon.ico" /> -->
</svelte:head>

<HomePage />
