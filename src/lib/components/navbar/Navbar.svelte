<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  import GuestProfile from "./GuestProfile.svelte";
  import LanguageBoard from "./components/LanguageBoard.svelte";

  import NotificationsBoard from "./NotificationsBoard.svelte";
  // Assets
  import ILFlag from "$lib/images/flags/il.svg";
  import USFlag from "$lib/images/flags/us.svg";
  import { businessStore } from "$lib/stores/Business";
  import { isConnectedStore } from "$lib/stores/User";
  import GeneralIcon from "../GeneralIcon.svelte";
  import LoggedInProfile from "./components/profile/LoggedInProfile.svelte";

  let notifications: Array<Record<string, any>> = Object.values(
    $businessStore.design.updates
  );
  let unreadNotifications: Boolean = false;
  $: unreadNotifications = notifications.filter((n) => !n.viewed).length > 0;

  let languages: Array<Record<string, string>> = [
    { name: "Hebrew", flag: ILFlag, locale: "he" },
    { name: "English", flag: USFlag, locale: "en" },
    // { name: $_("Russian"), flag: RUFlag },
  ];

  let profile: Record<string, string> = {};

  function markAsRead(notification: Record<string, any>) {
    let selectedNotification = notifications.filter(
      (n) => n.title == notification.title && n.body == notification.body
    )[0];
    selectedNotification.viewed = true;
    notifications = notifications;
  }
</script>

<div
  class="navbar bg-base-100 z-20 gap-8 justify-between"
  style="direction: ltr;"
>
  <div>
    <a
      href="{base}/business?BusinessId={$businessStore.businessId}"
      class="btn btn-ghost text-xl">SimpleTor</a
    >
  </div>
  <div>
    <div class="dropdown dropdown-left dropdown-bottom">
      <div role="button" tabindex="0" class="btn btn-ghost btn-circle">
        <GeneralIcon icon="mdi:language"></GeneralIcon>
      </div>
      <LanguageBoard {languages} />
    </div>
    <div class="dropdown dropdown-left dropdown-bottom">
      <div role="button" tabindex="0" class="btn btn-ghost btn-circle">
        <div class="indicator">
          <GeneralIcon icon="mdi:notifications-none"></GeneralIcon>
          {#if unreadNotifications}
            <span class="badge badge-xs badge-error indicator-item" />
          {/if}
        </div>
      </div>
      <NotificationsBoard
        {notifications}
        on:notification-opend={(e) => markAsRead(e.detail)}
      />
    </div>

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
        <GeneralIcon icon="mdi:cart"></GeneralIcon>
        <span class="badge badge-sm indicator-item">8</span>
      </div>
    </div>

    {#if $isConnectedStore}
      <LoggedInProfile />
    {:else}
      <GuestProfile />
    {/if}
  </div>
</div>
