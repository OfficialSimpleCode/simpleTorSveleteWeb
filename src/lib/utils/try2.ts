import * as crypto from "crypto";

export function encrypt1(data: string, password: string): string {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, salt, 32);
  console.log("aaaaa  ", key.buffer);

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${salt.toString("hex")}:${iv.toString("hex")}:${encrypted}`;
}

export function decrypt1(encryptedData: string, password: string): string {
  const [saltHex, ivHex, encrypted] = encryptedData.split(":");
  const salt = Buffer.from(saltHex, "hex");
  const iv = Buffer.from(ivHex, "hex");
  const key = crypto.scryptSync(password, salt, 32);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
// 1fe919c3ad41e0316a1ffc5cbdabfe0e:672e4537dabf8cd2a9809bdaf4d6b584:45e34769c143f17aaed967603b0619f5
// f902066c4b893774b31ec98259997fa5:740c8d4f042d0418a6f77f00a7379df0:a7b835a58aa2f827caf079db7778daae
