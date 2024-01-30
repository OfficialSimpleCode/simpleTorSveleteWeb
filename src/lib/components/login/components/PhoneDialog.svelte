<script lang="ts">
  import { LoginReason } from "$lib/consts/auth";
  import GetOtpView from "./phone_dialog/components/GetOtpView.svelte";
  import GetPhoneView from "./phone_dialog/components/GetPhoneView.svelte";
  export let loginReason: LoginReason;
  export let dialog: HTMLDialogElement;
  let insideOtp: boolean = false;
</script>

<dialog
  bind:this={dialog}
  class="modal modal-bottom sm:modal-middle"
  on:close={() => {
    insideOtp = false;

    history.back();
  }}
>
  <div class="modal-box bg-base-200 pb-10">
    {#if !insideOtp}
      <GetPhoneView
        {dialog}
        on:navigateOtp={(e) => {
          insideOtp = true;
        }}
      />
    {:else}
      <GetOtpView {loginReason} {dialog} />
    {/if}
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
