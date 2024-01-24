<script lang="ts">
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";

    import { GlobeAlt, Icon } from "svelte-hero-icons";

    import GuestProfile from "./GuestProfile.svelte";
    import LanguageBoard from "./LanguageBoard.svelte";
    
    import NotificationsBoard from "./NotificationsBoard.svelte";
    // Assets
    import ILFlag from "$lib/images/flags/il.svg";
    import USFlag from "$lib/images/flags/us.svg";
    import UserInitializer from "$lib/initializers/user_initializer";
    import { businessStore } from "$lib/stores/Business";
    import LoggedInProfile from "./LoggedInProfile.svelte";
    // import RUFlag from "$lib/images/flags/ru.svg";

    let notifications: Array<Record<string, any>> = Object.values(
        $businessStore.design.updates,
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
            (n) => n.title == notification.title && n.body == notification.body,
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
                <Icon src={GlobeAlt} size="26px" />
            </div>
            <LanguageBoard {languages} />
        </div>
        <div class="dropdown dropdown-left dropdown-bottom">
            <div role="button" tabindex="0" class="btn btn-ghost btn-circle">
                <div class="indicator">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        /></svg
                    >
                    {#if unreadNotifications}
                        <span
                            class="badge badge-xs badge-error indicator-item"
                        />
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    /></svg
                >
                <span class="badge badge-sm indicator-item">8</span>
            </div>
        </div>

        {#if UserInitializer.GI().isConnected}
            <LoggedInProfile />
        {:else}
            <GuestProfile />
        {/if}
    </div>
</div>
