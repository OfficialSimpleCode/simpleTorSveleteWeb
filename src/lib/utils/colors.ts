import { defaultThemes } from "$lib/consts/business_design";
import type { BusinessTheme } from "$lib/models/business/business_theme";
import better from "better-color-tools";

export function getTheme(
  themeKey: string,
  themes: Record<string, BusinessTheme>
): BusinessTheme {
  if (Object.keys(defaultThemes).includes(themeKey)) {
    return defaultThemes[themeKey];
  } else {
    return themes[themeKey]!;
  }
}

export function loadColorFromTheme(key: string, theme: BusinessTheme): string {
  let color = theme.toJson()[key].toString(16);
  color = "#" + color.slice(2);
  return color;
}

export function getOklachValues(hex: string): string {
  let color = better.from(hex);
  return `${color.oklchVal[0]} ${color.oklchVal[1]} ${color.oklchVal[2]}`;
}
