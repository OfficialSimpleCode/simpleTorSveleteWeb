import {
  FirebaseAuthService,
  LoginType,
} from "$lib/services/external_services/firebase_auth_service";
import type { PhoneAuthCredential, User } from "firebase/auth";
import type { VerificationApi } from "./verification_api";

// Define the VerificationRepo class implementing the VerificationApi interface
export class VerificationRepo
  extends FirebaseAuthService
  implements VerificationApi
{
  private static _singleton: VerificationRepo = new this();

  private constructor() {
    super();
  }

  public static GI(): VerificationRepo {
    return this._singleton;
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

  async signInWithOtp({
    loginType,
    verificationId,
    otp,
    autocredential,
  }: {
    loginType: LoginType;
    verificationId: string;
    otp: string;
    autocredential: PhoneAuthCredential | undefined;
  }): Promise<boolean> {
    return await this.signInWithOtpSRV({
      loginType,
      verificationId,
      otp,
      autocredential,
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

  async userClaims(): Promise<{
    [key: string]: any;
  } | null> {
    return await this.userClaimsSRV;
  }
}

// Export the VerificationRepo class
export default VerificationRepo;
