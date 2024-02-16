<script lang="ts">
  import { BookingStatuses, DeleteOption } from "$lib/consts/booking";
  import Booking from "$lib/models/booking/booking_model";
  import { Duration } from "$lib/models/core/duration";
  import { workersStore } from "$lib/stores/Workers";
  import { addDuration } from "$lib/utils/duration_utils";
  import { translate } from "$lib/utils/translate";
  import AttentionText from "../custom_components/AttentionText.svelte";
  import GeneralDialog from "./GeneralDialog.svelte";
  export let deleteDialog: HTMLDialogElement;
  export let booking: Booking;
  export let onDelete: (deleteOption: DeleteOption) => Promise<boolean>;
  const worker = $workersStore[booking.workerId];

  let deleteOption: DeleteOption = DeleteOption.deleteAllEvents;

  const content =
    translate(
      booking.isMultiRef ? "doCancelSigning" : "areYouSure",
      undefined,
      false
    ).replaceAll("EVENTNAME", booking.treatmentsToStringDetailed) + " ?";

  const needConfirmation =
    worker != null &&
    worker!.cancelMinutes != 0 &&
    booking.status === BookingStatuses.approved &&
    !booking.isPassed &&
    addDuration(new Date(), new Duration({ minutes: worker!.cancelMinutes })) >
      booking.currentDisplayDate;

  if (needConfirmation) {
    deleteOption = DeleteOption.needConfirmation;
  }

  let attentionText: string | undefined;

  if (
    booking.transactionsTotalDepositPrice.amount > 0 ||
    booking.transactionsTotalPaymentPrice.amount > 0
  ) {
    attentionText = translate(
      booking.isDepositTransaction
        ? "thisBookingWithDepositSureDeletionUser"
        : "thisBookingWithPaidPaymentDeletionUser",
      undefined,
      false
    );
  }
  async function onFinish(): Promise<boolean> {
    return await onDelete(deleteOption);
  }
</script>

<GeneralDialog
  bind:dialog={deleteDialog}
  onSave={onFinish}
  titleTransKey={translate(
    booking.isMultiRef
      ? "cancelSigning"
      : booking.recurrenceRef != null || booking.recurrenceEvent != null
        ? "recurringBooking"
        : booking.isPassed
          ? "deleteBooking2"
          : "deleteBooking"
  )}
  {content}
  saveTranslateKey={translate(
    needConfirmation
      ? "askForConfirmation"
      : booking.isMultiRef
        ? "cancel"
        : booking.isPassed
          ? "delete"
          : "cancel"
  )}
  cancelTranslateKey={translate(booking.isPassed ? "cancel" : "exit")}
>
  <div slot="extra" class="flex flex-col gap-2">
    {#if needConfirmation}
      <AttentionText
        onSurface={true}
        text={worker?.deleteNeerDedlineBookingMessage != null &&
        worker?.deleteNeerDedlineBookingMessage != ""
          ? worker?.deleteNeerDedlineBookingMessage
          : translate("needConfirmationToDelete")}
      />{/if}
    {#if attentionText != null}
      <AttentionText onSurface={true} text={attentionText} />
    {/if}
  </div>
</GeneralDialog>