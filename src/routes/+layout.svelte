<script lang="ts">
  import Maintanance from "$lib/components/Maintanance.svelte";
  import ToastManager from "$lib/components/ToastManager.svelte";
  import { logger } from "$lib/consts/application_general";
  import { LoadingStatuses } from "$lib/consts/loading_statuses";
  import { storyImagesRatioX, storyImagesRatioY } from "$lib/consts/sizes";
  import { initialTheme } from "$lib/controllers/theme_controller";
  import RemoteConfigHelper from "$lib/helpers/remote_config_helper";
  import { handleLocaleChanges } from "$lib/language/loader";
  import { appStateStore } from "$lib/stores/AppState";
  import { screenSizeStore } from "$lib/stores/sizes";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  import "../app.css";
  let screenHeight: number;

  onMount(() => {
    RemoteConfigHelper.GI().init();
    console.log("wwwwwwwwwwwwwwwwwwwwwwww");
    initialTheme(localStorage, document);
    handleLocaleChanges(localStorage, document);

    screenHeight = window.innerHeight;
    screenSizeStore.set({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Update screenWidth on window resize
    window.addEventListener("resize", () => {
      screenHeight = window.innerHeight;

      screenSizeStore.set({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      storyImagesHeigth = Math.floor(Math.max(screenHeight * 0.4, 320));
      storyImagesWidth = Math.floor(
        storyImagesHeigth * (storyImagesRatioX / storyImagesRatioY),
      );

      logger.debug("screenHeight", screenHeight);
      logger.debug("storyImagesHeigth", storyImagesHeigth);
      logger.debug(`h-[${storyImagesHeigth}px]`, `w-[${storyImagesWidth}px]`);
    });
  });

  $: storyImagesHeigth = Math.floor(Math.max(screenHeight * 0.4, 320));
  $: storyImagesWidth = Math.floor(
    storyImagesHeigth * (storyImagesRatioX / storyImagesRatioY),
  );
</script>

<svelte:head>
  {#if !$page.url.pathname.includes("/business")}
    <link rel="icon" href="/AppIcon.png" />
  {/if}
</svelte:head>

<ToastManager />
<div class="w-full h-ful">
  {#if $appStateStore === LoadingStatuses.maintenanceMode}
    <Maintanance />
    <div />
  {:else}
    <slot />
  {/if}
</div>
