import PaymentRequestHelper from "$lib/helpers/payment_request/payment_request_helper";
import UserInitializer from "$lib/initializers/user_initializer";
import PaymentRequestPreview from "$lib/models/payment_hyp/payment_request/payment_request_preview";
import { get } from "svelte/store";

import PaymentRequestUser from "$lib/models/payment_hyp/payment_request/payment_request_user";
import { paymentRequestStore } from "./payment_request_controller";

export const load = async ({ params }) => {
  const id = params.paymentRequestId;

  const data = get(paymentRequestStore);

  if (id === "") {
    data.preview = new PaymentRequestPreview({});
    paymentRequestStore.set(data);
    return {};
  }
  const resp = await PaymentRequestHelper.GI().getPaymentRequestPreviewById(id);

  if (resp == null) {
    data.preview = new PaymentRequestPreview({});
    paymentRequestStore.set(data);
    return {};
  }
  data.preview = resp;

  if (resp.bookingReference?.isMultiBooking == true) {
    if (data.paymentRequest == null) {
      data.paymentRequest =
        await PaymentRequestHelper.GI().getPaymentRequestByPreview(
          resp,
          UserInitializer.GI().user
        );
    }
    if (data.bookingId == null) {
      //find the first booking that he not paid on already, if there is
      //no booking that he doesnt pay on - booking id stay null
      Object.entries(data.paymentRequest!.tickets).forEach(
        ([bookingIdTemp, ticketInfo]) => {
          if (!ticketInfo.isPaid && !ticketInfo.isDeclined) {
            data.bookingId = bookingIdTemp;
          }
        }
      );
    }
  }

  if (data.bookingId == null) {
    if (data.preview.users[UserInitializer.GI().user.id] != null) {
      data.user = PaymentRequestUser.fromPaymentRequestUser(
        data.preview.users[UserInitializer.GI().user.id]!
      );
    }

    //incase the payment request has tickets need to change the
    //payment user accordingly to the ticket of the booking
    if (
      data.user != null &&
      data.paymentRequest != null &&
      data.bookingId != null &&
      data.paymentRequest!.tickets[data.bookingId] != null
    ) {
      data.user.count = 1;
      data.user.payments =
        data.paymentRequest!.tickets[data.bookingId]!.payments;

      data.user.userDecline = data.paymentRequest!.tickets[data.bookingId]!
        .isDeclined
        ? 1
        : 0;
    }
  }

  paymentRequestStore.set(data);
  return {};
};
