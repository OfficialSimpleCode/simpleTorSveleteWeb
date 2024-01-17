import type { LoginType } from "$lib/services/external_services/firebase_auth_service";
import type { User } from "firebase/auth";

export interface VerificationApi {
  signInWithGoogle(loginType: LoginType): Promise<boolean>;

  signInWithApple(loginType: LoginType): Promise<boolean>;

  signInWithFacebook(loginType: LoginType): Promise<boolean>;

  //   signInWithOtp(params: {
  //     loginType: LoginType;
  //     verificationId: string;
  //     otp: string;
  //     autocredential?: PhoneAuthCredential | null;
  //   }): Promise<boolean>;

  //   verifyOTPWithExternalProvider(params: {
  //     verificationId: string;
  //     otp: string;
  //     userName: string;
  //     phoneNumber: string;
  //   }): Promise<boolean>;

  //   sendSmsForFirebaseVerification(params: {
  //     completePhone: string;
  //     onCodeSent: (verificationId: string) => void;
  //     onFailed: (
  //       phone: string,
  //       exception: FirebaseAuthException,
  //       codeSentTime: Date | null,
  //       beforeSendTime: Date
  //     ) => void;
  //     verificationCompleted: (credential: PhoneAuthCredential) => void;
  //   }): Promise<void>;

  //   sendSmsWithExternalProvider(params: {
  //     completePhone: string;
  //     onCodeSent: (verificationId: string) => void;
  //     onFailed: (
  //       phone: string,
  //       e: Errors,
  //       codeSentTime: Date | null,
  //       beforeSendTime: Date
  //     ) => void;
  //   }): Promise<void>;

  logout(): Promise<boolean>;

  unlinkProvider(params: { providerId: string }): Promise<boolean>;

  //   cancelVerificationWithExternalProvider(params: {
  //     userId: string;
  //     phoneNumber: string;
  //   }): Promise<boolean>;

  deleteUser(): Promise<boolean>;

  userConnectedOnlyLocally(): boolean;

  updateUserName(params: { name: string }): Promise<boolean>;

  reloadUser(): Promise<void>;

  get isLoggedIn(): boolean;

  get existsProviders(): Set<string>;

  get userData(): User | null;

  get userId(): string;

  get lastLoginDate(): string | undefined;

  userClaims(): Promise<{
    [key: string]: any;
  } | null>;
}
