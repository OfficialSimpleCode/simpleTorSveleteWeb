<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import BrightnessNavigator from "./BrightnessNavigator.svelte";

  import ContactUsNavigator from "./ContactUsNavigator.svelte";
  import LanguageNavigator from "./LanguageNavigator.svelte";
  import NavberItem from "./NavberItem.svelte";

  import { getDownloadingAppLink } from "$lib/utils/links_utils";
  import PricingNavigator from "./PricingNavigator.svelte";
  $: onBusiness = $page.url.pathname.includes("business");

  let downloadLink = "";
  // After the ui is loaded
  onMount(() => {
    downloadLink = getDownloadingAppLink();
  });
</script>

<div class="flex flex-col w-full items-end pt-6 pb-4 lg:hidden">
  {#if !onBusiness}
    <PricingNavigator fromMenu={true} />
    <div class="divider divider-vertical h-[1px]" />
  {/if}

  <ContactUsNavigator fromMenu={true} />
  {#if !onBusiness}
    <div class="divider divider-vertical h-[1px]" />
    <BrightnessNavigator fromMenu={true} />
  {/if}
  <div class="divider divider-vertical h-[1px]" />
  <!-- lang icon -->
  <LanguageNavigator fromMenu={true} />
  {#if !onBusiness}
    <div class="divider divider-vertical h-[1px]" />
    <NavberItem
      icon="material-symbols:download"
      fromMenu={true}
      target="_blank"
      transKey="downloadApp"
      href={downloadLink}
    />
  {/if}
</div>
