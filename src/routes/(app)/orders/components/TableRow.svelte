<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";
  import { pushDialog } from "$lib/utils/general_utils";
  import BookingActions from "./BookingActions.svelte";
  import BookingDateAndTime from "./BookingDateAndTime.svelte";
  import BookingPriceAndDuration from "./BookingPriceAndDuration.svelte";
  import CircleIcons from "./CircleIcons.svelte";
  import DeleteBookingWithoutBusinessDialog from "./DeleteBookingWithoutBusinessDialog.svelte";
  import BookingSheet from "./booking-sheet/BookingSheet.svelte";

  export let booking: Booking;
  export let forceOpenBookingSheet: boolean;

  let bookingDialog: HTMLDialogElement;
  let deleteBookingWithoutBusinessDialog: HTMLDialogElement;

  function openBookingSheet() {
    pushDialog(bookingDialog);
  }
</script>

<!-- booking shhet and dialog -->

<BookingSheet bind:dialog={bookingDialog} {booking} {forceOpenBookingSheet} />

<DeleteBookingWithoutBusinessDialog
  bind:dialog={deleteBookingWithoutBusinessDialog}
  mainDialog={bookingDialog}
  {booking}
/>
<tr
  on:click={openBookingSheet}
  class="group bg-base-200 hover:bg-base-300 hover:bg-opacity-20 cursor-pointer border border-base-300"
>
  <td>
    <div class="flex flex-row justify-center items-center">
      <CircleIcons {booking} />
      <p class="text-lg w-full">{booking.businessName}</p>
    </div>
  </td>

  <td class="text-lg">
    {booking.workerName}
  </td>

  <td class="text-lg">
    {booking.treatmentsToStringDetailed}
  </td>

  <td class="min-w-[145px]">
    <!-- svelte-ignore missing-declaration -->
    <BookingPriceAndDuration {booking} isRow={false} />
  </td>
  <td>
    <BookingDateAndTime {booking} />
  </td>

  <td class="text-nowrap">
    <BookingActions
      {booking}
      mainDialog={bookingDialog}
      {forceOpenBookingSheet}
      {deleteBookingWithoutBusinessDialog}
    />
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
