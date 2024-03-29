<script lang="ts">
  import type { PhonePickerEvent } from "$lib/consts/text_fields";
  import { ErrorsController } from "$lib/controllers/errors_controller";
  import deleteIcon from "$lib/images/delete.webp";
  import { userStore } from "$lib/stores/User";
  import { phoneToPhoneHint } from "$lib/utils/string_utils";
  import { _, translate } from "$lib/utils/translate";
  import CustomPhoneField from "../custom_components/CustomPhoneField.svelte";
  import DialogTitel from "../custom_components/DialogTitel.svelte";
  import DialogStrucher from "./DialogStrucher.svelte";
  export let dialog: HTMLDialogElement;
  export let contentTransKey: string;
  export let onSave: () => Promise<boolean>;
  export let onCancel: CallableFunction = () => {};
  export let cancelTranslateKey: string = "cancel";
  export let saveTranslateKey: string = "delete";
  export let titleTransKey: string = "areYouSure";

  let matchPhone: boolean = false;
  let loading: boolean = false;
  let value: string = "";
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
        value = "";
        dialog.close();
      } else {
        ErrorsController.displayError();
      }
    }
  }
</script>

<DialogStrucher
  bind:dialog
  onlyMiddle={true}
  on:close={() => {
    value = "";
  }}
>
  <div class="modal-box flex flex-col bg-base-200 max-w-[400px]">
    <!-- title and top buttons -->
    <DialogTitel {titleTransKey} {dialog} />

    <div class="flex flex-col items-center">
      <!-- image, formfield -->
      <div class="flex flex-col gap-3 items-center h-full">
        <img
          class="w-[60px] h-[60px]"
          src={deleteIcon}
          alt={translate("deleteIcon", $_)}
        />
        <h3 class="text-sm text-center mx-6">
          {translate(contentTransKey, $_)}
        </h3>

        <slot />
        <CustomPhoneField
          on:phoneChange={handlePhoneChange}
          bind:value
          hint={phoneToPhoneHint($userStore.userPublicData.phoneNumber)}
          titleTransKey="enterPhone"
        />
      </div>

      <!-- buttom actions buttons -->
      <div
        class=" modal-action w-full flex px-2 gap-2 pt-2 max-w-[300px] items-center justify-center"
      >
        <button
          class="btn btn-sm btn-outline flex-[1]"
          on:click={() => {
            value = "";
            onCancel();
            dialog.close();
          }}
        >
          {translate(cancelTranslateKey, $_)}
        </button>
        <button
          class="btn btn-sm btn-primary flex-[1] {matchPhone
            ? ''
            : 'opacity-50'}"
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
  </div>
</DialogStrucher>
