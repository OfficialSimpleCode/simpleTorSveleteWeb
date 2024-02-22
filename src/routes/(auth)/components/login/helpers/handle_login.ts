import { goto } from "$app/navigation";
import { base } from "$app/paths";
import {
  AuthProvider,
  LoginReason,
  LoginType,
  loginReasonToLoginType,
} from "$lib/consts/auth";

import { ErrorsController } from "$lib/controllers/errors_controller";
import UserHelper from "$lib/helpers/user/user_helper";
import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
import UserInitializer from "$lib/initializers/user_initializer";
import PhoneDataResult from "$lib/models/resps/phone_data_result";
import { businessStore } from "$lib/stores/Business";
import { isConnectedStore } from "$lib/stores/User";
import { pushDialog } from "$lib/utils/general_utils";
import type { EventDispatcher } from "svelte";
import { get } from "svelte/store";
import { authDataStore } from "../../../auth_controller";

export async function handleLogin({
  provider,
  otp = "",
  loginReason,
  dispatch = undefined,
  dialog = undefined,
  deleteUserDialog = undefined,
}: {
  provider: AuthProvider;
  loginReason: LoginReason;
  otp?: string;

  dialog?: HTMLDialogElement;
  deleteUserDialog?: HTMLDialogElement;
  dispatch?: EventDispatcher<any>;
}): Promise<PhoneDataResult | undefined> {
  if (get(isConnectedStore) == null) {
    return;
  }
  // if the user not connected the login type need to be login and not reauthenticate
  // reauthenticate is only for connected users
  let loginType = loginReasonToLoginType.get(loginReason)!;
  if (loginReason === LoginReason.deleteUser) {
    loginType =
      get(isConnectedStore) === false
        ? LoginType.login
        : LoginType.reauthenticate;
  }

  const resp = await VerificationHelper.GI().handleLogin({
    provider: provider,
    loginType: loginType,
    otp: otp,
  });

  if (!resp) {
    ErrorsController.displayError();
    return;
  }
  console.log("222222222222222222222222222");
  console.log(resp);

  if (loginReason === LoginReason.deleteUser) {
    console.log("fffffffffffff");
    if (deleteUserDialog != null) {
      console.log("rrrrrrrrrr");
      pushDialog(deleteUserDialog);
    }
    return;
  }

  if (loginReason === LoginReason.phoneUpdate) {
    return await updatePhone({});
  }

  if (loginReason === LoginReason.linkProvider) {
    const resp = await addProvider(provider);
    if (resp != null) {
      //go to profile that we can see the new added provider
      goto(`${base}/profile`);
    }
    return;
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
    } else {
      ErrorsController.displayError();
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

  //go to the main page or to the loaded business if exist
  comeBack();
}

function comeBack() {
  if (get(businessStore) != null) {
    goto(`${base}/business/${get(businessStore)?.url ?? ""}`);
  } else {
    goto(`${base}/`);
  }
}

export async function finishDeleteUser() {
  const resp = await UserHelper.GI().deleteUser(UserInitializer.GI().user);

  if (!resp) {
    ErrorsController.displayError();
  } else {
    //after delete user need to go to business if loaded if not
    //go to the app page
    if (get(businessStore) != null) {
      goto(`${base}/business/${get(businessStore)?.url ?? ""}`);
    } else {
      goto(`/`);
    }
  }
  return;
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
