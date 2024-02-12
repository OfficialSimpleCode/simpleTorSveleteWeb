<script lang="ts">
  import { pushState } from "$app/navigation";
  import { page } from "$app/stores";
  import type Booking from "$lib/models/booking/booking_model";
  import type WorkerModel from "$lib/models/worker/worker_model";
  import { businessStore } from "$lib/stores/Business";
  import { workersStore } from "$lib/stores/Workers";
  import BookingActions from "./BookingActions.svelte";
  import BookingDateAndTime from "./BookingDateAndTime.svelte";
  import BookingPriceAndDuration from "./BookingPriceAndDuration.svelte";
  import CircleIcons from "./CircleIcons.svelte";
  import BookingSheet from "./booking-sheet/BookingSheet.svelte";

  export let booking: Booking;
  export let forceOpenBookingSheet: boolean;

  let bookingDialog: HTMLDialogElement;

  let currentWorker: WorkerModel | undefined;

  if (
    $businessStore != null &&
    booking.buisnessId === $businessStore.businessId
  ) {
    currentWorker = $workersStore[booking.workerId]!;
  }

  function openBookingSheet() {
    pushState("", {
      showModal: true,
    });
    setTimeout(() => bookingDialog.showModal(), 100);
  }
</script>

<!-- booking shhet and dialog -->
{#if $page.state.showModal}
  <BookingSheet
    bind:dialog={bookingDialog}
    {booking}
    currentWorker={undefined}
  />
{/if}

<tr
  on:click={openBookingSheet}
  class="group bg-base-200 hover:bg-base-300 hover:bg-opacity-20 cursor-pointer border border-base-300"
>
  <td class="flex flex-row justify-start items-center">
    <CircleIcons {booking}></CircleIcons>
    <h1 class="text-xl text-nowrap">{booking.businessName}</h1>
  </td>

  <td class="text-xl">
    {booking.workerName}
  </td>

  <td class="min-w-[145px]">
    <!-- svelte-ignore missing-declaration -->
    <BookingPriceAndDuration {booking} isRow={false}></BookingPriceAndDuration>
  </td>

  <td>
    <BookingDateAndTime {booking}></BookingDateAndTime>
  </td>

  <td class="text-nowrap">
    <BookingActions {booking} {currentWorker} {forceOpenBookingSheet} />
  </td>

  <!-- <th class="sm:opacity-0 sm:group-hover:opacity-100">
    <div class="dropdown dropdown-hover dropdown-left">
      <div tabindex="0" role="button" class="btn btn-outline m-1">Actions</div>
      <ul
        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 fixed z-20"
      >
        <li>
          <button> Load Business </button>
        </li>
        <li>
          <button> Edit </button>
        </li>
        <li>
          <button class="text-error"> Delete </button>
        </li>
      </ul>
    </div>
  </th> -->
</tr>
