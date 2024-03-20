<script lang="ts">
  import Navbar from "$lib/components/navbar/Navbar.svelte";
</script>

<div class="h-full w-full">
  <Navbar />
  <div class="pt-20">
    <slot />
  </div>
</div>
