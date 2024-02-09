<script lang="ts">
  import { pushState } from "$app/navigation";
  import { page } from "$app/stores";
  import {
    AuthProvider,
    LoginReason,
    authProviderToImage,
    authProviderToProviderId,
    authProviderToStr,
    googleOrder,
  } from "$lib/consts/auth";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { ShowToast } from "$lib/stores/ToastManager";
  import { _, translate } from "$lib/utils/translate";
  import { createEventDispatcher } from "svelte";
  import LogoAndName from "../custom_components/LogoAndName.svelte";
  import PhoneDialog from "./components/PhoneDialog.svelte";
  import { handleLogin } from "./helpers/handle_login";
  export let loginReason: LoginReason = LoginReason.login;
  const dispatch = createEventDispatcher();

  let phoneDialog: HTMLDialogElement;
  let loading: boolean = false;

  let isActive: Map<AuthProvider, boolean> = new Map();

  googleOrder.forEach((provider) => {
    //facebook is will be active soon
    if (AuthProvider.Facebook === provider) {
      isActive.set(provider, false);
      return;
    }

    //handle the click for link provider
    if (
      loginReason === LoginReason.linkProvider &&
      VerificationHelper.GI().existsLoginProviders.has(
        authProviderToProviderId[provider]
      )
    ) {
      isActive.set(provider, false);
      return;
    }

    //handle the click for delete user
    if (
      loginReason === LoginReason.deleteUser &&
      !VerificationHelper.GI().existsLoginProviders.has(
        authProviderToProviderId[provider]
      )
    ) {
      isActive.set(provider, false);
      return;
    }
    isActive.set(provider, true);
  });
  async function handleClick(authProvider: AuthProvider) {
    if (loading) {
      return;
    }
    console.log(VerificationHelper.GI().existsLoginProviders);
    //facebook is will be active soon
    if (AuthProvider.Facebook === authProvider) {
      ShowToast({
        text: translate("soon", $_),
        status: "info",
      });
      return;
    }

    //handle the click for link provider
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

    //handle the click for delete user
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

    if (AuthProvider.Phone === authProvider) {
      openPhoneDialog();
      return;
    }
    loading = true;
    try {
      await handleLogin({
        provider: authProvider,
        loginReason: loginReason,
        dispatch: dispatch,
      });
    } finally {
      loading = false;
    }
  }

  function openPhoneDialog() {
    pushState("", {
      showModal: true,
    });
    setTimeout(() => phoneDialog.showModal(), 200);
  }
</script>

<!-- Dialog -->
{#if $page.state.showModal}
  <PhoneDialog {loginReason} {dispatch} bind:dialog={phoneDialog} />
{/if}

<main class="flex w-full h-full">
  <img
    class="flex-[1] object-cover !max-w-[50%] hidden lg:flex"
    src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=action-athlete-barbell-841130.jpg&fm=jpg"
    alt="simpletor"
  />

  <div
    class="flex-[1] flex flex-col xs:gap-8 gap-5 sm:mx-[70px] mx-3 my-[50px] justify-between items-center"
  >
    <LogoAndName
      subTitle={translate(
        loginReason == LoginReason.deleteUser
          ? "sorryToSeeYouLeave"
          : loginReason == LoginReason.linkProvider
            ? "addAuthProvider"
            : "joinOurFamily"
      )}
    />

    <div class="flex flex-col xs:gap-8 gap-5 mb-[50px]">
      <h1 class="text-4xl text-center">
        {translate(
          loginReason === LoginReason.deleteUser
            ? "deleteUser"
            : loginReason === LoginReason.linkProvider
              ? "addingAuthProvider"
              : "loggin"
        )}
      </h1>
      {#if loginReason === LoginReason.linkProvider}
        <h1 class="text-xs text-center opacity-70">
          {translate("yourAcountIsImportantForUs")}
        </h1>
      {/if}

      {#if loginReason === LoginReason.deleteUser}
        <div class="flex flex-col">
          <h1 class="text-md text-center opacity-70">
            {translate("deleteUserIsSesnstive", undefined, false)}
          </h1>
          <h1 class="text-xs text-center opacity-70">
            {translate("noticeYouHaveBusinesses")}
          </h1>
        </div>
      {/if}

      {#each googleOrder as authProvider, i}
        <button
          on:click={() => handleClick(authProvider)}
          class="btn xs:btn-lg btn-outline w-full {!isActive.get(
            authProvider
          ) || loading
            ? 'opacity-50'
            : ''}"
        >
          <img
            class="w-10 h-10"
            src={authProviderToImage[authProvider]}
            alt={authProviderToStr[authProvider]}
          />{translate(
            loginReason == LoginReason.deleteUser
              ? "verifWith"
              : loginReason == LoginReason.linkProvider
                ? "addProviderWith"
                : "signInWith"
          ).replaceAll(
            "PROVIDER",
            translate(authProviderToStr[authProvider] ?? "")
          )}
        </button>
      {/each}
    </div>

    <div class="h-[50px] mb-[50px]"></div>
    {#if loading}
      <div class="loading loading-spinner" />
    {/if}
  </div>
</main>
