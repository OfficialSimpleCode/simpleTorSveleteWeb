import type { Gender } from "$lib/consts/gender";
import UserHelper from "$lib/helpers/user/user_helper";
import UserInitializer from "$lib/initializers/user_initializer";

export async function updateGender(newGender: Gender) {
  await UserHelper.GI().setGender(newGender);
}

export async function logOut() {
  await UserInitializer.GI().logout();
  history.back();
}
