import {
  AuthProvider,
  LoginType,
  authProviderToProviderId,
} from "$lib/consts/auth";

import UserInitializer from "$lib/initializers/user_initializer";
import type { Errors } from "$lib/services/errors/messages";
import type { ParsedToken, PhoneAuthCredential, User } from "firebase/auth";

import UserHelper from "../user/user_helper";
import { VerificationRepo } from "./verification_repo";

export class VerificationHelper {
  private static _singleton: VerificationHelper = new this();

  private constructor() {}

  public static GI(): VerificationHelper {
    return this._singleton;
  }

  public signInUserId: string = "";
  public currentAuthProvider?: AuthProvider;
  public verificationID: string = "";
  public submitedPhone: string = "";

  public lastVerificationUnix: number = 0;
  public currentCredential?: PhoneAuthCredential;
  public phoneVerificationWithFirebase: boolean = true;
  public canUseAuthVars = false;
  public needToSignUp = false;

  public verificationRepo: VerificationRepo = new VerificationRepo();

  public async logoutIfSignUpNotCompleted(): Promise<void> {
    // Logout if sign up is not completed
    // ...
  }

  public get userLoggedIn(): boolean {
    return this.verificationRepo.isLoggedIn;
  }

  public async getUserClaims(): Promise<{
    [key: string]: any;
  } | null> {
    return await this.verificationRepo.userClaims;
  }

  public async saveUserName(name: string): Promise<boolean> {
    return await this.verificationRepo.updateUserName({ name });
  }

  public setupLoggin(): void {
    this.verificationID = "";
    this.currentAuthProvider = undefined;
    this.needToSignUp = false;
    this.currentCredential = undefined;
    this.submitedPhone = "";
    this.phoneVerificationWithFirebase = true;
  }

  public startUserAuthListener(onInvoke: () => Promise<void>) {
    this.verificationRepo.onAuthUserStateChanged(async () => {
      this.canUseAuthVars = true;
      await onInvoke();
    });
  }

  public async sendSmsForFirebaseVerification(
    completePhone: string,
    onCodeSent: (verificationId: string) => void,
    onFailed: (
      verificationId: string,
      exception: Error,
      startDate: Date | undefined,
      endDate: Date
    ) => void
  ): Promise<void> {
    await this.verificationRepo.sendSmsForFirebaseVerification({
      completePhone: completePhone,
      onCodeSent: onCodeSent,
      onFailed: onFailed,
    });
  }

  public get userId(): string {
    return this.verificationRepo.userId;
  }

  public get userData(): User | null {
    return this.verificationRepo.userData;
  }

  public get existsLoginProviders(): Set<string> {
    return this.verificationRepo.existsProviders;
  }

  public get lastLoginDate(): string | undefined {
    return this.verificationRepo.lastLoginDate;
  }

  async userClaims(): Promise<ParsedToken | undefined> {
    return await this.verificationRepo.userClaims();
  }

  public async unlinkProvider(authProvider: AuthProvider): Promise<boolean> {
    const providerId = authProviderToProviderId[authProvider] || "";
    const value = await this.verificationRepo.unlinkProvider({ providerId });
    if (value) {
      await UserHelper.GI().removeAuthProvider(authProvider);
    }
    return value;
  }

  public async logout(): Promise<boolean> {
    return await this.verificationRepo.logout();
  }

  async handleLogin({
    provider,
    loginType,
    otp = "",
  }: {
    provider: AuthProvider;
    loginType: LoginType;
    otp?: string;
  }): Promise<boolean> {
    this.currentAuthProvider = provider;
    switch (provider) {
      case AuthProvider.Apple:
        return await this._signInWithApple(loginType);

      case AuthProvider.Google:
        return await this._signInWithGoogle(loginType);

      case AuthProvider.Facebook:
        return await this._signInWithFacebook(loginType);

      case AuthProvider.Phone:
        return this.phoneVerificationWithFirebase
          ? await this._loginWithOtp({
              loginType,
              otp,
            })
          : await this._verifyOTPWithExternalProvider({ otp });
    }
  }

  private async _signInWithGoogle(loginType: LoginType): Promise<boolean> {
    return await this.verificationRepo.signInWithGoogle(loginType);
  }

  private async _signInWithApple(loginType: LoginType): Promise<boolean> {
    return await this.verificationRepo.signInWithApple(loginType);
  }

  private async _signInWithFacebook(loginType: LoginType): Promise<boolean> {
    return await this.verificationRepo.signInWithFacebook(loginType);
  }

  private async _loginWithOtp({
    loginType,
    otp,
  }: {
    loginType: LoginType;
    otp: string;
  }): Promise<boolean> {
    return await this.verificationRepo.signInWithOtp({
      loginType,
      verificationId: this.verificationID,
      otp,
    });
  }
  public async cancelVerificationWithExternalProvider(): Promise<boolean> {
    const value =
      await this.verificationRepo.cancelVerificationWithExternalProvider({
        phoneNumber: UserInitializer.GI().user.phoneNumber,
      });
    if (value) {
      UserHelper.GI().updatePhone(UserInitializer.GI().user.phoneNumber, false);
    }
    return value;
  }

  public async sendSmsWithExternalProvider(
    completePhone: string,
    onCodeSent: (verificationId: string) => void,
    onFailed: (
      verificationId: string,
      error: Errors,
      startDate: Date | undefined,
      endDate: Date
    ) => void
  ): Promise<void> {
    await this.verificationRepo.sendSmsWithExternalProvider({
      completePhone,
      onCodeSent,
      onFailed,
    });
  }

  private async _verifyOTPWithExternalProvider({
    otp,
  }: {
    otp: string;
  }): Promise<boolean> {
    return await this.verificationRepo.verifyOTPWithExternalProvider({
      verificationId: this.verificationID,
      otp,
      userName: UserInitializer.GI().user.name,
      phoneNumber: this.submitedPhone,
    });
  }

  public async deleteUser(): Promise<boolean> {
    return await this.verificationRepo.deleteUser();
  }

  public async reloadUser(): Promise<void> {
    await this.verificationRepo.reloadUser();
  }
}
