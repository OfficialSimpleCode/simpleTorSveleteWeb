<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import {
    AuthProvider,
    authProviderToImage,
    authProviderToStr,
    googleOrder,
  } from "$lib/consts/auth";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import UserInitializer from "$lib/initializers/user_initializer";
  import { LoginType } from "$lib/services/external_services/firebase_auth_service";
  import { ShowToast } from "$lib/stores/ToastManager";
  import { isConnectedStore } from "$lib/stores/User";
  import { translate } from "$lib/utils/translate";

  async function handleClick(authProvider: AuthProvider) {
    //facebook is will be active soon
    if (AuthProvider.Facebook === authProvider) {
      ShowToast({
        text: translate("soon"),
        status: "info",
      });
      return;
    }
    const resp = await VerificationHelper.GI().handleLogin({
      provider: authProvider,
      loginType: LoginType.login,
    });

    await UserInitializer.GI().setupUser({
      newUserId: UserInitializer.GI().userId,
    });

    if (!$isConnectedStore) {
      goto(`${base}/account-setup`);
      return;
    }

    goto(`${base}/business`);
  }
</script>

<main class="flex w-full h-full">
  <img
    class="flex-[1] object-cover !max-w-[50%] hidden lg:flex"
    src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=action-athlete-barbell-841130.jpg&fm=jpg"
    alt="simpletor"
  />

  <div
    class="flex-[1] flex flex-col justify-center items-center xs:gap-8 gap-5 sm:mx-[70px] mx-3 my-[100px]"
  >
    <h1 class="text-3xl text-center">Login Or Signup</h1>
    {#each googleOrder as authProvider, i}
      <button
        on:click={() => handleClick(authProvider)}
        class="btn xs:btn-lg btn-outline w-full {authProvider ===
        AuthProvider.Facebook
          ? 'opacity-50'
          : ''}"
      >
        <img
          class="w-10 h-10"
          src={authProviderToImage[authProvider]}
          alt={authProviderToStr[authProvider]}
        />
        Signin with {authProviderToStr[authProvider]}
      </button>
    {/each}
  </div>
</main>
