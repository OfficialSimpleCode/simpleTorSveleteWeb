<script lang="ts">
  import { businessStore } from "$lib/stores/Business.js";
  import { _ } from "svelte-i18n";

  export let dialog: HTMLDialogElement;

  function openMaps() {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${$businessStore.adress}`,
      "_blank"
    );
  }

  function openWaze() {
    window.open(`waze://?q=${$businessStore.adress}&navigate=yes`, "_blank");
  }
</script>

<dialog
  bind:this={dialog}
  class="modal modal-bottom sm:modal-middle"
  on:close={() => {
    dialog.close();
    history.back();
  }}
>
  <div
    class="modal-box bg-base-200 flex flex-col items-center justify-center gap-5"
  >
    <h1 class="text-lg text-center mb-4">{$_("navigate")}</h1>
    <button class="btn btn-outline w-full" on:click={openMaps}>Maps</button>
    <button class="btn btn-outline w-full" on:click={openWaze}>Waze</button>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
