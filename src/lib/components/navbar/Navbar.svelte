<script lang="ts">
  import { base } from "$app/paths";

  import LanguageBoard from "./components/LanguageBoard.svelte";
  // Assets

  import { openOrdersPage } from "$lib/controllers/page_controller";
  import { businessStore } from "$lib/stores/Business";
  import { userStore } from "$lib/stores/User";
  import CustomCircleIcon from "../custom_components/CustomCircleIcon.svelte";
  import ProfileNavigator from "./components/ProfileNavigator.svelte";
</script>

<div
  class="navbar bg-base-100 z-20 gap-8 justify-between items-center"
  style="direction: ltr;"
>
  <div>
    <a
      href="{base}/business/{$businessStore
        ? $businessStore.urlEndPoint ?? ''
        : ''}"
      class="btn btn-ghost text-xl">SimpleTor</a
    >
  </div>
  <div class="flex items-center gap-2">
    <!-- lang icon -->
    <div class="dropdown dropdown-left dropdown-bottom items-center">
      <CustomCircleIcon icon="mdi:language" size={22} />
      <LanguageBoard />
    </div>

    <!-- orders icon -->

    <div class="indicator">
      <CustomCircleIcon
        icon="lets-icons:order-fill"
        size={22}
        handleClick={openOrdersPage}
      />
      {#if Object.values($userStore.bookingsToShow).length > 0}
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
