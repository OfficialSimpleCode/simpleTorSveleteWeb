import type PaymentRequest from "$lib/models/payment_hyp/payment_request/payment_request";
import type PaymentRequestPreview from "$lib/models/payment_hyp/payment_request/payment_request_preview";
import type PaymentRequestUser from "$lib/models/payment_hyp/payment_request/payment_request_user";

export type PaymentRequestData = {
  bookingId?: string | undefined;
  paymentRequest?: PaymentRequest | undefined;
  preview?: PaymentRequestPreview | undefined;
  user?: PaymentRequestUser | undefined;
};
