<script lang="ts">
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import { Duration } from "$lib/models/core/duration";
  import type Treatment from "$lib/models/general/treatment_model";
  import { durationToString } from "$lib/utils/string_utils";

  export let treatment: Treatment;

  $: isPicked = Object.keys($bookingMakerStore.services).includes(treatment.id);
</script>

<div class="w-full flex flex-col items-center gap-2">
  <button
    class="btn bg-primary hover:opacity-85 hover:bg-primary rounded-xl w-full h-20 sm:h-28 flex items-center px-6 gap-5 py-2 justify-between {isPicked
      ? 'outline outline-2'
      : ''}"
    on:click={() => BookingController.onTapService(treatment)}
  >
    <!-- name of the service -->
    <h1 class="text-lg sm:text-2xl text-start w-[50%]">
      {treatment.name}
    </h1>

    <!-- other treatment data -->
    <div class="flex items-center h-full w-[30%]">
      <!-- horizontal divider  -->
      <div class="divider divider-horizontal border-black" />

      <!-- price and duration -->
      <div class="flex flex-col">
        <p class=" whitespace-nowrap text-md sm:text-lg" dir="ltr">
          {treatment.price?.toString()}
        </p>
        <p class=" text-md sm:text-lg">
          {durationToString(new Duration({ minutes: treatment.totalMinutes }))}
        </p>
      </div>
    </div>
  </button>

  <!-- option to pick more than 1 of this cureent sevice -->
  {#if $bookingMakerStore.pickMultipleServices && isPicked}
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
        {($bookingMakerStore.services[treatment.id] ?? treatment).count}
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
