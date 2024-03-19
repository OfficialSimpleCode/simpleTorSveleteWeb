<script lang="ts">
  // Assets

  import BrightnessNavigator from "./components/BrightnessNavigator.svelte";
  import BusinessNavigator from "./components/BusinessNavigator.svelte";
  import LanguageNavigator from "./components/LanguageNavigator.svelte";
  import MainPageNavigator from "./components/MainPageNavigator.svelte";
  import OrdersNavigator from "./components/OrdersNavigator.svelte";
  import ProfileNavigator from "./components/ProfileNavigator.svelte";
</script>

<div
  id="navbar"
  class="navbar bg-base-100 z-20 gap-8 justify-between items-center"
  style="direction: ltr;"
>
  <div>
    <MainPageNavigator />
  </div>
  <div class="flex items-center gap-2">
    <BusinessNavigator />
    <BrightnessNavigator />
    <!-- lang icon -->
    <LanguageNavigator />
    <!-- orders icon -->

    <OrdersNavigator />

    <!-- profile navigator -->
    <ProfileNavigator />
  </div>
</div>
