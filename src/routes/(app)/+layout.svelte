<script lang="ts">
  import Navbar from "$lib/components/navbar/Navbar.svelte";
</script>

<div class="h-full w-full">
  <Navbar />
  <div class="pt-10">
    <slot />
  </div>
</div>
