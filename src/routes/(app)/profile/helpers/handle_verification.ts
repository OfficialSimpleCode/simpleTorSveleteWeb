import { sendSms } from "../../../(auth)/components/login/components/otp_input_container/helpers/send_sms";

import { userStore } from "$lib/stores/User";
import { get } from "svelte/store";

export async function handleVerification(href?: string): Promise<boolean> {
  if (get(userStore).userPublicData.isVerifiedPhone) {
    return false;
  }
  sendSms(get(userStore).userPublicData.phoneNumber);
  return true;
}
