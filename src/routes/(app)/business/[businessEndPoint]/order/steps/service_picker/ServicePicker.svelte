<script lang="ts">
  import CustomArrow from "$lib/components/custom_components/CustomArrow.svelte";
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import WorkerModel from "$lib/models/worker/worker_model";
  import { ShowToast } from "$lib/stores/ToastManager";
  import { workersStore } from "$lib/stores/Workers";
  import { _, translate } from "$lib/utils/translate";
  import ButtomContinueButton from "./components/ButtomContinueButton.svelte";
  import EmptyServicesScreen from "./components/EmptyServicesScreen.svelte";
  import MultipleServicesTuggle from "./components/MultipleServicesTuggle.svelte";
  import ServiceItem from "./components/ServiceItem.svelte";

  function continueNextStep() {
    if (Object.keys($bookingMakerStore.services).length > 0) {
      $bookingMakerStore.currentStep += 1;
    } else {
      ShowToast({
        text: translate("firstPickTreatment"),
        status: "warning",
      });
    }
  }
  let isEmpty = true;
  $: worker =
    $workersStore[$bookingMakerStore.workerId ?? ""] ?? new WorkerModel({});
  $: Object.entries(worker.treatmentsSubjects).forEach(([index, subject]) => {
    isEmpty = isEmpty && subject.treatments.size === 0;
  });
</script>

<section
  id="service-step"
  class="flex flex-col items-center gap-5 w-[95%] xs:w-[84%] sm:w-[85%]"
>
  <div class="flex flex-row justify-between w-full px-10">
    <div class="w-[26px]"></div>
    <!-- title -->
    <h1 class="text-2xl">
      {$bookingMakerStore.pickMultipleServices
        ? $_("pickServices")
        : $_("pichTreatment")}
    </h1>

    {#if $bookingMakerStore.pickMultipleServices}
      <button on:click={continueNextStep}>
        <CustomArrow />
      </button>
    {:else}
      <div class="w-[26px]"></div>
    {/if}
  </div>

  <div class="flex flex-col items-center w-full gap-4">
    {#if isEmpty}
      <EmptyServicesScreen />
    {:else}
      <!-- pick multiple items tuggle -->
      <MultipleServicesTuggle />
      <!-- list of treatments -->
      <ul class="h-full w-full flex flex-col items-center justify-center gap-7">
        <!-- subjects with list of services under each subject  -->
        {#each Object.entries(worker.treatmentsSubjects) as [__, subject]}
          <!-- subject title -->
          <div class="items-start w-full xs:text-3xl text-2xl">
            {subject.name}
          </div>

          <!-- list of services under this subject -->
          {#each subject.treatments as [_, treatment]}
            <ServiceItem {treatment} />
          {/each}
        {/each}
      </ul>
    {/if}
  </div>

  <!-- buttom continue button -->
  <ButtomContinueButton continueFunc={continueNextStep}></ButtomContinueButton>
</section>
