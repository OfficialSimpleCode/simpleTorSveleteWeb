import { ErrorsTypeLog } from "$lib/consts/application_general";
import { ErrorsController } from "$lib/controllers/errors_controller";
import { canUseOtpStore } from "$lib/controllers/verification_controller";
import DeveloperHelper from "$lib/helpers/developer_helper";
import type { Errors } from "$lib/services/errors/messages";
import { dateIsoStr } from "$lib/utils/times_utils";

export async function onVerificationFailed(
  phoneNumber: string,
  e: Error,
  codeSentTime: Date | undefined,
  beforeSendTime: Date
): Promise<void> {
  canUseOtpStore.set(false);
  await DeveloperHelper.GI().logErrorToDb({
    userId: phoneNumber,
    errorType: ErrorsTypeLog.login,
    exceptions: [e],
    errorCode: `${e.message} ${phoneNumber}`,
    extras: {
      codeSendTime: codeSentTime ? dateIsoStr(codeSentTime) : "",
      beforeSendTime: beforeSendTime,
    },
  });
  ErrorsController.displayError();
}

export async function onExternalProviderVerificationFailed(
  phoneNumber: string,
  e: Errors,
  codeSentTime: Date | undefined,
  beforeSendTime: Date
): Promise<void> {
  canUseOtpStore.set(false);
  await DeveloperHelper.GI().logErrorToDb({
    userId: phoneNumber,
    errorType: ErrorsTypeLog.login,
    exceptions: [e],
    errorCode: `Ofirix otp error ${phoneNumber}`,
    extras: {
      codeSendTime: codeSentTime ? dateIsoStr(codeSentTime) : "",
      beforeSendTime: beforeSendTime,
    },
  });
  ErrorsController.displayError();
}
