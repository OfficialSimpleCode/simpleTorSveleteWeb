<script lang="ts">
  import Booking from "$lib/models/booking/booking_model";
  import { translate } from "$lib/utils/translate";

  import BookingActions from "../../BookingActions.svelte";
  import CircleIcons from "../../CircleIcons.svelte";

  export let booking: Booking;
</script>

<div
  class="flex flex-row w-full justify-between items-center bg-base-300 rounded-lg py-2 px-2 gap-2"
>
  <!-- like a listTile widget -->
  <div class="flex flex-row items-center">
    <CircleIcons {booking}></CircleIcons>
    <!-- string date -> business name, worker -->
    <div class="flex flex-col items-start">
      <h1>
        {booking.treatmentsToStringNotDetailed +
          ` ${translate("to")} ${booking.businessName}`}
      </h1>
      <h1>
        {`${translate("with")} ${booking.workerName}`}
      </h1>
    </div>
  </div>

  <!-- svelte-ignore missing-declaration -->
  <BookingActions {booking} bgColor="bg-base-200"></BookingActions>
</div>
