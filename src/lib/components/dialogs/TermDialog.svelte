<script lang="ts">
  import UserHelper from "$lib/helpers/user/user_helper";
  import BusinessInitializer from "$lib/initializers/business_initializer";
  import { businessStore } from "$lib/stores/Business";
  import { userStore } from "$lib/stores/User";
  import { translate } from "$lib/utils/translate";
  import { Icon, XCircle } from "svelte-hero-icons";
  import GeneralIcon from "../GeneralIcon.svelte";

  export let dialog: HTMLDialogElement;

  let isConfirmed = false;
  let loading = false;

  userStore.subscribe((value) => {
    const dateToApprove =
      value.termsApprovals[BusinessInitializer.GI().business.businessId];
    isConfirmed =
      dateToApprove != null &&
      dateToApprove >
        BusinessInitializer.GI().business.design.lastTimeToUpdateTerm;
  });

  async function onConfirmTerm() {
    if (loading) {
      return;
    }
    if (isConfirmed) {
      return;
    }
    loading = true;
    try {
      await UserHelper.GI().addTermApproval(
        BusinessInitializer.GI().business.businessId
      );
    } finally {
      loading = false;
    }
  }
</script>

<dialog
  bind:this={dialog}
  on:close={() => history.back()}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box bg-base-200 items-center">
    <div class="flex flex-col gap-3 items-center h-full">
      <!-- title and top buttons -->
      <div class="flex flex-row justify-between items-center relative">
        <!-- close button -->
        <button class="btn btn-ghost" on:click={() => dialog.close()}>
          <Icon src={XCircle} size="24px" />
        </button>

        <!-- title -->
        <h3 class="font-bold text-lg text-center">
          {translate("term")}
        </h3>

        <p></p>
      </div>

      <!-- term text -->
      <h3 class="text-sm text-center mx-6 mb-8">
        {$businessStore.design.term}
      </h3>

      <!-- confirm button -->
      <button
        on:click={onConfirmTerm}
        class="btn lg:btn-md bg-primary btn-primary flex items-center justify-center"
      >
        {#if loading}
          <div class="loading loading-spinner" />
        {:else if !isConfirmed}
          {translate("confirmTerm")}
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
  <!-- backdrop close dialog -->
  <form method="dialog" class="modal-backdrop">
    <button></button>
  </form>
</dialog>
