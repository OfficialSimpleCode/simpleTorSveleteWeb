import { addedKeyOnPhoneHash, passwordOnPhoneCollection } from "$lib/consts/db";

export function phoneToDocId(phone: string): string {
  const hashedText = encryptText({
    text: phone + addedKeyOnPhoneHash,
    password: passwordOnPhoneCollection,
  });

  return hashedText.replace("/", "").replace("*", "").replace(".", "");
}
