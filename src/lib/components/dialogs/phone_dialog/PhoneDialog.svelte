<script lang="ts">
  import { LoginReason } from "$lib/consts/auth";
  import { createEventDispatcher } from "svelte";
  import GetOtpView from "./components/GetOtpView.svelte";
  import GetPhoneView from "./components/GetPhoneView.svelte";
  export let loginReason: LoginReason;
  export let dialog: HTMLDialogElement;
  export let insideOtp: boolean = false;
  const dispatch = createEventDispatcher();
</script>

<dialog
  bind:this={dialog}
  class="modal modal-middle"
  on:close={() => {
    insideOtp = false;
    dialog.close();
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
      <GetOtpView {loginReason} {dialog} {dispatch} />
    {/if}
  </div>
  <form method="dialog" class="modal-backdrop">
    <button></button>
  </form>
</dialog>
