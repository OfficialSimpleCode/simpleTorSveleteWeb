import PaymentsHelper from "$lib/helpers/payments/payments_helper";

export async function payAmount() {
  PaymentsHelper.GI().payAmount();
}
