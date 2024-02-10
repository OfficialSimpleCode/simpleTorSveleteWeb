<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
  import ToastManager from "$lib/components/ToastManager.svelte";
  import { handleLocaleChanges } from "$lib/language/loader";
  import "../app.css";

  async function loadBusiness() {
    await handleLocaleChanges(localStorage, document);
  }

  const loadingBusiness = loadBusiness();
</script>

<ToastManager />
<div class="h-screen w-screen">
  {#await loadingBusiness}
    <div
      class="h-full w-full flex flex-col items-center justify-center gap-8 bg-black"
    >
      <Logo mode="dark" radius={80} />
      <h1 class="text-4xl text-white">Loading Business</h1>
      <div class="loading loading-spinner loading-lg bg-white" />
    </div>
  {:then}
    <slot />
  {/await}
</div>
