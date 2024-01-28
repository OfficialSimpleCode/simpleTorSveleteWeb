<script lang="ts">
  import { pushState } from "$app/navigation";
  import { page } from "$app/stores";
  import NavigationDialog from "$lib/components/NavigationDialog.svelte";
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import Booking from "$lib/models/booking/booking_model";

  export let booking: Booking;
  booking.bookingDate;

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
  <CustomCircleIcon icon="mdi:trash-can-outline" translateKey="delete"
  ></CustomCircleIcon>
  <CustomCircleIcon icon="mdi:edit-outline" translateKey="edit"
  ></CustomCircleIcon>
  <CustomCircleIcon
    icon="mdi:map-marker-outline"
    translateKey="navigate"
    hadleClick={openNavigationDialog}
  ></CustomCircleIcon>
</div>
