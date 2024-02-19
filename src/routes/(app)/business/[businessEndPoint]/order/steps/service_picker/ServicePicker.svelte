<script lang="ts">
  import CustomArrow from "$lib/components/custom_components/CustomArrow.svelte";
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import { _ } from "$lib/utils/translate";
  import ButtomContinueButton from "./components/ButtomContinueButton.svelte";
  import EmptyServicesScreen from "./components/EmptyServicesScreen.svelte";
  import MultipleServicesTuggle from "./components/MultipleServicesTuggle.svelte";
  import ServiceItem from "./components/ServiceItem.svelte";

  const worker = BookingController.worker;

  function continueNextStep() {
    if (Object.keys($bookingMakerStore.services).length > 0) {
      $bookingMakerStore.currentStep += 1;
    }
    // todo: tost to pick service
  }
  let isEmpty = true;
  $: worker.treatmentsSubjects.forEach((subject, index) => {
    isEmpty = isEmpty && subject.treatments.size === 0;
  });
</script>

<section
  id="service-step"
  class="w-full flex flex-col items-center gap-12 md:w-[70%]"
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

  {#if isEmpty}
    <EmptyServicesScreen />
  {:else}
    <!-- pick multiple items tuggle -->
    <MultipleServicesTuggle />
    <!-- list of treatments -->
    <ul
      class="h-full w-full max-w-[90%] flex flex-col items-center justify-center gap-7"
    >
      <!-- subjects with list of services under each subject  -->
      {#each worker.treatmentsSubjects as [__, subject]}
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

  <!-- buttom continue button -->
  <ButtomContinueButton continueFunc={continueNextStep}></ButtomContinueButton>
</section>
