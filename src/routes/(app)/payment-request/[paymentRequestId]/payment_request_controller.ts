import { writable } from "svelte/store";
import type { PaymentRequestData } from ".";

export let paymentRequestStore = writable<PaymentRequestData>({});
