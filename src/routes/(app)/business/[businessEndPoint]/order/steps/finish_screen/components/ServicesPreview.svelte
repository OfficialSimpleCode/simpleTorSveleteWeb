<script lang="ts">
  import CustomArrow from "$lib/components/custom_components/CustomArrow.svelte";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
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
      <div class="flex flex-col items-start justify-between gap-2">
        <h3 class="font-semibold text-lg xs:text-xl">
          {treatmentAmount === 1
            ? Object.values($bookingMakerStore.services)[0].name
            : `${treatmentAmount} ${translate("treatments")}`}
        </h3>
        <div class="flex flex-row gap-[6px] opacity-70 text-nowrap truncate">
          <!-- price indicator -->
          <div class="flex flex-row gap-[4px]">
            {#if priceText != ""}
              <p>{priceText}</p>
            {/if}
            {#if priceText != translate("notKnown")}
              {new Price({
                amount: totalPrices.toString(),
                currency: treatmentCurrency,
              }).toString()}
            {/if}
          </div>
          |
          <!-- time indicator -->
          <div class="flex flex-row gap-[4px]">
            {#if timeText != ""}
              <p>{timeText}</p>
            {/if}
            {#if timeText != translate("notKnown")}
              <div class="flex flex-row gap-2">
                <p>
                  {printDuration(new Duration({ minutes: totalMinutes }))}
                </p>
                <p>
                  {translate("hours")}
                </p>
              </div>
            {/if}
          </div>
          {#if length($bookingMakerStore.services) === 1 && Object.values($bookingMakerStore.services)[0].isMulti && Object.values($bookingMakerStore.services)[0].showParticipants}
            |
          {/if}

          <!-- participants indicator -->
          {#if length($bookingMakerStore.services) === 1 && Object.values($bookingMakerStore.services)[0].isMulti && Object.values($bookingMakerStore.services)[0].showParticipants}
            {#if Object.values($bookingMakerStore.services)[0].participants === 1}
              <p>{translate("oneParticipant")}</p>
            {:else}
              <p>
                {Object.values(
                  $bookingMakerStore.services
                )[0].participants.toString()}
                {translate("participants")}
              </p>
            {/if}
          {/if}
        </div>
      </div>
      <!-- end of list tile -->
    </div>
    <CustomArrow />
  </div>
</button>
