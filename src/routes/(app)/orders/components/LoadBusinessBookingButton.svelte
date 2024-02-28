<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import Booking from "$lib/models/booking/booking_model";
  import { businessStore } from "$lib/stores/Business";
  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  import ActionsContainer from "./ActionsContainer.svelte";

  export let bgColor: string = "bg-base-300";
  export let booking: Booking;
  export let deleteBookingWithoutBusinessDialog: HTMLDialogElement;
  async function loadBusiness() {
    await goto(`${base}/business/${booking.buisnessId}/orders`);
    if ($businessStore == null) {
      console.log("dddddddddddddd");
      setTimeout(() => pushDialog(deleteBookingWithoutBusinessDialog), 2000);
    }
  }
</script>

<ActionsContainer
  text={translate("loadBuisness", $_)}
  icon="mdi:reload"
  onClick={loadBusiness}
  active={true}
  {bgColor}
/>
