<script lang="ts">
  import { BookingStatuses } from "$lib/consts/booking";
  import Booking from "$lib/models/booking/booking_model";
  import { translate } from "$lib/utils/translate";
  import { InformationCircle } from "svelte-hero-icons";
  import ActionsContainer from "./ActionsContainer.svelte";

  export let booking: Booking;
  export let bgColor: string = "bg-base-300";
</script>

<ActionsContainer
  text={translate(
    booking.status === BookingStatuses.approved
      ? "waitingForDelete"
      : "waitingForApproval"
  )}
  icon={InformationCircle}
  {bgColor}
></ActionsContainer>
