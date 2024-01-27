import better from "better-color-tools";
import { defaultThemes } from "$lib/consts/business_design";
import type { BusinessTheme } from "$lib/models/business/business_theme";


export function loadColorFromTheme(key: string, themeKey: string, themes: Map<string, BusinessTheme>): string {
    let theme: BusinessTheme;
    if (Object.keys(defaultThemes).includes(themeKey)) {
        theme = defaultThemes[themeKey];
    } else {
        theme = themes.get(themeKey)!;
    }

    let color = theme.toJson()[key].toString(16);
    color = "#" + color.slice(2);
    return color;
}

export function getOklachValues(hex: string): string {
    let color = better.from(hex);
    console.log(color.oklchVal);
    return `${color.oklchVal[0]} ${color.oklchVal[1]} ${color.oklchVal[2]}`;
}