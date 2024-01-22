import { Errors } from "../messages";
import "../messages.dart";

const verificationErrors = {
  "operation-not-allowed": Errors.providerNotAllowed,
  "user-disabled": Errors.userDisable,
  "provider-already-linked": Errors.providerAlreadyLinked,
  "credential-already-in-use": Errors.credentialAlreadyInUse,
  "invalid-verification-code": Errors.wrongOptCode,
  "invalid-verification-id": Errors.verification,
  "invalid-credential": Errors.invalidCredential,
  "user-mismatch": Errors.userMissmatch,
  "user-not-found": Errors.userNotFound,
  "no-such-provider": Errors.noSuchProvider,
  canceled: Errors.userExitManually,
  "too-many-requests": Errors.tooManyAttempts,
  "too-many-attempts": Errors.tooManyAttempts,
  "expired-code": Errors.expiredCode,
  "account-exists-with-different-credential": Errors.credentialAlreadyInUse,
  "invalid-phone-number": Errors.invalidPhoneNumber,
};
