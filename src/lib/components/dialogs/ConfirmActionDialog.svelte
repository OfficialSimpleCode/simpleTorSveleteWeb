<script lang="ts">
  import type { PhonePickerEvent } from "$lib/consts/text_fields";
  import deleteIcon from "$lib/images/delete.webp";
  import { userStore } from "$lib/stores/User";
  import { _, translate } from "$lib/utils/translate";
  import { Icon, XCircle } from "svelte-hero-icons";
  import CustomPhoneField from "../custom_components/CustomPhoneField.svelte";
  export let dialog: HTMLDialogElement;
  export let contentTransKey: string;
  export let onSave: () => Promise<boolean>;
  export let onCancel: CallableFunction = () => {};
  export let cancelTranslateKey: string = "cancel";
  export let saveTranslateKey: string = "delete";
  export let titleTransKey: string = "areYouSure";

  let matchPhone: boolean = false;
  let loading: boolean = false;
  function handlePhoneChange(event: CustomEvent<PhonePickerEvent>) {
    matchPhone = $userStore.phoneNumber === event.detail.value;
  }

  async function onDelete() {
    if (!matchPhone || loading) {
      return;
    }
    loading = true;
    let resp = false;
    try {
      resp = await onSave();
    } finally {
      loading = false;
      if (resp) {
        dialog.close();
      }
    }
  }
</script>

<dialog
  bind:this={dialog}
  on:close={() => history.back()}
  class="modal sm:modal-middle"
>
  <div class="modal-box bg-base-200 items-center">
    <!-- title and top buttons -->
    <div class="flex justify-center items-center mb-[1rem] relative">
      <!-- title -->
      <h3 class="font-bold text-lg text-center">
        {translate(titleTransKey, $_)}
      </h3>

      <!-- close button -->
      <div class="absolute w-full">
        <button class="btn btn-ghost" on:click={() => dialog.close()}>
          <Icon src={XCircle} size="24px" />
        </button>
      </div>
    </div>

    <!-- image, formfield -->
    <div class="flex flex-col gap-3 items-center h-full">
      <img class="w-[60px] h-[60px]" src={deleteIcon} alt="delete icon" />
      <h3 class="text-sm text-center mx-6">
        {translate(contentTransKey, $_)}
      </h3>

      <CustomPhoneField
        on:phoneChange={handlePhoneChange}
        titleTransKey="verifyPhone"
      />
    </div>

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
        class="btn btn-primary flex-[1] {matchPhone ? '' : 'opacity-50'}"
        on:click={onDelete}
      >
        {#if loading}
          <div class="loading loading-spinner" />
        {:else}
          {translate(saveTranslateKey, $_)}
        {/if}
      </button>
    </div>
  </div>
  <!-- backdrop close dialog -->
  <form method="dialog" class="modal-backdrop">
    <button></button>
  </form>
</dialog>
