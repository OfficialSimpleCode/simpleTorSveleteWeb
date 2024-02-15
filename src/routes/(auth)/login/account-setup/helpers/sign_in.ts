import type { Gender } from "$lib/consts/gender";
import UserHelper from "$lib/helpers/user/user_helper";

import { VerificationHelper } from "$lib/helpers/verification/verification_helper";
import UserInitializer from "$lib/initializers/user_initializer";
import type PhoneDataResult from "$lib/models/resps/phone_data_result";

export async function signInAction(
  pickedGender: Gender,
  fullName: string,
  phoneNumber: string,
  email: string
): Promise<PhoneDataResult | null> {
  return await UserHelper.GI()
    .createUser({
      gender: pickedGender,
      userName: fullName,
      phone: phoneNumber,
      email: email,
      isVerifiedEmail: false,
      isVerifiedPhone: false,
      userId: UserInitializer.GI().userId,
      authProvider: VerificationHelper.GI().currentAuthProvider,
    })
    .then(async (phoneDataResp) => {
      if (phoneDataResp == null) {
        return null;
      }
      // loading the user
      UserInitializer.GI().userDoc = undefined; // force db load user
      const setUpResp = await UserInitializer.GI().setupUser({
        newUserId: VerificationHelper.GI().userId,
      });

      if (setUpResp) {
        return phoneDataResp;
      }
      return null;
    });
}
