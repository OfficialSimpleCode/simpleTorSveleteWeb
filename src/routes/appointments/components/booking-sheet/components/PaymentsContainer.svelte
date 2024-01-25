<script lang="ts">
  import Booking from "$lib/models/booking/booking_model";
  import { Icon, Trash } from "svelte-hero-icons";

  import CustomArrow from "$lib/components/custom_components/custom_arrow.svelte";
  import { translate } from "$lib/utils/translate";

  export let booking: Booking;

  const leftToPay: number =
    booking.totalPrice.amount - booking.transactionsTotalPaymentPrice.amount;
  /*Make the string of payment */
  const paidString = `${
    booking.isDepositTransaction
      ? booking.transactionsTotalDepositPrice
      : booking.transactionsTotalPaymentPrice
  } / ${booking.totalPrice}`;
  const paid = leftToPay <= 0 && booking.totalPrice.amount > 0;
</script>

<div
  class="flex flex-row w-full justify-between items-center bg-slate-300 rounded-lg py-2 px-2 gap-2"
>
  <div class="flex flex-row items-center gap-2">
    <Icon src={Trash} size="26px" />
    <!-- like a listTile widget -->
    <div class="flex flex-col items-start">
      <p>{translate("onlinePayments")}</p>
      <p class="text-sm">{translate(paid ? "pressToWatch" : "pressToPay")}</p>
    </div>
  </div>

  <div class="flex flex-row justify-center items-center">
    <p class="text-nowrap" dir="ltr">20.0 / {booking.totalPrice.toString()}</p>
    <CustomArrow></CustomArrow>
  </div>
</div>
