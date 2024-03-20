import { defaultThemes } from "$lib/consts/business_design";
import BusinessInitializer from "$lib/initializers/business_initializer";
import {
  Brightness,
  type BusinessTheme,
} from "$lib/models/business/business_theme";

export default class ThemeHelper {
  private static readonly _singleton: ThemeHelper = new ThemeHelper();

  private constructor() {}

  public static GI(): ThemeHelper {
    return ThemeHelper._singleton;
  }

  public defaultTheme: string = "darkIos";
  public currentKeyTheme: string | null = null;
  public currentThemes: Record<string, BusinessTheme> = { ...defaultThemes };

  public currentBusinessTheme: BusinessTheme | null = null;

  public async changeTheme(
    theme: string,
    {
      needOverlayHandling = true,
      ovveride = false,
      needWaitOverlay = false,
    }: {
      needOverlayHandling?: boolean;
      ovveride?: boolean;
      needWaitOverlay?: boolean;
    } = {}
  ): Promise<boolean> {
    const newTheme = this.currentThemes[theme];

    if (
      newTheme == null ||
      this.currentBusinessTheme == null ||
      !newTheme.isEqual(this.currentBusinessTheme!) ||
      ovveride
    ) {
      switch (this.currentThemes[theme]?.brightness) {
        case Brightness.light:
          BusinessInitializer.GI().businessIcon = "darkShopIcon";
          break;
        case Brightness.dark:
          BusinessInitializer.GI().businessIcon = "lightShopIcon";
          break;
        default:
          BusinessInitializer.GI().businessIcon = "lightShopIcon";
          break;
      }

      this.currentKeyTheme = theme;
      if (this.currentThemes.hasOwnProperty(theme)) {
        this.currentBusinessTheme = this.currentThemes[theme]!;
      }

      //UiManager.insertUpdate(Providers.theme);
      return true;
    }
    return false;
  }
}
