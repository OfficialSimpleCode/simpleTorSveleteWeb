<script lang="ts">
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import { AuthProvider, LoginReason } from "$lib/consts/auth";

  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { _, translate } from "$lib/utils/translate";
  import type { EventDispatcher } from "svelte";

  import CustomTextFormField from "$lib/components/custom_components/CustomTextFormField.svelte";
  import DialogTitel from "$lib/components/custom_components/DialogTitel.svelte";
  import { InputOptions, type TextFieldEvent } from "$lib/consts/text_fields";
  import { handleLogin } from "../../../../../routes/(auth)/components/login/helpers/handle_login";
  import { sendSms } from "../helpers/send_sms";
  export let dialog: HTMLDialogElement;
  export let loginReason: LoginReason;
  export let dispatch: EventDispatcher<any>;
  export let otp: string = "";
  let loading: boolean = false;

  async function onContinue() {
    if (loading) {
      return;
    }
    loading = true;
    try {
      const resp = await handleLogin({
        provider: AuthProvider.Phone,
        loginReason: loginReason,
        phoneDialog: dialog,
        otp,
        dispatch,
      });
      if (resp != null) {
        otp = "";
      }
    } finally {
      loading = false;
    }
  }

  function onChanged(event: CustomEvent<TextFieldEvent>) {
    otp = event.detail.value;
    if (event.detail.value.length === 6) {
      onContinue();
    }
  }

  function tryOtherProvider() {
    VerificationHelper.GI().phoneVerificationWithFirebase =
      !VerificationHelper.GI().phoneVerificationWithFirebase;
    otp = "";
    sendSms(VerificationHelper.GI().submitedPhone);
  }
</script>

<DialogTitel
  {dialog}
  titleTransKey={loginReason === LoginReason.phoneVerification
    ? "phoneVerification"
    : "loginWithPhone"}
/>
<div class="flex flex-col gap-2 items-center">
  <GeneralIcon icon="mdi:lock" size={40} />
  <div class="flex flex-col gap-[1px] items-center">
    <h3 class="text-me text-center">
      {translate("beforeStartWeNeewToConfirmPhone", $_)}
    </h3>
    <h3 class="text-xs text-center opacity-70">{translate("pressOpt", $_)}</h3>
  </div>

  <CustomTextFormField
    on:valueChange={onChanged}
    type={InputOptions.number}
    isActive={!loading}
    value={otp}
    isOTP={true}
  />

  {#if VerificationHelper.GI().phoneVerificationWithFirebase && !loading}
    <button
      class="text-me opacity-90 hover:opacity-100"
      on:click={tryOtherProvider}
    >
      <h3 class="text-sm text-primary">
        {translate("notRecivingAnyMessage", $_)}
      </h3>
    </button>
  {/if}

  {#if loading}
    <div class="loading loading-spinner" />
  {/if}
</div>
