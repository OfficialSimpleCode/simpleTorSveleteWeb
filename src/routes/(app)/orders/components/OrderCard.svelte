<script lang="ts">
  import CustomArrow from "$lib/components/custom_components/CustomArrow.svelte";
  import type Booking from "$lib/models/booking/booking_model";
  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  import BookingActions from "./BookingActions.svelte";
  import BookingDetails from "./BookingDetails.svelte";
  import CircleIcons from "./CircleIcons.svelte";
  import TopIndicators from "./TopIndicators.svelte";
  import BookingSheet from "./booking-sheet/BookingSheet.svelte";

  export let booking: Booking;
  export let forceOpenBookingSheet: boolean;

  let bookingDialog: HTMLDialogElement;

  function openBookingSheet() {
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    pushDialog(bookingDialog);
  }
</script>

<!-- booking shhet and dialog -->
<BookingSheet bind:dialog={bookingDialog} {booking} {forceOpenBookingSheet} />

<button
  on:click={openBookingSheet}
  class="card bg-base-200 w-full hover:bg-base-300 hover:bg-opacity-20 px-3 py-3 relative {booking.isRightNow
    ? 'border border-base-300'
    : ''}
    {booking.recurrenceEvent ?? booking.recurrenceEventRefInfo ? 'pt-2' : ''}"
>
  <TopIndicators isNow={booking.isRightNow} {booking}></TopIndicators>

  <!-- icons, name, arrow (above the divider)  -->
  <div class="flex flex-row w-full justify-between items-center">
    <!-- like a listTile widget -->
    <div class="flex flex-row items-center">
      <CircleIcons {booking}></CircleIcons>
      <!-- string date -> business name, worker -->
      <div class="flex flex-col items-start text-start">
        <h2>
          {booking.treatmentsToStringNotDetailed +
            ` ${translate("to", $_)} ${booking.businessName}`}
        </h2>
        <h2>
          {`${translate("with", $_)} ${booking.workerName}`}
        </h2>
      </div>
    </div>
    <!-- arrow icon -->
    <CustomArrow />
  </div>

  <!-- divider -->
  <div class="h-[1px] w-full bg-slate-300 opacity-25 my-3"></div>

  <!-- booking details and actions (below the divider) -->
  <div class="flex flex-row justify-between w-full items-center">
    <BookingDetails {booking} />
    <div class="w-2"></div>
    <BookingActions {booking} {forceOpenBookingSheet} />
  </div>
</button>
