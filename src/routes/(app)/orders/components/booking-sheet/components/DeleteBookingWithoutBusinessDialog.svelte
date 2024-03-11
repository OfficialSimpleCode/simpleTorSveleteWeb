<script lang="ts">
  import GeneralDialog from "$lib/components/dialogs/GeneralDialog.svelte";
  import BookingHelper from "$lib/helpers/booking/booking_helper";
  import Booking from "$lib/models/booking/booking_model";
  import { translate } from "$lib/utils/translate";

  export let dialog: HTMLDialogElement;
  export let booking: Booking;

  async function deleteFromUser(): Promise<boolean> {
    return await BookingHelper.GI().deleteBookingOnlyFromUserDoc({
      booking,
      deleteFromPassed: false,
    });
  }
</script>

<GeneralDialog
  bind:dialog
  onSave={deleteFromUser}
  maxWidth="max-w-[300px]"
  needTitleGender={false}
  titleTransKey={"deletedBusiness"}
  content={translate("theBookingHasNoBusiness").replaceAll(
    "BUSINESSNAME",
    booking.businessName
  )}
  saveTranslateKey={"delete"}
  cancelTranslateKey={"cancel"}
/>
