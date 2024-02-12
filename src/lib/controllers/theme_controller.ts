import { BusinessTheme } from "$lib/models/business/business_theme";
import { getOklachValues, loadColorFromTheme } from "$lib/utils/colors";
import { computeLuminance } from "$lib/utils/general_utils";
import { get, writable } from "svelte/store";

export let themeStore = writable<BusinessTheme>();

export async function initialTheme(localStorage: Storage, document: Document) {
  const localTheme = localStorage.getItem("businessTheme");
  //get the local theme
  console.log("localTheme", localTheme);
  if (get(themeStore) == null && localTheme != null) {
    themeStore.set(BusinessTheme.fromJsonStr(localTheme));
  }

  themeStore.subscribe((theme) => {
    localStorage.setItem("businessTheme", theme.toJsonStr());
    deployTheme(theme, document);
  });
}

export function deployTheme(theme: BusinessTheme, document: Document) {
  // let themeKey: string = $businessStore.design.pickedThemeKey;
  // let themes = $businessStore.design.businessThemes;
  // let theme = getTheme(themeKey, themes);
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
}
