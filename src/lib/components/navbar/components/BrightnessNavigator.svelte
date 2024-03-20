<script lang="ts">
  import { page } from "$app/stores";
  import { defaultThemes } from "$lib/consts/business_design";
  import { themeStore } from "$lib/controllers/theme_controller";
  import NavberItem from "./NavberItem.svelte";
  export let fromMenu: boolean = false;
  function onClick() {
    themeStore.set(
      $themeStore?.id === "lightIos"
        ? defaultThemes.darkIos
        : defaultThemes.lightIos
    );
  }
  $: onBusiness = $page.url.pathname.includes("business");
</script>

<!-- <div class="block lg:hidden {onBusiness ? 'hidden' : ''}">
  <CustomCircleIcon
    icon={$themeStore?.id === "lightIos" ? "ph:sun-fill" : "ph:moon-fill"}
    bgColor="bg-base-200"
    handleClick={onClick}
  />
</div> -->

<div
  class="{fromMenu || onBusiness ? '' : 'hidden lg:block'} {onBusiness
    ? 'hidden'
    : ''}"
>
  <NavberItem
    icon={$themeStore?.id === "lightIos" ? "ph:sun-fill" : "ph:moon-fill"}
    transKey="theme"
    {fromMenu}
    handleClick={onClick}
  />
</div>
