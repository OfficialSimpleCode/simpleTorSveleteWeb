const iv16len = "16charactersiv!"; // Replace this with your actual initialization vector (IV)

function encryptText({
  text,
  password,
}: {
  text: string;
  password: string;
}): string {
  const key = generateKey(password);
  const iv = enc.Utf8.parse(iv16len);

  const encrypted = AES.encrypt(text, key, { iv });
  return encrypted.toString();
}

function decryptText({
  encryption,
  password,
}: {
  encryption: string;
  password: string;
}): string {
  const key = generateKey(password);
  const iv = enc.Utf8.parse(iv16len);

  const decrypted = AES.decrypt(encryption, key, { iv });
  return decrypted.toString(enc.Utf8);
}

function generateKey(password: string): enc.WordArray {
  let preKey = "htr;lmn;rkmnkryemnkrmnbavsdbshtg6437";
  preKey = SHA256(password + preKey)
    .toString(enc.Hex)
    .substring(0, 32);

  return enc.Utf8.parse(preKey);
}

function hashText({
  text,
  salt = "simpleCode",
}: {
  text: string;
  salt?: string;
}): string {
  if (text === "") {
    return "";
  }
  return SHA256(text + salt, 5000).toString(enc.Hex);
}

function hashId({ id }: { id: string }): string {
  if (id.length < 7) {
    return "";
  }

  const salt = id.substring(3, 6);
  const hashValue = SHA256(id + salt, 5000).toString(enc.Hex);

  return hashValue
    .substring(0, Math.min(10, hashValue.length))
    .replace(/[/.*]/g, "");
}

function isVerifiedPasswordForHash({
  hash,
  password,
}: {
  hash: string;
  password: string;
}): boolean {
  const passwordHash = SHA256(password + "simpleCode", 5000).toString(enc.Hex);
  return passwordHash === hash;
}

function shortHashText({
  text,
  salt = "a",
}: {
  text: string;
  salt?: string;
}): string {
  if (text === "") {
    return "";
  }
  return SHA256(text + salt, 1).toString(enc.Hex);
}

function generateNonce(length = 32): string {
  const charset =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._";
  let nonce = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    nonce += charset[randomIndex];
  }
  return nonce;
}

function sha256ofString(input: string): string {
  const bytes = enc.Utf8.parse(input);
  const digest = SHA256(bytes);
  return digest.toString(enc.Hex);
}
