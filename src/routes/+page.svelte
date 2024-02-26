<script lang="ts">
  import { initialTheme } from "$lib/controllers/theme_controller";

  import { onMount } from "svelte";
  import HomePage from "./home_page/HomePage.svelte";
  onMount(() => {
    initialTheme(localStorage, document);
  });
</script>

<svelte:head>
  <title>Simple Tor | ניהול תורים | מערכת לניהול תורים</title>
  <meta name="description" content="SimpleTor Web Application" />
  <link rel="icon" href="/AppIcon.png" />
</svelte:head>

<HomePage />
