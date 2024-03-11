import { logger } from "$lib/consts/application_general";
import { LoginType } from "$lib/consts/auth";
import { firebaseConfig } from "$lib/consts/firebase_config";
import AppErrorsHelper from "$lib/helpers/app_errors";
import { FirebaseError, getApp, getApps, initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  PhoneAuthProvider,
  RecaptchaVerifier,
  getAuth,
  linkWithCredential,
  linkWithPopup,
  onAuthStateChanged,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  signInWithCredential,
  signInWithPhoneNumber,
  signInWithPopup,
  unlink,
  updatePhoneNumber,
  updateProfile,
  type Auth,
  type CompleteFn,
  type ParsedToken,
  type Unsubscribe,
  type User,
} from "firebase/auth";
import { verificationErrors } from "../errors/interpeters/verification_errors_interpeter";
import { Errors } from "../errors/messages";
import { VerificationService } from "./verification_service";

export class FirebaseAuthService extends VerificationService {
  _auth: Auth;

  constructor() {
    super();

    getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    this._auth = getAuth();
  }

  async signInWithFacebookSRV(loginType: LoginType): Promise<boolean> {
    try {
      await this.signInWithFacebookWebSRV(loginType);

      return true;
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(`Error: ${e}`);
        logger.error(`it was an error the error is --> ${e}`);

        const newCode = e.code.replace("auth/", "");
        logger.error(newCode);
        AppErrorsHelper.GI().details = newCode;
        AppErrorsHelper.GI().error =
          verificationErrors[newCode] ?? Errors.unknown;
      }
      return false;
    }
  }

  private async signInWithFacebookWebSRV(loginType: LoginType): Promise<void> {
    const facebookProvider = new FacebookAuthProvider();
    facebookProvider.addScope("email");
    facebookProvider.setCustomParameters({ display: "popup" });

    switch (loginType) {
      case LoginType.login:
        await signInWithPopup(this._auth, facebookProvider);
        break;
      case LoginType.link:
        await linkWithPopup(this._auth.currentUser!, facebookProvider);
        break;
      case LoginType.reauthenticate:
        await reauthenticateWithPopup(
          this._auth.currentUser!,
          facebookProvider
        );
        break;
      case LoginType.phoneUpdate:
        break;
    }
  }

  async signInWithGoogleSRV(loginType: LoginType): Promise<boolean> {
    try {
      await this.signInWithGoogleWebSRV(loginType);

      return true;
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(`Error: ${e}`);
        logger.error(`it was an error the error is --> ${e}`);

        const newCode = e.code.replace("auth/", "");
        logger.error(newCode);
        AppErrorsHelper.GI().details = newCode;
        AppErrorsHelper.GI().error =
          verificationErrors[newCode] ?? Errors.unknown;
      }

      return false;
    }
  }

  private async signInWithGoogleWebSRV(loginType: LoginType): Promise<void> {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.addScope("email");
    googleProvider.addScope("profile");
    googleProvider.setCustomParameters({ login_hint: "user@example.com" });

    switch (loginType) {
      case LoginType.login:
        await signInWithPopup(this._auth, googleProvider);
        break;
      case LoginType.link:
        await linkWithPopup(this._auth.currentUser!, googleProvider);
        break;
      case LoginType.reauthenticate:
        await reauthenticateWithPopup(this._auth.currentUser!, googleProvider);
        break;
      case LoginType.phoneUpdate:
        break;
    }
  }

  async signInWithAppleSRV(loginType: LoginType): Promise<boolean> {
    try {
      await this.signInWithAppleWebSRV(loginType);
      return true;
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(`Error: ${e}`);
        logger.error(`it was an error the error is --> ${e}`);

        const newCode = e.code.replace("auth/", "");
        logger.error(newCode);
        AppErrorsHelper.GI().details = newCode;
        AppErrorsHelper.GI().error =
          verificationErrors[newCode] ?? Errors.unknown;
      }
      return false;
    }
  }

  private async signInWithAppleWebSRV(loginType: LoginType): Promise<void> {
    const appleProvider = new OAuthProvider("apple.com");
    appleProvider.addScope("email");
    appleProvider.addScope("name");
    switch (loginType) {
      case LoginType.login:
        await signInWithPopup(this._auth, appleProvider);
        break;
      case LoginType.link:
        await linkWithPopup(this._auth.currentUser!, appleProvider);
        break;
      case LoginType.reauthenticate:
        await reauthenticateWithPopup(this._auth.currentUser!, appleProvider);
        break;
      case LoginType.phoneUpdate:
        break;
    }
  }

  async signInWithOtpSRV({
    loginType,
    verificationId,
    otp,
  }: {
    loginType: LoginType;
    verificationId: string;
    otp: string;
  }): Promise<boolean> {
    const credential = PhoneAuthProvider.credential(verificationId, otp);

    await this._auth.currentUser?.reload();

    try {
      switch (loginType) {
        case LoginType.login:
          await signInWithCredential(this._auth, credential);
          break;
        case LoginType.link:
          await linkWithCredential(this._auth.currentUser!, credential);
          break;
        case LoginType.reauthenticate:
          await reauthenticateWithCredential(
            this._auth.currentUser!,
            credential
          );
          break;
        case LoginType.phoneUpdate:
          await updatePhoneNumber(this._auth.currentUser!, credential);
          break;
      }

      return true;
    } catch (e) {
      console.error(`Error: ${e}`);
      if (e instanceof FirebaseError) {
        console.error(`Error: ${e}`);
        logger.error(`it was an error the error is --> ${e}`);

        const newCode = e.code.replace("auth/", "");
        logger.error(newCode);
        AppErrorsHelper.GI().details = newCode;
        AppErrorsHelper.GI().error =
          verificationErrors[newCode] ?? Errors.unknown;
      }
      return false;
    }
  }

  get isLoggedInSRV(): boolean {
    return this._auth.currentUser != null;
  }

  onAuthUserStateChangedSRV(completed: CompleteFn): Unsubscribe {
    return onAuthStateChanged(this._auth, completed);
  }

  async updateUserNameSRV(name: string): Promise<void> {
    try {
      await updateProfile(this._auth.currentUser!, { displayName: name });
      await this._auth.currentUser!.reload();
    } catch (e) {
      if (e instanceof Error) {
        AppErrorsHelper.GI().addError({
          error: Errors.updateDisplayName,
          details: e.toString(),
        });
      }
      throw e;
    }
  }

  userConnectedOnlyLocallySRV(): boolean {
    return this.isLoggedInSRV && this._auth.currentUser!.displayName === null;
  }

  async sendSmsForFirebaseVerificationSRV({
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
    const beforeSendTime = new Date();
    let codeSentTime: Date | undefined;

    const html = document.getElementById("recaptcha-container")!;

    const recaptchaVerifier = new RecaptchaVerifier(this._auth, html, {
      size: "invisible",
      callback: (response: any) => {
        console.log(response);
      },
    });

    await signInWithPhoneNumber(this._auth, completePhone, recaptchaVerifier)
      .then((confirmationResult) => {
        onCodeSent(confirmationResult.verificationId);
      })

      .catch((e) => {
        if (e instanceof FirebaseError) {
          logger.error(`it was an error the error is --> ${e}`);
          const newCode = e.code.replace("auth/", "");
          onFailed(completePhone, e, codeSentTime, beforeSendTime);
          logger.error(newCode);
          AppErrorsHelper.GI().details = newCode;
          AppErrorsHelper.GI().error =
            verificationErrors[newCode] ?? Errors.unknown;
        }
      });
  }

  get lastLoginDateSRV(): string | undefined {
    return this._auth.currentUser?.metadata.lastSignInTime;
  }

  get userIdSRV(): string {
    console.log("ssssssssssssssssssssssssssssssssssssssssssss");
    if (this._auth.currentUser != null) {
      const name = this._auth.currentUser.displayName;

      if (name !== null && name.includes("&&") && name.includes("+")) {
        console.log(this.userPhoneSRV);
        return this.userPhoneSRV;
      } else {
        console.log(this._auth.currentUser.uid);
        return this._auth.currentUser.uid;
      }
    }

    return "";
  }

  get userDataSRV(): User | null {
    return this._auth.currentUser;
  }

  async userClaimsSRV(): Promise<ParsedToken | undefined> {
    if (this._auth.currentUser === null) {
      return undefined;
    }
    await this._auth.currentUser.getIdToken(true);
    const idTokenResult = await this._auth.currentUser.getIdTokenResult();
    return idTokenResult.claims;
  }

  get userPhoneSRV(): string {
    if (this._auth.currentUser !== null) {
      const userNameData = this._auth.currentUser.displayName!;
      const prefix = userNameData.split("&&")[1];
      const phone = this._auth.currentUser.phoneNumber!.replace(
        prefix,
        `${prefix}-`
      );
      return phone;
    }
    return "";
  }

  get existsProvidersSRV(): Set<string> {
    if (this._auth.currentUser == null) {
      return new Set();
    }
    const providersIds = new Set<string>();
    this._auth.currentUser.providerData.forEach((provider) => {
      providersIds.add(provider.providerId);
    });
    return providersIds;
  }

  async deleteUserSRV(): Promise<boolean> {
    if (this._auth.currentUser === null) {
      return false;
    }

    try {
      await this._auth.currentUser.delete();
      return true;
    } catch (e) {
      return false;
    }
  }

  async unlinkProviderSRV({
    providerId,
  }: {
    providerId: string;
  }): Promise<boolean> {
    try {
      unlink(this._auth.currentUser!, providerId);
      return true;
    } catch (e) {
      // AppErrors().details = e.message ?? e.code;
      // AppErrors().error = verificationErrors[e.code] ?? Errors.unknown;
      return false;
    }
  }

  async reloadUserSRV(): Promise<void> {
    if (this._auth.currentUser !== null) {
      await this._auth.currentUser.reload();
    }
  }

  async logoutSRV(): Promise<boolean> {
    try {
      await this._auth.signOut();

      return !this.isLoggedInSRV;
    } catch (e) {
      return false;
    }
  }
}
