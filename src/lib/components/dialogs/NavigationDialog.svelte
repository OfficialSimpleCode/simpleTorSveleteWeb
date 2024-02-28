<script lang="ts">
  import { businessStore } from "$lib/stores/Business.js";
  import DialogTitel from "../custom_components/DialogTitel.svelte";
  import DialogStrucher from "./DialogStrucher.svelte";

  export let dialog: HTMLDialogElement;

  function openMaps() {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${$businessStore?.adress}`,
      "_blank"
    );
  }

  function openWaze() {
    window.open(`waze://?q=${$businessStore?.adress}&navigate=yes`, "_blank");
  }
</script>

<DialogStrucher bind:dialog onlyMiddle={true}>
  <div
    class="modal-box bg-base-200 flex flex-col justify-center gap-5 max-w-[300px]"
  >
    <DialogTitel titleTransKey={"navigate"} {dialog} />
    <button class="btn btn-outline w-full" on:click={openMaps}>Maps</button>
    <button class="btn btn-outline w-full" on:click={openWaze}>Waze</button>
  </div>
</DialogStrucher>
