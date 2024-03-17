<script lang="ts">
  import { AuthProvider, LoginReason } from "$lib/consts/auth";
  import { maxButtonSize } from "$lib/consts/sizes";
  import { InputOptions, type TextFieldEvent } from "$lib/consts/text_fields";
  import { canUseOtpStore } from "$lib/controllers/verification_controller";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { formatedPhone } from "$lib/utils/string_utils";
  import { _, translate } from "$lib/utils/translate";
  import { createEventDispatcher } from "svelte";
  import CustomTextFormField from "../../../../../../lib/components/custom_components/CustomTextFormField.svelte";
  import GeneralIcon from "../../../../../../lib/components/custom_components/GeneralIcon.svelte";
  import { handleLogin } from "../../helpers/handle_login";
  import OtpTitle from "./components/OtpTitle.svelte";
  import { sendSms } from "./helpers/send_sms";
  export let loginReason: LoginReason;
  export let isOtp: boolean = true;
  export let otp: string = "";
  export let otpTitle: string;
  export let otpSubTitle: string;
  export let canReturnToChooseProvider: boolean = true;

  const dispatch = createEventDispatcher();
  let loading: boolean = false;

  $: otpSubTitle = otpSubTitle.replaceAll(
    "NUMBER",
    formatedPhone(VerificationHelper.GI().submitedPhone)
  );

  async function onContinue() {
    if (loading) {
      return;
    }
    loading = true;
    try {
      const resp = await handleLogin({
        provider: AuthProvider.Phone,
        loginReason: loginReason,
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

  function returnToChooseProvider() {
    isOtp = false;
  }
</script>

<div class="flex flex-col items-center justify-center w-full pb-20">
  <section
    class="bg-base-200 py-7 px-5 rounded-md flex flex-col items-center gap-3 w-[93%] md:w-[50%] lg:w-[40%] max-w-[500px]"
  >
    <!-- login title -->
    <OtpTitle {otpSubTitle} {otpTitle} />

    <GeneralIcon icon="mdi:lock" size={40} />
    <div class="flex flex-col gap-[1px] items-center">
      <h3 class="text-xs text-center opacity-70">
        {translate("pressOpt", $_)}
      </h3>
    </div>

    <CustomTextFormField
      on:valueChange={onChanged}
      type={InputOptions.number}
      isActive={!loading && $canUseOtpStore}
      value={otp}
      isOTP={true}
    />

    {#if VerificationHelper.GI().phoneVerificationWithFirebase && !loading && loginReason === LoginReason.phoneVerification}
      <button
        class="text-me opacity-90 hover:opacity-100"
        on:click={tryOtherProvider}
      >
        <h3 class="text-sm text-primary">
          {translate("notRecivingAnyMessage", $_)}
        </h3>
      </button>
    {/if}
    {#if canReturnToChooseProvider}
      <!-- Return to phone  Button -->
      <button
        class="btn btn-md sm:text-md btn-primary w-[80%] {loading
          ? 'opacity-55'
          : ''} {maxButtonSize} hover:outline"
        on:click={returnToChooseProvider}
      >
        {#if loading}
          <div class="loading loading-spinner" />
        {:else}
          {translate("returnToPhone", $_)}
        {/if}
      </button>
    {:else if loading}
      <div class="loading loading-spinner" />
    {/if}
  </section>
</div>
