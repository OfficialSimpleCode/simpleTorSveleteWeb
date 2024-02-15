<script lang="ts">
  import ToastManager from "$lib/components/ToastManager.svelte";
  import { LoadingStatuses } from "$lib/consts/loading_statuses";
  import { initialTheme } from "$lib/controllers/theme_controller";
  import RemoteConfigHelper from "$lib/helpers/remote_config_helper";
  import { handleLocaleChanges } from "$lib/language/loader";
  import { appStateStore } from "$lib/stores/AppState";
  import { onMount } from "svelte";
  import "../app.css";

  onMount(() => {
    RemoteConfigHelper.GI().init();
    initialTheme(localStorage, document);
    handleLocaleChanges(localStorage, document);
  });
</script>

<ToastManager />
<div class="w-full h-full">
  {#if $appStateStore === LoadingStatuses.maintenanceMode}
    <!-- TODO maintanance -->
    <div />
  {:else}
    <slot />
  {/if}
</div>
