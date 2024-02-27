import {
  createCipheriv,
  createDecipheriv,
  pbkdf2Sync,
  randomBytes,
} from "crypto";

export function encrypt2(data: string, password: string): string {
  const salt = randomBytes(16);
  const key = pbkdf2Sync(password, salt, 1000, 32, "sha256");
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  const result =
    iv.toString("hex") + ":" + salt.toString("hex") + ":" + encrypted;
  return result;
}

export function decrypt2(encryptedData: string, password: string): string {
  const parts = encryptedData.split(":");
  const iv = Buffer.from(parts.shift()!, "hex");
  const salt = Buffer.from(parts.shift()!, "hex");
  const encrypted = parts.join(":");
  console.log("qqqqqqqqq ", encryptedData);
  console.log("qqqqqqqqq ", parts);
  console.log("qqqqqqqqq ", encrypted);
  const key = pbkdf2Sync(password, salt, 1000, 32, "sha256");
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
