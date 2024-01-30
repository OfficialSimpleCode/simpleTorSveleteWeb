<script lang="ts">
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import type Treatment from "$lib/models/general/treatment_model";

  export let treatment: Treatment;

  function isPickedService(): boolean {
    return Object.keys($bookingMakerStore.services).includes(treatment.id);
  }
</script>

<div class="w-full sm:min-w-[480px] flex flex-col items-center gap-2">
  <button
    class="bg-primary rounded-xl w-full h-20 sm:h-28 flex items-center px-6 box-border gap-5 border justify-between"
    class:opacity-50={!isPickedService() && $bookingMakerStore}
    class:border={isPickedService() && $bookingMakerStore}
    on:click={() => BookingController.onTapService(treatment)}
  >
    <!-- name of the service -->
    <h1 class="text-lg sm:text-3xl text-start">
      {treatment.name}
    </h1>

    <!-- other treatment data -->
    <div class="flex items-center h-full">
      <!-- horizontal divider  -->
      <div class="divider divider-horizontal border-black" />

      <!-- price and duration -->
      <div class="flex flex-col">
        <p class=" whitespace-nowrap" dir="ltr">
          {treatment.price}
        </p>
        <p class="">
          {treatment.totalMinutes}
        </p>
      </div>
    </div>
  </button>

  <!-- option to pick more than 1 of this cureent sevice -->
  {#if $bookingMakerStore.pickMultipleServices && isPickedService()}
    <div class="join self-end">
      <!-- decrease btn -->
      <button
        class="btn btn-sm join-item bg-primary"
        on:click={() => BookingController.onRemoveTreatmentCount(treatment)}
      >
        -
      </button>

      <!-- amount selected indicator -->
      <button class="btn btn-sm join-item w-min text-center bg-primary">
        {treatment.count}
      </button>

      <!-- increase btn -->
      <button
        class="btn btn-sm join-item bg-primary"
        on:click={() => BookingController.onAddTreatmentCount(treatment)}
      >
        +
      </button>
    </div>
  {/if}
</div>
