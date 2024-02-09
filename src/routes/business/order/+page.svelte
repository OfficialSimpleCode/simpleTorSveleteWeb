<script lang="ts">
  import { page } from "$app/stores";
  import PhoneDialog from "$lib/components/login/components/PhoneDialog.svelte";
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import { LoginReason } from "$lib/consts/auth";

  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import { _, translate } from "$lib/utils/translate";
  import OrderStepper from "./components/OrderStepper.svelte";
  import FinishScreen from "./steps/finish_screen/FinishScreen.svelte";
  import ServicePicker from "./steps/service_picker/ServicePicker.svelte";
  import TimePicker from "./steps/time_picker/TimePicker.svelte";
  import WorkerPicker from "./steps/worker_picker/WorkerPicker.svelte";
  let verificationDialog: HTMLDialogElement;
</script>

<!-- Dialog -->
{#if $page.state.showModal}
  <PhoneDialog
    loginReason={LoginReason.phoneVerification}
    insideOtp={true}
    bind:dialog={verificationDialog}
  />
{/if}
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
      <TimePicker />
    {:else if $bookingMakerStore.currentStep === 3}
      <FinishScreen {verificationDialog} />
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
