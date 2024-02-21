<script lang="ts">
  import CustomPhoneField from "$lib/components/custom_components/CustomPhoneField.svelte";
  import PhoneDialog from "$lib/components/dialogs/phone_dialog/PhoneDialog.svelte";
  import { sendSms } from "$lib/components/dialogs/phone_dialog/helpers/send_sms";
  import {
    AuthProvider,
    LoginReason,
    authProviderToProviderId,
    googleOrder,
  } from "$lib/consts/auth";
  import { maxButtonSize } from "$lib/consts/sizes";
  import type { PhonePickerEvent } from "$lib/consts/text_fields";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  import DeleteUserDialog from "./components/DeleteUserDialog.svelte";
  import LoginOption from "./components/LoginOption.svelte";
  import LoginTitle from "./components/LoginTitle.svelte";
  import { handleLogin } from "./helpers/handle_login";

  export let loginReason: LoginReason = LoginReason.login;
  let deleteUserDialog: HTMLDialogElement;
  let validPhone: boolean = false;
  let isActive: { [key in AuthProvider]?: boolean } = {};
  let phoneDialog: HTMLDialogElement;
  let phoneNumber: string;
  let loading: boolean = false;

  googleOrder.forEach((provider) => {
    //facebook is will be active soon
    if (AuthProvider.Facebook === provider) {
      isActive[provider] = false;
      return;
    }

    //handle the click for link provider
    if (
      loginReason === LoginReason.linkProvider &&
      VerificationHelper.GI().existsLoginProviders.has(
        authProviderToProviderId[provider]
      )
    ) {
      isActive[provider] = false;
      return;
    }

    //handle the click for delete user
    if (
      loginReason === LoginReason.deleteUser &&
      !VerificationHelper.GI().existsLoginProviders.has(
        authProviderToProviderId[provider]
      )
    ) {
      isActive[provider] = false;
      return;
    }
    isActive[provider] = true;
  });

  async function handleClick(authProvider: AuthProvider) {
    if (loading || !validPhone) {
      return;
    }
    loading = true;
    if (AuthProvider.Phone === authProvider) {
      sendSms({ phone: phoneNumber });
      openPhoneDialog();
      return;
    }

    try {
      await handleLogin({
        provider: authProvider,
        loginReason: loginReason,
      });
    } finally {
      loading = false;
    }
  }
  function onFinishLogin() {
    loading = false;
  }

  function openPhoneDialog() {
    pushDialog(phoneDialog);
  }
  function handlePhoneChange(event: CustomEvent<PhonePickerEvent>): void {
    validPhone = event.detail.isValid;
    phoneNumber = event.detail.value ?? "";
  }
</script>

<!-- Dialog -->

<PhoneDialog
  {loginReason}
  bind:dialog={phoneDialog}
  insideOtp={true}
  on:onFinishLogin={onFinishLogin}
/>
<DeleteUserDialog bind:dialog={deleteUserDialog} />

<main class="flex w-full h-full">
  <img
    class="flex-[1] object-cover !max-w-[50%] hidden lg:flex"
    src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=action-athlete-barbell-841130.jpg&fm=jpg"
    alt="simpletor"
  />
  <div class="flex flex-col items-center justify-center w-full pb-20">
    <section
      class="bg-base-200 py-7 px-5 rounded-md flex flex-col items-center gap-3 w-[93%] xs:w-[80%] md:w-[50%] lg:w-[60%]"
    >
      <!-- login title -->
      <LoginTitle {loginReason} />

      <div class="flex flex-col gap-2 w-[90%] items-center">
        <div class="divider divider-vertical px-3" />

        <!-- Login option -->
        <div class="flex flex-row items-center justify-center gap-5">
          {#each googleOrder as authProvider, i}
            <LoginOption
              {authProvider}
              bind:loading
              bind:deleteUserDialog
              {loginReason}
              isActive={isActive[authProvider] ?? false}
            />
          {/each}
        </div>

        <!-- Divider -->
        <div class="divider divider-vertical px-3 py-4">
          <h3 class="opacity-70 text-xs">
            {translate("or", $_)}
          </h3>
        </div>
      </div>
      <div class="flex flex-row items-center w-full justify-center">
        <div class="max-w-[400px]">
          <!-- Phone field -->
          <CustomPhoneField on:phoneChange={handlePhoneChange} />
        </div>
      </div>

      <!-- End Button -->
      <button
        class="btn btn-md sm:text-xl btn-primary w-[80%] {loading
          ? 'opacity-55'
          : ''} {maxButtonSize} hover:outline"
        on:click={() => handleClick(AuthProvider.Phone)}
      >
        {#if loading}
          <div class="loading loading-spinner" />
        {:else}
          {translate("login", $_)}
        {/if}
      </button>
    </section>
  </div>
</main>
