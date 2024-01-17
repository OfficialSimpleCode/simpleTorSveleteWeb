<script lang="ts">
    import { base } from "$app/paths";
    import NotificationsBoard from "./NotificationsBoard.svelte";
    import LoggedInProfile from "./LoggedInProfile.svelte";
    import GuestProfile from "./GuestProfile.svelte";

    export let notifications: Array<Record<string, any>>;
    let unreadNotifications: Boolean = false;
    $: unreadNotifications = notifications.filter((n) => !n.viewed).length > 0;

    export let loggedIn: boolean;
    export let profile: Record<string, string> = {};

    function markAsRead(notification: Record<string, any>) {
        let selectedNotification = notifications.filter(
            (n) => n.title == notification.title && n.body == notification.body,
        )[0];
        selectedNotification.viewed = true;
        notifications = notifications;
    }
</script>

<div class="navbar bg-base-100 fixed z-20 gap-8 justify-between">
    <div>
        <a href="{base}/" class="btn btn-ghost text-xl">SimpleTor</a>
    </div>
    <div>
        <div class="dropdown dropdown-left dropdown-bottom">
            <button class="btn btn-ghost btn-circle">
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
            </button>
            <NotificationsBoard
                {notifications}
                on:notification-opend={(e) => markAsRead(e.detail)}
            />
        </div>
        <a href="orders">
            <div role="button" class="btn btn-ghost btn-circle">
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
        </a>
        {#if loggedIn}
            <LoggedInProfile {profile} />
        {:else}
            <GuestProfile />
        {/if}
    </div>
</div>
