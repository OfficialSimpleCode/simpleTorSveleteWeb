<script lang="ts">
  import { formatedPhone } from "$lib/utils/string_utils";
  import { translate } from "$lib/utils/translate";
  import { authDataStore } from "../../../routes/(auth)/auth_controller";

  export let dialog: HTMLDialogElement;
</script>

<dialog
  bind:this={dialog}
  on:close={() => history.back()}
  class="modal modal-middle"
>
  <div
    class="modal-box flex flex-col gap-4 bg-base-200 items-center text-center"
  >
    <!-- title -->
    <h3 class="font-bold text-lg pb-4">
      {translate("phoneIsVerfied")}
    </h3>

    <!-- success anomation  -->
    <!-- <LottieAnimation animationFile={sendMessageAnimation} /> -->

    <!-- explanation text -->
    <h3 class="text-md">
      {translate("nowWeCanRecognizeYou").replaceAll(
        "PHONE",
        formatedPhone($authDataStore.phoneData.phone)
      )}
    </h3>

    <!-- text to explain what data we have merged to this user -->
    {#if !$authDataStore.phoneData.isEmpty}
      <h3 class="text-sm">
        {$authDataStore.phoneData.whatWeFoundStr}
      </h3>
    {/if}

    <!-- "OK" button to close this modal -->
    <button
      on:click={() => dialog.close()}
      class="btn lg:btn-lg bg-primary btn-primary flex items-center justify-center w-full"
    >
      {translate("ok")}
    </button>
  </div>

  <!-- backdrop close dialog -->
  <form method="dialog" class="modal-backdrop">
    <button></button>
  </form>
</dialog>
