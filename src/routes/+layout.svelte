<script lang="ts">
    import ToastManager from "$lib/components/ToastManager.svelte";
    import "../app.css";

    import { firebaseConfig } from "$lib/firebase_config";
    import { getApp, getApps, initializeApp } from "firebase/app";

    import { page } from "$app/stores";
    import { LoadingStatuses } from "$lib/consts/loading_statuses";
    import LinksHelper from "$lib/helpers/links_helper";
    import { LoadAppHelper } from "$lib/helpers/load_app_helper";
    import { handleLocaleChanges } from "$lib/language/loader";
    import { business } from "$lib/stores/Business";
    import { loadAppState } from "$lib/stores/LoadApp";

    async function loadApp() {
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
        LoadAppHelper.GI().loadApp();
        
    }

    loadApp();

   
</script>

<ToastManager />
<div class="h-screen w-screen">
    {#if $loadAppState === LoadingStatuses.loading}
        <div
            class="h-full w-full flex flex-col items-center justify-center gap-8 bg-black"
        >
            <h1 class="text-4xl text-white">Loading Business</h1>
            <div class="loading loading-spinner loading-lg bg-white" />
        </div>
    {:else}
        <slot />
    {/if}
</div>
