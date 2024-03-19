<script lang="ts">
  import CustomArrow from "$lib/components/custom_components/CustomArrow.svelte";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import { translate } from "$lib/utils/translate";
  import ChangedPriceOrDurationIndicator from "./ChangedPriceOrDurationIndicator.svelte";
  import ServicesDetails from "./ServicesDetails.svelte";

  let treatmentAmount: number = 0;

  Object.entries($bookingMakerStore.services).forEach(
    ([treatmentId, treatment]) => {
      treatmentAmount += treatment.count;
    }
  );
  //if the worker change the durations or the pricing
  // of the event after creation
  $: if (
    BookingController.pickedTimeObj != null &&
    $bookingMakerStore.isMultiEvent == true
  ) {
    const timeObj = BookingController.pickedTimeObj!;
    const treatment = Object.values($bookingMakerStore.services)[0];
    if (timeObj.changedEventPrice != null) {
      treatment.changedPrice = timeObj.changedEventPrice;
    }
    if (timeObj.changedEventTimes != null) {
      treatment.changedTimes = timeObj.changedEventTimes;
    }
  }
</script>

<button
  class="shrink-0 bg-base-300 hover:bg-base-300 w-full rounded-lg"
  on:click={() => {
    bookingMakerStore.update((value) => {
      value.currentStep = 1;
      return value;
    });
  }}
>
  <div class=" flex flex-row items-center justify-between py-3 sm:py-4 px-5">
    <div class="flex flex-row items-center gap-4">
      <!-- icon -->
      <GeneralIcon icon="mdi:hammer-wrench"></GeneralIcon>

      <!-- name price and time -->
      <div class="flex flex-col items-start justify-between gap-1">
        <h3 class="font-semibold text-lg xs:text-xl">
          {treatmentAmount === 1
            ? Object.values($bookingMakerStore.services)[0].name
            : `${treatmentAmount} ${translate("treatments")}`}
        </h3>
        <ServicesDetails {treatmentAmount} />
        <ChangedPriceOrDurationIndicator />
      </div>
      <!-- end of list tile -->
    </div>
    <CustomArrow />
  </div>
</button>
