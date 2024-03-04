<script lang="ts">
  import TermDialog from "$lib/components/dialogs/TermDialog.svelte";

  import { LoginReason } from "$lib/consts/auth";
  import BookingController, {
    bookingMakerStore,
    showPhoneVerificationAlert,
  } from "$lib/controllers/booking_controller";
  import PublicCustomer from "$lib/models/worker/public_customer";
  import { needToHoldOn } from "$lib/utils/booking_utils";
  import { _, translate } from "$lib/utils/translate";
  import { get } from "svelte/store";
  import { handleVerification } from "../../../../../../profile/helpers/handle_verification";

  import AttentionText from "$lib/components/custom_components/AttentionText.svelte";
  import DownloadAppDialog from "$lib/components/dialogs/DownloadAppDialog.svelte";
  import GeneralDialog from "$lib/components/dialogs/GeneralDialog.svelte";
  import PhoneDialog from "$lib/components/dialogs/phone_dialog/PhoneDialog.svelte";
  import { maxButtonSize } from "$lib/consts/sizes";
  import { pushDialog } from "$lib/utils/general_utils";
  import { getPublicCustomer } from "../helpers/get_public_user";
  import { handleApproveTerm } from "../helpers/handle_approving_term";
  import { onFinishNavigator } from "../helpers/on_finish_navigator";
  export let verificationDialog: HTMLDialogElement;
  let termDialog: HTMLDialogElement;
  let downloadAppDialog: HTMLDialogElement;
  let needVerificationForReminderDialog: HTMLDialogElement;
  let isLoading: boolean = false;

  const publicCustomer: PublicCustomer = getPublicCustomer();

  console.log(
    BookingController.worker.mustVerifyPhone,
    $bookingMakerStore.showVerificationAlert
  );

  const worker = BookingController.worker;

  const needOnHold = needToHoldOn(
    get(bookingMakerStore).date ?? new Date(0),
    worker
  );

  async function addBooking() {
    if (isLoading) {
      return;
    }

    isLoading = true;

    try {
      await onFinishNavigator({
        downloadAppDialog,
      });
    } finally {
      isLoading = false;
    }
  }
  async function handleClick() {
    if (publicCustomer.blocked) {
      return;
    }
    if (!handleApproveTerm(termDialog)) {
      return;
    }
    if ($bookingMakerStore.showVerificationAlert) {
      console.log("ddddddddddddddd", BookingController.worker?.mustVerifyPhone);
      console.log(BookingController.worker);
      if (BookingController.worker?.mustVerifyPhone != true) {
        pushDialog(needVerificationForReminderDialog);
      } else {
        await handleVerification(verificationDialog);
      }

      return;
    } else {
      await addBooking();
    }
  }

  async function onVerifiedPhone() {
    //remove the otp dialog
    verificationDialog.close();

    //update the boooking maker store that no need to show the phone verification anymore
    bookingMakerStore.update((val) => {
      val.showVerificationAlert = showPhoneVerificationAlert(
        BookingController.worker
      );
      return val;
    });

    //add the booking again
    addBooking();
  }
</script>

<PhoneDialog
  loginReason={LoginReason.phoneVerification}
  insideOtp={true}
  on:onVerifyPhone={onVerifiedPhone}
  bind:dialog={verificationDialog}
/>

<TermDialog
  on:onConfirmTerm={() => {
    termDialog.close();
    handleClick();
  }}
  bind:dialog={termDialog}
/>

<DownloadAppDialog
  bind:dialog={downloadAppDialog}
  explainTranslateKey={"paymentOnBookingAreNotAvailableOnWeb"}
/>

<GeneralDialog
  bind:dialog={needVerificationForReminderDialog}
  titleTransKey={"weNeedPhoneVerification"}
  content={translate("phoneVerificationExplain")}
  onCancel={addBooking}
  onSave={async () => {
    needVerificationForReminderDialog.close();
    await handleVerification(verificationDialog);
  }}
  maxWidth="max-w-[400px]"
  saveTranslateKey={"verify"}
  cancelTranslateKey={"skip"}
/>
<!-- xs:px-10 px-3 -->
<div class="flex flex-col items-center justify-center gap-3 w-full">
  {#if needOnHold}
    <AttentionText
      text={worker?.orderNeerDedlineBookingMessage ??
        translate("bookingNeedConfirmation", $_)}
    />
  {/if}
  <button
    class="btn btn-primary w-[300px] sm:w-[200px] {isLoading
      ? 'opacity-55'
      : ''} {maxButtonSize} hover:outline flex flex-col"
    on:click={handleClick}
  >
    {#if isLoading}
      <div class="loading loading-spinner" />
    {:else}
      {publicCustomer.blocked
        ? translate("blockUser", $_, false)
        : translate(
            needOnHold
              ? "askForConfirmation"
              : $bookingMakerStore.isUpdate
                ? "update"
                : "order2",
            $_
          )}
    {/if}

    {#if publicCustomer.blocked}
      <h3 class="opacity-70">
        {translate("blockedUserCantOrder", $_)}
      </h3>
    {/if}
  </button>
</div>
