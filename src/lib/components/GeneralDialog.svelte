<script lang="ts">
  import { _, translate } from "$lib/utils/translate";
  import Animation from "./Animation.svelte";
  // https://lottie.host/4e25a10f-2ecd-4721-a293-c8350f0a1b8c/IkKz9cEb2c.json
  export let dialog: HTMLDialogElement;
  export let animation: string = "";
  export let title: string;
  export let content: string;
  export let onSave: CallableFunction;
  export let onCancel: CallableFunction = () => {};
  export let cancelTranslateKey: string = "cancel";
  export let saveTranslateKey: string = "save";
</script>

<dialog
  bind:this={dialog}
  class="modal modal-bottom sm:modal-middle"
  on:close={() => {
    history.back();
  }}
>
  <div class="modal-box bg-base-200 w-full flex flex-col">
    <!-- title -->
    <h1 class="text-lg text-center mb-4">{title}</h1>

    <!-- animation if provided -->
    {#if animation}
      <div class="flex items-center justify-center bg-slate-600 h-[120px]">
        <Animation animationFile={animation} loop={true} />
      </div>
    {/if}

    <!-- content -->

    <p class="text-center">
      {content}
    </p>

    <!-- button actions buttons -->
    <div class="modal-action w-full flex px-2 gap-2 pt-2">
      <button
        class="btn btn-outline flex-[1]"
        on:click={() => {
          onCancel();
          dialog.close();
        }}
      >
        {translate(cancelTranslateKey, $_)}
      </button>
      <button
        class="btn btn-primary flex-[1]"
        on:click={() => {
          onSave();
          dialog.close();
        }}
      >
        {translate(saveTranslateKey, $_)}
      </button>
    </div>
  </div>

  <!-- close the dialog -->
  <form method="dialog" class="modal-backdrop">
    <button>{translate(cancelTranslateKey, $_)}</button>
  </form>
</dialog>
