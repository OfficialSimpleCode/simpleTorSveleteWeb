<script lang="ts">
  import { bookingMakerStore } from "$lib/controllers/booking_controller";
  import { Duration } from "$lib/models/core/duration";
  import {
    CurrencyModel,
    defaultCurrency,
  } from "$lib/models/general/currency_model";

  import { Price } from "$lib/models/general/price";
  import { length } from "$lib/utils/core_utils";
  import { printDuration } from "$lib/utils/string_utils";
  import { _, translate } from "$lib/utils/translate";
  export let treatmentAmount: number;
  let hasPayment: boolean = false;
  let treatmentCurrency: CurrencyModel = defaultCurrency;
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
            totalPrices += (treatment.changedPrice ?? treatment.price!).amount;
          } else {
            notShownPrice += 1;
          }
          if (treatment.showTime) {
            if (treatment.changedTimes != null) {
              treatment.changedTimes!.forEach((time, _) => {
                totalMinutes += time.wholeMinutes;
              });
            } else {
              totalMinutes += treatment.totalMinutes;
            }
          } else {
            notShownTime += 1;
          }

          treatmentCurrency = (treatment.changedPrice ?? treatment.price!)
            .currency;

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

<div
  class="flex flex-wrap gap-[5px] opacity-70 text-nowrap truncate text-xs xs:text-sm"
>
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
        {Object.values($bookingMakerStore.services)[0].participants.toString()}
        {translate("participants")}
      </p>
    {/if}
  {/if}
</div>
