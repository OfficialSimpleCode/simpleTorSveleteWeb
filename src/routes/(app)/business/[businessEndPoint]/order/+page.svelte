<script lang="ts">
  import { base } from "$app/paths";

  import { beforeNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { isProduction } from "$lib/consts/application_general";
  import {
    BusinessesTypes,
    businessTypeToStr,
  } from "$lib/consts/business_types";
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import BusinessInitializer from "$lib/initializers/business_initializer";
  import { businessStore } from "$lib/stores/Business";
  import { _, translate } from "$lib/utils/translate";
  import { onDestroy } from "svelte";
  import ServicePicker from "./steps/service_picker/ServicePicker.svelte";
  import WorkerPicker from "./steps/worker_picker/WorkerPicker.svelte";

  BookingController.initializeBookingMaker();

  onDestroy(() => {
    BusinessInitializer.GI().cancelAllWorkersRegularListenings();
  });

  beforeNavigate(({ cancel }) => {
    if (
      isProduction &&
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

<svelte:head>
  <!-- business title -->
  <title>
    {$businessStore?.shopName} | {translate(
      businessTypeToStr[$businessStore?.businesseType ?? BusinessesTypes.Other],
      $_
    )} | {translate("order", $_)}
  </title>

  <!-- the url for search to display for this site -->
  <link
    rel="canonical"
    href={`${$page.url.origin}/business/${$businessStore?.url}/order`}
  />

  <!-- Open Graphes links -->
  <!-- title  -->
  <meta
    property="og:title"
    content="{$businessStore?.shopName} | {translate(
      businessTypeToStr[$businessStore?.businesseType ?? BusinessesTypes.Other],
      $_
    )} | {translate('order', $_)}"
  />
</svelte:head>

<main class="h-full w-full flex flex-col items-center gap-2 bg-base-100">
  <!-- stepper -->
  <!-- <OrderStepper /> -->

  <!-- steps -->
  <div class="flex flex-col w-full lg:max-w-[1000px] items-center">
    {#if $bookingMakerStore.currentStep === 0}
      <WorkerPicker />
    {:else if $bookingMakerStore.currentStep === 1}
      <ServicePicker />
      <!-- {:else if $bookingMakerStore.currentStep === 2}
      <TimePicker />
    {:else if $bookingMakerStore.currentStep === 3}
      <FinishScreen /> -->
    {/if}

    {#if !$bookingMakerStore.isOnVerification}
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
    {/if}
  </div>
</main>
