<script lang="ts">
  import {
    AuthProvider,
    LoginReason,
    authProviderToImage,
    authProviderToProviderId,
    authProviderToStr,
  } from "$lib/consts/auth";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { ShowToast } from "$lib/stores/ToastManager";
  import { isConnectedStore } from "$lib/stores/User";
  import { _, translate } from "$lib/utils/translate";
  import { handleLogin } from "../helpers/handle_login";
  export let authProvider: AuthProvider;
  export let loading: boolean;
  export let loginReason: LoginReason;
  export let isActive: boolean;

  async function handleClick(authProvider: AuthProvider) {
    if (loading) {
      return;
    }

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
      $isConnectedStore === true &&
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

    loading = true;
    try {
      await handleLogin({
        provider: authProvider,
        loginReason: loginReason,
      });
    } finally {
      loading = false;
    }
  }
</script>

<button
  on:click={() => handleClick(authProvider)}
  class="btn btn-outline w-[63px] xs:w-[70px] h-[63px] xs:h-[70px] {!isActive ||
  loading
    ? 'opacity-50'
    : ''}"
>
  <img
    class=""
    src={authProviderToImage[authProvider]}
    alt={authProviderToStr[authProvider]}
  />
</button>
