import pkg from "crypto-js";

const { AES, enc, SHA256 } = pkg;

const iv16len = "qwertyuiiuytrewq"; // Replace this with your actual initialization vector (IV)

export function encryptText(text: string, password: string): string {
  const key = generateKey(password);
  const iv = enc.Utf8.parse(iv16len);
  const encrypted = AES.encrypt(text, key, { iv });
  return encrypted.toString();
}

export function decryptText(encryption: string, password: string): string {
  const key = generateKey(password);
  const iv = enc.Utf8.parse(iv16len);
  const decrypted = AES.decrypt(encryption, key, { iv });
  return decrypted.toString(enc.Utf8);
}

export function generateKey(password: string): CryptoJS.lib.WordArray {
  const textEncoder = new TextEncoder();
  let preKey = "htr;lmn;rkmnkryemnkrmnbavsdbshtg6437";
  preKey = textEncoder
    .encode(password + preKey)
    .toString()
    .replaceAll(" ", "")
    .replaceAll(",", "")
    .replaceAll("[", "")
    .replaceAll("]", "")
    .substring(0, 32);

  // preKey = SHA256(password + preKey)
  //   .toString(enc.Hex)
  //   .substring(0, 32);

  return enc.Utf8.parse(preKey);
}

// export function hashText(text: string, salt: string = "simpleCode"): string {
//   if (text === "") {
//     return "";
//   }
//   return SHA256(text + salt).toString(enc.Base64url);
// }

// export function hashId({ id }: { id: string }): string {
//   if (id.length < 7) {
//     return "";
//   }
//   const salt = id.substring(3, 6); // unic salt prevent pre-hash attack
//   const hashValue = crypto
//     .createHash("sha256")
//     .update(id + salt)
//     .digest("hex");
//   const hashBytes = enc.Hex.parse(hashValue.toString());
//   return hashBytes.toString(enc.Hex).substring(0, 10).replace(/[/.*]/g, "");
// }
