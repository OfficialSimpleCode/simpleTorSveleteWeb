<script lang="ts">
  import CustomTextFormField from "$lib/components/custom_components/CustomTextFormField.svelte";
  import DialogTitel from "$lib/components/custom_components/DialogTitel.svelte";
  import DialogStrucher from "$lib/components/dialogs/DialogStrucher.svelte";
  import { InputOptions, type TextFieldEvent } from "$lib/consts/text_fields";
  import { ErrorsController } from "$lib/controllers/errors_controller";
  import { ShowToast } from "$lib/stores/ToastManager";
  import { _, translate } from "$lib/utils/translate";
  export let dialog: HTMLDialogElement;
  export let titleTransKey: string;
  export let explain: string | undefined = undefined;
  export let initialValue: string = "";
  export let validationFunc: ((value: string) => string | null) | undefined =
    undefined;
  export let onUpdate: (value: string) => Promise<boolean>;

  export let active: boolean = true;

  export let notActiveReason: string | undefined = undefined;

  let text: string = initialValue;
  let isValid: boolean = validationFunc
    ? validationFunc(initialValue) == null
    : true;
  let loading: boolean = false;

  function onChange(event: CustomEvent<TextFieldEvent>) {
    text = event.detail.value;
    isValid = event.detail.isValid;
  }

  async function onUpdateHandler() {
    if (!isValid || loading) {
      return;
    }
    if (initialValue === text) {
      ShowToast({ text: translate("sameData"), status: "info" });
      return;
    }
    loading = true;
    let resp = false;
    try {
      resp = await onUpdate(text);
    } finally {
      loading = false;
      if (resp) {
        dialog.close();
      } else {
        ErrorsController.displayError();
      }
    }
  }
</script>

<DialogStrucher bind:dialog onlyMiddle={true}>
  <div class="modal-box bg-base-200 pb-10 max-w-[400px]">
    <DialogTitel {titleTransKey} {dialog} />
    <form on:submit={onUpdateHandler}>
      <div class="flex flex-col gap-5">
        <div class="flex flex-col">
          <CustomTextFormField
            type={InputOptions.text}
            isActive={active}
            value={initialValue}
            {validationFunc}
            isRequired={true}
            on:valueChange={onChange}
          />

          {#if !active && notActiveReason != null}
            <p class="font-bold text-xs px-2 text-red-500 pb-2">
              {notActiveReason}
            </p>
          {/if}

          <p class="font-bold text-xs opacity-70 px-2">{explain}</p>
        </div>

        <button
          class="btn btn-primary btn-sm {loading ? 'opacity-70' : ''} py-1"
          on:click={onUpdateHandler}
        >
          {#if loading}
            <div class="loading loading-spinner"></div>
          {:else}
            {translate("update", $_)}
          {/if}
        </button>
      </div>
    </form>
  </div>
</DialogStrucher>
