import { androidLink, iosLink, webLink } from "$lib/consts/app_external_links";
import { isAppleUser } from "$lib/consts/platform";

export function getDownloadingAppLink(dynamicLink: string = "") {
  // Check if dynamicLink is empty
  if (dynamicLink !== "") {
    return dynamicLink;
  } else {
    // Choose the appropriate link based on the platform
    const storeLink = isAppleUser() ? iosLink : androidLink;

    // If it's neither iOS nor Android, assume it's a web link
    const finalLink = isAppleUser() || dynamicLink ? storeLink : webLink;
    return finalLink;
  }
}
