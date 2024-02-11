<script lang="ts">
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import PublicCustomer from "$lib/models/worker/public_customer";
  import { _, translate } from "$lib/utils/translate";
  import { getPublicCustomer } from "../helpers/get_public_user";
  import { onFinishNavigator } from "../helpers/on_finish_navigator";
  export let verificationDialog: HTMLDialogElement;
  let isLoading: boolean = false;

  const publicCustomer: PublicCustomer = getPublicCustomer();

  async function handleClick() {
    if (isLoading) {
      return;
    }
    isLoading = true;
    try {
      await onFinishNavigator({
        clientNote: "",
        verificationDialog: verificationDialog,
      });
    } finally {
      isLoading = false;
    }
  }
</script>

<!-- xs:px-10 px-3 -->
<div class="w-full">
  <button
    class="btn sm:text-xl btn-primary w-full {isLoading ? 'opacity-55' : ''}"
    on:click={handleClick}
  >
    {#if isLoading}
      <div class="loading loading-spinner" />
    {:else}
      {translate(
        publicCustomer.blocked
          ? "blockUser"
          : $bookingMakerStore.isUpdate
            ? "update"
            : "order2",
        $_
      )}
    {/if}

    {#if publicCustomer.blocked}
      <h3 class="text-sm">{translate("blockedUserCantOrder", $_)}</h3>
    {/if}
  </button>
</div>
