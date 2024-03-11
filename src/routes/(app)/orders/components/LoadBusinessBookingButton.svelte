<script lang="ts">
  import { base } from "$app/paths";
  import Booking from "$lib/models/booking/booking_model";
  import { _, translate } from "$lib/utils/translate";
  import ActionsContainer from "./ActionsContainer.svelte";

  export let bgColor: string = "bg-base-300";
  export let booking: Booking;
  export let deleteBookingWithoutBusinessDialog: HTMLDialogElement;
  let loading: boolean = false;

  async function loadBusiness() {
    if (loading) {
      return;
    }
    loading = true;
  }
  async function onLoad() {
    loading = false;
  }
</script>

<ActionsContainer
  text={translate("loadBuisness", $_)}
  icon="mdi:reload"
  href={`${base}/business/${booking.buisnessId}/orders`}
  {onLoad}
  {loading}
  onClick={loadBusiness}
  active={true}
  {bgColor}
/>
