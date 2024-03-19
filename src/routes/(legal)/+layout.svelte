<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import { appOpenGraphImage } from "$lib/consts/resources";
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
  <link rel="icon" href="/AppIcon.ico" />
  <!-- icon for iphones that saves the web -->
  <link rel="apple-touch-icon" sizes="180x180" href="/AppAppleIcon.png" />
  <!-- autor -->
  <meta name="author" content="SA SIMPLE CODE LTD" />
  <!-- image in the center of the link -->
  <meta property="og:image" content={appOpenGraphImage} />
</svelte:head>

<Navbar />
<slot />
<Footer />
