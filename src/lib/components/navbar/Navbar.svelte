<script lang="ts">
  import { base } from "$app/paths";

  // Assets

  import BrightnessNavigator from "./components/BrightnessNavigator.svelte";
  import BusinessNavigator from "./components/BusinessNavigator.svelte";
  import LanguageNavigator from "./components/LanguageNavigator.svelte";
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
