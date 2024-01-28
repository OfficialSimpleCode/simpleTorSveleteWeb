<script lang="ts">
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import { translate, _ } from "$lib/utils/translate";

  const worker = BookingController.worker;
</script>

<section id="service-step" class="w-full flex flex-col items-center gap-12">
  <h1 class="text-2xl">{$_("pickServices")}</h1>
  <ul
    class="h-full w-full max-w-[90%] flex flex-col items-center justify-center gap-7"
  >
    <div class="w-full sm:w-[40%] flex flex-row items-center justify-between">
      {$_("chooseMulti")}
      <input
        bind:checked={$bookingMakerStore.pickMultipleServices}
        type="checkbox"
        class="toggle toggle-accent"
      />
    </div>
    {#each worker.treatmentsSubjects as [__, subject]}
      {subject.name}
      {#each subject.treatments as [_, treatment]}
        <div
          class="w-full sm:min-w-[480px] sm:w-[40%] flex flex-col items-center gap-1"
        >
          <button
            class="bg-base-200 rounded-xl w-full h-20 sm:h-28 flex items-center px-6 box-border gap-5 border justify-between"
            class:border-black={Object.keys(
              $bookingMakerStore.services
            ).includes(treatment.id)}
            on:click={() => BookingController.onTapService(treatment)}
          >
            <h1 class="text-lg sm:text-3xl text-start">
              {treatment.name}
            </h1>
            <div class="flex items-center h-full">
              <div class="divider divider-horizontal border-black" />
              <div class="flex flex-col">
                <p class="text-gray-500 whitespace-nowrap" dir="ltr">
                  {treatment.price}
                </p>
                <p class="text-gray-500">
                  {treatment.totalMinutes}
                </p>
              </div>
            </div></button
          >
          {#if treatment.count > 1}
            <div class="join self-end">
              <button
                class="btn btn-sm join-item"
                on:click={() =>
                  BookingController.onAddTreatmentCount(treatment)}
              >
                -
              </button>
              <input
                value={treatment.count}
                type="text"
                class="input input-sm input-bordered w-full max-w-14 join-item text-center !text-black"
                disabled
              />
              <button
                class="btn btn-sm join-item"
                on:click={() =>
                  BookingController.onRemoveTreatmentCount(treatment)}
              >
                +
              </button>
            </div>
          {/if}
        </div>
      {/each}
    {/each}
  </ul>

  {#if Object.keys($bookingMakerStore.services).length > 0 && $bookingMakerStore.pickMultipleServices}
    <div class="flex flex-col items-center gap-4 w-full">
      <button class="btn btn-primary max-w-[90%] sm:max-w-sm w-full"
        >{translate("continue", $_)}
      </button>
    </div>
  {/if}
</section>
