<script lang="ts">
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";
  import InfoTooltipButton from "$lib/components/InfoTooltipButton.svelte";
  import { AuthProvider, LoginReason } from "$lib/consts/auth";

  import OtpFields from "$lib/components/OtpFields.svelte";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { translate } from "$lib/utils/translate";
  import type { EventDispatcher } from "svelte";
  import { Icon, XCircle } from "svelte-hero-icons";
  import { handleLogin } from "../../../helpers/handle_login";
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

<div class="flex justify-between items-center mb-[1rem]">
  <InfoTooltipButton message={translate("loginWithPhoneExplain")} />
  <div class="center">
    <h3 class="font-bold text-lg">
      {translate(
        loginReason === LoginReason.phoneVerification
          ? "phoneVerification"
          : "loginWithPhone"
      )}
    </h3>
    <h3 class="text-me">
      {translate(
        loginReason === LoginReason.phoneVerification ? "" : "enterPhoneNumber"
      )}
    </h3>
  </div>
  <button class="btn btn-ghost" on:click={() => dialog.close()}>
    <Icon src={XCircle} size="24px" />
  </button>
</div>
<GeneralIcon icon="mdi:lock" />
<h3 class="text-me">{translate("beforeStartWeNeewToConfirmPhone")}</h3>
<h3 class="text-xs">{translate("pressOpt")}</h3>

<OtpFields bind:otp on:onCompleted={onContinue} />
{#if VerificationHelper.GI().phoneVerificationWithFirebase}
  <h3 class="text-me bg-primary" on:click={tryOtherProvider}>
    {translate("notRecivingAnyMessage")}
  </h3>
{/if}
