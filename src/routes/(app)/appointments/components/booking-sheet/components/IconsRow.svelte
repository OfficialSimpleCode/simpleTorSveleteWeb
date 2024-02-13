<script lang="ts">
  import { page } from "$app/stores";
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import NavigationDialog from "$lib/components/dialogs/NavigationDialog.svelte";
  import Booking from "$lib/models/booking/booking_model";
  import type WorkerModel from "$lib/models/worker/worker_model";
  import { pushDialog } from "$lib/utils/general_utils";
  import { deleteBooking } from "../../../helpers/delete_booking";
  import { updateBooking } from "../../../helpers/update_booking";
  export let mainDialog: HTMLDialogElement;
  export let booking: Booking;
  export let currentWorker: WorkerModel | undefined;
  export let downloadAppDialog: HTMLDialogElement | undefined;

  let navigationDialog: HTMLDialogElement;
  let loadingDelete: boolean = false;

  // open choose navigation option dialog
  function openNavigationDialog() {
    pushDialog(navigationDialog);
  }

  function openDownloadAppDialog() {
    pushDialog(downloadAppDialog);
  }

  async function onDelete() {
    if (loadingDelete) {
      return;
    }
    loadingDelete = true;
    try {
      const resp = await deleteBooking({
        booking: booking,
        worker: currentWorker,
      });
      if (resp) {
        mainDialog.close();
      }
    } finally {
      loadingDelete = false;
    }
  }
  async function onUpdate() {
    if (loadingDelete) {
      return;
    }

    const resp = await updateBooking({
      booking: booking,
      worker: currentWorker,
    });
  }
</script>

<!-- the page dialogs -->
{#if $page.state.showModal}
  <NavigationDialog bind:dialog={navigationDialog} />
{/if}

<div class="flex flex-row gap-4 justify-start w-full">
  <CustomCircleIcon
    icon="mdi:trash-can-outline"
    translateKey="delete"
    loading={loadingDelete}
    handleClick={onDelete}
  />
  <CustomCircleIcon
    active={!booking.isMultiRef}
    icon="mdi:edit-outline"
    translateKey="edit"
    handleClick={onUpdate}
  />
  <CustomCircleIcon
    icon="mdi:map-marker-outline"
    translateKey="navigate"
    handleClick={openNavigationDialog}
  />

  {#if booking.invoices.size > 0}
    <CustomCircleIcon
      icon="mdi:invoice-text"
      translateKey="invoice"
      handleClick={openDownloadAppDialog}
    />
  {/if}
</div>
