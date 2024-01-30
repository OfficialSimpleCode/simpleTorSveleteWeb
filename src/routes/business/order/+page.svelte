<script lang="ts">
  import Navbar from "$lib/components/navbar/Navbar.svelte";

  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import { _, translate } from "$lib/utils/translate";
  import OrderStepper from "./components/OrderStepper.svelte";
  import FinishScreen from "./steps/finish_screen/FinishScreen.svelte";
  import ServicePicker from "./steps/service_picker/ServicePicker.svelte";
  import TimePickerSchedule from "./steps/time_picker/components/TimePickerSchedule.svelte";
  import WorkerPicker from "./steps/worker_picker/WorkerPicker.svelte";

  BookingController.initializeBookingMaker({});
</script>

<main class="h-screen w-screen flex flex-col items-center gap-2 bg-base-100">
  <!-- application nav bar -->
  <Navbar />
  <!-- stepper -->
  <OrderStepper />

  <!-- steps -->
  <div class="flex flex-col w-full lg:max-w-[1000px] items-center">
    {#if $bookingMakerStore.currentStep === 0}
      <WorkerPicker />
    {:else if $bookingMakerStore.currentStep === 1}
      <ServicePicker />
    {:else if $bookingMakerStore.currentStep === 2}
      <TimePickerSchedule />
    {:else if $bookingMakerStore.currentStep === 3}
      <FinishScreen />
    {/if}

    <!-- cancel button -->
    <div class="pb-4 w-[90%] mt-3">
      <button
        class="btn btn-outline sm:hidden w-full"
        on:click={() => history.back()}
        >{translate("cancel", $_)}
      </button>
    </div>
  </div>
</main>
