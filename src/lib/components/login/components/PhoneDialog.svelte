<script lang="ts">
  import { LoginReason } from "$lib/consts/auth";
  import { createEventDispatcher, type EventDispatcher } from "svelte";
  import GetOtpView from "./phone_dialog/components/GetOtpView.svelte";
  import GetPhoneView from "./phone_dialog/components/GetPhoneView.svelte";
  export let loginReason: LoginReason;
  export let dialog: HTMLDialogElement;
  export let insideOtp: boolean = false;
  export let dispatch: EventDispatcher<any> = createEventDispatcher();

  console.log("44444444444444");
</script>

<dialog
  bind:this={dialog}
  class="modal modal-middle w-[500px]"
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
      <GetOtpView {loginReason} {dialog} {dispatch} />
    {/if}
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
