<script lang="ts">
  import { base } from "$app/paths";
  import PhoneDialog from "$lib/components/dialogs/phone_dialog/PhoneDialog.svelte";

  import { LoginReason } from "$lib/consts/auth";

  import { beforeNavigate } from "$app/navigation";
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import BusinessInitializer from "$lib/initializers/business_initializer";
  import { businessStore } from "$lib/stores/Business";
  import { _, translate } from "$lib/utils/translate";
  import { onDestroy } from "svelte";
  import OrderStepper from "./components/OrderStepper.svelte";
  import FinishScreen from "./steps/finish_screen/FinishScreen.svelte";
  import ServicePicker from "./steps/service_picker/ServicePicker.svelte";
  import TimePicker from "./steps/time_picker/TimePicker.svelte";
  import WorkerPicker from "./steps/worker_picker/WorkerPicker.svelte";
  let verificationDialog: HTMLDialogElement;
  BookingController.initializeBookingMaker();

  onDestroy(() => {
    BusinessInitializer.GI().cancelAllWorkersRegularListenings();
  });

  beforeNavigate(({ cancel }) => {
    if (
      !$bookingMakerStore.finish &&
      !confirm(
        translate(
          $bookingMakerStore.isUpdate
            ? "theUpdateBookingDataWillBeDeletedAreSure"
            : "theBookingDataWillBeDeletedAreSure",
          $_
        )
      )
    ) {
      cancel();
    }
  });
</script>

<!-- Dialog -->

<PhoneDialog
  loginReason={LoginReason.phoneVerification}
  insideOtp={true}
  bind:dialog={verificationDialog}
/>

<main class="h-full w-full flex flex-col items-center gap-2 bg-base-100">
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
    <div class="pb-4 mt-6 max-w-[360px] w-[300px]">
      <a
        class="btn btn-outline sm:hidden w-full"
        href={$businessStore != null
          ? `${base}/business/${$businessStore.url}`
          : base}
        >{translate("cancel", $_)}
      </a>
    </div>
  </div>
</main>
