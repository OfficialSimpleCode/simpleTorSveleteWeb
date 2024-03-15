<script lang="ts">
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import { _, translate } from "$lib/utils/translate";
  let transKey: string = "";
  $: if (
    BookingController.pickedTimeObj != null &&
    $bookingMakerStore.isMultiEvent == true
  ) {
    if (
      BookingController.pickedTimeObj?.changedEventPrice != null &&
      BookingController.pickedTimeObj?.changedEventTimes != null
    ) {
      transKey = "priceAndDurationsChanged";
    } else if (BookingController.pickedTimeObj?.changedEventPrice != null) {
      transKey = "priceEventChanged";
    } else if (BookingController.pickedTimeObj?.changedEventTimes != null) {
      transKey = "timesEventChanged";
    }
  }
</script>

{#if transKey}
  <div class="text-xs opacity-60 text-start">
    <p>{translate(transKey, $_, false)}</p>
  </div>
{/if}
