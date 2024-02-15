<script lang="ts">
  import CustomTextFormField from "$lib/components/custom_components/CustomTextFormField.svelte";
  import DialogTitel from "$lib/components/custom_components/DialogTitel.svelte";
  import { InputOptions, type TextFieldEvent } from "$lib/consts/text_fields";
  import { translate } from "$lib/utils/translate";
  export let dialog: HTMLDialogElement;
  export let titleTransKey: string;
  export let explain: string | undefined = undefined;
  export let initialValue: string = "";
  export let validationFunc: ((value: string) => string | null) | undefined =
    undefined;
  export let onUpdate: (value: string) => Promise<boolean>;

  let text: string = initialValue;
  let isValid: boolean = validationFunc
    ? validationFunc(initialValue) == null
    : true;
  let loading: boolean = false;

  function onChange(event: CustomEvent<TextFieldEvent>) {
    console.log(event.detail);
    text = event.detail.value;
    isValid = event.detail.isValid;
  }

  async function onUpdateHandler() {
    console.log("Eeeeeeeeee", isValid);

    if (!isValid || loading) {
      return;
    }
    loading = true;
    try {
      const resp = await onUpdate(text);
      if (resp) {
        dialog.close();
      }
    } finally {
      loading = false;
    }
  }
</script>

<dialog
  bind:this={dialog}
  class="modal modal-middle bg-center"
  on:close={() => {
    dialog.close();
    history.back();
  }}
>
  <div class="modal-box bg-base-200 pb-10">
    <DialogTitel {titleTransKey} {dialog} />

    <div class="flex flex-col gap-5">
      <div class="flex flex-col">
        <CustomTextFormField
          type={InputOptions.text}
          value={initialValue}
          pattern=""
          {validationFunc}
          isRequired={true}
          on:valueChange={onChange}
        />
        <h3 class="font-bold text-xs opacity-70">{explain}</h3>
      </div>

      <button
        class="btn btn-primary {loading ? 'opacity-70' : ''}"
        on:click={onUpdateHandler}
      >
        {#if loading}
          <div class="loading loading-spinner"></div>
        {:else}
          {translate("update")}
        {/if}
      </button>
    </div>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button></button>
  </form>
</dialog>
