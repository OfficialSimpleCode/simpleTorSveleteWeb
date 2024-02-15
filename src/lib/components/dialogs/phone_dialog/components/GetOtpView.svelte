<script lang="ts">
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";
  import { AuthProvider, LoginReason } from "$lib/consts/auth";

  import OtpFields from "$lib/components/OtpFields.svelte";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { translate } from "$lib/utils/translate";
  import type { EventDispatcher } from "svelte";

  import DialogTitel from "$lib/components/custom_components/DialogTitel.svelte";
  import { handleLogin } from "../../../../../routes/(auth)/components/login/helpers/handle_login";
  import { sendSms } from "../helpers/send_sms";
  export let dialog: HTMLDialogElement;
  export let loginReason: LoginReason;
  export let dispatch: EventDispatcher<any>;
  let otp: string = "";
  let loading: boolean = false;

  async function onContinue() {
    if (loading) {
      return;
    }
    loading = true;
    try {
      await handleLogin({
        provider: AuthProvider.Phone,
        loginReason: loginReason,
        otp,
        dispatch,
      });
    } finally {
      loading = false;
    }
  }

  function tryOtherProvider() {
    VerificationHelper.GI().phoneVerificationWithFirebase =
      !VerificationHelper.GI().phoneVerificationWithFirebase;
    otp = "";
    sendSms({ phone: VerificationHelper.GI().submitedPhone });
  }
</script>

<div class="flex flex-col gap-2 items-center">
  <DialogTitel
    {dialog}
    titleTransKey={loginReason === LoginReason.phoneVerification
      ? "phoneVerification"
      : "loginWithPhone"}
  />
  <GeneralIcon icon="mdi:lock" />
  <h3 class="text-me text-center">
    {translate("beforeStartWeNeewToConfirmPhone")}
  </h3>
  <h3 class="text-xs text-center">{translate("pressOpt")}</h3>

  <OtpFields bind:otp on:onCompleted={onContinue} />
  {#if VerificationHelper.GI().phoneVerificationWithFirebase}
    <h3 class="text-me bg-primary" on:click={tryOtherProvider}>
      {translate("notRecivingAnyMessage")}
    </h3>
  {/if}
</div>
