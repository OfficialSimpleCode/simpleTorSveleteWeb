import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
import { ShowToast } from "$lib/stores/ToastManager";
import { translate } from "$lib/utils/translate";

export function onCodeSent(verificationId: string): void {
  ShowToast({
    status: "success",
    text: translate("theCodeSentSuccessfully"),
  });

  VerificationHelper.GI().verificationID = verificationId;
}
