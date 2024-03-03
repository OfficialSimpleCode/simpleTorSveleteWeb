<script lang="ts">
  import { bookingMakerButton } from "$lib/consts/css_classes";
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import { Duration } from "$lib/models/core/duration";
  import type Treatment from "$lib/models/general/treatment_model";
  import { printDuration } from "$lib/utils/string_utils";
  import { translate } from "$lib/utils/translate";

  export let treatment: Treatment;

  $: isPicked = Object.keys($bookingMakerStore.services).includes(treatment.id);
</script>

<div class="w-full flex flex-col items-center gap-2">
  <button
    class="{bookingMakerButton} w-full px-4 gap-5 py-10 flex flex-col {isPicked
      ? 'border-solid border-2 border-base-content brightness-95'
      : ''}"
    on:click={() => BookingController.onTapService(treatment)}
  >
    <div class="flex items-center justify-between gap-1 w-full">
      <!-- name of the service -->
      <h1 class="text-lg sm:text-2xl text-start w-[55%] line-clamp-2">
        {treatment.name}
      </h1>

      <!-- other treatment data -->
      <div class="flex items-center h-full gap-[5px] w-[30%]">
        <!-- horizontal divider  -->
        <div class="divider divider-horizontal border-black" />

        <!-- price and duration -->
        <div class="flex flex-col w-full">
          <p class=" whitespace-nowrap text-xs sm:text-md" dir="ltr">
            {treatment.price?.toString()}
          </p>

          <p class=" text-xs sm:text-md">
            {printDuration(new Duration({ minutes: treatment.totalMinutes })) +
              " " +
              translate("hours")}
          </p>
        </div>
      </div>
    </div>
  </button>

  <!-- option to pick more than 1 of this cureent sevice -->
  {#if $bookingMakerStore.pickMultipleServices && isPicked}
    <div class="join self-end">
      <!-- decrease btn -->
      <button
        class="{bookingMakerButton} join-item btn-sm"
        on:click={() => BookingController.onRemoveTreatmentCount(treatment)}
      >
        -
      </button>

      <!-- amount selected indicator -->
      <button class="{bookingMakerButton} join-item w-min text-center btn-sm">
        {($bookingMakerStore.services[treatment.id] ?? treatment).count}
      </button>

      <!-- increase btn -->
      <button
        class="{bookingMakerButton} join-item btn-sm"
        on:click={() => BookingController.onAddTreatmentCount(treatment)}
      >
        +
      </button>
    </div>
  {/if}
</div>
