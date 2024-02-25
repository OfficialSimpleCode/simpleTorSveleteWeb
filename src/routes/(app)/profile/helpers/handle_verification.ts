import { pushState } from "$app/navigation";
import { sendSms } from "$lib/components/dialogs/phone_dialog/helpers/send_sms";

import { userStore } from "$lib/stores/User";
import { get } from "svelte/store";

export async function handleVerification(
  verificationDialog: HTMLDialogElement,
  herf?: string
) {
  if (get(userStore).userPublicData.isVerifiedPhone) {
    return;
  }
  sendSms({ phone: get(userStore).userPublicData.phoneNumber });
  pushState(herf ?? "", {
    showModal: true,
  });
  setTimeout(() => verificationDialog.showModal(), 200);
}
