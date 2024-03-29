import BookingController, {
  bookingMakerStore,
} from "$lib/controllers/booking_controller";
import { ErrorsController } from "$lib/controllers/errors_controller";
import { openOrdersPage } from "$lib/controllers/page_controller";
import MultiBookingHelper from "$lib/helpers/multi_booking/multi_booking_helper";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";
import MultiBooking from "$lib/models/multi_booking/multi_booking";
import type MultiBookingUser from "$lib/models/multi_booking/multi_booking_user";
import MultiBookingUsersPerCustomer from "$lib/models/multi_booking/multi_booking_users_per_customer";
import type PaymentResp from "$lib/models/resps/payment_resp";
import type WorkerModel from "$lib/models/worker/worker_model";
import { ShowToast } from "$lib/stores/ToastManager";
import { hasPlaceInMultiBooking } from "$lib/utils/available_times_utils/has_place_in_multi";
import { pushDialog } from "$lib/utils/general_utils";
import { translate } from "$lib/utils/translate";
import { get } from "svelte/store";
import pkg from "uuid";
const { v4 } = pkg;

export async function signToMulti({
  freeFromPayment,
  payAll,
  downloadAppDialog,
}: {
  freeFromPayment: boolean;
  payAll: boolean;
  downloadAppDialog: HTMLDialogElement;
}) {
  const worker = BookingController.worker;
  if (worker == null) {
    return;
  }
  //prepare the multi booking and the multi user booking

  //make a copy of the multi booking cant access to the original multi booking because its held on the worker
  //so make oone from the details we had on the time picker obj
  const multiBooking = BookingController.multiBookingFromValues;

  const allow = hasPlaceInMultiBooking({
    worker: worker,
    date: multiBooking.bookingDate,
    treatment: multiBooking.treatment,
  });
  if (!allow) {
    ShowToast({ status: "fail", text: translate("takenMultiBooking") });
    return false;
  }

  /*stop the listenting no need to listen */
  BusinessInitializer.GI().cancelAllWorkersRegularListenings();

  //make multi booking user from the current user
  const userMultiBooking = UserInitializer.GI().user.toMultiBookingUser;
  userMultiBooking.userBookingId = v4();

  //if there is need to push the payment flow
  const payInAdvance =
    (multiBooking.treatment.amountInAdvance > 0 && !freeFromPayment) || payAll;
  let result = false;
  if (!payInAdvance) {
    result = await handleSinging({
      multiBooking,
      worker,

      userMultiBooking,
    });
  } else {
    //TODO handle payment before pay
    pushDialog(downloadAppDialog);
    return;
  }

  if (result) {
    //update the finish prperty
    bookingMakerStore.update((value) => {
      value.finish = true;
      return value;
    });
    //jump to my bookings page after succedded with the order
    await openOrdersPage();
  }
}

async function handleSinging({
  multiBooking,
  worker,

  userMultiBooking,
  fromPaymentHandler = false,
  paymentResp,
}: {
  multiBooking: MultiBooking;
  worker: WorkerModel;

  userMultiBooking: MultiBookingUser;
  fromPaymentHandler?: boolean;
  paymentResp?: PaymentResp | undefined;
}): Promise<boolean> {
  //   // In case the user needs to pay before and failed
  //   if ((paymentResp === null || paymentResp.transaction === null) && fromPaymentHandler) {
  //     return await handleFailedPayment({ multiBooking, userMultiBooking, worker });
  //   }
  // In case the user needs to pay before and succeeded
  if (paymentResp != null && paymentResp.transaction != null) {
    /* Add the transaction to booking model */
    userMultiBooking.transactions.set(
      paymentResp.transaction.id,
      paymentResp.transaction.bookingTransaction
    );
    if (paymentResp.invoice != null) {
      userMultiBooking.invoices.set(
        paymentResp.invoice.id,
        paymentResp.invoice.bookingInvoiceData
      );
    }
  }

  const customer = new MultiBookingUsersPerCustomer({
    customer: UserInitializer.GI().user.userPublicData.customerData,
    multiBookingUsers: { [userMultiBooking.userBookingId]: userMultiBooking },
  });

  // For the old multi bookings that have no icon data
  multiBooking.shopIcon = BusinessInitializer.GI().business.design.shopIconData;
  let resp: MultiBooking | undefined = undefined;

  if (BookingController.pickedTimeObj?.recurrenceMultiEvent != null) {
    const recurrenceId =
      BookingController.pickedTimeObj!.recurrenceFatherBookingId;
    const recurrenceDate =
      BookingController.pickedTimeObj!.fatherRecurrenceMultiEventDate;
    const recurrenceTimeId = BookingController.pickedTimeObj!.recurrenceTimeId;
    const recurrenceEvent =
      BookingController.pickedTimeObj!.recurrenceMultiEvent;

    if (
      recurrenceEvent == null ||
      recurrenceDate == null ||
      recurrenceId == null
    ) {
      return false;
    }

    const recurrenceMultiBooking = MultiBooking.fromMultiBooking(multiBooking);
    recurrenceMultiBooking.copyDataToOrder({
      worker,
      customers: undefined,
      workerAction: false,
      business: BusinessInitializer.GI().business,
      user: UserInitializer.GI().user,
    });
    recurrenceMultiBooking.bookingId = recurrenceId;
    recurrenceMultiBooking.bookingDate = recurrenceDate;
    recurrenceMultiBooking.recurrenceTimeId = recurrenceTimeId;
    recurrenceMultiBooking.recurrenceEvent = recurrenceEvent;

    resp = await MultiBookingHelper.GI().signUsersToRecurence({
      recurrenceMultiBooking,
      fromPayment: paymentResp != null,
      dateForNewBooking: multiBooking.bookingDate,
      multiBookingsPerCustomer: {
        [customer.customerUuid]: customer,
      },
      worker,
      workerAction: false,
      clientNote: get(bookingMakerStore).note,
    });
  } else {
    const updatedMultiBooking = MultiBooking.fromMultiBooking(multiBooking);

    updatedMultiBooking.copyDataToOrder({
      worker,
      customers: undefined,
      workerAction: false,
      business: BusinessInitializer.GI().business,
      user: UserInitializer.GI().user,
    });

    resp = await MultiBookingHelper.GI().signUsers({
      multiBooking: updatedMultiBooking,
      multiBookingsPerCustomer: {
        [customer.customerUuid]: customer,
      },
      fromPayment: paymentResp != null,
      payemntRequestId: BookingController.pickedTimeObj?.signedPaymentRequestId,
      worker,
      workerAction: false,
      clientNote: get(bookingMakerStore).note,
    });
  }
  if (resp == null) {
    ErrorsController.displayError();
  }
  return resp != null;
}
