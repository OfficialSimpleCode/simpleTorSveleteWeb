<script lang="ts">
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import { ShowToast } from "$lib/stores/ToastManager";

  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import { _, translate } from "$lib/utils/translate";
  import FinishScreen from "./steps/finish_screen/FinishScreen.svelte";
  import ServicePicker from "./steps/service_picker/ServicePicker.svelte";
  import TimePickerSchedule from "./steps/time_picker/components/TimePickerSchedule.svelte";
  import WorkerPicker from "./steps/worker_picker/WorkerPicker.svelte";

  let steps: string[] = ["worker", "treatment", "dateAndTime", "confirmNow"];

  BookingController.initializeBookingMaker({});

  function clickedOnStep(stepNumber: number) {
    if (stepNumber === $bookingMakerStore.currentStep) {
      return;
    }

    if (stepNumber >= 2 && $bookingMakerStore.workerId === undefined) {
      ShowToast({
        text: translate("firsChooseWorker", $_),
        status: "warning",
      });
      return;
    }

    if (
      stepNumber >= 3 &&
      Object.keys($bookingMakerStore.services).length === 0
    ) {
      ShowToast({
        text: translate("firstPickTreatment"),
        status: "warning",
      });
      return;
    }

    // if (stepNumber === 4 && $bookingMakerStore.date === undefined) {
    //   ShowToast({
    //     text: translate("firstPickDate"),
    //     status: "warning",
    //   });
    //   return;
    // }

    $bookingMakerStore.currentStep = stepNumber;
  }
</script>

<main class="h-screen w-screen flex flex-col items-center gap-2 bg-base-100">
  <Navbar />
  <ul class="steps min-h-24 w-[90%] sm:w-[60%] mt-1">
    {#each steps as step, i}
      <button
        class="step hover:step-neutral"
        class:step-success={$bookingMakerStore.currentStep > i}
        data-content={$bookingMakerStore.currentStep > i + 1
          ? "✓"
          : (i + 1).toString()}
        on:click={() => clickedOnStep(i + 1)}
      >
        {translate(step, $_)}
      </button>
    {/each}
  </ul>
  <div class="flex flex-col w-full lg:max-w-[1000px] items-center">
    {#if $bookingMakerStore.currentStep == 1}
      <WorkerPicker />
    {:else if $bookingMakerStore.currentStep == 2}
      <ServicePicker />
    {:else if $bookingMakerStore.currentStep == 3}
      <TimePickerSchedule />
    {:else if $bookingMakerStore.currentStep == 4}
      <FinishScreen />
    {/if}
    <div class="pb-4 w-[90%] mt-3">
      <button
        class="btn btn-outline sm:hidden w-full"
        on:click={() => history.back()}
        >{translate("cancel", $_)}
      </button>
    </div>
  </div>
</main>
