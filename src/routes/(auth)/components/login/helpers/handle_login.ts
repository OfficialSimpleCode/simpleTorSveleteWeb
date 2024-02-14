import { goto } from "$app/navigation";
import { base } from "$app/paths";
import {
  AuthProvider,
  LoginReason,
  loginReasonToLoginType,
} from "$lib/consts/auth";

import UserHelper from "$lib/helpers/user/user_helper";
import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
import UserInitializer from "$lib/initializers/user_initializer";
import PhoneDataResult from "$lib/models/resps/phone_data_result";
import { businessStore } from "$lib/stores/Business";
import { isConnectedStore } from "$lib/stores/User";
import type { EventDispatcher } from "svelte";
import { get } from "svelte/store";
import { authDataStore } from "../../../auth_controller";

export async function handleLogin({
  provider,
  otp = "",
  loginReason,
  dispatch = undefined,
}: {
  provider: AuthProvider;
  loginReason: LoginReason;
  otp?: string;
  dispatch?: EventDispatcher<any>;
}): Promise<PhoneDataResult | undefined> {
  const resp = await VerificationHelper.GI().handleLogin({
    provider: provider,
    loginType: loginReasonToLoginType.get(loginReason)!,
    otp: otp,
  });

  if (!resp) {
    return;
  }

  if (loginReason === LoginReason.deleteUser) {
    const resp = await deleteUser();
    if (resp) {
      goto(
        `${base}/business/${
          get(businessStore) != null ? get(businessStore).urlEndPoint : ""
        }`
      );
    }
    return;
  }

  if (loginReason === LoginReason.phoneUpdate) {
    return await updatePhone({});
  }

  if (loginReason === LoginReason.linkProvider) {
    const resp = await addProvider(provider);
    if (resp != null) {
      goto(
        `${base}/business/${
          get(businessStore) != null ? get(businessStore).urlEndPoint : ""
        }`
      );
    }
  }
  if (loginReason === LoginReason.phoneVerification) {
    let resp: PhoneDataResult | undefined;
    console.log("1111111111111111111111111");
    if (VerificationHelper.GI().phoneVerificationWithFirebase) {
      console.log("333333333333");
      resp = await addProvider(provider);
      console.log("ssssssssssssssssssssssssssss", resp);
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
    console.log("555555555555555");
    if (resp != null) {
      console.log("666666666666");

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

  if (get(isConnectedStore) !== true) {
    goto(`${base}/account-setup`);
    return;
  }

  //need to exit from the phone dialog also
  if (provider == AuthProvider.Phone) {
    history.back();
  }
  history.back();
}

async function deleteUser() {
  console.log("ddddddddddddd");
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
