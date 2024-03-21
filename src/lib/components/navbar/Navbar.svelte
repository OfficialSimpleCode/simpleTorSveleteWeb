<script lang="ts">
  // Assets

  import { onMount } from "svelte";
  import BrightnessNavigator from "./components/BrightnessNavigator.svelte";
  import ContactUsNavigator from "./components/ContactUsNavigator.svelte";
  import LanguageNavigator from "./components/LanguageNavigator.svelte";
  import MainPageNavigator from "./components/MainPageNavigator.svelte";
  import MoreNavigator from "./components/MoreNavigator.svelte";
  import NavbarMenu from "./components/NavbarMenu.svelte";
  import OrdersNavigator from "./components/OrdersNavigator.svelte";
  import PricingNavigator from "./components/PricingNavigator.svelte";
  import ProfileNavigator from "./components/ProfileNavigator.svelte";
  let showNavbarMenu: boolean = false;

  let scrolled = false;

  onMount(() => {
    //click listener
    document.addEventListener("click", function (event) {
      if (event == null) {
        return;
      }
      const myDiv = document.getElementById("navbar");
      if (myDiv == null) {
        return;
      }
      const isClickedOutside = !myDiv!.contains(event.target as Node);

      if (isClickedOutside) {
        showNavbarMenu = false;
      }
    });
    //scroll listener
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    function handleScroll() {
      if (window.scrollY > 0) {
        scrolled = true;
      } else {
        scrolled = false;
      }
    }
  });
</script>

<div
  id="navbar"
  class=" flex flex-col fixed bg-base-100 z-20 justify-between items-center gap-0 px-1 sm:px-4 py-3 w-full {showNavbarMenu ||
  scrolled
    ? `shadow-md ${scrolled ? '' : 'lg:shadow-none'}`
    : ''} "
  style="direction: ltr;"
>
  <div class="flex flex-row w-full justify-between gap-6">
    <div class="flex flex-row items-center gap-0">
      <MoreNavigator bind:showNavbarMenu />
      <MainPageNavigator />
      <PricingNavigator />
      <ContactUsNavigator />
      <BrightnessNavigator />
      <LanguageNavigator />
    </div>
    <div class="flex flex-row items-center gap-[7px] px-1">
      <!-- <div class="hidden lg:block">
        <DownloadAppNavigator />
      </div>
      <BusinessNavigator /> -->
      <OrdersNavigator />
      <ProfileNavigator />
    </div>
  </div>

  {#if showNavbarMenu}
    <NavbarMenu />
  {/if}
</div>
