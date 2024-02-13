<script lang="ts">
  import GeneralIcon from "$lib/components/GeneralIcon.svelte";
  import CustomArrow from "$lib/components/custom_components/CustomArrow.svelte";
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import { Duration } from "$lib/models/core/duration";
  import {
    defaultCurrency,
    type CurrencyModel,
  } from "$lib/models/general/currency_model";
  import { Price } from "$lib/models/general/price";
  import { length } from "$lib/utils/core_utils";
  import { printDuration } from "$lib/utils/string_utils";
  import { _, translate } from "$lib/utils/translate";

  let hasPayment: boolean = false;
  let treatmentCurrency: CurrencyModel = defaultCurrency;
  let treatmentAmount: number = 0;
  let totalPrices: number = 0;
  let totalMinutes: number = 0;
  let notShownPrice: number = 0;

  let notShownTime: number = 0;

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
  let priceText: string = "";
  if (notShownPrice > 0) {
    if (notShownPrice >= length($bookingMakerStore.services)) {
      priceText = translate("notKnown");
    } else if (notShownPrice > 0) {
      priceText = translate("moreThen", $_, false);
    }
  }

  let timeText: string = "";
  if (notShownTime > 0) {
    if (notShownTime >= length($bookingMakerStore.services)) {
      timeText = translate("notKnown");
    } else if (notShownTime > 0) {
      timeText = translate("moreThen", undefined, false);
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
        <div class="flex flex-row gap-[6px] opacity-70">
          <!-- price indicator -->
          <div>
            {#if priceText != ""}
              <h3>{priceText}</h3>
            {/if}
            {#if priceText != translate("notKnown")}
              {new Price({
                amount: totalPrices.toString(),
                currency: treatmentCurrency,
              }).toString()}
            {/if}
          </div>
          |
          <div>
            {#if timeText != ""}
              <h3>{timeText}</h3>
            {/if}
            {#if timeText != translate("notKnown")}
              <div class="flex flex-row gap-2">
                <h3>
                  {printDuration(new Duration({ minutes: totalMinutes }))}
                </h3>
                <h3>
                  {translate("hours")}
                </h3>
              </div>
            {/if}
          </div>
          {#if length($bookingMakerStore.services) === 1 && Object.values($bookingMakerStore.services)[0].isMulti && Object.values($bookingMakerStore.services)[0].showParticipants}
            |
          {/if}

          {#if length($bookingMakerStore.services) === 1 && Object.values($bookingMakerStore.services)[0].isMulti && Object.values($bookingMakerStore.services)[0].showParticipants}
            {#if Object.values($bookingMakerStore.services)[0].participants === 1}
              <h3>{translate("oneParticipant")}</h3>
            {:else}
              <h3>
                {Object.values(
                  $bookingMakerStore.services
                )[0].participants.toString()}
                {translate("participants")}
              </h3>
            {/if}
          {/if}
        </div>
      </div>
      <!-- end of list tile -->
    </div>
    <CustomArrow />
  </div>
</button>
