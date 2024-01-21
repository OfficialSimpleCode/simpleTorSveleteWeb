<script lang="ts">
    import { _ } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    const dispath = createEventDispatcher();

    import NotificationDialog from "./NotificationDialog.svelte";
    export let notifications: Array<Record<string, string>>;

    let dialog: HTMLDialogElement;
    let selectedNotification: Record<string, string>;

    function showNotification(notification: Record<string, string>) {
        selectedNotification = notification;
        dialog.showModal();
        dispath("notification-opend", selectedNotification);
    }
</script>

<NotificationDialog bind:dialog bind:notification={selectedNotification} />
<ul
    class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 translate-x-24 sm:translate-x-12 min-w-[300px] py-4"
>
    {#each notifications as notification}
        <li>
            <button
                class="flex flex-col"
                on:click={() => showNotification(notification)}
            >
                <div class="flex items-center gap-2">
                    <h1 class="font-semibold text-start">
                        {notification.title}
                    </h1>
                    {#if !notification.viewed}
                        <span
                            class="badge badge-xs badge-error indicator-item"
                        />
                    {/if}
                </div>
                <p
                    class="text-ellipsis max-h-[24px] overflow-hidden text-center"
                >
                    {notification.content}
                </p>
            </button>
        </li>
        <div class="divider h-2 last:hidden"></div>
    {/each}
    {#if notifications.length == 0}
        <div class="font-bold text-center">{$_("notifications")}</div>
    {/if}
</ul>
