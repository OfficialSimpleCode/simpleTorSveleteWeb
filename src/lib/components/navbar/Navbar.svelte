<script lang="ts">
  import { base } from "$app/paths";

  import LanguageBoard from "./components/LanguageBoard.svelte";
  // Assets

  import CustomCircleIcon from "../custom_components/CustomCircleIcon.svelte";
  import BrightnessNavigator from "./components/BrightnessNavigator.svelte";
  import BusinessNavigator from "./components/BusinessNavigator.svelte";
  import OrdersNavigator from "./components/OrdersNavigator.svelte";
  import ProfileNavigator from "./components/ProfileNavigator.svelte";
</script>

<div
  class="navbar bg-base-100 z-20 gap-8 justify-between items-center"
  style="direction: ltr;"
>
  <div>
    <a href={`${base}/`} class=" text-xl hover:opacity-70">SimpleTor</a>
  </div>
  <div class="flex items-center gap-2">
    <BrightnessNavigator />
    <BusinessNavigator />
    <!-- lang icon -->
    <div class="dropdown dropdown-left dropdown-bottom items-center">
      <CustomCircleIcon icon="mdi:language" />
      <LanguageBoard />
    </div>

    <!-- orders icon -->

    <OrdersNavigator />

    <!-- profile navigator -->
    <ProfileNavigator />
  </div>
</div>
