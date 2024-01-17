export class BusinessTheme {
    background: number = 0;
    primary: number = 0;
    surface: number = 0;
    inverseSurface: number = 0;
    tertiary: number = 0;
    id: string = "";
    fontName: string = "";
    themeName: string = "";
  
    constructor({
      background = 0,
      primary = 0,
      surface = 0,
      inverseSurface = 0,
      tertiary = 0,
      id,
      fontName = "",
      themeName = "",
    }: {
      background?: number;
      primary?: number;
      surface?: number;
      inverseSurface?: number;
      tertiary?: number;
      id: string;
      fontName?: string;
      themeName?: string;
    }) {
      this.background = background;
      this.primary = primary;
      this.surface = surface;
      this.inverseSurface = inverseSurface;
      this.tertiary = tertiary;
      this.id = id;
      this.fontName = fontName;
      this.themeName = themeName;
    }
  
    static fromJson(json: any, newId: string): BusinessTheme {
      return new BusinessTheme({
        background: json["background"] || 0,
        primary: json["primary"] || 0,
        id: newId,
        themeName: json["themeName"] || "",
        surface: json["surface"] || 0,
        tertiary: json["tertiary"] || 0,
        inverseSurface: json["inverseSurface"] || 0,
        fontName: json["fontName"] || "",
      });
    }
  
    static fromBusinessTheme(other: BusinessTheme): BusinessTheme {
      return new BusinessTheme({
        themeName: other.themeName,
        background: other.background,
        primary: other.primary,
        tertiary: other.tertiary,
        id: other.id,
        surface: other.surface,
        inverseSurface: other.inverseSurface,
        fontName: other.fontName,
      });
    }
  
    isEqual(theme: BusinessTheme, withId: boolean = true): boolean {
      const jsonA = theme.toJson();
      if (withId) {
        jsonA["id"] = theme.id;
      }
  
      const jsonB = this.toJson();
      if (withId) {
        jsonB["id"] = this.id;
      }
  
      // Deep equality check
      return JSON.stringify(jsonA) === JSON.stringify(jsonB);
    }
  
    // get brightness(): string {
    //   return this.computeLuminance(this.background) < 0.5
    //     ? "Brightness.dark"
    //     : "Brightness.light";
    // }
  
    
  
    toJson():  Record<string, any> {
      const data:  Record<string, any> = {};
      if (this.fontName !== "") {
        data["fontName"] = this.fontName;
      }
  
      if (this.surface !== 0) {
        data["surface"] = this.surface;
      }
  
      if (this.inverseSurface !== 0) {
        data["inverseSurface"] = this.inverseSurface;
      }
  
      data["tertiary"] = this.tertiary;
  
      data["themeName"] = this.themeName;
  
      if (this.background !== 0) {
        data["background"] = this.background;
      }
      if (this.primary !== 0) {
        data["primary"] = this.primary;
      }
  
      return data;
    }
  }
  