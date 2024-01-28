<script lang="ts">
  import DateString from "$lib/components/DateString.svelte";
  import Booking from "$lib/models/booking/booking_model";
  import BookingTreatmentsList from "./components/BookingTreatmentsList.svelte";
  import CreatedAtIndicator from "./components/CreatedAtIndicator.svelte";
  import IconsRow from "./components/IconsRow.svelte";
  import PaymentsContainer from "./components/PaymentsContainer.svelte";
  import SummaryTable from "./components/SummaryTable.svelte";
  import TopDetails from "./components/TopDetails.svelte";
  export let dialog: HTMLDialogElement;
  export let booking: Booking;
</script>

<dialog
  bind:this={dialog}
  class="modal modal-bottom sm:modal-middle"
  on:close={() => history.back()}
>
  <div class=" modal-box bg-base-200 h-[60%]">
    <div class="flex flex-col items-start h-32 gap-4 mb-2">
      <!-- top icons -->
      <IconsRow {booking}></IconsRow>

      <!-- general data container -->
      <TopDetails {booking}></TopDetails>

      <!-- payments container -->
      <PaymentsContainer {booking}></PaymentsContainer>

      <!-- table about the time, date and other informations -->
      <div class="w-full">
        <!-- created at indicator -->
        <CreatedAtIndicator {booking}></CreatedAtIndicator>

        <!-- summary of times, price and duration -->
        <div class="flex flex-col bg-base-300 rounded-lg py-4 px-5 gap-6">
          <DateString date={booking.currentDisplayDate}></DateString>

          <SummaryTable {booking}></SummaryTable>
        </div>
      </div>

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
