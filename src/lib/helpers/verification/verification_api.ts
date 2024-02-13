import type { LoginType } from "$lib/consts/auth";
import type { Errors } from "$lib/services/errors/messages";
import type { ParsedToken, User } from "firebase/auth";

export interface VerificationApi {
  signInWithGoogle(loginType: LoginType): Promise<boolean>;

  signInWithApple(loginType: LoginType): Promise<boolean>;

  signInWithFacebook(loginType: LoginType): Promise<boolean>;

  verifyOTPWithExternalProvider(params: {
    verificationId: string;
    otp: string;
    userName: string;
    phoneNumber: string;
  }): Promise<boolean>;

  sendSmsWithExternalProvider(params: {
    completePhone: string;
    onCodeSent: (verificationId: string) => void;
    onFailed: (
      phone: string,
      e: Errors,
      codeSentTime: Date | undefined,
      beforeSendTime: Date
    ) => void;
  }): Promise<void>;

  cancelVerificationWithExternalProvider(params: {
    userId: string;
    phoneNumber: string;
  }): Promise<boolean>;

  logout(): Promise<boolean>;

  unlinkProvider(params: { providerId: string }): Promise<boolean>;

  deleteUser(): Promise<boolean>;

  userConnectedOnlyLocally(): boolean;

  updateUserName(params: { name: string }): Promise<boolean>;

  reloadUser(): Promise<void>;

  get isLoggedIn(): boolean;

  get existsProviders(): Set<string>;

  get userData(): User | null;

  get userId(): string;

  get lastLoginDate(): string | undefined;

  userClaims(): Promise<ParsedToken | undefined>;
}
