<script lang="ts">
  import Booking from "$lib/models/booking/booking_model";

  import CustomArrow from "$lib/components/custom_components/CustomArrow.svelte";
  import GeneralIcon from "$lib/components/custom_components/GeneralIcon.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";

  export let booking: Booking;
  export let downloadAppDialog: HTMLDialogElement | undefined;

  $: leftToPay =
    booking.totalPrice.amount - booking.transactionsTotalPaymentPrice.amount;
  /*Make the string of payment */
  $: paidString = `${
    booking.isDepositTransaction
      ? booking.transactionsTotalDepositPrice
      : booking.transactionsTotalPaymentPrice
  } / ${booking.totalPrice}`;
  $: paid = leftToPay <= 0 && booking.totalPrice.amount > 0;

  function onClick() {
    pushDialog(downloadAppDialog);
  }
</script>

<button
  class="flex flex-row w-full justify-between items-center bg-base-300 {containerRadius} py-4 px-3 gap-2"
  on:click={onClick}
>
  <div class="flex flex-row items-center gap-2">
    <GeneralIcon icon="mdi:payment" />
    <!-- like a listTile widget -->
    <div class="flex flex-col items-start">
      <p>{translate("onlinePayments", $_)}</p>
      <p class="text-xs opacity-70">
        {translate(paid ? "pressToWatch" : "pressToPay", $_)}
      </p>
    </div>
  </div>

  <div class="flex flex-row justify-center items-center">
    <p class="text-nowrap text-sm" dir="ltr">{paidString}</p>
    <CustomArrow />
  </div>
</button>
