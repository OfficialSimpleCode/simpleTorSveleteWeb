<script lang="ts">
    import "../app.css";
    import ToastManager from "$lib/components/ToastManager.svelte";

    import { firebaseConfig } from "$lib/firebase_config";
    import BusinessInitializer from "$lib/initializers/business_initializer.js";
    import { initializeApp } from "firebase/app";

    import { business } from "$lib/stores/Business.js";
    import { page } from "$app/stores";

    async function loadBusiness() {
        let businessID = $page.data.businessID;
        console.log(businessID);
        if (businessID == null) {
            return;
        }

        const firebaseApp = initializeApp(firebaseConfig);
        await BusinessInitializer.GI().loadBusiness(businessID, "");
        const b = BusinessInitializer.GI().business;
        console.log(b);
        business.set(b);
    }

    let businessLoading = loadBusiness();
</script>

<ToastManager />
<div class="h-screen w-screen">
    {#await businessLoading}
        <div
            class="h-full w-full flex flex-col items-center justify-center gap-8 bg-black"
        >
            <h1 class="text-4xl text-white">Loading Business</h1>
            <div class="loading loading-spinner loading-lg bg-white" />
        </div>
    {:then _}
        <slot />
    {/await}
</div>
