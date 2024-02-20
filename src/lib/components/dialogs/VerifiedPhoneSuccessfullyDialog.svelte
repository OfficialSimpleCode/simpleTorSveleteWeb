<script lang="ts">
  import { successAnimation } from "$lib/consts/resources";
  import { formatedPhone } from "$lib/utils/string_utils";
  import { _, translate } from "$lib/utils/translate";
  import { authDataStore } from "../../../routes/(auth)/auth_controller";
  import LottieAnimation from "../custom_components/LottieAnimation.svelte";

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
      {translate("phoneIsVerfied", $_)}
    </h3>
    <!-- success anomation  -->
    <div class="flex items-center">
      <LottieAnimation animationFile={successAnimation} size="xl2" />
    </div>

    <!-- explanation text -->
    <h3 class="text-md">
      {translate("nowWeCanRecognizeYou", $_).replaceAll(
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
      class="btn btn-sm btn-primary w-full max-w-[170px] bt-3"
    >
      {translate("ok", $_)}
    </button>
  </div>

  <!-- backdrop close dialog -->
  <form method="dialog" class="modal-backdrop">
    <button></button>
  </form>
</dialog>
