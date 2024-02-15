<script lang="ts">
  import { pushState } from "$app/navigation";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import SettingsItem from "$lib/components/custom_components/SettingsItem.svelte";
  import VerifiedPhoneSuccessfullyDialog from "$lib/components/dialogs/VerifiedPhoneSuccessfullyDialog.svelte";
  import PhoneDialog from "$lib/components/dialogs/phone_dialog/PhoneDialog.svelte";
  import { LoginReason } from "$lib/consts/auth";
  import { containerRadius } from "$lib/consts/sizes";
  import { userStore } from "$lib/stores/User";
  import { translate } from "$lib/utils/translate";
  import { handleVerification } from "../helpers/handle_verification";
  let verificationDialog: HTMLDialogElement;
  let verificationSuccessfully: HTMLDialogElement;
  async function onClickVerified() {
    await handleVerification(
      verificationDialog,
      `${base}/profile/phone-verification`
    );
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
  <VerifiedPhoneSuccessfullyDialog bind:dialog={verificationSuccessfully} />
{/if}
<section class="w-[90%] {containerRadius} bg-base-200">
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
</section>
