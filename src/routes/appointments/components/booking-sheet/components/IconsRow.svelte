<script lang="ts">
  import { pushState } from "$app/navigation";
  import { page } from "$app/stores";
  import NavigationDialog from "$lib/components/NavigationDialog.svelte";
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import Booking from "$lib/models/booking/booking_model";
  import type WorkerModel from "$lib/models/worker/worker_model";
  import { deleteBooking } from "../../../helpers/delete_booking";
  import { updateBooking } from "../../../helpers/update_booking";

  export let booking: Booking;
  export let currentWorker: WorkerModel | undefined;

  let navigationDialog: HTMLDialogElement;

  // open choose navigation option dialog
  function openNavigationDialog() {
    pushState("", {
      showModal: true,
    });
    setTimeout(() => navigationDialog.showModal(), 100);
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
    hadleClick={(loadingState) =>
      deleteBooking({
        booking: booking,
        worker: currentWorker,
        loadingState: loadingState,
      })}
  />
  <CustomCircleIcon
    icon="mdi:edit-outline"
    translateKey="edit"
    hadleClick={() =>
      updateBooking({ booking: booking, worker: currentWorker })}
  />
  <CustomCircleIcon
    icon="mdi:map-marker-outline"
    translateKey="navigate"
    hadleClick={openNavigationDialog}
  />
</div>
