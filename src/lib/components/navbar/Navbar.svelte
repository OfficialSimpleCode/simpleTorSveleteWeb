<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  import LanguageBoard from "./components/LanguageBoard.svelte";
  // Assets

  import { businessStore } from "$lib/stores/Business";
  import { userStore } from "$lib/stores/User";
  import GeneralIcon from "../GeneralIcon.svelte";
  import ProfileNavigator from "./components/ProfileNavigator.svelte";
</script>

<div
  class="navbar bg-base-100 z-20 gap-8 justify-between items-center"
  style="direction: ltr;"
>
  <div>
    <a
      href="{base}/business/{$businessStore ? $businessStore.businessId : ''}"
      class="btn btn-ghost text-xl">SimpleTor</a
    >
  </div>
  <div class="flex items-center justify-center">
    <!-- lang icon -->
    <div class="dropdown dropdown-left dropdown-bottom">
      <div role="button" tabindex="0" class="btn btn-ghost btn-circle">
        <GeneralIcon icon="mdi:language"></GeneralIcon>
      </div>
      <LanguageBoard />
    </div>

    <!-- appoitments icon -->
    <div
      role="button"
      tabindex="0"
      class="btn btn-ghost btn-circle"
      on:click={() => goto(`${base}/appointments`)}
      on:keypress={() => {
        goto(`${base}/appointments`);
      }}
    >
      <div class="indicator">
        <GeneralIcon icon="lets-icons:order-fill"></GeneralIcon>
        {#if Object.values($userStore.bookingsToShow).length > 0}
          <span class="bg-primary badge badge-sm indicator-item rounded-badge">
            {Object.values($userStore.bookingsToShow).length}</span
          >
        {/if}
      </div>
    </div>

    <!-- profile navigator -->
    <ProfileNavigator />
  </div>
</div>
