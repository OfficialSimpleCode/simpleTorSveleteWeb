import { goto } from "$app/navigation";
import { base } from "$app/paths";
import {
  AuthProvider,
  LoginReason,
  loginReasonToLoginType,
} from "$lib/consts/auth";

import { ErrorsController } from "$lib/controllers/errors_controller";
import UserHelper from "$lib/helpers/user/user_helper";
import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
import UserInitializer from "$lib/initializers/user_initializer";
import PhoneDataResult from "$lib/models/resps/phone_data_result";
import { isConnectedStore } from "$lib/stores/User";
import type { EventDispatcher } from "svelte";
import { get } from "svelte/store";
import { authDataStore } from "../../../auth_controller";

export async function handleLogin({
  provider,
  otp = "",
  loginReason,
  dispatch = undefined,
  dialog = undefined,
}: {
  provider: AuthProvider;
  loginReason: LoginReason;
  otp?: string;
  dialog?: HTMLDialogElement;
  dispatch?: EventDispatcher<any>;
}): Promise<PhoneDataResult | undefined> {
  const resp = await VerificationHelper.GI().handleLogin({
    provider: provider,
    loginType: loginReasonToLoginType.get(loginReason)!,
    otp: otp,
  });

  if (!resp) {
    ErrorsController.displayError();
    return;
  }

  if (loginReason === LoginReason.deleteUser) {
    const resp = await deleteUser();
    if (resp) {
      //comeback to the place he was before login
      history.back();
    }
    return;
  }

  if (loginReason === LoginReason.phoneUpdate) {
    return await updatePhone({});
  }

  if (loginReason === LoginReason.linkProvider) {
    const resp = await addProvider(provider);
    if (resp != null) {
      //comeback to the place he was before login
      history.back();
    }
  }
  if (loginReason === LoginReason.phoneVerification) {
    let resp: PhoneDataResult | undefined;

    if (VerificationHelper.GI().phoneVerificationWithFirebase) {
      resp = await addProvider(provider);
    } else {
      const userClaims = await VerificationHelper.GI().userClaims();
      const isUserPhone =
        userClaims != null &&
        userClaims["phone_number"] ===
          VerificationHelper.GI().submitedPhone.replaceAll("-", "");
      if (!isUserPhone) {
        return undefined;
      }

      resp = await updatePhone({ customIsVerifiedPhone: true });
    }

    if (resp != null) {
      //update the auth store for the new phone data result
      authDataStore.update((val) => {
        val.phoneData = resp!;
        return val;
      });
      if (dispatch != null) {
        dispatch("onVerifyPhone");
      }
    }
    return;
  }

  await setUpUser();

  if (dispatch != null) {
    dispatch("onFinishLogin");
  }

  //sign in page
  if (get(isConnectedStore) !== true) {
    //need to change this var to be allowed to get in to the setup page
    VerificationHelper.GI().needToSignUp = true;
    goto(`${base}/login/account-setup`);
    return;
  }

  //need to exit from the phone dialog also
  if (provider == AuthProvider.Phone && dialog != null) {
    dialog.close();
  }

  //comeback to the place he was before login
  history.back();
}

async function deleteUser() {
  return await UserHelper.GI().deleteUser(UserInitializer.GI().user);
}

async function updatePhone({
  customIsVerifiedPhone,
}: {
  customIsVerifiedPhone?: boolean;
}) {
  const phoneDataResp = await UserHelper.GI().updatePhone(
    VerificationHelper.GI().submitedPhone,
    customIsVerifiedPhone ?? UserInitializer.GI().user.isVerifiedPhone
  );
  if (phoneDataResp == null) {
    return undefined;
  }

  return phoneDataResp;
}

async function addProvider(
  provider: AuthProvider
): Promise<PhoneDataResult | undefined> {
  let isPhoneVerified: boolean | undefined;
  let phone: string | undefined;

  const phoneInData =
    VerificationHelper.GI().userData?.phoneNumber ===
    VerificationHelper.GI().submitedPhone.replaceAll("-", "");

  if (phoneInData && AuthProvider.Phone === provider) {
    // user verify his phone save the phone
    isPhoneVerified = true;
    phone = VerificationHelper.GI().submitedPhone;
  }

  let isEmailVerified: boolean | undefined;
  let email: string | undefined;

  if (
    VerificationHelper.GI().userData?.email !== null &&
    !UserInitializer.GI().user.userPublicData.isVerifiedEmail
  ) {
    // user verify his email save the email
    isEmailVerified = true;
    email = VerificationHelper.GI().userData?.email ?? "";
  }

  return await UserHelper.GI().addAuthProvider({
    provider,
    isVerifiedPhone: isPhoneVerified,
    phone,
    isVerfiedEmail: isEmailVerified,
    email: email,
  });
}

async function setUpUser(): Promise<boolean> {
  /*
    register: don't logout the user didn't created yet
    loggin: don't loggout -> exist: load user. disen't exist: signUp schem
  */
  return await UserInitializer.GI().setupUser({
    newUserId: VerificationHelper.GI().userId,
    logoutIfDosentExist: false,
  });
}
