export enum LoginType {
  login,
  link,
  reauthenticate,
  phoneUpdate,
}

import { logger } from "$lib/consts/application_general";
import { firebaseConfig } from "$lib/firebase_config";
import AppErrorsHelper from "$lib/helpers/app_errors";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  PhoneAuthCredential,
  PhoneAuthProvider,
  getAuth,
  linkWithCredential,
  linkWithPopup,
  onAuthStateChanged,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  signInWithCredential,
  signInWithPopup,
  unlink,
  updatePhoneNumber,
  updateProfile,
  type Auth,
  type CompleteFn,
  type Unsubscribe,
  type User,
} from "firebase/auth";
import { verificationErrors } from "../errors/interpeters/verification_errors_interpeter";
import { Errors } from "../errors/messages";

export class FirebaseAuthService {
  _auth: Auth;
  constructor() {
    const firebaseApp =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    this._auth = getAuth();
  }

  async signInWithFacebookSRV(loginType: LoginType): Promise<boolean> {
    try {
      await this.signInWithFacebookWebSRV(loginType);

      return true;
    } catch (e) {
      if (e instanceof Error) {
        console.error(`Error: ${e}`);
        logger.error(`it was an error the error is --> ${e}`);
        logger.error(e.name);
        AppErrorsHelper.GI().details = e.name;
        AppErrorsHelper.GI().error =
          verificationErrors[e.name] ?? Errors.unknown;
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
        // Handle phoneUpdate case
        break;
    }
  }

  async signInWithGoogleSRV(loginType: LoginType): Promise<boolean> {
    try {
      await this.signInWithGoogleWebSRV(loginType);

      return true;
    } catch (e) {
      if (e instanceof Error) {
        console.error(`Error: ${e}`);
        logger.error(`it was an error the error is --> ${e}`);
        logger.error(e.name);
        AppErrorsHelper.GI().details = e.name;
        AppErrorsHelper.GI().error =
          verificationErrors[e.name] ?? Errors.unknown;
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
        // Handle phoneUpdate case
        break;
    }
  }

  async signInWithAppleSRV(loginType: LoginType): Promise<boolean> {
    try {
      await this.signInWithAppleWebSRV(loginType);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        console.error(`Error: ${e}`);
        logger.error(`it was an error the error is --> ${e}`);
        logger.error(e.name);
        AppErrorsHelper.GI().details = e.name;
        AppErrorsHelper.GI().error =
          verificationErrors[e.name] ?? Errors.unknown;
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
        // Handle phoneUpdate case
        break;
    }
  }

  async signInWithOtpSRV({
    loginType,
    verificationId,
    otp,
    autocredential,
  }: {
    loginType: LoginType;
    verificationId: string;
    otp: string;
    autocredential?: PhoneAuthCredential;
  }): Promise<boolean> {
    const credential =
      autocredential ?? PhoneAuthProvider.credential(verificationId, otp);

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
      if (e instanceof Error) {
        console.error(`Error: ${e}`);
        logger.error(`it was an error the error is --> ${e}`);
        logger.error(e.name);
        AppErrorsHelper.GI().details = e.name;
        AppErrorsHelper.GI().error =
          verificationErrors[e.name] ?? Errors.unknown;
      }
      return false;
    }
  }

  get isLoggedInSRV(): boolean {
    console.log(
      "5555555555555555555555555555555555555555555555555555" +
        this._auth.currentUser?.displayName
    );
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

  //   async sendSmsForFirebaseVerificationSRV({
  //       completePhone, onCodeSent, onFailed, verificationCompleted,
  //   }: {
  //       completePhone: string;
  //       onCodeSent: (verificationId: string) => void;
  //       onFailed: (
  //           phone: string,
  //           e: FirebaseAuthException,
  //           codeSentTime: Date | undefined,
  //           beforeSendTime: Date
  //       ) => void;
  //       verificationCompleted: (credential: PhoneAuthCredential) => void;
  //   }): Promise<void> {
  //       const beforeSendTime = new Date();
  //       let codeSentTime: Date | undefined;
  //       await verifyPhoneNumber(this._auth,({
  //           phoneNumber: completePhone,
  //           verificationCompleted: verificationCompleted,
  //           verificationFailed: (e) => {
  //               AppErrors().details = e.message ?? e.code;
  //               AppErrors().error =
  //                   verificationErrors[e.code] ?? verificationErrors[e.message] ?? Errors.unknown;

  //               onFailed(completePhone, e, codeSentTime, beforeSendTime);
  //           },
  //           codeSent: (verificationId, resendToken) => {
  //               codeSentTime = new Date();
  //               onCodeSent(verificationId);
  //           },
  //           codeAutoRetrievalTimeout: (verificationId) => {
  //               // Handle a timeout of when automatic SMS code handling fails.
  //           },
  //       }));
  //   }

  get lastLoginDateSRV(): string | undefined {
    return this._auth.currentUser?.metadata.lastSignInTime;
  }

  get userIdSRV(): string {
    console.log(
      "111111111111111111111111111111111111111111111111111111111111111"
    );
    if (this._auth.currentUser != null) {
      console.log(
        "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      );
      const name = this._auth.currentUser.displayName;

      if (name !== null && name.includes("&&") && name.includes("+")) {
        return this.userPhoneSRV;
      } else {
        return this._auth.currentUser.uid;
      }
    }

    return "";
  }

  get userDataSRV(): User | null {
    return this._auth.currentUser;
  }

  async userClaimsSRV(): Promise<{ [key: string]: any } | null> {
    if (this._auth.currentUser === null) {
      return null;
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
    if (this._auth.currentUser === null) {
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
      //AppErrorsHelper.addError({ error: Errors.logout, details: e.toString() });
      return false;
    }
  }
}
