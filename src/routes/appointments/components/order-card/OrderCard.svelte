<script lang="ts">
  import type Booking from "$lib/models/booking/booking_model";
  import { businessStore } from "$lib/stores/Business";
  import { ChevronLeft, ChevronRight, Icon } from "svelte-hero-icons";
  import { _ } from "svelte-i18n";
  import BookingActions from "../BookingActions.svelte";
  import BookingDetails from "../BookingDetails.svelte";
  import CircleIcons from "../CircleIcons.svelte";

  export let booking: Booking;

  let onlyWorker = $businessStore.businessId !== booking.buisnessId;
</script>

<button class="card bg-base-200 w-full hover:bg-base-300 px-3 py-2">
  <!-- icons, name, arrow (above the divider)  -->
  <div class="flex flex-row w-full justify-between items-center">
    <!-- like a listTile widget -->
    <div class="flex flex-row items-center">
      <CircleIcons {booking}></CircleIcons>
      <!-- string date -> business name, worker -->
      <div class="flex flex-col items-start">
        <h1>
          {booking.treatmentsToStringNotDetailed +
            (onlyWorker ? "" : ` ${$_("to")} ${booking.businessName}`)}
        </h1>
        <h1>
          {`${$_("with")} ${booking.workerName}`}
        </h1>
      </div>
    </div>
    <!-- arrow icon -->
    <Icon
      src={document.dir == "ltr" ? ChevronRight : ChevronLeft}
      size="26px"
    />
  </div>

  <!-- divider -->
  <div class="h-[1px] w-full bg-slate-300 opacity-35 my-4"></div>

  <!-- booking details and actions (below the divider) -->
  <div class="flex flex-row justify-between w-full items-center">
    <BookingDetails {booking}></BookingDetails>

    <BookingActions {booking}></BookingActions>
  </div>
</button>
