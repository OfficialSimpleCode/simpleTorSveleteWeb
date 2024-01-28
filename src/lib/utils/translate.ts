import { Gender, maleToFemaleMap } from "$lib/consts/gender";
import { userStore } from "$lib/stores/User";
import { _, locale } from "svelte-i18n";
import { get } from "svelte/store";

export function translate(strName: string, getText: CallableFunction = get(_), needGender: boolean = true): string {
  const translatedStr = getText(strName);
  if (get(locale) === "he" && needGender) {
    return textAccordingToGender(translatedStr);
  }
  return translatedStr;
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

export { _ };