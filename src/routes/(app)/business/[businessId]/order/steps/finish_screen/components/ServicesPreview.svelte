<script lang="ts">
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";
  import CustomArrow from "$lib/components/custom_components/CustomArrow.svelte";
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import {
    defaultCurrency,
    type CurrencyModel,
  } from "$lib/models/general/currency_model";
  import { _, translate } from "$lib/utils/translate";

  let hasPayment: boolean = false;
  let treatmentCurrency: CurrencyModel = defaultCurrency;
  let treatmentAmount: number = 0;
  let totalPrices: number = 0;
  let totalMinutes: number = 0;
  let notShownPrice: number = 0;

  let notShownTime: number = 0;
  let priceText: string = "";

  Object.entries($bookingMakerStore.services).forEach(
    ([treatmentId, treatment]) => {
      Array(treatment.count)
        .fill(0)
        .forEach((_) => {
          treatmentAmount += 1;
          if (treatment.showPrice) {
            totalPrices += treatment.price!.amount;
          } else {
            notShownPrice += 1;
          }
          if (treatment.showTime) {
            totalMinutes += treatment.totalMinutes;
          } else {
            notShownTime += 1;
          }

          treatmentCurrency = treatment.price!.currency;

          hasPayment = hasPayment || treatment.amountInAdvance > 0;
        });
    }
  );

  if (notShownPrice > 0) {
    if (notShownPrice >= Object.keys($bookingMakerStore.services).length) {
      priceText = translate("notKnown");
    } else if (notShownPrice > 0) {
      priceText = translate("moreThen", $_, false);
    }
  }
</script>

<button
  class="shrink-0 bg-base-300 hover:bg-base-300 w-full rounded-lg"
  on:click={() => {
    const maker = $bookingMakerStore;
    maker.currentStep = 2;
    bookingMakerStore.set(maker);
  }}
>
  <div class=" flex flex-row items-center justify-between py-3 sm:py-4 px-5">
    <div class="flex flex-row items-center gap-4">
      <!-- icon -->
      <GeneralIcon icon="mdi:hammer-wrench"></GeneralIcon>

      <!-- name price and time -->
      <div class="flex flex-col items-start justify-between gap-2">
        <h3 class="font-semibold text-lg xs:text-2xl">
          {treatmentAmount === 1
            ? Object.values($bookingMakerStore.services)[0].name
            : `${treatmentAmount} ${translate("treatments")}`}
        </h3>

        <!-- price and time -->
        <h3 class="flex flex-row items-center opacity-80 text-md xs:text-lg">
          {totalPrices}
          <div class="divider divider-horizontal mx-0 sm:mx-2" />
          <h3>
            {totalMinutes}
          </h3>
        </h3>
      </div>
      <!-- end of list tile -->
    </div>
    <CustomArrow></CustomArrow>
  </div>
</button>
