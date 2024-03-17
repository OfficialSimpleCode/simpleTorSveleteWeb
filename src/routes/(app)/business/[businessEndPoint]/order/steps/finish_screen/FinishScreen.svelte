<script lang="ts">
  import DateString from "$lib/components/DateString.svelte";
  import DownloadAppDialog from "$lib/components/dialogs/DownloadAppDialog.svelte";
  import GeneralDialog from "$lib/components/dialogs/GeneralDialog.svelte";
  import TermDialog from "$lib/components/dialogs/TermDialog.svelte";
  import { LoginReason } from "$lib/consts/auth";
  import BookingController, {
    bookingMakerStore,
    showPhoneVerificationAlert,
  } from "$lib/controllers/booking_controller";
  import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
  import { userStore } from "$lib/stores/User";
  import { needToHoldOn } from "$lib/utils/booking_utils";
  import { pushDialog } from "$lib/utils/general_utils";
  import { formatedPhone } from "$lib/utils/string_utils";
  import { _, translate } from "$lib/utils/translate";
  import LoginContainer from "../../../../../../(auth)/components/login/LoginContainer.svelte";
  import { sendSms } from "../../../../../../(auth)/components/login/components/otp_input_container/helpers/send_sms";
  import AddNote from "./components/AddNote.svelte";
  import FinishButton from "./components/FinishButton.svelte";
  import ServicesPreview from "./components/ServicesPreview.svelte";
  import { getPublicCustomer } from "./helpers/get_public_user";
  import { handleApproveTerm } from "./helpers/handle_approving_term";
  import { hasTooManyTickets } from "./helpers/has_too_many_tickets";
  import { isUserOverPassMaxBookings } from "./helpers/is_user_overpass_max_bookings";
  import { onFinishNavigator } from "./helpers/on_finish_navigator";

  let termDialog: HTMLDialogElement;
  let downloadAppDialog: HTMLDialogElement;
  let needVerificationForReminderDialog: HTMLDialogElement;
  let isLoading: boolean = false;

  const worker = BookingController.worker;
  $: publicCustomer = getPublicCustomer($userStore);
  $: overflowTickets = hasTooManyTickets($bookingMakerStore);
  $: overpassBookings = isUserOverPassMaxBookings($bookingMakerStore);

  $: needOnHold = needToHoldOn($bookingMakerStore.date ?? new Date(0), worker);

  async function addBooking() {
    if (isLoading) {
      return;
    }

    isLoading = true;
    console.log(publicCustomer);
    try {
      await onFinishNavigator({
        downloadAppDialog,
        publicCustomer,
      });
    } finally {
      isLoading = false;
    }
  }
  async function handleClick() {
    if (publicCustomer.blocked) {
      return;
    }
    if (overflowTickets) {
      return;
    }
    if (overpassBookings) {
      return;
    }

    if (!handleApproveTerm(termDialog)) {
      return;
    }
    if ($bookingMakerStore.showVerificationAlert) {
      if (BookingController.worker?.mustVerifyPhone != true) {
        pushDialog(needVerificationForReminderDialog);
      } else {
        if ($userStore.userPublicData.isVerifiedPhone) {
          return;
        }
        VerificationHelper.GI().setupLoggin();
        bookingMakerStore.update((value) => {
          value.isOnVerification = true;
          return value;
        });

        sendSms($userStore.userPublicData.phoneNumber);
      }

      return;
    } else {
      await addBooking();
    }
  }

  async function onVerifiedPhone() {
    console.log("3333333333333333333333333333333333333333333333333333");
    //update the boooking maker store that no need to show the phone verification anymore
    bookingMakerStore.update((val) => {
      val.showVerificationAlert = showPhoneVerificationAlert(
        BookingController.worker
      );
      val.isOnVerification = false;
      return val;
    });

    //add the booking again
    await addBooking();
  }
</script>

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
    VerificationHelper.GI().setupLoggin();
    needVerificationForReminderDialog.close();
    bookingMakerStore.update((value) => {
      value.isOnVerification = true;
      return value;
    });
  }}
  maxWidth="max-w-[400px]"
  saveTranslateKey={"verify"}
  cancelTranslateKey={"skip"}
/>

{#if $bookingMakerStore.isOnVerification}
  <LoginContainer
    isOtp={true}
    needRecaptchaContainer={false}
    canReturnToChooseProvider={false}
    loginReason={LoginReason.phoneVerification}
    defaultHandlingOnEnd={false}
    on:onVerifyPhone={onVerifiedPhone}
    otpTitle={translate("phoneNumberVerification", $_)}
    otpSubTitle={translate("beforeYouContinueToOrderNeedTo", $_).replaceAll(
      "NUMBER",
      formatedPhone($userStore.phoneNumber)
    )}
  />
{:else}
  <section
    class="flex flex-col items-center gap-8 w-[90%] lg:w-[50%] md:w-[60%] sm:w-[80%]"
  >
    <!-- the worker name indicator -->
    <h1 class="text-3xl text-center">
      {$_($bookingMakerStore.isUpdate ? "updateBooking" : "bookAnOrder")}
      {$_("to")}
      <span class="font-bold text-primary">{BookingController.worker.name}</span
      >
    </h1>

    <div class="text-lg xs:text-2xl">
      <DateString
        date={$bookingMakerStore.date ?? new Date()}
        showTodayAndTommrow={true}
      />
    </div>

    <!-- serivces preview and option to edit the service -->
    <ServicesPreview />

    <!-- the user note  -->
    <AddNote />

    <!-- finish button (could be pay or deposin) -->
    <FinishButton
      on:handleClick={handleClick}
      {needOnHold}
      {overflowTickets}
      {overpassBookings}
      {isLoading}
      {publicCustomer}
    />
  </section>
{/if}
<div class="absolute bottom-4 left-0 z-[10000]">
  <div id="recaptcha-container"></div>
</div>
