<script lang="ts">
  import { successAnimation } from "$lib/consts/resources";
  import type PhoneDataResult from "$lib/models/resps/phone_data_result";
  import { formatedPhone } from "$lib/utils/string_utils";
  import { translate } from "$lib/utils/translate";
  import LottieAnimation from "../LottieAnimation.svelte";

  export let dialog: HTMLDialogElement;
  export let phoneDataResult: PhoneDataResult;
</script>

<dialog
  bind:this={dialog}
  on:close={() => history.back()}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box bg-base-200 pb-10 items-center">
    <h3 class="font-bold text-md text-center">
      {translate("phoneIsVerfied")}
    </h3>
    <LottieAnimation animationFile={successAnimation} />
    <h3 class="text-md">
      {translate("nowWeCanRecognizeYou").replaceAll(
        "PHONE",
        formatedPhone(phoneDataResult.phone)
      )}
    </h3>
    {#if !phoneDataResult.isEmpty}
      <h3 class="text-sm">
        {phoneDataResult.whatWeFoundStr}
      </h3>
    {/if}
    <button
      on:click={() => dialog.close()}
      class="btn lg:btn-lg bg-primary btn-primary flex items-center justify-center"
    >
      {translate("ok")}
    </button>
  </div>
</dialog>
