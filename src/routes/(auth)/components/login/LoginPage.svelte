<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import CustomPhoneField from "$lib/components/custom_components/CustomPhoneField.svelte";
  import PhoneDialog from "$lib/components/dialogs/phone_dialog/PhoneDialog.svelte";
  import { sendSms } from "$lib/components/dialogs/phone_dialog/helpers/send_sms";
  import {
    AuthProvider,
    LoginReason,
    authProviderList,
    authProviderToProviderId,
    googleOrder,
  } from "$lib/consts/auth";
  import { maxButtonSize } from "$lib/consts/sizes";
  import type { PhonePickerEvent } from "$lib/consts/text_fields";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { businessStore } from "$lib/stores/Business";
  import { isConnectedStore } from "$lib/stores/User";
  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  import DeleteUserDialog from "./components/DeleteUserDialog.svelte";
  import LoginOption from "./components/LoginOption.svelte";
  import LoginTitle from "./components/LoginTitle.svelte";

  export let loginReason: LoginReason = LoginReason.login;
  let deleteUserDialog: HTMLDialogElement;
  let validPhone: boolean = false;
  let isActive: { [key in AuthProvider]?: boolean } = {};
  let phoneDialog: HTMLDialogElement;
  let phoneNumber: string;
  let loading: boolean = false;

  $: authProviderList.forEach((provider) => {
    if ($isConnectedStore == null) {
      return;
    }
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
    if (AuthProvider.Phone !== authProvider) {
      return;
    }
    loading = true;
    sendSms(phoneNumber);
    openPhoneDialog();
  }
  async function onFinishLogin() {
    if (VerificationHelper.GI().needToMakeBookingAfterLogin) {
      await goto(`${base}/business/${$businessStore?.url ?? ""}/order`);
    } else {
      if ($businessStore != null) {
        await goto(`${base}/business/${$businessStore?.url ?? ""}`);
      } else {
        await goto(`${base}/`);
      }
    }
    loading = false;
  }

  function openPhoneDialog() {
    pushDialog(phoneDialog);
  }

  function handlePhoneChange(event: CustomEvent<PhonePickerEvent>): void {
    validPhone = event.detail.isValid;
    phoneNumber = event.detail.value ?? "";
  }

  function onDeleteUser() {
    pushDialog(deleteUserDialog);
  }

  function onCloseDialog() {
    loading = false;
  }
</script>

<!-- Dialog -->

<PhoneDialog
  {loginReason}
  bind:dialog={phoneDialog}
  insideOtp={true}
  on:onFinishLogin={onFinishLogin}
  on:onDeleteUser={onDeleteUser}
  on:close={onCloseDialog}
/>
<DeleteUserDialog bind:dialog={deleteUserDialog} bind:loadingLogin={loading} />

<main class="flex w-full h-full">
  <div class="flex flex-col items-center justify-center w-full pb-20">
    <section
      class="bg-base-200 py-7 px-5 rounded-md flex flex-col items-center gap-3 w-[93%] md:w-[50%] lg:w-[40%] max-w-[500px]"
    >
      <!-- login title -->
      <LoginTitle {loginReason} />

      <div class="flex flex-col gap-2 w-full items-center">
        <div class="divider divider-vertical px-3" />

        <!-- Login option -->
        <div class="flex flex-row items-center justify-center gap-5">
          {#each googleOrder as authProvider, i}
            <LoginOption
              {authProvider}
              bind:loading
              on:onDeleteUser={onDeleteUser}
              on:onFinishLogin={onFinishLogin}
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
        class="btn btn-md sm:text-md btn-primary w-[80%] {loading
          ? 'opacity-55'
          : ''} {maxButtonSize} hover:outline"
        on:click={() => handleClick(AuthProvider.Phone)}
      >
        {#if loading}
          <div class="loading loading-spinner" />
        {:else}
          {translate(
            loginReason === LoginReason.linkProvider
              ? "addAuthProvider"
              : loginReason === LoginReason.deleteUser
                ? "deleteUser"
                : "login",
            $_
          )}
        {/if}
      </button>
    </section>
  </div>
</main>
