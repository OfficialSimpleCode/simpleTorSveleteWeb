<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { LoginReason } from "$lib/consts/auth";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { ShowToast } from "$lib/stores/ToastManager";
  import { isConnectedStore, userStore } from "$lib/stores/User";
  import { formatedPhone } from "$lib/utils/string_utils";
  import { _, translate } from "$lib/utils/translate";
  import { onMount } from "svelte";
  import LoginContainer from "../components/login/LoginContainer.svelte";
  import { sendSms } from "../components/login/components/otp_input_container/helpers/send_sms";

  onMount(() => {
    VerificationHelper.GI().setupLoggin();
    isConnectedStore.subscribe((value) => {
      if (value === false) {
        goto(`${base}/login`);

        ShowToast({
          text: translate("loginFirst", $_),
          status: "info",
        });
      }

      if (value == true) {
        if ($userStore.userPublicData.isVerifiedPhone) {
          goto(`${base}/profile`);
          ShowToast({
            text: translate("alreadyVerifedPhone", $_),
            status: "info",
          });
        } else {
          setTimeout(() => sendSms($userStore.userPublicData.phoneNumber), 700);
        }
      }
    });
  });
</script>

<svelte:head>
  <!-- business title -->
  <title
    >{translate("simpleTorWebTitle", $_, false)} | {translate(
      "phoneVerification",
      $_,
      false
    )}</title
  >

  <!-- the url for search to display for this site -->
  <link rel="canonical" href={`${$page.url.origin}/link-source`} />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="{translate('simpleTorWebTitle', $_, false)} | {translate(
      'phoneVerification',
      $_,
      false
    )}"
  />
</svelte:head>

{#if $isConnectedStore != null}
  <LoginContainer
    loginReason={LoginReason.phoneVerification}
    isOtp={true}
    otpSubTitle={translate("otpSubTitle", $_).replaceAll(
      "NUMBER",
      formatedPhone($userStore.userPublicData.phoneNumber)
    )}
    canReturnToChooseProvider={false}
  />
{/if}
