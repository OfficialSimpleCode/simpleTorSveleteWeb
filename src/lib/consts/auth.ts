import Apple from "$lib/images/apple.svg";
import Facebook from "$lib/images/facebook.svg";
import Google from "$lib/images/google.svg";

export enum AuthProvider {
  Apple,
  Google,
  Facebook,
  Phone,
}

export const authProviderToStr: Record<AuthProvider, string> = {
  [AuthProvider.Apple]: "Apple",
  [AuthProvider.Google]: "Google",
  [AuthProvider.Facebook]: "Facebook",
  [AuthProvider.Phone]: "phone",
};

export const appleOrder: AuthProvider[] = [
  AuthProvider.Apple,
  AuthProvider.Facebook,
  AuthProvider.Google,
  AuthProvider.Phone,
];

export const googleOrder: AuthProvider[] = [
  AuthProvider.Google,
  AuthProvider.Facebook,
  AuthProvider.Apple,
  AuthProvider.Phone,
];

export const authProviderFromStr: Record<string, AuthProvider> = {
  Apple: AuthProvider.Apple,
  Google: AuthProvider.Google,
  Facebook: AuthProvider.Facebook,
  phone: AuthProvider.Phone,
};

export const authProviderToImage: Record<AuthProvider, string> = {
  [AuthProvider.Apple]: Apple,
  [AuthProvider.Google]: Google,
  [AuthProvider.Facebook]: Facebook,
  [AuthProvider.Phone]: "phone",
};

export const authProviderToProviderId: Record<AuthProvider, string> = {
  [AuthProvider.Apple]: "apple.com",
  [AuthProvider.Google]: "google.com",
  [AuthProvider.Facebook]: "facebook.com",
  [AuthProvider.Phone]: "phone",
};

export const providerIdToProvider: Record<string, AuthProvider> = {
  "apple.com": AuthProvider.Apple,
  "google.com": AuthProvider.Google,
  "facebook.com": AuthProvider.Facebook,
  phone: AuthProvider.Phone,
};
