<script lang="ts">
  import { _ } from "svelte-i18n";

  import {
    Calendar,
    ChevronRight,
    Clock,
    Icon,
    WrenchScrewdriver,
  } from "svelte-hero-icons";

  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import {
    defaultCurrency,
    type CurrencyModel,
  } from "$lib/models/general/currency_model";
  import { getWeekdayFromDate } from "$lib/utils/dates_utils";
  import {
    dateToDateStr,
    dateToTimeStr,
  } from "$lib/utils/times_utils/times_utils";
  import { translate } from "$lib/utils/translate";
  import TipDialog from "../../components/TipDialog.svelte";
  import { addBooking } from "./helpers/add_booking";

  let paymentDialog: HTMLDialogElement;
  let amount: number;
  let treatmentAmount: number = 0;
  let totalPrices: number = 0;
  let totalMinutes: number = 0;
  let hasPayment: boolean = false;
  let notShownPrice: number = 0;
  let notShownTime: number = 0;

  let treatmentCurrency: CurrencyModel = defaultCurrency;

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
    if (notShownPrice >= Object.keys($bookingMakerStore.services).length) {
      priceText = translate("notKnown");
    } else if (notShownPrice > 0) {
      priceText = translate("moreThen", false);
    }
  }

  let timeText: string = "";
  if (notShownTime > 0) {
    if (notShownTime >= Object.keys($bookingMakerStore.services).length) {
      timeText = translate("notKnown");
    } else if (notShownTime > 0) {
      timeText = translate("moreThen", false);
    }
  }
</script>

<!-- Dialogs -->
<TipDialog bind:dialog={paymentDialog} bind:amount />

<section class="flex flex-col items-center gap-8 w-[90%] sm:w-[70%]">
  <h1 class="text-3xl text-center">
    {$_("bookAnOrder")}
    {$_("to")}
    <span class="font-bold text-primary">{BookingController.worker.name}</span>
  </h1>
  <div
    class="card shrink-0 w-full sm:w-[70%] bg-base-200 max-h-24 sm:max-h-full"
  >
    <div
      class="card-body flex flex-row items-center justify-center p-2 sm:p-8 gap-8"
    >
      <div class="flex flex-row items-center gap-3">
        <Icon src={Calendar} size="26px" />
        <div class="flex flex-col items-center justify-center">
          <h3 class="sm:text-xl text-primary">
            {dateToDateStr($bookingMakerStore.date ?? new Date(0))}
          </h3>
          <h3 class="sm:text-xl text-primary">
            {getWeekdayFromDate($bookingMakerStore.date ?? new Date(0))}
          </h3>
        </div>
      </div>
      <div class="flex flex-row items-center gap-3">
        <Icon src={Clock} size="26px" />
        <div>
          <h3 class="sm:text-xl text-primary">
            {dateToTimeStr($bookingMakerStore.date ?? new Date(0))}
          </h3>
        </div>
      </div>
    </div>
  </div>

  <button
    class="card shrink-0 bg-base-200 hover:bg-base-300 w-full sm:w-[70%]"
    on:click={() => {
      const maker = $bookingMakerStore;
      maker.currentStep = 2;
      bookingMakerStore.set(maker);
    }}
  >
    <div
      class="card-body flex flex-row items-center justify-between py-2 sm:p-8"
    >
      <div class="flex flex-row items-center gap-4">
        <Icon src={WrenchScrewdriver} size="26px" />
        <div class="flex flex-col items-start justify-between">
          <h3 class="font-semibold">
            {treatmentAmount === 1
              ? Object.values($bookingMakerStore.services)[0].name
              : `${treatmentAmount} ${translate("treatments")}`}
          </h3>
          <h3 class="flex flex-row items-center">
            {amount}
            <div class="divider divider-horizontal mx-0 sm:mx-2" />
            <h3>
              {totalMinutes}
            </h3>
          </h3>
        </div>
      </div>
      <Icon src={ChevronRight} size="26px" />
    </div>
  </button>

  <label class="form-control w-full sm:w-[70%]">
    <div class="label">
      <span class="label-text sm:text-lg">{$_("note")} ({$_("optional")})</span>
    </div>
    <input
      type="text"
      placeholder="Note to employee"
      class="input input-bordered sm:input-lg w-full"
    />
  </label>

  <button
    class="btn sm:btn-lg btn-primary"
    on:click={() => addBooking({ clientNote: "" })}>Confirm Appointment</button
  >
</section>
