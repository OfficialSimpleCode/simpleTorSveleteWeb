<script lang="ts">
  import CustomPhoneField from "$lib/components/custom_components/CustomPhoneField.svelte";
  import { type TextFieldEvent } from "$lib/consts/text_fields";
  import { translate } from "$lib/utils/translate";
  import { Icon, XCircle } from "svelte-hero-icons";
  export let dialog: HTMLDialogElement;
  export let title: string;
  export let explain: string | undefined = undefined;
  export let initialValue: string = "";
  export let validationFunc: ((value: string) => string | null) | undefined =
    undefined;
  export let onUpdate: (value: string) => Promise<boolean>;

  let text: string = initialValue;
  let isValid: boolean = true;

  let loading: boolean = false;

  function onChange(event: CustomEvent<TextFieldEvent>) {
    console.log(event.detail);
    text = event.detail.value;
    isValid = event.detail.isValid;
  }

  async function handlePhoneChange() {
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
  on:close={() => history.back()}
>
  <div class="modal-box bg-base-200 pb-10">
    <div class="flex justify-between items-center mb-[1rem]">
      <h3 class="font-bold text-md">{title}</h3>
      <button class="btn btn-ghost" on:click={() => dialog.close()}>
        <Icon src={XCircle} size="24px" />
      </button>
    </div>

    <div class="flex flex-col">
      <div class="form-control mt-6">
        <CustomPhoneField value={initialValue} on:phoneChange={onChange} />

        <h3 class="font-bold text-xs opacity-70">{explain}</h3>
      </div>

      <button
        class="btn btn-primary {loading ? 'opacity-70' : ''}"
        on:click={handlePhoneChange}
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
