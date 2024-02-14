<script lang="ts">
  import Navbar from "$lib/components/navbar/Navbar.svelte";
</script>

<!-- 

import appIcon from "$lib/images/AppIcon.png";
  
<svelte:head>
  <link rel="icon" href={appIcon} type="image/x-icon" />
</svelte:head>


 -->

<div class="h-screen w-screen">
  <Navbar />
  <slot />
</div>
