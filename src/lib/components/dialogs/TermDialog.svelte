<script lang="ts">
  import UserHelper from "$lib/helpers/user/user_helper";
  import BusinessInitializer from "$lib/initializers/business_initializer";
  import { businessStore } from "$lib/stores/Business";
  import { userStore } from "$lib/stores/User";
  import { _, translate } from "$lib/utils/translate";
  import { createEventDispatcher } from "svelte";
  import DialogTitel from "../custom_components/DialogTitel.svelte";
  import GeneralIcon from "../custom_components/GeneralIcon.svelte";
  import DialogStrucher from "./DialogStrucher.svelte";

  export let dialog: HTMLDialogElement;

  const dispatcher = createEventDispatcher();

  let loading = false;

  $: dateToApprove =
    $userStore.termsApprovals[BusinessInitializer.GI().business.businessId];
  $: isConfirmed =
    dateToApprove != null &&
    dateToApprove >
      BusinessInitializer.GI().business.design.lastTimeToUpdateTerm;

  async function onConfirmTerm() {
    if (loading) {
      return;
    }
    if (isConfirmed) {
      return;
    }
    loading = true;

    try {
      dispatcher("onConfirmTerm");
      isConfirmed = await UserHelper.GI().addTermApproval(
        BusinessInitializer.GI().business.businessId
      );
    } finally {
      loading = false;
    }
  }
</script>

<DialogStrucher bind:dialog>
  <div
    class="modal-box bg-base-200 pb-10 flex flex-col justify-center gap-6 max-h-[570px]"
  >
    <DialogTitel titleTransKey={"term"} {dialog} />
    <div class="flex flex-col gap-3 items-center h-full">
      <!-- term text -->
      <h3 class="text-sm text-center mx-6 mb-8">
        {$businessStore?.design.term}
      </h3>

      <!-- confirm button -->
      <button
        on:click={onConfirmTerm}
        class="btn lg:btn-md bg-primary btn-primary flex items-center justify-center"
      >
        {#if loading}
          <div class="loading loading-spinner" />
        {:else if !isConfirmed}
          {translate("confirmTerm", $_)}
        {:else if isConfirmed}
          <div class="flex flex-row justify-center items-center">
            <GeneralIcon icon="line-md:circle-to-confirm-circle-transition" />
            <div class="w-[10px]"></div>
            {translate("termConfirmed")}
          </div>
        {/if}
      </button>
    </div>
  </div>
</DialogStrucher>
