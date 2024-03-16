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

  let intervalId: NodeJS.Timeout;

  // function addClassToRecaptchaElements() {
  //   const elements = document.querySelectorAll('[id*="recaptcha"]');
  //   elements.forEach((element: any) => {
  //     element.classList.add("z-[1000000000]");
  //   });
  // }

  // onMount(() => {
  //   intervalId = setInterval(addClassToRecaptchaElements, 2000);
  // });

  // onDestroy(() => {
  //   clearInterval(intervalId);
  // });
</script>

<RecaptchaDialog bind:recaptchaDialog />

<DialogStrucher bind:dialog onlyMiddle={true} on:close={onClose}>
  <div
    class="absolute flex items-center justify-center w-full h-full 1z-[10000000]"
  >
    <div
      class="modal-box bg-base-200 pb-10 max-w-[400px] flex flex-col items-center justify-center"
    >
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

    <div class="absolute bottom-4 right-0 z-[10000]">
      <div id="recaptcha-container"></div>
    </div>
  </div>
</DialogStrucher>
