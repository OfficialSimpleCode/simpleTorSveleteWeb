<script>
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import { langStore } from "$lib/language/loader";
  import { Duration } from "$lib/models/core/duration";
  import { addDuration, subDuration } from "$lib/utils/duration_utils";
  import { setToMidNight } from "$lib/utils/times_utils";
  import { jumpToDate } from "../../../helpers/jump_to_date";

  $: formatter = new Intl.DateTimeFormat($langStore, { month: "long" });
  $: monthStr = formatter.format($bookingMakerStore.timePickerDisplayDates[0]);
  $: yearStr = $bookingMakerStore.timePickerDisplayDates[0].getFullYear();

  $: canBackwards =
    subDuration(
      $bookingMakerStore.timePickerDisplayDates[0],
      new Duration({ days: 1 })
    ) >= setToMidNight(new Date());
  $: canForwards =
    addDuration(
      $bookingMakerStore.timePickerDisplayDates[
        $bookingMakerStore.numberOfShownDays - 1
      ],
      new Duration({ days: 1 })
    ) <=
    setToMidNight(
      addDuration(
        new Date(),
        new Duration({ days: BookingController.worker.daysToAllowBookings })
      )
    );
  function forward() {
    if (!canForwards) {
      return;
    }
    console.log("ssssssssssssss");
    let newDate = new Date();

    if ($bookingMakerStore.timePickerDisplayDates.length > 0) {
      newDate = addDuration(
        $bookingMakerStore.timePickerDisplayDates[0],
        new Duration({ days: $bookingMakerStore.numberOfShownDays })
      );
    }

    jumpToDate(newDate);
  }
  function backwards() {
    if (!canBackwards) {
      return;
    }

    let newDate = new Date();

    if ($bookingMakerStore.timePickerDisplayDates.length > 0) {
      newDate = subDuration(
        $bookingMakerStore.timePickerDisplayDates[0],
        new Duration({ days: $bookingMakerStore.numberOfShownDays })
      );
    }

    jumpToDate(newDate);
  }
  function jumpToToday() {
    jumpToDate(new Date());
  }
</script>

<div class="flex justify-between w-full px-1 xs:px-3 sm:px-5 py-3 ltr:">
  <!-- jump to today, backwards and month indicator -->
  <div class="flex flex-row items-center justify-center">
    <div class="flex flex-row gap-[9px] items-center justify-center">
      <button class="hover:opacity-70" on:click={jumpToToday}>
        <GeneralIcon icon="ic:sharp-today" />
      </button>

      <div class="flex flex-row ltr:hidden">
        <CustomCircleIcon
          icon="mdi:keyboard-arrow-right"
          size="xs"
          active={canBackwards}
          handleClick={backwards}
        />
      </div>
      <div class="flex flex-row rtl:hidden">
        <CustomCircleIcon
          icon="mdi:keyboard-arrow-left"
          size="xs"
          active={canBackwards}
          handleClick={backwards}
        />
      </div>
      <h3 class="text-sm">
        {$bookingMakerStore.timePickerDisplayDates.length > 0
          ? `${monthStr}  ${yearStr}`
          : ""}
      </h3>
    </div>
  </div>
  <!-- forward -->
  <div class="flex flex-row ltr:hidden">
    <CustomCircleIcon
      icon="mdi:keyboard-arrow-left"
      size="xs"
      active={canForwards}
      handleClick={forward}
    />
  </div>
  <div class="flex flex-row rtl:hidden">
    <CustomCircleIcon
      icon="mdi:keyboard-arrow-right"
      size="xs"
      active={canForwards}
      handleClick={forward}
    />
  </div>
</div>
