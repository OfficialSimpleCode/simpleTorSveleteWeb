import { page } from "$app/stores";
import { logger } from "$lib/consts/application_general";
import { defaultThemes } from "$lib/consts/business_design";
import { BusinessTheme } from "$lib/models/business/business_theme";
import { getOklachValues, loadColorFromTheme } from "$lib/utils/colors";
import { computeLuminance } from "$lib/utils/general_utils";
import { isDark } from "@jill64/svelte-device-theme";
import { get, writable } from "svelte/store";

export let themeStore = writable<BusinessTheme>();

export async function initialTheme(localStorage: Storage, document: Document) {
  //get the landing page theme can be ligtIos or darkIos from the defaultThemes
  const landingPageTheme = localStorage.getItem("landingPageTheme");
  //if the current page is on business
  const onBusiness = get(page).url.pathname.includes("business");

  //chnage the theme if the current page is landing page
  if (!onBusiness) {
    if (landingPageTheme != null) {
      //change the theme by the theme that save on the local storage
      themeStore.set(BusinessTheme.fromJsonStr(landingPageTheme));
    } else {
      //change the theme by the device theme
      themeStore.set(
        get(isDark) ? defaultThemes.darkIos : defaultThemes.lightIos
      );
    }
  }

  // invoke every time theme changes
  themeStore.subscribe((theme) => {
    if (theme != null) {
      if (!theme.onBusiness) {
        //save on the local storage the new theme that picked
        localStorage.setItem("landingPageTheme", theme.toJsonStr());
      }
      //deploy the theme of the documnet obj
      deployTheme(theme, document);
    }
  });
}

export function deployTheme(theme: BusinessTheme, document: Document) {
  try {
    document.documentElement.style.setProperty(
      "--p",
      getOklachValues(loadColorFromTheme("primary", theme))
    );

    document.documentElement.style.setProperty(
      "--b1",
      getOklachValues(loadColorFromTheme("background", theme))
    );

    document.documentElement.style.setProperty(
      "--bc",
      getOklachValues(theme.brightness == 0 ? "#fff" : "#000")
    );

    document.documentElement.style.setProperty(
      "--pc",
      getOklachValues(computeLuminance(theme.primary) > 0.5 ? "#000" : "#fff")
    );

    document.documentElement.style.setProperty(
      "--b2",
      getOklachValues(loadColorFromTheme("surface", theme))
    );

    document.documentElement.style.setProperty(
      "--b3",
      getOklachValues(loadColorFromTheme("tertiary", theme))
    );

    let html: HTMLHtmlElement = document.getElementsByTagName("html")[0];
    html.setAttribute("data-theme", theme.brightness == 0 ? "dark" : "light");
    html.style.setProperty("font-family", theme.fontName);

    // Load theme font
    let head: HTMLHeadElement = document.getElementsByTagName("head")[0];
    let fontLinkElement: HTMLLinkElement = document.createElement("link");
    fontLinkElement.setAttribute("rel", "stylesheet");
    fontLinkElement.setAttribute(
      "href",
      `https://fonts.googleapis.com/css?family=${theme.fontName}`
    );
    head.appendChild(fontLinkElement);
  } catch (e) {
    logger.error("Error while deploy the theme", e);
  }
}
