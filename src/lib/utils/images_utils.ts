import { Gender, genderToImage } from "$lib/consts/gender";
import defaultIconDak from "$lib/images/default_icon_dark.webp";
import defaultIconLight from "$lib/images/default_icon_light.webp";
import { computeLuminance } from "$lib/utils/general_utils";

export function imageByGender(gender: Gender): string {
  return genderToImage[gender];
}

export function getDefaultLogo(background: number | undefined) {
  if (background == null) {
    return defaultIconLight;
  }
  return computeLuminance(background) > 0.5 ? defaultIconDak : defaultIconLight;
}
