import better from "better-color-tools";
import { defaultThemes } from "$lib/consts/business_design";
import type { BusinessTheme } from "$lib/models/business/business_theme";


export function getTheme(themeKey: string, themes: Map<string, BusinessTheme>): BusinessTheme {
    if (Object.keys(defaultThemes).includes(themeKey)) {
        return defaultThemes[themeKey];
    } else {
        return themes.get(themeKey)!;
    }
}

export function loadColorFromTheme(key: string, themeKey: string, themes: Map<string, BusinessTheme>): string {
    let theme = getTheme(themeKey, themes);

    let color = theme.toJson()[key].toString(16);
    color = "#" + color.slice(2);
    return color;
}

export function getOklachValues(hex: string): string {
    let color = better.from(hex);
    return `${color.oklchVal[0]} ${color.oklchVal[1]} ${color.oklchVal[2]}`;
}