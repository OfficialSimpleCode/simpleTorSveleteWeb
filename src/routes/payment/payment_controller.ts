import { writable } from "svelte/store";
import type { PaymentData } from ".";

export let paymentDataStore = writable<PaymentData>({
  amount: 0,
  showTip: false,
});
