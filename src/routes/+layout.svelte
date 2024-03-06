<script lang="ts">
  import { page } from "$app/stores";
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
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";

  import Analytics from "$lib/components/analytics.svelte";
  import DownloadAppBanner from "$lib/components/app_banner/DownloadAppBanner.svelte";
  import "../app.css";
  let screenHeight: number;
  const keywords: string[] = [
    "ניהול תורים",
    "ניהול עסק",
    "קביעת תורים",
    "זימון",
    "תור",
    "עסק",
  ];
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
        storyImagesHeigth * (storyImagesRatioX / storyImagesRatioY)
      );

      logger.debug("screenHeight", screenHeight);
      logger.debug("storyImagesHeigth", storyImagesHeigth);
      logger.debug(`h-[${storyImagesHeigth}px]`, `w-[${storyImagesWidth}px]`);
    });
  });

  $: storyImagesHeigth = Math.floor(Math.max(screenHeight * 0.4, 320));
  $: storyImagesWidth = Math.floor(
    storyImagesHeigth * (storyImagesRatioX / storyImagesRatioY)
  );
  console.log(
    "ss",
    `${$page.url.origin}${$page.url.pathname}`.replace("www.", "")
  );
</script>

<svelte:head>
  {#if !$page.url.pathname.includes("/business") && !$page.url.pathname.includes("/privacy") && !$page.url.pathname.includes("/terms-of-use")}
    <!-- descruption about the page -->
    <meta name="description" content={translate("simpleTorDesc", $_)} />
    <!-- icon im the window -->
    <link rel="icon" href="/AppIcon.png" />

    <!-- site keywords -->
    <meta name="keywords" content={keywords.join(" ,")} />

    <!-- Open Graphes data (for sharin a link) -->
    <!-- description -->
    <meta property="og:description" content={translate("simpleTorDesc", $_)} />
    <!-- image in the center of the link -->
    <meta property="og:image" content="./openGraphIcon.png" />

    <!-- icon for iphones that saves the web -->
    <link rel="apple-touch-icon" href="/AppIcon.png" />
  {/if}
  <!--  -->
</svelte:head>

<!-- google analytics -->
<Analytics />

<ToastManager />
<DownloadAppBanner />
<div class="w-full h-ful">
  {#if $appStateStore === LoadingStatuses.maintenanceMode}
    <Maintanance />
    <div />
  {:else}
    <slot />
  {/if}
</div>
