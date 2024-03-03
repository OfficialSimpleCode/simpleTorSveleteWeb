<script lang="ts">
  import DateString from "$lib/components/DateString.svelte";
  import DialogStrucher from "$lib/components/dialogs/DialogStrucher.svelte";
  import DownloadAppDialog from "$lib/components/dialogs/DownloadAppDialog.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  import Booking from "$lib/models/booking/booking_model";
  import { length } from "$lib/utils/core_utils";
  import BookingTreatmentsList from "./components/BookingTreatmentsList.svelte";
  import CreatedAtIndicator from "./components/CreatedAtIndicator.svelte";
  import DebtIndicator from "./components/DebtIndicator.svelte";
  import IconsRow from "./components/IconsRow.svelte";
  import PaymentsContainer from "./components/PaymentsContainer.svelte";
  import SummaryTable from "./components/SummaryTable.svelte";
  import TopDetails from "./components/TopDetails.svelte";
  import TopSheetIndicators from "./components/TopSheetIndicators.svelte";
  export let dialog: HTMLDialogElement;
  export let booking: Booking;

  export let forceOpenBookingSheet: boolean;
  let downloadAppDialog: HTMLDialogElement;
</script>

<!-- booking shhet and dialog -->
<DownloadAppDialog bind:dialog={downloadAppDialog} />

<DialogStrucher bind:dialog>
  <div class="modal-box bg-base-200 max-h-[80%] py-5 px-3 xs:px-5">
    <div class="flex flex-col items-start gap-4 mb-2">
      <!-- indicators -> past booking, reacurrance .. -->
      <TopSheetIndicators {booking}></TopSheetIndicators>

      <!-- top icons -->
      <IconsRow {booking} mainDialog={dialog} {downloadAppDialog} />

      <!-- general data container -->
      <TopDetails {booking} {forceOpenBookingSheet} />

      <!-- payments container -->
      <PaymentsContainer {booking} {downloadAppDialog} />

      <!-- table about the time, date and other informations -->
      <div class="w-full">
        <!-- created at indicator -->
        <CreatedAtIndicator {booking} />

        <!-- summary of times, price and duration -->
        <div
          class="flex flex-col bg-base-300 {containerRadius} py-4 px-5 gap-6 items-center"
        >
          <div class="text-lg">
            <DateString date={booking.currentDisplayDate} />
          </div>

          <SummaryTable {booking} />
        </div>
      </div>

      <!-- debt indicator -->
      <DebtIndicator {booking} />
      <!-- in case there are multy treatments - convinient list of them -->
      {#if length(booking.treatments) > 1}
        <BookingTreatmentsList {booking} />
      {/if}

      <!-- padding at the end -->
      <div class="pb-3 w-full"></div>
    </div>
  </div>
</DialogStrucher>
