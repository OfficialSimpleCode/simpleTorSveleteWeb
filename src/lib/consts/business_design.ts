enum Arrangement {
    Grid,
    Carousel,
    EndlessCarousel,
  }
  
  const arrangementToStr: { [key in Arrangement]: string } = {
    [Arrangement.Grid]: 'grid',
    [Arrangement.Carousel]: 'carousel',
    [Arrangement.EndlessCarousel]: 'endlessCarousel',
  };
  
  const arrangementFromStr: { [key: string]: Arrangement } = {
    'grid': Arrangement.Grid,
    'carousel': Arrangement.Carousel,
    'endlessCarousel': Arrangement.EndlessCarousel,
  };
  


  const defaultThemes: { [key: string]: BusinessTheme } = {
    "dark": new BusinessTheme({
      fontName: 'Varela Round',
      themeName: "Original",
      id: "dark",
      inverseSurface: 0xFF16161C,
      background: 0xFF1F1F29,
      surface: 0xff262631,
      tertiary: 0xFF191924,
      primary: 0xFFFF9800,
    }),
    "darkIos": new BusinessTheme({
      fontName: 'Varela Round',
      themeName: "Dark",
      id: "darkIos",
      inverseSurface: 0xFF2C2C2E,
      background: 0xFF161618,
      surface: 0xff212124,
      tertiary: 0xFF000000,
      primary: 0xFF0088cc,
    }),
    "light": new BusinessTheme({
      fontName: 'Varela Round',
      themeName: "Pink",
      id: "light",
      inverseSurface: 0xFFFDEEF3,
      background: 0xffF6F6F6,
      surface: 0xffFFFFFF,
      tertiary: 0xffF4F3F3,
      primary: 0xFFFF87B2,
    }),
    "lightIos": new BusinessTheme({
      fontName: 'Varela Round',
      themeName: "Light",
      id: "lightIos",
      inverseSurface: 0xFFDCDCDD,
      background: 0xffF2F2F7,
      surface: 0xffFFFFFF,
      tertiary: 0xFFE6E6E7,
      primary: 0xFF007AFF,
    }),
  };
  