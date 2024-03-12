<script lang="ts">
  import GeneralDialog from "$lib/components/dialogs/GeneralDialog.svelte";
  import BookingHelper from "$lib/helpers/booking/booking_helper";
  import Booking from "$lib/models/booking/booking_model";
  import { ShowToast } from "$lib/stores/ToastManager";
  import { _, translate } from "$lib/utils/translate";

  export let dialog: HTMLDialogElement;
  export let booking: Booking;
  export let mainDialog: HTMLDialogElement;
  export let loadingDelete: Boolean;

  async function deleteFromUser(): Promise<boolean> {
    if (loadingDelete) {
      return false;
    }
    loadingDelete = true;
    let resp: boolean = false;
    try {
      resp = await BookingHelper.GI().deleteBookingOnlyFromUserDoc({
        booking,
        deleteFromPassed: false,
      });
    } finally {
      loadingDelete = false;
    }
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
      mainDialog.close();
    }
    return resp;
  }
</script>

<GeneralDialog
  bind:dialog
  onSave={deleteFromUser}
  needTitleGender={false}
  maxWidth="max-w-[300px]"
  titleTransKey={"deletedWorker"}
  content={translate("theBookingHasNoWorker").replaceAll(
    "WORKERNAME",
    booking.workerName
  )}
  saveTranslateKey={"delete"}
  cancelTranslateKey={"cancel"}
/>
