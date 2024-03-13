<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  import BusinessInitializer from "$lib/initializers/business_initializer";
  import Booking from "$lib/models/booking/booking_model";
  import type BusinessModel from "$lib/models/business/business_model";
  import { pushDialog } from "$lib/utils/general_utils";
  import { _, translate } from "$lib/utils/translate";
  import ActionsContainer from "./ActionsContainer.svelte";
  export let bgColor: string = "bg-base-300";
  export let booking: Booking;
  export let deleteBookingWithoutBusinessDialog: HTMLDialogElement;
  export let mainDialog: HTMLDialogElement | undefined = undefined;
  let loading: boolean = false;
  let businessModel: BusinessModel | undefined;

  async function loadBusiness() {
    if (loading) {
      return;
    }

    loading = true;
    try {
      if (businessModel?.businessId != booking.buisnessId) {
        businessModel = await BusinessInitializer.GI().getBusinessModel(
          booking.buisnessId
        );
      }
      if (businessModel == null) {
        loading = false;
        if (mainDialog) {
          mainDialog.close();
        }

        pushDialog(deleteBookingWithoutBusinessDialog);

        return;
      }

      await goto(`${base}/business/${businessModel.url}/orders`);
    } finally {
      loading = false;
    }
  }
</script>

<ActionsContainer
  text={translate("loadBuisness", $_)}
  icon="mdi:reload"
  {loading}
  onClick={loadBusiness}
  active={true}
  {bgColor}
/>
