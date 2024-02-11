<script lang="ts">
  import CustomTextFormField from "$lib/components/custom_components/CustomTextFormField.svelte";
  import { InputOptions } from "$lib/consts/text_fields";
  import { translate } from "$lib/utils/translate";
  import { createEventDispatcher } from "svelte";
  import { Icon, XCircle } from "svelte-hero-icons";
  export let dialog: HTMLDialogElement;
  const dispatch = createEventDispatcher();
</script>

<dialog
  bind:this={dialog}
  class="modal modal-bottom sm:modal-middle bg-center"
  on:close={() => history.back()}
>
  <div class="modal-box bg-base-200 pb-10">
    <div class="flex justify-between items-center mb-[1rem]">
      <p />
      <h3 class="font-bold text-md">
        {translate("confirmPayment", undefined, false)}
      </h3>
      <button class="btn btn-ghost" on:click={() => dialog.close()}>
        <Icon src={XCircle} size="24px" />
      </button>
    </div>

    <div class="flex flex-col">
      <div class="form-control mt-6">
        <CustomTextFormField
          type={InputOptions.password}
          pattern=""
          isRequired={true}
        />
        <h3 class="font-bold text-xs opacity-70">
          {translate("enterTheCardPassword")}
        </h3>
      </div>

      <button
        class="btn btn-primary"
        on:click={() => dispatch("onFinishVerifiedCardPassword")}
      >
        {translate("finish")}
      </button>
    </div>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button></button>
  </form>
</dialog>
