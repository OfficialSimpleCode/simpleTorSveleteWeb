<script lang="ts">
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import DeleteBookingDialog from "$lib/components/dialogs/DeleteBookingDialog.svelte";
  import NavigationDialog from "$lib/components/dialogs/NavigationDialog.svelte";
  import type { DeleteOption } from "$lib/consts/booking";
  import { ErrorsController } from "$lib/controllers/errors_controller";
  import BusinessInitializer from "$lib/initializers/business_initializer";
  import Booking from "$lib/models/booking/booking_model";
  import { businessStore } from "$lib/stores/Business";
  import { ShowToast } from "$lib/stores/ToastManager";
  import { pushDialog } from "$lib/utils/general_utils";
  import { translate } from "$lib/utils/translate";
  import { deleteBooking } from "../../../helpers/delete_booking";
  import { restoreBooking } from "../../../helpers/restore_booking";
  import { updateBooking } from "../../../helpers/update_booking";
  import DeleteBookingWithoutWorker from "./DeleteBookingWithoutWorker.svelte";
  export let mainDialog: HTMLDialogElement;
  export let booking: Booking;
  export let downloadAppDialog: HTMLDialogElement | undefined;

  let navigationDialog: HTMLDialogElement;

  let deleteBookingWithoutWorkerDialog: HTMLDialogElement;

  let deleteDialog: HTMLDialogElement;
  let loadingDelete: boolean = false;
  let loadingUpdate: boolean = false;

  // open choose navigation option dialog
  function openNavigationDialog() {
    pushDialog(navigationDialog);
  }

  function openDownloadAppDialog() {
    pushDialog(downloadAppDialog);
  }

  function onClickDelete() {
    if (booking.buisnessId != $businessStore?.businessId ?? "") {
      ShowToast({ status: "info", text: translate("needToLoadBusiness") });
      return;
    }
    if (BusinessInitializer.GI().isExistWorker(booking.workerId)) {
      pushDialog(deleteBookingWithoutWorkerDialog);
      return;
    }
    if (booking.needCancel) {
      handleRestore();
    } else {
      pushDialog(deleteDialog);
    }
  }

  async function handleRestore() {
    if (loadingDelete) {
      return;
    }
    loadingDelete = true;
    try {
      await restoreBooking(booking);
    } finally {
      loadingDelete = false;
    }
  }

  async function onUpdate() {
    if (booking.buisnessId != $businessStore?.businessId ?? "") {
      ShowToast({ status: "info", text: translate("needToLoadBusiness") });
      return;
    }
    if (loadingDelete || loadingUpdate) {
      return;
    }

    if (BusinessInitializer.GI().isExistWorker(booking.workerId)) {
      pushDialog(deleteBookingWithoutWorkerDialog);
      return;
    }

    loadingUpdate = true;
    try {
      await updateBooking({
        booking: booking,
      });
    } finally {
      loadingUpdate = false;
    }
  }

  async function handleDelete(deleteOption: DeleteOption): Promise<boolean> {
    if (loadingDelete) {
      return false;
    }
    loadingDelete = true;
    try {
      const resp = await deleteBooking({
        booking: booking,

        deleteOption: deleteOption,
      });
      if (resp) {
        mainDialog.close();
        ShowToast({
          status: "success",
          text: translate("successfullydeletedBooking"),
        });
      } else {
        ErrorsController.displayError();
      }
      return resp;
    } finally {
      loadingDelete = false;
    }
  }
</script>

<NavigationDialog bind:dialog={navigationDialog} />
<DeleteBookingDialog bind:deleteDialog {booking} onDelete={handleDelete} />

<DeleteBookingWithoutWorker
  bind:dialog={deleteBookingWithoutWorkerDialog}
  {mainDialog}
  bind:loadingDelete
  {booking}
/>
<div class="flex flex-row gap-4 justify-start w-full">
  <CustomCircleIcon
    icon={booking.needCancel ? "mdi:restore" : "mdi:trash-can-outline"}
    translateKey={booking.needCancel ? "renew" : "delete"}
    loading={loadingDelete}
    handleClick={onClickDelete}
  />
  <CustomCircleIcon
    active={!booking.isMultiRef}
    icon="mdi:edit-outline"
    translateKey="edit"
    loading={loadingUpdate}
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
