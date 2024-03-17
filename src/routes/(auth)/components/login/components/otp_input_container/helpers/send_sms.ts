import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
import { ShowToast } from "$lib/stores/ToastManager";
import { translate } from "$lib/utils/translate";
import { onCodeSent } from "./on_code_sent";
import {
  onExternalProviderVerificationFailed,
  onVerificationFailed,
} from "./on_verification_failed";

export function sendSms(phone: string): void {
  if (phone === "") {
    return;
  }

  ShowToast({
    status: "info",
    text: translate("theCodeIsSending"),
  });

  // Saving the time of the clicking
  VerificationHelper.GI().lastVerificationUnix = Math.ceil(Date.now() / 1000);
  VerificationHelper.GI().submitedPhone = phone;

  // Sending the SMS
  if (VerificationHelper.GI().phoneVerificationWithFirebase) {
    VerificationHelper.GI().sendSmsForFirebaseVerification(
      phone,
      onCodeSent,
      onVerificationFailed
    );
  } else {
    VerificationHelper.GI().sendSmsWithExternalProvider(
      phone,
      onCodeSent,
      onExternalProviderVerificationFailed
    );
  }
}
