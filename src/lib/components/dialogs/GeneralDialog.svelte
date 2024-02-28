<script lang="ts">
  import { _, translate } from "$lib/utils/translate";
  import DialogTitel from "../custom_components/DialogTitel.svelte";
  import LottieAnimation from "../custom_components/LottieAnimation.svelte";
  import DialogStrucher from "./DialogStrucher.svelte";
  export let dialog: HTMLDialogElement;
  export let animation: string = "";
  export let image: string = "";
  export let imageAlt: string = "";
  export let titleTransKey: string;
  export let content: string;
  export let onSave: () => Promise<any>;
  export let onCancel: () => Promise<any> = async () => {};
  export let cancelTranslateKey: string = "cancel";
  export let saveTranslateKey: string = "save";
  export let maxWidth: string = "";

  let loadingCancel: boolean = false;
  let loadingSave: boolean = false;
</script>

<DialogStrucher bind:dialog onlyMiddle={true}>
  <div class="modal-box bg-base-200 {maxWidth}">
    <!-- title -->
    <DialogTitel {titleTransKey} {dialog} />

    <!-- animation if provided -->
    {#if animation}
      <div class="flex items-center justify-center bg-slate-600 h-[120px]">
        <LottieAnimation animationFile={animation} loop={true} size="md" />
      </div>
    {:else if image}
      <img src={image} alt={imageAlt} />
    {/if}

    <!-- content -->

    <p class="text-center">
      {content}
    </p>

    <slot name="extra" />

    <!-- button actions buttons -->
    <div class="modal-action w-full flex px-2 gap-2 pt-2">
      <button
        class="btn btn-sm btn-outline flex-[1]"
        on:click={async () => {
          if (loadingCancel) {
            return;
          }
          try {
            loadingCancel = true;
            const resp = await onCancel();
            if (resp !== false) {
              dialog.close();
            }
          } finally {
            loadingCancel = false;
          }
        }}
      >
        {#if loadingCancel}
          <div class="loading loading-spinner" />
        {:else}
          {translate(cancelTranslateKey, $_)}
        {/if}
      </button>
      <button
        class="btn btn-sm btn-primary flex-[1] {loadingSave
          ? 'opacity-70'
          : ''}"
        on:click={async () => {
          if (loadingSave) {
            return;
          }
          try {
            loadingSave = true;
            const resp = await onSave();
            if (resp !== false) {
              dialog.close();
            }
          } finally {
            loadingSave = false;
          }
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
</DialogStrucher>
