<script lang="ts">
  import ToastManager from "$lib/components/ToastManager.svelte";
  import { onMount } from "svelte";
  import "../app.css";

  import { firebaseConfig } from "$lib/firebase_config";
  import BusinessInitializer from "$lib/initializers/business_initializer";
  import { getApp, getApps, initializeApp } from "firebase/app";

  import { page } from "$app/stores";
  import { LoadingStatuses } from "$lib/consts/loading_statuses";
  import LinksHelper from "$lib/helpers/links_helper";
  import { LoadAppHelper } from "$lib/helpers/load_app_helper";
  import UserInitializer from "$lib/initializers/user_initializer";
  import { handleLocaleChanges } from "$lib/language/loader";
  import { business } from "$lib/stores/Business";
  import { loadAppState } from "$lib/stores/LoadApp";
  import { user } from "$lib/stores/User";
  import { workers } from "$lib/stores/Workers";

  async function loadBusiness() {
    console.log("svelte loaded");
    handleLocaleChanges(localStorage, document);

    if ($business) {
      return;
    }
    $loadAppState = LoadingStatuses.loading;

    LinksHelper.GI().linkedBuisnessId =
      $page.data.businessID ||
      "972-525656377--50ab63a0-a192-11ed-950c-3ba22fe40036";
    if (LinksHelper.GI().linkedBuisnessId === "") {
      return;
    }

    const firebaseApp =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    await LoadAppHelper.GI().loadApp();

    const b = BusinessInitializer.GI().business;
    business.set(b);

    const w = BusinessInitializer.GI().workers;
    workers.set(w);
  }

  onMount(() => {
    const u = UserInitializer.GI().user;
    user.set(u);
  });

  let businessLoading = loadBusiness();
</script>

<ToastManager />
<div class="h-screen w-screenxs">
  {#await businessLoading}
    <div
      class="h-full w-full flex flex-col items-center justify-center gap-8 bg-black"
    >
      <h1 class="text-4xl text-white">Loading Business</h1>
      <div class="loading loading-spinner loading-lg bg-white" />
    </div>
  {:then}
    <slot />
  {/await}
</div>
