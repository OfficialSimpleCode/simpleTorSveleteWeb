<script lang="ts">
  import { pushState } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import SettingContainer from "$lib/components/SettingContainer.svelte";
  import SettingsItem from "$lib/components/custom_components/SettingsItem.svelte";
  import ConfirmActionDialog from "$lib/components/dialogs/ConfirmActionDialog.svelte";
  import VerifiedPhoneSuccessfullyDialog from "$lib/components/dialogs/VerifiedPhoneSuccessfullyDialog.svelte";
  import PhoneDialog from "$lib/components/dialogs/phone_dialog/PhoneDialog.svelte";
  import { AuthProvider, LoginReason } from "$lib/consts/auth";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { userStore } from "$lib/stores/User";
  import { pushDialog } from "$lib/utils/general_utils";
  import { translate } from "$lib/utils/translate";
  import { handleVerification } from "../helpers/handle_verification";
  let verificationDialog: HTMLDialogElement;
  let makeSureRemoveVerification: HTMLDialogElement;
  let verificationSuccessfully: HTMLDialogElement;
  async function onClickVerified() {
    if ($userStore.userPublicData.isVerifiedPhone) {
      pushDialog(makeSureRemoveVerification);
    } else {
      await handleVerification(
        verificationDialog,
        `${base}/profile/phone-verification`
      );
    }
  }

  async function removeVerification() {
    return !VerificationHelper.GI().existsLoginProviders.has("phone")
      ? await VerificationHelper.GI().cancelVerificationWithExternalProvider()
      : await VerificationHelper.GI().unlinkProvider(AuthProvider.Phone);
  }
</script>

<!-- Dialog -->
{#if $page.state.showModal}
  <PhoneDialog
    loginReason={LoginReason.phoneVerification}
    insideOtp={true}
    on:onVerifyPhone={() => {
      //remove the otp dialog
      history.back();
      //push the successfully verified dialog
      pushState("", {
        showModal: true,
      });
      setTimeout(() => verificationSuccessfully.showModal(), 200);
    }}
    bind:dialog={verificationDialog}
  />

  <ConfirmActionDialog
    bind:dialog={makeSureRemoveVerification}
    contentTransKey="cancelVerificationExplain"
    titleTransKey="verificationCanceling"
    onSave={removeVerification}
  />

  <VerifiedPhoneSuccessfullyDialog bind:dialog={verificationSuccessfully} />
{/if}

<SettingContainer
  explainText={translate(
    $userStore.userPublicData.isVerifiedPhone
      ? "yourPhoneVerifiviedWithOneTime"
      : "forFullExprinceInApp"
  )}
>
  <div slot="children">
    <SettingsItem
      icon="material-symbols:verified"
      onTap={onClickVerified}
      name={"phoneVerification"}
    >
      <h3 slot="trailing">
        {translate(
          $userStore.userPublicData.isVerifiedPhone ? "verified" : "notVerified"
        )}
      </h3></SettingsItem
    >
  </div>
</SettingContainer>
