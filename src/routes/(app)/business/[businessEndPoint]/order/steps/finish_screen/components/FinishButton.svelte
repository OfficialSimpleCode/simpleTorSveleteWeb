<script lang="ts">
  import BookingController, {
    bookingMakerStore,
  } from "$lib/controllers/booking_controller";
  import { _, translate } from "$lib/utils/translate";

  import AttentionText from "$lib/components/custom_components/AttentionText.svelte";

  import { maxButtonSize } from "$lib/consts/sizes";

  import type PublicCustomer from "$lib/models/worker/public_customer";
  import { createEventDispatcher } from "svelte";
  export let isLoading: boolean;
  export let needOnHold: boolean;
  export let overflowTickets: boolean;
  export let overpassBookings: boolean;
  export let publicCustomer: PublicCustomer;

  const worker = BookingController.worker;
  const dispatch = createEventDispatcher();
</script>

<!-- xs:px-10 px-3 -->
<div class="flex flex-col items-center justify-center gap-1 w-full">
  {#if needOnHold}
    <AttentionText
      text={worker?.orderNeerDedlineBookingMessage ??
        translate("bookingNeedConfirmation", $_)}
    />
  {/if}
  <button
    class="btn btn-primary w-[300px] sm:w-[200px] {isLoading
      ? 'opacity-55'
      : ''} {maxButtonSize} hover:outline flex flex-col"
    on:click={() => dispatch("handleClick")}
  >
    {#if isLoading}
      <div class="loading loading-spinner" />
    {:else}
      {overpassBookings
        ? translate("crossBokingsLimitWorker", $_, false)
        : overflowTickets
          ? translate("toManyTickets")
          : publicCustomer.blocked
            ? translate("blockUser", $_, false)
            : translate(
                needOnHold
                  ? "askForConfirmation"
                  : $bookingMakerStore.isUpdate
                    ? "update"
                    : "order2",
                $_
              )}
    {/if}
  </button>
  {#if publicCustomer.blocked}
    <h3 class="opacity-70 text-xs">
      {translate("blockedUserCantOrder", $_)}
    </h3>
  {/if}
  {#if overflowTickets}
    <p class="opacity-70 text-xs">
      {translate("toManyTicketsExplain", $_)}
    </p>
  {/if}

  {#if overpassBookings}
    <p class="opacity-70 text-xs">
      {translate("crossBokingsLimitExplain", $_, false).replace(
        "AMOUNT",
        BookingController.worker.maxFutureBookings.toString()
      )}
    </p>
  {/if}
</div>
