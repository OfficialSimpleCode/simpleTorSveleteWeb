<script lang="ts">
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import { themeStore } from "$lib/controllers/theme_controller";
  import { onMount } from "svelte";

  onMount(() => {
    if ($themeStore == null) {
      // initialTheme();
    }
  });
</script>

<svelte:head>
  <!-- icon -->
  <link rel="icon" href="/AppIcon.png" />
  <!-- icon for iphones that saves the web -->
  <link rel="apple-touch-icon" href="/AppIcon.png" />
  <!-- autor -->
  <meta name="author" content="SA SIMPLE CODE LTD" />
</svelte:head>

<div class="h-full w-full">
  <Navbar />
  <slot />
</div>
