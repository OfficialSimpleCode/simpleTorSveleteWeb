<script lang="ts">
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";
  import { openProfileDialog } from "$lib/utils/ui_utils";

  import UpdatePageHeader from "$lib/components/UpdatePageHeader.svelte";
  //  ---------------------------   //
  import CustomPhoneField from "$lib/components/custom_components/CustomPhoneField.svelte";
  import type { PhonePickerEvent } from "$lib/consts/text_fields";
  import { _, translate } from "$lib/utils/translate";

  let showInvalid: boolean = false;
  let isValid: boolean = false;
  let compleatePhone: string;

  function updatePhoneNumber() {
    if (isValid && compleatePhone) {
      //   $userStore.phoneNumber = compleatePhone; // the phone the user typed
      goto(`${base}/verify-phone-number`);
    } else {
      showInvalid = true;
      setTimeout(() => (showInvalid = false), 1500);
    }
  }

  function handlePhoneChange(event: CustomEvent<PhonePickerEvent>): void {
    compleatePhone = event.detail.value ?? "";
    isValid = event.detail.isValid;
  }

  // healper
  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10 h-full">
  <UpdatePageHeader
    title={capitalizeFirstLetter(translate("phoneUpdate", $_))}
    helpMessage={translate("phoneUpdateExplain", $_)}
    onBack={openProfileDialog}
  />

  <div class="flex items-center justify-center w-full h-[60%]">
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-200 py-3 px-6">
      <!-- the phone field -->
      <CustomPhoneField on:phoneChange={handlePhoneChange}></CustomPhoneField>

      <div class="form-control mt-6">
        <button
          class="btn btn-primary {isValid ? '' : 'opacity-60'}"
          on:click={updatePhoneNumber}
        >
          {showInvalid
            ? "Invalid phoner number"
            : translate("pressToVerify", $_)}
        </button>
      </div>
    </div>
  </div>
</main>
