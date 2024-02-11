import pkg from "crypto-js";
const { AES, enc, SHA256 } = pkg;

const iv16len: string = "qwertyuiiuytrewq";

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
  let preKey = "htr;lmn;rkmnkryemnkrmnbavsdbshtg6437";
  preKey = SHA256(password + preKey)
    .toString(enc.Hex)
    .substring(0, 32);
  return enc.Utf8.parse(preKey);
}

export function hashText(text: string, salt: string = "simpleCode"): string {
  if (text === "") {
    return "";
  }
  return SHA256(text + salt).toString(enc.Hex);
}

export function hashId({ id }: { id: string }): string {
  if (id.length < 7) {
    return "";
  }
  const salt = id.substring(3, 6); // unic salt prevent pre-hash attack
  const hashValue = SHA256(id + salt).toString(enc.Hex);
  const hashBytes = enc.Hex.parse(hashValue.toString());
  return hashBytes.toString(enc.Hex).substring(0, 10).replace(/[/.*]/g, "");
}

export function isVerifiedPasswordForHash({
  hash,
  password,
}: {
  hash: string;
  password: string;
}): boolean {
  const passwordHash = SHA256(password + "simpleCode").toString(enc.Hex);
  return passwordHash === hash;
}

export function shortHashText({
  text,
  salt = "a",
}: {
  text: string;
  salt?: string;
}): string {
  if (text === "") {
    return "";
  }
  return SHA256(text + salt).toString(enc.Hex);
}

export function generateNonce(length = 32): string {
  const charset =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._";
  let nonce = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    nonce += charset[randomIndex];
  }
  return nonce;
}

export function sha256ofString(input: string): string {
  const bytes = enc.Utf8.parse(input);
  const digest = SHA256(bytes);
  return digest.toString(enc.Hex);
}
