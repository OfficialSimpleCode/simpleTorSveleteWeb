<script lang="ts">
  import DateString from "$lib/components/DateString.svelte";
  import Booking from "$lib/models/booking/booking_model";
  import type WorkerModel from "$lib/models/worker/worker_model";
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
  export let currentWorker: WorkerModel | undefined;
</script>

<dialog
  bind:this={dialog}
  class="modal modal-bottom sm:modal-middle"
  on:close={() => history.back()}
>
  <div class="modal-box bg-base-200 h-[60%] py-5 px-3 xs:px-5">
    <div class="flex flex-col items-start h-32 gap-4 mb-2">
      <!-- indicators -> past booking, reacurrance .. -->
      <TopSheetIndicators {booking}></TopSheetIndicators>

      <!-- top icons -->
      <IconsRow {booking} {currentWorker} />

      <!-- general data container -->
      <TopDetails {booking}></TopDetails>

      <!-- payments container -->
      <PaymentsContainer {booking}></PaymentsContainer>

      <!-- table about the time, date and other informations -->
      <div class="w-full">
        <!-- created at indicator -->
        <CreatedAtIndicator {booking}></CreatedAtIndicator>

        <!-- summary of times, price and duration -->
        <div
          class="flex flex-col bg-base-300 rounded-lg py-4 px-5 gap-6 items-center"
        >
          <div class="text-lg">
            <DateString date={booking.currentDisplayDate}></DateString>
          </div>

          <SummaryTable {booking}></SummaryTable>
        </div>
      </div>

      <!-- debt indicator -->
      <DebtIndicator {booking}></DebtIndicator>
      <!-- in case there are multy treatments - convinient list of them -->
      {#if booking.treatments.size > 1}
        <BookingTreatmentsList {booking}></BookingTreatmentsList>
      {/if}

      <!-- padding at the end -->
      <div class="pb-3 w-full"></div>
    </div>
  </div>

  <!-- making the backdrop clickable and close the model -->
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
