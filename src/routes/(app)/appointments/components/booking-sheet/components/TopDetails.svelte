<script lang="ts">
  import { containerRadius } from "$lib/consts/sizes";
  import Booking from "$lib/models/booking/booking_model";
  import type WorkerModel from "$lib/models/worker/worker_model";
  import { _, translate } from "$lib/utils/translate";

  import BookingActions from "../../BookingActions.svelte";
  import CircleIcons from "../../CircleIcons.svelte";

  export let booking: Booking;
  export let currentWorker: WorkerModel | undefined;
  export let forceOpenBookingSheet: boolean;
</script>

<div
  class="flex flex-row w-full justify-between items-center bg-base-300 {containerRadius} py-5 px-3 gap-2"
>
  <!-- like a listTile widget -->
  <div class="flex flex-row items-center">
    <CircleIcons {booking}></CircleIcons>
    <!-- string date -> business name, worker -->
    <div class="flex flex-col items-start">
      <h1>
        {booking.treatmentsToStringNotDetailed +
          ` ${translate("to", $_)} ${booking.businessName}`}
      </h1>
      <h1>
        {`${translate("with", $_)} ${booking.workerName}`}
      </h1>
    </div>
  </div>

  <!-- svelte-ignore missing-declaration -->
  <BookingActions
    {booking}
    bgColor="bg-base-200"
    {currentWorker}
    {forceOpenBookingSheet}
  />
</div>
