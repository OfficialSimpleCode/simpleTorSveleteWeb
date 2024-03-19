import { envKey } from "$lib/consts/db";
import {
  CANCEL_VERIFICATION_END_POINT,
  SEND_SMS_END_POINT,
  VERIFY_OTP_END_POINT,
} from "$lib/consts/server_variables";
import AppErrorsHelper from "$lib/helpers/app_errors";
import { translate } from "$lib/utils/translate";
import { phoneToDocId } from "$lib/utils/user";

import { verificationErrors } from "../errors/interpeters/verification_errors_interpeter";
import { Errors } from "../errors/messages";
import MakeRequest from "./make_request";

export class VerificationService {
  constructor() {}
  private makeRequest = new MakeRequest();
  async verifyOTPWithExternalProviderSRV({
    verificationId,
    otp,
    userName,
    phoneNumber,
    userId,
  }: {
    verificationId: string;
    otp: string;
    userName: string;
    phoneNumber: string;
    userId: string;
  }) {
    try {
      const resp: Record<string, any> = await this.makeRequest.performRequst({
        endpoint: VERIFY_OTP_END_POINT,
        onFail: {},
        method: "post",
        data: {
          ["userId"]: userId,
          ["OTP"]: otp,
          ["userPhoneHash"]: phoneToDocId(phoneNumber),
          ["userName"]: userName,
          ["env"]: envKey.replaceAll("enviroments/", ""),
          ["VI"]: verificationId,
        },
      });

      if (resp.error) {
        AppErrorsHelper.GI().error =
          verificationErrors[resp.error] || Errors.unknown;
        return false;
      } else {
        return resp.ok === true;
      }
    } catch (e) {
      AppErrorsHelper.GI().error = Errors.unknown;
      return false;
    }
  }

  async sendSmsWithExternalProviderSRV({
    phoneNumber,
    userId,
    onCodeSent,
    onFailed,
  }: {
    phoneNumber: string;
    userId: string;
    onCodeSent: (verificationId: string) => void;
    onFailed: (
      phoneNumber: string,
      e: Errors,
      codeSentTime: Date | undefined,
      beforeSendTime: Date
    ) => void;
  }) {
    const beforeSendTime = new Date();
    try {
      const resp: Record<string, any> = await this.makeRequest.performRequst({
        endpoint: SEND_SMS_END_POINT,
        onFail: {},
        method: "post",
        data: {
          ["userId"]: userId,
          ["smsFormat"]: translate("otpFormat"),
          ["phoneNumber"]: phoneNumber.replace("-", ""),
        },
      });

      if (resp.error) {
        AppErrorsHelper.GI().error =
          verificationErrors[resp.error] || Errors.unknown;
        onFailed(
          phoneNumber,
          AppErrorsHelper.GI().error,
          undefined,
          beforeSendTime
        );
      } else if (resp.verificationId) {
        onCodeSent(resp.verificationId);
      } else {
        onFailed(
          phoneNumber,
          AppErrorsHelper.GI().error,
          undefined,
          beforeSendTime
        );
      }
    } catch (e) {
      AppErrorsHelper.GI().error = Errors.unknown;
      onFailed(
        phoneNumber,
        AppErrorsHelper.GI().error,
        undefined,
        beforeSendTime
      );
    }
  }

  async cancelVerificationWithExternalProviderSRV({
    phoneNumber,
    userId,
  }: {
    phoneNumber: string;
    userId: string;
  }) {
    try {
      const resp: Record<string, any> = await this.makeRequest.performRequst({
        endpoint: CANCEL_VERIFICATION_END_POINT,
        onFail: {},
        method: "post",
        data: {
          ["userId"]: userId,
          ["userPhoneHash"]: phoneToDocId(phoneNumber),
          ["env"]: envKey.replaceAll("enviroments/", ""),
        },
      });

      if (resp.error) {
        AppErrorsHelper.GI().error =
          verificationErrors[resp.error] || Errors.unknown;
        return false;
      } else {
        return resp.ok === true;
      }
    } catch (e) {
      AppErrorsHelper.GI().error = Errors.unknown;
      return false;
    }
  }
}
