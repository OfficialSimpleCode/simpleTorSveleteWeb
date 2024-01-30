import { Gender } from "$lib/consts/gender";
import DarkLogo from "$lib/images/logo_dark.webp";
import LightLogo from "$lib/images/logo_light.webp";
import ManProfile from "$lib/images/man_profile.webp";
import WomanProfile from "$lib/images/woman_profile.webp";
export function imageByGender(gender: Gender): string {
  return gender == Gender.female ? WomanProfile : ManProfile;
}

export function logoByBackground(): string {
  return true ? DarkLogo : LightLogo;
}
