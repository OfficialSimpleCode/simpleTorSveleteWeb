<script lang="ts">
  // Assets

  import BrightnessNavigator from "./components/BrightnessNavigator.svelte";
  import BusinessNavigator from "./components/BusinessNavigator.svelte";
  import ContactUsNavigator from "./components/ContactUsNavigator.svelte";
  import LanguageNavigator from "./components/LanguageNavigator.svelte";
  import MainPageNavigator from "./components/MainPageNavigator.svelte";
  import MoreNavigator from "./components/MoreNavigator.svelte";
  import NavbarMenu from "./components/NavbarMenu.svelte";
  import OrdersNavigator from "./components/OrdersNavigator.svelte";
  import PricingNavigator from "./components/PricingNavigator.svelte";
  import ProfileNavigator from "./components/ProfileNavigator.svelte";

  let showNavbarMenu: boolean = false;
</script>

<div
  id="navbar"
  class="flex flex-col fixed bg-base-100 z-20 justify-between items-center gap-0 px-4 py-3 w-full {showNavbarMenu
    ? 'shadow-xl lg:shadow-none'
    : ''}"
  style="direction: ltr;"
>
  <div class="flex flex-row w-full justify-between gap-6">
    <div class="flex flex-row items-center gap-0">
      <MoreNavigator bind:showNavbarMenu />
      <MainPageNavigator />
      <PricingNavigator />
      <ContactUsNavigator />
      <BrightnessNavigator />
      <!-- lang icon -->
      <LanguageNavigator />
    </div>
    <div class="flex flex-row items-center gap-2">
      <BusinessNavigator />
      <!-- orders icon -->

      <OrdersNavigator />

      <!-- profile navigator -->
      <ProfileNavigator />
    </div>
  </div>

  {#if showNavbarMenu}
    <NavbarMenu />
  {/if}
</div>
