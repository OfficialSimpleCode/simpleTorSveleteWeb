<script lang="ts">
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import { _ } from "$lib/utils/translate";
  import ButtomContinueButton from "./components/ButtomContinueButton.svelte";
  import MultipleServicesTuggle from "./components/MultipleServicesTuggle.svelte";
  import ServiceItem from "./components/ServiceItem.svelte";

  const worker = BookingController.worker;
</script>

<section
  id="service-step"
  class="w-full flex flex-col items-center gap-12 md:w-[70%]"
>
  <!-- title -->
  <h1 class="text-2xl">
    {$bookingMakerStore.pickMultipleServices
      ? $_("pickServices")
      : $_("pichTreatment")}
  </h1>

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

      <!-- list of servies under this subject -->
      {#each subject.treatments as [_, treatment]}
        <ServiceItem {treatment}></ServiceItem>
      {/each}
    {/each}
  </ul>

  <!-- buttom continue button -->
  <ButtomContinueButton></ButtomContinueButton>
</section>
