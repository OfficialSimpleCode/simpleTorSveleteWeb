import { Gender, maleToFemaleMap } from "$lib/consts/gender";
import { userStore } from "$lib/stores/User";
import { _, locale } from "svelte-i18n";
import { get } from "svelte/store";

export function translate(strName: string, needGender: boolean = true): string {
  const translatedStr = get(_)(strName);
  if (get(locale) === "he" && needGender)
    return textAccordingToGender(translatedStr);
  return strName;
}

export function textAccordingToGender(txt: string): string {
  const userGender = get(userStore).gender;
  const isMale = userGender === Gender.male || userGender === Gender.anonymous;
  if (!isMale) {
    Object.keys(maleToFemaleMap).forEach((key) => {
      txt = txt.replaceAll(key, maleToFemaleMap[key]);
    });
  }
  return txt;
}
