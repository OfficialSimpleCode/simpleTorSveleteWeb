<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
  import ToastManager from "$lib/components/ToastManager.svelte";
  import "../app.css";

  import { firebaseConfig } from "$lib/firebase_config";
  import { getApp, getApps, initializeApp } from "firebase/app";

  import { page } from "$app/stores";
  import LinksHelper from "$lib/helpers/links_helper";
  import { LoadAppHelper } from "$lib/helpers/load_app_helper";
  import { handleLocaleChanges } from "$lib/language/loader";
  import { businessStore } from "$lib/stores/Business";

  async function loadBusiness() {
    handleLocaleChanges(localStorage, document);

    if ($businessStore) {
      return;
    }

    LinksHelper.GI().linkedBuisnessId =
      $page.data.businessID ||
      "972-525656377--50ab63a0-a192-11ed-950c-3ba22fe40036";
    if (LinksHelper.GI().linkedBuisnessId === "") {
      return;
    }

    const firebaseApp =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    await LoadAppHelper.GI().loadApp();
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
