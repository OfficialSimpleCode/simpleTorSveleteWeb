import { addedKeyOnPhoneHash } from "$lib/consts/db";
import Encryptor from "$lib/services/encryption_service/encryptor";

//return the phone as hashed to avoid from the phones to be publiclly exposed
export function phoneToDocId(phone: string): string {
  //make a unique salt to avoid same salt every time from security wise
  const uniqueSalt = phone.substring(3, 7) + addedKeyOnPhoneHash;
  const hashedText = Encryptor.GI().shortHashTextSha256(phone, uniqueSalt);

  return hashedText.replace("/", "").replace("*", "").replace(".", "");
}

//Return the phone as collection without "-" to avoid
//prefix problems in the security rules
export function phoneAsCollection(phone: string): string {
  return phone.replaceAll("-", "");
}
