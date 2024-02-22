<script lang="ts">
  import { initialTheme } from "$lib/controllers/theme_controller";

  import { onMount } from "svelte";
  import HomePage from "./home_page/HomePage.svelte";
  onMount(() => {
    initialTheme(localStorage, document);
  });
</script>

<svelte:head>
  <title>Simple Tor</title>
  <meta name="description" content="SimpleTor Web Application" />
</svelte:head>

<HomePage />
