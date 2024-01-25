<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispath = createEventDispatcher();

  import { Update } from "$lib/models/business/update_model";
  import type { businessStore } from "$lib/stores/Business";
  import { translate } from "$lib/utils/translate";
  import NotificationDialog from "./NotificationDialog.svelte";
  export let notifications = $businessStore.design.updates.values();

  let dialog: HTMLDialogElement;
  let selectedNotification: Update;

  function showNotification(notification: Update) {
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
          <!-- {#if !notification.viewed}
            <span class="badge badge-xs badge-error indicator-item" />
          {/if} -->
        </div>
        <p class="text-ellipsis max-h-[24px] overflow-hidden text-center">
          {notification.content}
        </p>
      </button>
    </li>
    <div class="divider h-2 last:hidden"></div>
  {/each}
  {#if Object.entries(notifications).length === 0}
    <div class="font-bold text-center">{translate("notifications")}</div>
  {/if}
</ul>
