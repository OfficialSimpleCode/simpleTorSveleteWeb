import {
  createCipheriv,
  createDecipheriv,
  pbkdf2Sync,
  randomBytes,
} from "crypto";
import pkg from "crypto-js";
const { SHA256 } = pkg;

export default class Encryptor {
  private static _singleton: Encryptor = new Encryptor();

  private constructor() {}

  // Singleton pattern to ensure only one instance of Encryptor is created
  public static GI(): Encryptor {
    return Encryptor._singleton;
  }

  // Computes the SHA-256 hash of a text concatenated with a salt
  hashTextSha256(text: string, salt: string): string {
    return SHA256(salt + text).toString(); // Concatenate salt and text, then compute the SHA256 hash and return as a string
  }

  // Computes a short SHA-256 hash of a text concatenated with a salt
  shortHashTextSha256(text: string, salt: string): string {
    const hashedText = this.hashTextSha256(text, salt);
    // Compute the full SHA256 hash and return the first 32 characters
    return hashedText.substring(0, Math.min(32, hashedText.length));
  }

  // Verifies if a given text matches a hash value when hashed with a specific salt
  verifyTextWithHash(
    text: string,
    hashText: string,
    salt: string,
    shortHash: boolean = false
  ): boolean {
    var computedHash = shortHash
      ? this.shortHashTextSha256(text, salt) // Compute short hash if shortHash is true
      : this.hashTextSha256(text, salt); // Otherwise, compute full hash
    return computedHash == hashText; // Compare computed hash with provided hashText
  }

  // Encrypts data using AES-256-CBC algorithm
  encrypt(data: string, password: string): string {
    // Generate a random salt
    const salt = randomBytes(16);
    // Derive a key using PBKDF2 with 1000 iterations, a key length of 32 bytes, and SHA-256
    const key = pbkdf2Sync(password, salt, 1000, 32, "sha256");
    // Generate a random initialization vector (IV)
    const iv = randomBytes(16);
    // Create a cipher using AES-256-CBC algorithm with the derived key and IV
    const cipher = createCipheriv("aes-256-cbc", key, iv);
    // Encrypt the data
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    // Combine IV, salt, and encrypted data into a single string separated by colons
    const result =
      iv.toString("hex") + ":" + salt.toString("hex") + ":" + encrypted;
    return result;
  }

  // Decrypts data encrypted with AES-256-CBC algorithm
  decrypt(encryptedData: string, password: string): string {
    // Split the encrypted data into IV, salt, and encrypted parts
    const parts = encryptedData.split(":");
    const iv = Buffer.from(parts.shift()!, "hex");
    const salt = Buffer.from(parts.shift()!, "hex");
    const encrypted = parts.join(":");
    // Derive a key using PBKDF2 with the provided password and salt
    const key = pbkdf2Sync(password, salt, 1000, 32, "sha256");
    // Create a decipher using AES-256-CBC algorithm with the derived key and IV
    const decipher = createDecipheriv("aes-256-cbc", key, iv);
    // Decrypt the data
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
}
