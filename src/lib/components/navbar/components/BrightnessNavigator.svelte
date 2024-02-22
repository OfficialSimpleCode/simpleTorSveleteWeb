<script>
  import { page } from "$app/stores";
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import { defaultThemes } from "$lib/consts/business_design";
  import { themeStore } from "$lib/controllers/theme_controller";
  function onClick() {
    themeStore.set(
      $themeStore?.id === "lightIos"
        ? defaultThemes.darkIos
        : defaultThemes.lightIos
    );
  }
  $: onBusiness = $page.url.pathname.includes("business");
</script>

<div class="indicator {onBusiness ? 'hidden' : ''}">
  <CustomCircleIcon
    icon={$themeStore?.id === "lightIos" ? "ph:sun-fill" : "ph:moon-fill"}
    handleClick={onClick}
  />
</div>
