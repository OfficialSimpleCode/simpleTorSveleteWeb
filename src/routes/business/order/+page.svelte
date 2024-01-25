<script lang="ts">
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import type WorkerModel from "$lib/models/worker/worker_model";
  import { ShowToast } from "$lib/stores/ToastManager";
  import { workersStore } from "$lib/stores/Workers";
  import { _ } from "svelte-i18n";

  import BookingController from "$lib/controllers/booking_controller";
  import type Treatment from "$lib/models/general/treatment_model";
  import SyncfusionSchedualer from "./components/SyncfusionSchedualer.svelte";
  import ChooseEmployee from "./steps/ChooseEmployee.svelte";
  import ChooseService from "./steps/ChooseService.svelte";
  import VerifyDetails from "./steps/VerifyDetails.svelte";

  let steps: string[] = ["worker", "treatment", "dateAndTime", "confirmNow"];
  let currentStep: number = 1;

  let employees: Array<WorkerModel> = Object.values($workersStore);
  let selectedEmployee: WorkerModel;
  let selectedDateAndTime: Record<string, string> = {
    date: "05-11-2025",
    time: "12:56",
  };

  let selectedServices: Array<Treatment> = [];
  let totalServicesDuration: string = "0h";
  // $: totalServicesDuration = sumDurations(
  //     selectedServices.map((s) =>
  //         multiplyAndSumDurations(s.tota, s.quntity),
  //     ),
  // );

  BookingController.initializeBookingMaker({});

  function clickedOnStep(stepNumber: number) {
    if (stepNumber == currentStep) {
      return;
    }

    if (stepNumber == 2 && !selectedEmployee) {
      ShowToast({
        text: "Finish the current step first",
        status: "warning",
      });
      return;
    }

    if (
      stepNumber == 3 &&
      (!selectedServices || selectedServices.length == 0)
    ) {
      ShowToast({
        text: "Finish the current step first",
        status: "warning",
      });
      return;
    }

    if (
      stepNumber == 4 &&
      (!selectedDateAndTime ||
        !selectedServices ||
        selectedServices.length == 0)
    ) {
      ShowToast({
        text: "Finish the current step first",
        status: "warning",
      });
      return;
    }

    currentStep = stepNumber;
  }

  function employeeSelected(employee: WorkerModel) {
    selectedEmployee = employee;
    currentStep += 1;
  }

  function servicesSelected(services: Array<Treatment>) {
    selectedServices = services;
    currentStep += 1;
  }

  function dateAndTimeSelected(dateAndTime: Record<string, string>) {
    selectedDateAndTime = dateAndTime;
    currentStep += 1;
  }
</script>

<main class="h-screen w-screen flex flex-col items-center gap-2 bg-base-100">
  <Navbar />
  <ul class="steps min-h-24 w-[90%] sm:w-[60%] mt-1">
    {#each steps as step, i}
      <button
        class="step hover:step-neutral"
        class:step-success={currentStep > i}
        data-content={currentStep > i + 1 ? "✓" : (i + 1).toString()}
        on:click={() => clickedOnStep(i + 1)}
      >
        {$_(step)}
      </button>
    {/each}
  </ul>

  {#if currentStep == 1}
    <ChooseEmployee
      {employees}
      bind:selectedEmployee
      on:employee={(event) => employeeSelected(event.detail)}
    />
  {:else if currentStep == 2}
    <ChooseService
      bind:selectedEmployee
      bind:selectedServices
      on:services={(event) => servicesSelected(event.detail)}
    />
  {:else if currentStep == 3}
    <!-- <ChooseDateAndTime
            bind:selectedDateAndTime
            duration={totalServicesDuration}
            on:dateAndTime={(event) => dateAndTimeSelected(event.detail)}
        /> -->
    <SyncfusionSchedualer />
  {:else if currentStep == 4}
    <VerifyDetails
      bind:employee={selectedEmployee}
      bind:services={selectedServices}
      bind:totalServicesDuration
      bind:dateAndTime={selectedDateAndTime}
      on:edit-services={() => (currentStep = 2)}
    />
  {/if}
  <div class="pb-4 w-[90%] mt-3">
    <button
      class="btn btn-outline sm:hidden w-full"
      on:click={() => history.back()}
      >{$_("cancel")}
    </button>
  </div>
</main>
