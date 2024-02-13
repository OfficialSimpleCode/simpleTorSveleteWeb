import { ErrorsTypeLog } from "$lib/consts/application_general";
import DeveloperHelper from "$lib/helpers/developer_helper";
import type { Errors } from "$lib/services/errors/messages";
import { dateIsoStr } from "$lib/utils/times_utils";

export async function onVerificationFailed(
  phoneNumber: string,
  e: Error,
  codeSentTime: Date | undefined,
  beforeSendTime: Date
): Promise<void> {
  await DeveloperHelper.GI().logErrorToDb({
    userId: phoneNumber,
    errorType: ErrorsTypeLog.login,
    exceptions: [e],
    errorCode: e.message,
    extras: {
      codeSendTime: codeSentTime ? dateIsoStr(codeSentTime) : "",
      beforeSendTime: beforeSendTime,
    },
  });
  //TODO show error
  //   TopOverlyNotification({
  //     title: "Error",
  //     fullWidget: AppErrorsHelper.GI().displayError({ details: false }),
  //     content: "",
  //     duration: Duration.seconds(2),
  //   }).show();
}

export async function onExternalProviderVerificationFailed(
  phoneNumber: string,
  e: Errors,
  codeSentTime: Date | undefined,
  beforeSendTime: Date
): Promise<void> {
  await DeveloperHelper.GI().logErrorToDb({
    userId: phoneNumber,
    errorType: ErrorsTypeLog.login,
    exceptions: [e],
    errorCode: "Ofirix otp error",
    extras: {
      codeSendTime: codeSentTime ? dateIsoStr(codeSentTime) : "",
      beforeSendTime: beforeSendTime,
    },
  });
  //TODO show error
  //   TopOverlyNotification({
  //     title: "Error",
  //     fullWidget: AppErrors().displayError({ details: false }),
  //     content: "",
  //     duration: Duration.seconds(2),
  //   }).show();
}
