import { Gender } from "$lib/consts/gender";
import ManProfile from "$lib/images/man_profile.svg";
import WomanProfile from "$lib/images/woman_profile.svg";
export function imageByGender(gender: Gender): string {
  return gender == Gender.female ? WomanProfile : ManProfile;
}
