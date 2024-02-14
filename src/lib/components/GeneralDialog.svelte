<script lang="ts">
  import { _, translate } from "$lib/utils/translate";
  import LottieAnimation from "./LottieAnimation.svelte";
  export let dialog: HTMLDialogElement;
  export let animation: string = "";
  export let image: string = "";
  export let imageAlt: string = "";
  export let titleTransKey: string;
  export let contentTransKet: string;
  export let onSave: CallableFunction;
  export let onCancel: CallableFunction = () => {};
  export let cancelTranslateKey: string = "cancel";
  export let saveTranslateKey: string = "save";

  let loadingCancel: boolean = false;
  let loadingSave: boolean = false;
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
    <h1 class="text-lg text-center mb-4">{translate(titleTransKey)}</h1>

    <!-- animation if provided -->
    {#if animation}
      <div class="flex items-center justify-center bg-slate-600 h-[120px]">
        <LottieAnimation animationFile={animation} loop={true} />
      </div>
    {:else if image}
      <img src={image} alt={imageAlt} />
    {/if}

    <!-- content -->

    <p class="text-center">
      {translate(contentTransKet)}
    </p>

    <!-- button actions buttons -->
    <div class="modal-action w-full flex px-2 gap-2 pt-2">
      <button
        class="btn btn-outline flex-[1]"
        on:click={async () => {
          await onCancel();
          dialog.close();
          history.back();
        }}
      >
        {#if loadingCancel}
          <div class="loading loading-spinner" />
        {:else}
          {translate(saveTranslateKey, $_)}
        {/if}
        {translate(cancelTranslateKey, $_)}
      </button>
      <button
        class="btn btn-primary flex-[1]"
        on:click={async () => {
          await onSave();
          dialog.close();
          history.back();
        }}
      >
        {#if loadingSave}
          <div class="loading loading-spinner" />
        {:else}
          {translate(saveTranslateKey, $_)}
        {/if}
      </button>
    </div>
  </div>

  <!-- close the dialog -->
  <form method="dialog" class="modal-backdrop">
    <button>{translate(cancelTranslateKey, $_)}</button>
  </form>
</dialog>
