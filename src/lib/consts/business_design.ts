import { BusinessTheme } from "$lib/models/business/business_theme";

export enum Arrangement {
  Grid,
  Carousel,
  EndlessCarousel,
}

export const arrangementToStr: { [key in Arrangement]: string } = {
  [Arrangement.Grid]: "grid",
  [Arrangement.Carousel]: "carousel",
  [Arrangement.EndlessCarousel]: "endlessCarousel",
};

export const arrangementFromStr: { [key: string]: Arrangement } = {
  grid: Arrangement.Grid,
  carousel: Arrangement.Carousel,
  endlessCarousel: Arrangement.EndlessCarousel,
};

export const defaultThemes: Record<string, BusinessTheme> = {
  dark: new BusinessTheme({
    fontName: "Varela Round",
    themeName: "Original",
    id: "dark",
    inverseSurface: 0xff16161c,
    background: 0xff1f1f29,
    surface: 0xff262631,
    tertiary: 0xff191924,
    primary: 0xffff9800,
  }),
  darkIos: new BusinessTheme({
    fontName: "Varela Round",
    themeName: "Dark",
    id: "darkIos",
    inverseSurface: 0xff2c2c2e,
    background: 0xff161618,
    surface: 0xff212124,
    tertiary: 0xff000000,
    primary: 0xff0088cc,
  }),
  light: new BusinessTheme({
    fontName: "Varela Round",
    themeName: "Pink",
    id: "light",
    inverseSurface: 0xfffdeef3,
    background: 0xfff6f6f6,
    surface: 0xffffffff,
    tertiary: 0xfff4f3f3,
    primary: 0xffff87b2,
  }),
  lightIos: new BusinessTheme({
    fontName: "Varela Round",
    themeName: "Light",
    id: "lightIos",
    inverseSurface: 0xffdcdcdd,
    background: 0xfff2f2f7,
    surface: 0xffffffff,
    tertiary: 0xffe6e6e7,
    primary: 0xff007aff,
  }),
};
