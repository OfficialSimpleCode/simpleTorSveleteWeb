<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import ToastManager from "../ToastManager.svelte";
  export let dialog: HTMLDialogElement;
  export let onlyMiddle: boolean = false;
  export let onlyBottom: boolean = false;
  export let onlyTop: boolean = false;
  const dispatch = createEventDispatcher();
</script>

<dialog
  bind:this={dialog}
  on:close={() => {
    dialog.close();
    dispatch("close");
  }}
  class="modal {onlyTop
    ? 'modal modal-top'
    : !onlyMiddle && !onlyBottom
      ? 'modal-bottom sm:modal-middle'
      : onlyBottom
        ? 'modal-bottom'
        : 'modal-middle'} "
>
  <ToastManager />
  <slot />
  <!-- backdrop close dialog -->
  <form method="dialog" class="modal-backdrop">
    <button></button>
  </form>
</dialog>
