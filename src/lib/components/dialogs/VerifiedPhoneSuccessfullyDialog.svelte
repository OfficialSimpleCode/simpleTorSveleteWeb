<script lang="ts">
  import PhoneDataResult from "$lib/models/resps/phone_data_result";
  import { formatedPhone } from "$lib/utils/string_utils";
  import { translate } from "$lib/utils/translate";

  export let dialog: HTMLDialogElement;
  export function show(phoneDataResult: PhoneDataResult) {
    dialog.showModal();
    phoneData = phoneDataResult;
  }
  let phoneData: PhoneDataResult = new PhoneDataResult({ phone: "" });
</script>

<dialog
  bind:this={dialog}
  on:close={() => history.back()}
  class="modal modal-bottom sm:modal-middle"
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
        formatedPhone(phoneData.phone)
      )}
    </h3>

    <!-- text to explain what data we have merged to this user -->
    {#if !phoneData.isEmpty}
      <h3 class="text-sm">
        {phoneData.whatWeFoundStr}
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
