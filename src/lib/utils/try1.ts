import pkg from "crypto-js";

const { SHA256, PBKDF2, lib, mode, pad, enc, AES } = pkg;

export function hashText1(text: string, salt: string): string {
  return SHA256(salt + text).toString();
}

export function encrypt(data: string, key: string): string {
  const salt = "salt";
  const derivedKey = PBKDF2(key, salt, { keySize: 256 / 32 });
  console.log("derive key ", derivedKey);

  const iv = lib.WordArray.create(derivedKey.words.slice(0, 4)); // Convert to WordArray
  const encrypted = AES.encrypt(data, derivedKey, {
    iv: iv,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });
  return encrypted.toString();
}

export function decrypt(encryptedData: string, key: string): string {
  const salt = "salt";
  const derivedKey = PBKDF2(key, salt, { keySize: 256 / 32 });
  const iv = lib.WordArray.create(derivedKey.words.slice(0, 4)); // Convert to WordArray
  const decrypted = AES.decrypt(encryptedData, derivedKey, {
    iv: iv,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });
  return decrypted.toString(enc.Utf8);
}
