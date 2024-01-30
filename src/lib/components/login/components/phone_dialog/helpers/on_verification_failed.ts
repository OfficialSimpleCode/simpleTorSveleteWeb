import { ErrorsTypeLog } from "$lib/consts/application_general";
import DeveloperHelper from "$lib/helpers/developer_helper";
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

  //   TopOverlyNotification({
  //     title: "Error",
  //     fullWidget: AppErrorsHelper.GI().displayError({ details: false }),
  //     content: "",
  //     duration: Duration.seconds(2),
  //   }).show();
}

export async function onExternalProviderVerificationFailed(
  phoneNumber: string,
  e: Error,
  codeSentTime: Date | null,
  beforeSendTime: Date
): Promise<void> {
  //   TopOverlyNotification({
  //     title: "Error",
  //     fullWidget: AppErrors().displayError({ details: false }),
  //     content: "",
  //     duration: Duration.seconds(2),
  //   }).show();
}
