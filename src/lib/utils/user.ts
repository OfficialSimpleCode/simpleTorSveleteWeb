import { addedKeyOnPhoneHash, passwordOnPhoneCollection } from "$lib/consts/db";
import { encryptText } from "./encryptions";

export function phoneToDocId(phone: string): string {
  const hashedText = encryptText(
    phone + addedKeyOnPhoneHash,
    passwordOnPhoneCollection
  );

  return hashedText.replace("/", "").replace("*", "").replace(".", "");
}
