<script lang="ts">
  import InfoTooltipButton from "$lib/components/InfoTooltipButton.svelte";
  import CustomPhoneField from "$lib/components/custom_components/CustomPhoneField.svelte";
  import type { PhonePickerEvent } from "$lib/consts/text_fields";

  import { translate } from "$lib/utils/translate";
  import { createEventDispatcher } from "svelte";
  import { Icon, XCircle } from "svelte-hero-icons";
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

    sendSms({ phone: phoneNumber });
    dispatch("navigateOtp");
  }
  function handlePhoneChange(event: CustomEvent<PhonePickerEvent>): void {
    validPhone = event.detail.isValid;
    phoneNumber = event.detail.value ?? "";
  }
</script>

<div class="flex justify-between items-center mb-[1rem]">
  <InfoTooltipButton message={translate("loginWithPhoneExplain")} />
  <div class="center">
    <h3 class="font-bold text-lg">{translate("loginWithPhone")}</h3>
    <h3 class="text-me">{translate("beforeStartWeNeewToConfirmPhone")}</h3>
  </div>

  <button class="btn btn-ghost" on:click={() => dialog.close()}>
    <Icon src={XCircle} size="24px" />
  </button>
</div>

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
    {translate("verify")}
  </button>
</div>
