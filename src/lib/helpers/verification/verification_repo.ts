import type { LoginType } from "$lib/consts/auth";
import type { Errors } from "$lib/services/errors/messages";
import { FirebaseAuthService } from "$lib/services/external_services/firebase_auth_service";
import type { CompleteFn, ParsedToken, Unsubscribe, User } from "firebase/auth";
import type { VerificationApi } from "./verification_api";

// Define the VerificationRepo class implementing the VerificationApi interface
export class VerificationRepo
  extends FirebaseAuthService
  implements VerificationApi
{
  constructor() {
    super();
  }

  // Implement the methods using the corresponding service methods
  async signInWithGoogle(loginType: LoginType): Promise<boolean> {
    return await this.signInWithGoogleSRV(loginType);
  }

  async signInWithApple(loginType: LoginType): Promise<boolean> {
    return await this.signInWithAppleSRV(loginType);
  }

  async signInWithFacebook(loginType: LoginType): Promise<boolean> {
    return await this.signInWithFacebookSRV(loginType);
  }

  onAuthUserStateChanged(completed: CompleteFn): Unsubscribe {
    return this.onAuthUserStateChangedSRV(completed);
  }

  async sendSmsWithExternalProvider({
    completePhone,
    onCodeSent,
    onFailed,
  }: {
    completePhone: string;
    onCodeSent: (verificationId: string) => void;
    onFailed: (
      phone: string,
      e: Errors,
      codeSentTime: Date | undefined,
      beforeSendTime: Date
    ) => void;
  }): Promise<void> {
    await this.sendSmsWithExternalProviderSRV({
      userId: this.userId,
      phoneNumber: completePhone,
      onCodeSent,
      onFailed,
    });
  }

  async verifyOTPWithExternalProvider({
    verificationId,
    otp,
    userName,
    phoneNumber,
  }: {
    verificationId: string;
    otp: string;
    userName: string;
    phoneNumber: string;
  }): Promise<boolean> {
    return await this.verifyOTPWithExternalProviderSRV({
      userName,
      phoneNumber,
      userId: this.userId,
      verificationId,
      otp,
    });
  }

  async cancelVerificationWithExternalProvider({
    phoneNumber,
  }: {
    phoneNumber: string;
  }): Promise<boolean> {
    return await this.cancelVerificationWithExternalProviderSRV({
      phoneNumber,
      userId: this.userId,
    });
  }

  async sendSmsForFirebaseVerification({
    completePhone,
    onCodeSent,
    onFailed,
  }: {
    completePhone: string;
    onCodeSent: (verificationId: string) => void;
    onFailed: (
      phone: string,
      e: Error,
      codeSentTime: Date | undefined,
      beforeSendTime: Date
    ) => void;
  }): Promise<void> {
    await this.sendSmsForFirebaseVerificationSRV({
      completePhone,
      onCodeSent,
      onFailed,
    });
  }

  async signInWithOtp({
    loginType,
    verificationId,
    otp,
  }: {
    loginType: LoginType;
    verificationId: string;
    otp: string;
  }): Promise<boolean> {
    return await this.signInWithOtpSRV({
      loginType,
      verificationId,
      otp,
    });
  }

  async logout(): Promise<boolean> {
    return await this.logoutSRV();
  }

  async unlinkProvider({
    providerId,
  }: {
    providerId: string;
  }): Promise<boolean> {
    return await this.unlinkProviderSRV({ providerId });
  }

  async deleteUser(): Promise<boolean> {
    return await this.deleteUserSRV();
  }

  async reloadUser(): Promise<void> {
    await this.reloadUserSRV();
  }

  userConnectedOnlyLocally(): boolean {
    return this.userConnectedOnlyLocallySRV();
  }

  async updateUserName({ name }: { name: string }): Promise<boolean> {
    try {
      await this.updateUserNameSRV(name);
      return true;
    } catch (e) {
      console.error(`Error occurred while saving user name --> ${e}`);
      return false;
    }
  }

  get isLoggedIn(): boolean {
    return this.isLoggedInSRV;
  }

  get existsProviders(): Set<string> {
    return this.existsProvidersSRV;
  }

  get userData(): User | null {
    return this.userDataSRV;
  }

  get userId(): string {
    return this.userIdSRV;
  }

  get lastLoginDate(): string | undefined {
    return this.lastLoginDateSRV;
  }

  async userClaims(): Promise<ParsedToken | undefined> {
    return await this.userClaimsSRV();
  }
}
