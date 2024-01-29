<script lang="ts">
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import OtpInput from "svelte-otp";

  import { goto } from "$app/navigation";
  import UpdatePageHeader from "$lib/components/UpdatePageHeader.svelte";
  import { userStore } from "$lib/stores/User";
  import { _, translate } from "$lib/utils/translate";

  let codeSent: boolean = false;
  let oneTimeCode: string = "";

  let isVerifing: boolean = false;

  onMount(() => {
    // Send code
    setTimeout(() => (codeSent = true), 2000);
  });

  function verifyCode() {}

  function updatePhoneNumber() {
    goto(`${base}/update-profile-phone`, { replaceState: true });
  }

  function onChange(event: CustomEvent) {
    if (event.detail.isInputComplete) {
      // auto verify
      isVerifing = true;
      console.log("compleated", event.detail.completevalue);
    }
    console.log("emittedValue", event.detail);
  }
</script>

<main class="flex flex-col items-center mx-4 mt-0 gap-10 h-full">
  <UpdatePageHeader
    title={translate("verifyPhoneMechanizem", $_)}
    helpMessage={translate("phoneVerificationPageExplain", $_)}
  />

  <div class="flex items-center justify-center w-full h-[60%]">
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form class="card-body">
        <div class="form-control">
          <label class="label" for="one-time-code">
            <span class="label-text">{$_("pressOpt")}</span>
            <span class="label-text-alt">
              {#if codeSent}
                <div class="badge badge-success">
                  {translate("sendSuccess", $_)}
                </div>
              {:else}
                <div class="badge badge-warning">
                  <div class="loading loading-spinner loading-xs"></div>
                </div>
              {/if}
            </span>
          </label>
          <div class="text-lg">
            <OtpInput
              on:notify={onChange}
              autoFocusNextOnInput={true}
              focusPreviousOnDelete={true}
              separator="-"
              placeholder=""
              numberOfInputs={6}
            />
          </div>
        </div>
        <p>sent to: {$userStore.phoneNumber}</p>
        <div class="form-control mt-6 gap-1">
          <button
            class="btn btn-primary {isVerifing ? 'opacity-50' : ''}"
            on:click={verifyCode}
          >
            {isVerifing ? "Verifing.." : translate("verifyPhone", $_)}
          </button>
          <button
            class="btn btn-outline"
            on:click|preventDefault={updatePhoneNumber}
          >
            {translate("phoneUpdate", $_)}
          </button>
        </div>
      </form>
    </div>
  </div>
</main>
