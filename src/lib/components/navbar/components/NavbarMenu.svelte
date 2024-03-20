<script lang="ts">
  import { page } from "$app/stores";
  import BrightnessNavigator from "./BrightnessNavigator.svelte";

  import ContactUsNavigator from "./ContactUsNavigator.svelte";
  import LanguageNavigator from "./LanguageNavigator.svelte";

  import PricingNavigator from "./PricingNavigator.svelte";
  $: onBusiness = $page.url.pathname.includes("business");
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
</div>
