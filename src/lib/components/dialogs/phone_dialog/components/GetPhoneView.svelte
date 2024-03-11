<script lang="ts">
  import CustomPhoneField from "$lib/components/custom_components/CustomPhoneField.svelte";
  import DialogTitel from "$lib/components/custom_components/DialogTitel.svelte";
  import type { PhonePickerEvent } from "$lib/consts/text_fields";
  import { _, translate } from "$lib/utils/translate";
  import { createEventDispatcher } from "svelte";
  import { sendSms } from "../helpers/send_sms";
  const dispatch = createEventDispatcher();
  export let dialog: HTMLDialogElement;

  let validPhone: boolean = false;
  let phoneNumber: string = "";

  function onContinue() {
    console.log(phoneNumber);
    if (!validPhone) {
      console.log("e");
      return;
    }

    sendSms(phoneNumber);
    dispatch("navigateOtp");
  }
  function handlePhoneChange(event: CustomEvent<PhonePickerEvent>): void {
    validPhone = event.detail.isValid;
    phoneNumber = event.detail.value ?? "";
  }
</script>

<DialogTitel titleTransKey="loginWithPhone" {dialog} />

<div>
  <CustomPhoneField on:phoneChange={handlePhoneChange} />
  <h3 class="text-sm">{translate("weSendYouCode")}</h3>
</div>
<div class="form-control mt-9 mr-20 ml-20">
  <button
    type="submit"
    class="btn btn-primary {validPhone ? '' : 'opacity-50'}"
    on:click={onContinue}
  >
    {translate("verify", $_)}
  </button>
</div>
