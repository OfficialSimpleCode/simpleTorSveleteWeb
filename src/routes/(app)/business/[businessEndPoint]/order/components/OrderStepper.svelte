<script lang="ts">
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import { ShowToast } from "$lib/stores/ToastManager";
  import { workersStore } from "$lib/stores/Workers";
  import { dateToDateStr } from "$lib/utils/times_utils";
  import { _, translate } from "$lib/utils/translate";

  let steps: string[] = ["worker", "treatment", "time"];
  function clickedOnStep(stepNumber: number) {
    if (stepNumber === $bookingMakerStore.currentStep) {
      return;
    }

    if (stepNumber >= 1 && $bookingMakerStore.workerId === undefined) {
      ShowToast({
        text: translate("firsChooseWorker", $_),
        status: "warning",
      });
      return;
    }

    if (
      stepNumber >= 2 &&
      Object.keys($bookingMakerStore.services).length === 0
    ) {
      ShowToast({
        text: translate("firstPickTreatment"),
        status: "warning",
      });
      return;
    }

    if (stepNumber === 3 && $bookingMakerStore.date == null) {
      ShowToast({
        text: translate("firstPickDate"),
        status: "warning",
      });
      return;
    }

    $bookingMakerStore.currentStep = stepNumber;
  }

  function getServicesName(): string {
    let finalName: string = "";
    Object.entries($bookingMakerStore.services).forEach(
      ([_, treatment], index) => {
        finalName += (index !== 0 ? " + " : "") + treatment.name;
      }
    );
    return finalName;
  }
</script>

<ul
  class="flex flex-row gap-[4px] w-[90%] lg:w-[50%] md:w-[60%] sm:w-[80%] min-h-24 mt-1 items-center justify-center"
>
  <!-- worker step -->
  <button
    class="flex-1 btn bg-base-300 rounded-lg px-2 hover:text-base-content {$bookingMakerStore.currentStep ===
    0
      ? 'text-primary-content'
      : ''}"
    class:bg-primary={$bookingMakerStore.currentStep === 0}
    on:click={() => clickedOnStep(0)}
  >
    {#if $workersStore[$bookingMakerStore.workerId ?? ""] == null && ($bookingMakerStore.workerId ?? "") !== ""}
      <div class="loading loading-spinner" />
    {:else}
      <p class="overflow-hidden whitespace-nowrap text-ellipsis">
        {$bookingMakerStore.workerId != null
          ? $workersStore[$bookingMakerStore.workerId].name
          : translate("worker", $_)}
      </p>
    {/if}
  </button>
  <!-- service step -->
  <button
    class="flex-1 btn bg-base-300 rounded-lg px-2 hover:text-base-content {$bookingMakerStore.currentStep ===
    1
      ? 'text-primary-content'
      : ''}"
    class:bg-primary={$bookingMakerStore.currentStep === 1}
    on:click={() => clickedOnStep(1)}
  >
    <p class="overflow-hidden whitespace-nowrap text-ellipsis">
      {Object.keys($bookingMakerStore.services).length === 0
        ? translate("treatment", $_)
        : getServicesName()}
    </p>
  </button>

  <!-- time step -->
  <button
    class=" flex-1 btn bg-base-300 rounded-lg px-2 hover:text-base-content {$bookingMakerStore.currentStep ===
    2
      ? 'text-primary-content'
      : ''}"
    class:bg-primary={$bookingMakerStore.currentStep === 2}
    on:click={() => clickedOnStep(2)}
  >
    <p class="overflow-hidden whitespace-nowrap text-ellipsis">
      {$bookingMakerStore.date
        ? dateToDateStr($bookingMakerStore.date)
        : translate("time", $_)}
    </p>
  </button>
</ul>
