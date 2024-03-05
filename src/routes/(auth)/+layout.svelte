<script lang="ts">
  import Navbar from "$lib/components/navbar/Navbar.svelte";
</script>

<svelte:head></svelte:head>

<div class="h-screen w-full">
  <Navbar />
  <slot />
</div>
