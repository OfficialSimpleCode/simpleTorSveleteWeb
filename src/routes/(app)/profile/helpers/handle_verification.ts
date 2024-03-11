import { sendSms } from "$lib/components/dialogs/phone_dialog/helpers/send_sms";

import { userStore } from "$lib/stores/User";
import { pushDialog } from "$lib/utils/general_utils";
import { get } from "svelte/store";

export async function handleVerification(
  verificationDialog: HTMLDialogElement,
  href?: string
) {
  if (get(userStore).userPublicData.isVerifiedPhone) {
    return;
  }
  sendSms(get(userStore).userPublicData.phoneNumber);

  pushDialog(verificationDialog, href);
}
