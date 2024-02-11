import PhoneDataResult from "$lib/models/resps/phone_data_result";
import { writable } from "svelte/store";
import type { AuthDataStore } from ".";

export let authDataStore = writable<AuthDataStore>({
  phoneData: new PhoneDataResult({ phone: "" }),
});
