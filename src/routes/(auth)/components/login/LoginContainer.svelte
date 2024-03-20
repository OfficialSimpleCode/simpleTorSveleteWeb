<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import ExitFromInstagramExplain from "$lib/components/ExitFromInstagramExplain.svelte";
  import { LoginReason } from "$lib/consts/auth";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { businessStore } from "$lib/stores/Business";
  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  import { createEventDispatcher, onMount } from "svelte";
  import ChooseProviderContainer from "./components/ChooseProviderContainer.svelte";
  import DeleteUserDialog from "./components/DeleteUserDialog.svelte";
  import OtpInputContainer from "./components/otp_input_container/OtpInputContainer.svelte";

  export let loginReason: LoginReason = LoginReason.login;
  export let isOtp: boolean = false;
  export let defaultHandlingOnEnd: boolean = true;
  export let needRecaptchaContainer: boolean = true;
  export let canReturnToChooseProvider: boolean = true;
  export let otpTitle: string = translate("otpTitle", $_);
  export let otpSubTitle: string = translate("otpSubTitle", $_);
  const dispatch = createEventDispatcher();
  let deleteUserDialog: HTMLDialogElement;
  let loading: boolean = false;
  let userAgent: string = "";

  let isInstagramWebView: boolean = false;

  function checInInstagram() {
    //check the user agent - method 1
    const method1Resp = /Instagram/.test(navigator.userAgent);

    //check the user agent - method 2
    userAgent = window.navigator.userAgent.toLowerCase();
    const method2Resp = userAgent.includes("instagram");

    //check the two methods for insurance
    isInstagramWebView = method2Resp || method1Resp;
  }
  onMount(() => {
    checInInstagram();

    // check again the make sure no mistake made
    setInterval(() => {
      checInInstagram();
    }, 1000);
  });

  async function onFinishLogin() {
    dispatch("onFinishLogin");
    loading = false;
    if (!defaultHandlingOnEnd) {
      return;
    }

    if (VerificationHelper.GI().needToMakeBookingAfterLogin) {
      await goto(`${base}/business/${$businessStore?.url ?? ""}/order`);
    } else {
      if ($businessStore != null) {
        await goto(`${base}/business/${$businessStore?.url ?? ""}`);
      } else {
        await goto(`${base}/`);
      }
    }
  }

  async function onVerifyPhone() {
    dispatch("onVerifyPhone");
    loading = false;
    if (!defaultHandlingOnEnd) {
      return;
    }

    await goto(`${base}/profile`);
  }
  function onDeleteUser() {
    pushDialog(deleteUserDialog);
  }
</script>

{#if isInstagramWebView}
  <ExitFromInstagramExplain />
{:else}
  <!-- Dialog -->

  <DeleteUserDialog
    bind:dialog={deleteUserDialog}
    bind:loadingLogin={loading}
  />

  <main class="flex w-full h-full">
    <div
      class="flex flex-col items-center justify-center w-full pb-20 transition ease-in-out delay-150"
    >
      {#if isOtp}
        <OtpInputContainer
          {loginReason}
          bind:isOtp
          {otpTitle}
          {otpSubTitle}
          {canReturnToChooseProvider}
          on:onVerifyPhone={onVerifyPhone}
          on:onDeleteUser={onDeleteUser}
          on:onFinishLogin={onFinishLogin}
        />
      {:else}
        <ChooseProviderContainer
          {loginReason}
          {loading}
          on:onDeleteUser={onDeleteUser}
          on:onFinishLogin={onFinishLogin}
          bind:isOtp
        />
      {/if}
    </div>
    {#if needRecaptchaContainer}
      <div class="absolute bottom-4 left-0 z-40">
        <div id="recaptcha-container"></div>
      </div>
    {/if}
  </main>
{/if}
<!-- write the var on the screen to force the var to update -->
<p class="text-base-100 opacity-0">{userAgent}</p>
