<script lang="ts">
  import CustomCircleIcon from "$lib/components/custom_components/CustomCircleIcon.svelte";
  import { containerRadius } from "$lib/consts/sizes";
  import Booking from "$lib/models/booking/booking_model";
  import { Price } from "$lib/models/general/price";
  import { _, translate } from "$lib/utils/translate";

  export let booking: Booking;

  $: displayDebt =
    booking.debts.size !== 0 &&
    booking.totalDebtAmount !== 0 &&
    Array.from(booking.debts.values())[0].showUser;
</script>

{#if displayDebt}
  <div
    class="flex flex-row bg-base-300 {containerRadius} w-full items-center justify-center py-2 px-3 text-red-600 gap-2"
  >
    <CustomCircleIcon
      icon="mdi:dollar"
      onHoverColor={"bg-base-100"}
      translateKey=""
      bgColor="bg-base-100"
    />
    <p>{translate("debtOnBooking", $_)}</p>
    <p>
      {new Price({
        amount: booking.totalDebtAmount.toString(),
        currency: booking.currency,
      }).toString()}
    </p>
  </div>
{/if}
