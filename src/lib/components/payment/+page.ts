import type { PaymentData } from ".";
import { paymentDataStore } from "./payment_controller";

export const load = async ({ url }) => {
  let amountStr = url.searchParams.get("amount");
  let showTipStr = url.searchParams.get("show-tip");

  const paymentData: PaymentData = {
    amount: Number(amountStr),
    showTip: showTipStr === "true",
  };

  paymentDataStore.set(paymentData);
};
