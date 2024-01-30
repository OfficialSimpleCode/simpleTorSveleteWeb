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
import type PhoneDataResult from "$lib/models/resps/phone_data_result";
import { isConnectedStore } from "$lib/stores/User";
import { get } from "svelte/store";

export async function handleLogin({
  provider,
  otp = "",
  loginReason,
}: {
  provider: AuthProvider;
  loginReason: LoginReason;
  otp?: string;
}) {
  const resp = await VerificationHelper.GI().handleLogin({
    provider: provider,
    loginType: loginReasonToLoginType.get(loginReason)!,
    otp: otp,
  });

  if (!resp) {
    return;
  }

  if (loginReason === LoginReason.deleteUser) {
    return await deleteUser();
  }

  if (loginReason === LoginReason.phoneUpdate) {
    return await updatePhone({});
  }

  if (loginReason === LoginReason.linkProvider) {
    return await addProvider(provider);
  }
  if (loginReason === LoginReason.phoneVerification) {
    if (VerificationHelper.GI().phoneVerificationWithFirebase) {
      return await addProvider(provider);
    } else {
      const userClaims = await VerificationHelper.GI().userClaims();
      const isUserPhone =
        userClaims != null &&
        userClaims["phone_number"] ===
          VerificationHelper.GI().submitedPhone.replaceAll("-", "");
      if (!isUserPhone) {
        return null;
      }

      return await updatePhone({ customIsVerifiedPhone: true });
    }
  }

  await setUpUser();

  if (!get(isConnectedStore)) {
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
  // const makeSureDeleteResp = await makeSureDeleteUserDialog(context);
  // if (makeSureDeleteResp == true) {
  //   final loadingResp = await Loading(
  //           context: context,
  //           navigator: Navigator.of(context),
  //           future: deleteUser(context),
  //           animation: deleteAnimation,
  //           msg: translate("UserDeleted"))
  //       .dialog();
  //   Navigator.pop(context, loadingResp);
  // } else {
  //   Navigator.pop(context, false);
  // }
  // return;
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
    return null;
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
