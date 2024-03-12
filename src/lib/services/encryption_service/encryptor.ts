// import {
//   createCipheriv,
//   createDecipheriv,
//   pbkdf2Sync,
//   randomBytes,
// } from "crypto";
import { logger } from "$lib/consts/application_general";
import AppErrorsHelper from "$lib/helpers/app_errors";
import pkg from "crypto-js";
import { Errors } from "../errors/messages";
const { SHA256 } = pkg;

export default class Encryptor {
  private static _singleton: Encryptor = new Encryptor();

  private constructor() {}

  // Singleton pattern to ensure only one instance of Encryptor is created
  public static GI(): Encryptor {
    return Encryptor._singleton;
  }

  // Computes the SHA-256 hash of a text concatenated with a salt
  hashTextSha256(text: string, salt: string): string | undefined {
    try {
      return SHA256(salt + text).toString(); // Concatenate salt and text, then compute the SHA256 hash and return as a string
    } catch (e) {
      AppErrorsHelper.GI().error = Errors.encryptionFailed;
      logger.error("Error while hashTextSha256 -> $e");
      return undefined;
    }
  }

  // Computes a short SHA-256 hash of a text concatenated with a salt
  shortHashTextSha256(text: string, salt: string): string | undefined {
    try {
      const hashedText = this.hashTextSha256(text, salt);
      if (hashedText == null) {
        return undefined;
      }
      // Compute the full SHA256 hash and return the first 32 characters
      return hashedText.substring(0, Math.min(32, hashedText.length));
    } catch (e) {
      AppErrorsHelper.GI().error = Errors.encryptionFailed;
      logger.error("Error while shortHashTextSha256 -> $e");
      return undefined;
    }
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
    return computedHash == hashText && computedHash != null; // Compare computed hash with provided hashText
  }

  //   // Encrypts data using AES-256-CBC algorithm
  //   encrypt(data: string, password: string): string {
  //     // Generate a random salt
  //     const salt = randomBytes(16);
  //     // Derive a key using PBKDF2 with 1000 iterations, a key length of 32 bytes, and SHA-256
  //     const key = pbkdf2Sync(password, salt, 1000, 32, "sha256");
  //     // Generate a random initialization vector (IV)
  //     const iv = randomBytes(16);
  //     // Create a cipher using AES-256-CBC algorithm with the derived key and IV
  //     const cipher = createCipheriv("aes-256-cbc", key, iv);
  //     // Encrypt the data
  //     let encrypted = cipher.update(data, "utf8", "hex");
  //     encrypted += cipher.final("hex");
  //     // Combine IV, salt, and encrypted data into a single string separated by colons
  //     const result =
  //       iv.toString("hex") + ":" + salt.toString("hex") + ":" + encrypted;
  //     return result;
  //   }

  //   // Decrypts data encrypted with AES-256-CBC algorithm
  //   decrypt(encryptedData: string, password: string): string {
  //     // Split the encrypted data into IV, salt, and encrypted parts
  //     const parts = encryptedData.split(":");
  //     const iv = Buffer.from(parts.shift()!, "hex");
  //     const salt = Buffer.from(parts.shift()!, "hex");
  //     const encrypted = parts.join(":");
  //     // Derive a key using PBKDF2 with the provided password and salt
  //     const key = pbkdf2Sync(password, salt, 1000, 32, "sha256");
  //     // Create a decipher using AES-256-CBC algorithm with the derived key and IV
  //     const decipher = createDecipheriv("aes-256-cbc", key, iv);
  //     // Decrypt the data
  //     let decrypted = decipher.update(encrypted, "hex", "utf8");
  //     decrypted += decipher.final("utf8");
  //     return decrypted;
  //   }

  async encryptBrowser(
    data: string,
    password: string
  ): Promise<string | undefined> {
    try {
      // Convert the password to a key using PBKDF2
      const enc = new TextEncoder();
      const passwordBuffer = enc.encode(password);
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        passwordBuffer,
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
      );
      const key = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt,
          iterations: 1000,
          hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-CBC", length: 256 },
        true,
        ["encrypt"]
      );

      // Generate a random IV
      const iv = crypto.getRandomValues(new Uint8Array(16));

      // Encrypt the data
      const encData = enc.encode(data);
      const encrypted = await crypto.subtle.encrypt(
        {
          name: "AES-CBC",
          iv,
        },
        key,
        encData
      );

      // Combine IV, salt, and encrypted data into a single string separated by colons
      const result =
        Array.from(new Uint8Array(iv))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("") +
        ":" +
        Array.from(new Uint8Array(salt))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("") +
        ":" +
        Array.from(new Uint8Array(encrypted))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

      return result;
    } catch (e) {
      AppErrorsHelper.GI().error = Errors.encryptionFailed;
      logger.error("Error while encryptBrowser -> $e");
      return undefined;
    }
  }

  async decryptBrowser(
    encryptedData: string,
    password: string
  ): Promise<string | undefined> {
    try {
      // Split the encrypted data into IV, salt, and encrypted parts
      const parts = encryptedData.split(":");
      const iv = this.hexToUint8Array(parts.shift()!);
      const salt = this.hexToUint8Array(parts.shift()!);
      const encrypted = this.hexToUint8Array(parts.join(":"));

      // Convert the password to a key using PBKDF2
      const enc = new TextEncoder();
      const passwordBuffer = enc.encode(password);
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        passwordBuffer,
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
      );
      const key = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt,
          iterations: 1000,
          hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-CBC", length: 256 },
        true,
        ["decrypt"]
      );

      // Decrypt the data
      const decrypted = await crypto.subtle.decrypt(
        {
          name: "AES-CBC",
          iv,
        },
        key,
        encrypted
      );

      // Convert the decrypted data to a string
      const dec = new TextDecoder();
      return dec.decode(decrypted);
    } catch (e) {
      AppErrorsHelper.GI().error = Errors.encryptionFailed;
      logger.error("Error while decryptBrowser -> $e");
      return undefined;
    }
  }

  hexToUint8Array(hexString: string): Uint8Array {
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
      bytes.push(parseInt(hexString.substr(i, 2), 16));
    }
    return new Uint8Array(bytes);
  }
}
