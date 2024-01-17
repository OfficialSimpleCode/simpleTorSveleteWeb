import { AuthProvider, authProviderToProviderId } from "$lib/consts/auth";
import type { LoginType } from "$lib/services/external_services/firebase_auth_service";
import type { PhoneAuthCredential, User } from "firebase/auth";
import VerificationRepo from "./verification_repo";

export class VerificationHelper {
  private static _singleton: VerificationHelper = new this();

  private constructor() {}

  public static GI(): VerificationHelper {
    return this._singleton;
  }

  public signInUserId: string = "";
  public currentAuthProvider: AuthProvider | null = null;
  public verificationID: string = "";
  public submitedPhone: string = "";
  public lastVerificationUnix: number = 0;
  public currentCredential: PhoneAuthCredential | null = null;
  public phoneVerificationWithFirebase: boolean = true;

  public verificationRepo: VerificationRepo = VerificationRepo.GI();

  public updateFinishLogIn(val: boolean): void {
    // Update the finishLogIn logic
    // ...
    // Example: UiManager.insertUpdate(Providers.settings);
  }

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
    this.currentAuthProvider = null;
    this.currentCredential = null;
    this.submitedPhone = "";
    this.phoneVerificationWithFirebase = true;
  }

  //   public async sendSmsForFirebaseVerification(
  //     completePhone: string,
  //     onCodeSent: (verificationId: string) => void,
  //     onFailed: (
  //       verificationId: string,
  //       exception: FirebaseAuthException,
  //       startDate: Date | undefined,
  //       endDate: Date
  //     ) => void,
  //     verificationCompleted: (credential: PhoneAuthCredential) => void
  //   ): Promise<void> {
  //     await this.verificationRepo.sendSmsForFirebaseVerification({
  //       completePhone,
  //       onCodeSent,
  //       onFailed,
  //       verificationCompleted,
  //     });
  //   }

  //   public async sendSmsWithExternalProvider(
  //     completePhone: string,
  //     onCodeSent: (verificationId: string) => void,
  //     onFailed: (
  //       verificationId: string,
  //       error: Errors,
  //       startDate: Date | undefined,
  //       endDate: Date
  //     ) => void
  //   ): Promise<void> {
  //     await this.verificationRepo.sendSmsWithExternalProvider({
  //       completePhone,
  //       onCodeSent,
  //       onFailed,
  //     });
  //   }

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

  public async unlinkProvider(authProvider: AuthProvider): Promise<boolean> {
    const providerId = authProviderToProviderId[authProvider] || "";
    const value = await this.verificationRepo.unlinkProvider({ providerId });
    if (value) {
      // Update user email if needed
      // ...
    }
    return value;
  }

  //   public async cancelVerificationWithExternalProvider(): Promise<boolean> {
  //     const value =
  //       await this.verificationRepo.cancelVerificationWithExternalProvider({
  //         userId: UserInitializer.GI().user.id,
  //         phoneNumber: UserInitializer.GI().user.phoneNumber,
  //       });
  //     if (value) {
  //       await userHelper.loadLibrary().then(async (value) => {
  //         await userHelper
  //           .UserHelper()
  //           .updatePhone(UserInitializer.GI().user.phoneNumber, false);
  //       });
  //     }
  //     return value;
  //   }

  public async logout(): Promise<boolean> {
    return await this.verificationRepo.logout();
  }

  async handleLogin({
    provider,
    loginType,
  }: {
    provider: AuthProvider;
    loginType: LoginType;
  }): Promise<boolean> {
    switch (provider) {
      case AuthProvider.Apple:
        return await this._signInWithApple(loginType);

      case AuthProvider.Google:
        return await this._signInWithGoogle(loginType);

      case AuthProvider.Facebook:
        return await this._signInWithFacebook(loginType);

      case AuthProvider.Phone:
        return false;
      // return this.phoneVerificationWithFirebase
      //   ? await this._loginWithOtp({
      //       loginType,
      //       otp,
      //       autocredential,
      //     })
      //   : await this._verifyOTPWithExternalProvider({ otp });
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
    autocredential,
  }: {
    loginType: LoginType;
    otp: string;
    autocredential: PhoneAuthCredential | undefined;
  }): Promise<boolean> {
    return await this.verificationRepo.signInWithOtp({
      loginType,
      verificationId: this.verificationID,
      otp,
      autocredential,
    });
  }

  //   private async _verifyOTPWithExternalProvider({
  //     otp,
  //   }: {
  //     otp: string;
  //   }): Promise<boolean> {
  //     return await this.verificationRepo.verifyOTPWithExternalProvider({
  //       verificationId: this.verificationID,
  //       otp,
  //       userName: UserInitializer.GI().user.name,
  //       phoneNumber: this.submitedPhone,
  //     });
  //   }

  public async deleteUser(): Promise<boolean> {
    return await this.verificationRepo.deleteUser();
  }

  public async reloadUser(): Promise<void> {
    await this.verificationRepo.reloadUser();
  }
}
