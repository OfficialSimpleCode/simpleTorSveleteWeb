<script lang="ts">
  import { Update } from "$lib/models/business/update_model";
  import { Icon, XCircle } from "svelte-hero-icons";

  export let dialog: HTMLDialogElement;
  export let notification: Update;
</script>

<dialog bind:this={dialog} class="modal modal-bottom sm:modal-middle">
  <div class="modal-box bg-base-200">
    <div class="flex justify-between items-center mb-[4rem]">
      <h3 class="font-bold text-lg">Business Announcment</h3>
      <button class="btn btn-ghost" on:click={() => dialog.close()}>
        <Icon src={XCircle} size="24px" />
      </button>
    </div>
    {#if notification}
      <div class="text-center">
        <h1 class="text-xl font-bold">{notification.title}</h1>
        <p>{notification.content}</p>
      </div>
    {/if}
    <div class="h-[100px]"></div>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
