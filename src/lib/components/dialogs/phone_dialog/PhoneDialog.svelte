<script lang="ts">
  import { LoginReason } from "$lib/consts/auth";
  import { createEventDispatcher } from "svelte";
  import DialogStrucher from "../DialogStrucher.svelte";
  import GetOtpView from "./components/GetOtpView.svelte";
  import GetPhoneView from "./components/GetPhoneView.svelte";
  import RecaptchaDialog from "./components/RecaptchaDialog.svelte";
  export let loginReason: LoginReason;
  export let dialog: HTMLDialogElement;
  export let insideOtp: boolean = false;
  let recaptchaDialog: HTMLDialogElement;

  const dispatch = createEventDispatcher();
  let otp: string = "";
  function onClose() {
    otp = "";
    dispatch("close");
  }
</script>

<RecaptchaDialog bind:recaptchaDialog />

<DialogStrucher bind:dialog onlyMiddle={true} on:close={onClose}>
  <div class="modal-box bg-base-200 pb-10 max-w-[400px]">
    {#if !insideOtp}
      <GetPhoneView
        {dialog}
        on:navigateOtp={(e) => {
          insideOtp = true;
        }}
      />
    {:else}
      <GetOtpView {loginReason} {dialog} bind:otp {dispatch} />
    {/if}
  </div>
  <div
    id="recaptcha-container"
    class="absolute bottom-1 left-1 !z-[10000]"
  ></div>
</DialogStrucher>
