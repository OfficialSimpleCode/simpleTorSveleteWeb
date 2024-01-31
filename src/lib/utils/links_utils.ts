import { isAppleUser } from "$lib/consts/platform";

export function downloadSimpleTor(dynamicLink: string = "") {
  // Check if dynamicLink is empty
  if (dynamicLink) {
    window.open(dynamicLink, "_blank");
  } else {
    // Define the links
    const iosLink = "itms-apps://itunes.apple.com/app/id6444347892";
    const androidLink =
      "market://details?id=com.simpletor.management_system_app";
    const webLink =
      "https://play.google.com/store/apps/details?id=com.simpletor.management_system_app";

    // Choose the appropriate link based on the platform
    const storeLink = isAppleUser() ? iosLink : androidLink;

    // If it's neither iOS nor Android, assume it's a web link
    const finalLink = isAppleUser() || dynamicLink ? storeLink : webLink;

    window.open(finalLink, "_blank");
  }
}
