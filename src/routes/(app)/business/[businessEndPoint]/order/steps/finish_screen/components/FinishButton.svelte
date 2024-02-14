<script lang="ts">
  import { page } from "$app/stores";
  import TermDialog from "$lib/components/dialogs/TermDialog.svelte";
  import PhoneDialog from "$lib/components/login/components/PhoneDialog.svelte";
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

  import DownloadAppDialog from "$lib/components/dialogs/DownloadAppDialog.svelte";
  import { handleApproveTerm } from "../helpers/handle_approving_term";
  import { onFinishNavigator } from "../helpers/on_finish_navigator";
  export let verificationDialog: HTMLDialogElement;
  let termDialog: HTMLDialogElement;
  let downloadAppDialog: HTMLDialogElement;
  let isLoading: boolean = false;

  const publicCustomer: PublicCustomer = new PublicCustomer(); //getPublicCustomer();

  const worker = BookingController.worker;

  const needOnHold = needToHoldOn(
    get(bookingMakerStore).date ?? new Date(0),
    worker
  );
  console.log(get(bookingMakerStore).showVerificationAlert);
  async function addBooking() {
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    if (isLoading) {
      return;
    }
    console.log("1111111111111111111111");
    isLoading = true;

    try {
      await onFinishNavigator({
        clientNote: "",
        downloadAppDialog,
      });
    } finally {
      isLoading = false;
    }
  }
  async function handleClick() {
    if (!handleApproveTerm(termDialog)) {
      return;
    }
    if (get(bookingMakerStore).showVerificationAlert) {
      console.log("444444444");
      await handleVerification(verificationDialog);
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
    console.log("3333333333333333");
    //add the booking again
    addBooking();
  }
</script>

{#if $page.state.showModal}
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
{/if}
<!-- xs:px-10 px-3 -->
<div class="w-full">
  <button
    class="btn sm:text-xl btn-primary w-full {isLoading ? 'opacity-55' : ''}"
    on:click={handleClick}
  >
    {#if isLoading}
      <div class="loading loading-spinner" />
    {:else}
      {translate(
        publicCustomer.blocked
          ? "blockUser"
          : needOnHold
            ? "askForConfirmation"
            : $bookingMakerStore.isUpdate
              ? "update"
              : "order2",
        $_
      )}
    {/if}

    {#if publicCustomer.blocked}
      <h3 class="text-sm">{translate("blockedUserCantOrder", $_)}</h3>
    {/if}
  </button>
  {#if needOnHold}
    <h3 class="text-sm opacity-70 text-center">
      {worker?.orderNeerDedlineBookingMessage ??
        translate("bookingNeedConfirmation")}
    </h3>
  {/if}
</div>
