<script lang="ts">
  import CustomPhoneField from "$lib/components/custom_components/CustomPhoneField.svelte";
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
  import { isConnectedStore, userStore } from "$lib/stores/User";
  import { _, translate } from "$lib/utils/translate";
  import { sendSms } from "./otp_input_container/helpers/send_sms";

  import { ShowToast } from "$lib/stores/ToastManager";
  import { createEventDispatcher } from "svelte";
  import LoginOption from "./LoginOption.svelte";
  import LoginTitle from "./LoginTitle.svelte";

  export let loginReason: LoginReason;
  export let isOtp: boolean;

  export let loading: boolean;
  export let validPhone: boolean = false;
  const dispatch = createEventDispatcher();
  let isActive: { [key in AuthProvider]?: boolean } = {};

  let phoneNumber: string;

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
    if (
      loginReason === LoginReason.linkProvider &&
      VerificationHelper.GI().existsLoginProviders.has(
        authProviderToProviderId[authProvider]
      )
    ) {
      ShowToast({
        text: translate("alreadyInUse", $_),
        status: "info",
      });
      return;
    }

    if (
      loginReason === LoginReason.linkProvider &&
      $userStore.isVerifiedPhone
    ) {
      ShowToast({
        text: translate("phoneAlreadyVerified", $_),
        status: "info",
      });
      return;
    }

    if (
      loginReason === LoginReason.deleteUser &&
      !VerificationHelper.GI().existsLoginProviders.has(
        authProviderToProviderId[authProvider]
      )
    ) {
      ShowToast({
        text: translate("canVerifyOnlyWithExistProviders", $_),
        status: "info",
      });
      return;
    }
    if (loading || !validPhone) {
      return;
    }

    if (AuthProvider.Phone !== authProvider) {
      return;
    }
    loading = true;
    sendSms(phoneNumber);
    //change the ui to the otp container
    isOtp = true;
  }

  function handlePhoneChange(event: CustomEvent<PhonePickerEvent>): void {
    validPhone = event.detail.isValid;
    phoneNumber = event.detail.value ?? "";
  }
</script>

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
          {dispatch}
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
    class="btn btn-md sm:text-md btn-primary w-[80%] {loading ||
    !Object.values(isActive).includes(true)
      ? 'opacity-55'
      : ''} {maxButtonSize} hover:outline"
    on:click={() => handleClick(AuthProvider.Phone)}
  >
    {#if loading}
      <div class="loading loading-spinner" />
    {:else}
      {translate(
        !Object.values(isActive).includes(true)
          ? "hadAllTheProviders"
          : loginReason === LoginReason.linkProvider
            ? "addAuthProvider"
            : loginReason === LoginReason.deleteUser
              ? "deleteUser"
              : "login",
        $_
      )}
    {/if}
  </button>
</section>
