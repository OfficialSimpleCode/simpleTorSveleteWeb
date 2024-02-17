<script lang="ts">
  import { base } from "$app/paths";

  import LanguageBoard from "./components/LanguageBoard.svelte";
  // Assets

  import { businessStore } from "$lib/stores/Business";
  import { userStore } from "$lib/stores/User";
  import { get } from "svelte/store";
  import CustomCircleIcon from "../custom_components/CustomCircleIcon.svelte";
  import ProfileNavigator from "./components/ProfileNavigator.svelte";
</script>

<div
  class="navbar bg-base-100 z-20 gap-8 justify-between items-center"
  style="direction: ltr;"
>
  <div>
    <a
      href={$businessStore != null
        ? `${base}/business/${get(businessStore).url}`
        : `${base}/business`}
      class="btn btn-ghost text-xl">SimpleTor</a
    >
  </div>
  <div class="flex items-center gap-2">
    <!-- lang icon -->
    <div class="dropdown dropdown-left dropdown-bottom items-center">
      <CustomCircleIcon icon="mdi:language" />
      <LanguageBoard />
    </div>

    <!-- orders icon -->

    <div class="indicator">
      <CustomCircleIcon
        icon="lets-icons:order-fill"
        href={$businessStore != null
          ? `${base}/business/${get(businessStore).url}/orders`
          : `${base}/orders`}
      />
      {#if $userStore.bookingsToShow != null && Object.values($userStore.bookingsToShow).length > 0}
        <span
          class="bg-primary badge badge-sm indicator-item rounded-badge mr-2"
        >
          {Object.values($userStore.bookingsToShow).length}</span
        >
      {/if}
    </div>

    <!-- profile navigator -->
    <ProfileNavigator />
  </div>
</div>
