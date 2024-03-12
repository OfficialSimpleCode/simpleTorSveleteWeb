<script lang="ts">
  import GeneralDialog from "$lib/components/dialogs/GeneralDialog.svelte";
  import BookingHelper from "$lib/helpers/booking/booking_helper";
  import Booking from "$lib/models/booking/booking_model";
  import { ShowToast } from "$lib/stores/ToastManager";
  import { _, translate } from "$lib/utils/translate";

  export let dialog: HTMLDialogElement;
  export let booking: Booking;

  export let mainDialog: HTMLDialogElement | undefined = undefined;

  async function deleteFromUser(): Promise<boolean> {
    let resp: boolean = false;

    resp = await BookingHelper.GI().deleteBookingOnlyFromUserDoc({
      booking,
      deleteFromPassed: false,
    });

    if (resp) {
      ShowToast({
        status: "success",
        text: translate(
          booking.isMultiRef
            ? "signOutSuccessfully"
            : "successfullydeletedBooking",
          $_,
          false
        ),
      });
      if (mainDialog != null) {
        mainDialog.close();
      }
    }
    return resp;
  }
</script>

<GeneralDialog
  bind:dialog
  onSave={deleteFromUser}
  maxWidth="max-w-[400px]"
  needTitleGender={false}
  titleTransKey={"deletedBusiness"}
  content={translate("theBookingHasNoBusiness").replaceAll(
    "BUSINESSNAME",
    booking.businessName
  )}
  saveTranslateKey={"delete"}
  cancelTranslateKey={"cancel"}
/>
