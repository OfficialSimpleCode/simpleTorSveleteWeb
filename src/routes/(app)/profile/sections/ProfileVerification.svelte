<script lang="ts">
  import { pushState } from "$app/navigation";
  import { base } from "$app/paths";
  import SettingContainer from "$lib/components/SettingContainer.svelte";
  import SettingsItem from "$lib/components/custom_components/SettingsItem.svelte";
  import ConfirmActionDialog from "$lib/components/dialogs/ConfirmActionDialog.svelte";
  import VerifiedPhoneSuccessfullyDialog from "$lib/components/dialogs/VerifiedPhoneSuccessfullyDialog.svelte";
  import PhoneDialog from "$lib/components/dialogs/phone_dialog/PhoneDialog.svelte";
  import { AuthProvider, LoginReason } from "$lib/consts/auth";
  import { containerRadius } from "$lib/consts/sizes";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { userStore } from "$lib/stores/User";
  import { pushDialog } from "$lib/utils/general_utils";
  import { translate } from "$lib/utils/translate";
  import { handleVerification } from "../helpers/handle_verification";
  let verificationDialog: HTMLDialogElement;
  let makeSureRemoveVerification: HTMLDialogElement;
  let verificationSuccessfully: HTMLDialogElement;
  export let shimmerEffect: boolean = false;
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

<PhoneDialog
  loginReason={LoginReason.phoneVerification}
  insideOtp={true}
  on:onVerifyPhone={() => {
    //remove the otp dialog
    verificationDialog.close();
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
  cancelTranslateKey="exit"
  saveTranslateKey="cancel"
  onSave={removeVerification}
/>

<VerifiedPhoneSuccessfullyDialog bind:dialog={verificationSuccessfully} />

<SettingContainer
  {shimmerEffect}
  explainText={translate(
    $userStore.userPublicData.isVerifiedPhone
      ? "yourPhoneVerifiviedWithOneTime"
      : "forFullExprinceInApp"
  )}
>
  <div slot="children">
    <SettingsItem
      {shimmerEffect}
      icon="material-symbols:verified"
      shimmerNameLength="w-[60%]"
      onTap={onClickVerified}
      name={"phoneVerification"}
    >
      <div slot="trailing" class="flex w-full justify-end">
        {#if shimmerEffect}
          <div
            class="h-[11px] w-full min-w-[50px] max-w-[190px] {containerRadius} bg-base-300"
          />
        {:else}
          <p class="text-end opacity-60">
            {translate(
              $userStore.userPublicData.isVerifiedPhone
                ? "verified"
                : "notVerified"
            )}
          </p>
        {/if}
      </div>
    </SettingsItem>
  </div>
</SettingContainer>
