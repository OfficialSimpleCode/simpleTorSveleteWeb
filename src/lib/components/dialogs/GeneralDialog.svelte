<script lang="ts">
  import { _, translate } from "$lib/utils/translate";
  import { createEventDispatcher } from "svelte";
  import DialogTitel from "../custom_components/DialogTitel.svelte";
  import LottieAnimation from "../custom_components/LottieAnimation.svelte";
  import DialogStrucher from "./DialogStrucher.svelte";
  export let dialog: HTMLDialogElement;
  export let animation: string = "";
  export let image: string = "";
  export let imageAlt: string = "";
  export let titleTransKey: string;
  export let content: string;
  export let onSave: () => Promise<any> = async () => {};
  export let onCancel: () => Promise<any> = async () => {};
  export let cancelTranslateKey: string = "cancel";
  export let saveTranslateKey: string = "save";
  export let maxWidth: string = "";
  export let needTitleGender: boolean = true;
  export let showCancel: boolean = true;
  const dispatch = createEventDispatcher();
  let loadingCancel: boolean = false;
  let loadingSave: boolean = false;
</script>

<DialogStrucher
  bind:dialog
  onlyMiddle={true}
  on:close={() => dispatch("close")}
>
  <div class="modal-box bg-base-200 {maxWidth} w-full">
    <!-- title -->
    <DialogTitel {titleTransKey} {dialog} {needTitleGender} />
    <div class="flex flex-col items-center">
      <!-- animation if provided -->
      {#if animation}
        <div class="flex items-center justify-center bg-slate-600 h-[120px]">
          <LottieAnimation animationFile={animation} loop={true} size="md" />
        </div>
      {:else if image}
        <img class="w-[60px] h-[60px] pb-2" src={image} alt={imageAlt} />
      {/if}

      <!-- content -->

      <p class="text-center text-sm">
        {content}
      </p>

      <slot name="extra" />

      <!-- button actions buttons -->
      <div class="modal-action w-full flex px-2 gap-2 pt-2">
        {#if showCancel}
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
        {/if}
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
  </div>
</DialogStrucher>
