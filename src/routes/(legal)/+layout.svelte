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

<div class="h-full w-full">
  <Navbar />
  <slot />
</div>
