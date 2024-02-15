<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import Booking from "$lib/models/booking/booking_model";
  import { _, translate } from "$lib/utils/translate";
  import ActionsContainer from "./ActionsContainer.svelte";

  export let bgColor: string = "bg-base-300";
  export let booking: Booking;
  function loadBusiness(): void {
    goto(`${base}/business/${booking.buisnessId}/orders`);
  }
</script>

<ActionsContainer
  text={translate("loadBuisness", $_)}
  icon="mdi:reload"
  onClick={loadBusiness}
  active={true}
  {bgColor}
></ActionsContainer>
