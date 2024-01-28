<script lang="ts">
  import Booking from "$lib/models/booking/booking_model";
  import { translate } from "$lib/utils/translate";
  import { ArrowUpCircle } from "svelte-hero-icons";
  import ActionsContainer from "./ActionsContainer.svelte";

  export let bgColor: string = "bg-base-300";
  export let booking: Booking;
  function loadBusiness(): void {
    booking.buisnessId;
  }
</script>

<ActionsContainer
  text={translate("loadBuisness")}
  icon={ArrowUpCircle}
  onClick={loadBusiness}
  {bgColor}
></ActionsContainer>
