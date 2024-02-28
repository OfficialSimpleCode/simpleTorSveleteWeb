import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
import { ShowToast } from "$lib/stores/ToastManager";
import { _, translate } from "$lib/utils/translate";
import { get } from "svelte/store";

export function onCodeSent(verificationId: string): void {
  ShowToast({
    status: "success",
    text: translate("theCodeSentSuccessfully", get(_)),
  });

  VerificationHelper.GI().verificationID = verificationId;
}
