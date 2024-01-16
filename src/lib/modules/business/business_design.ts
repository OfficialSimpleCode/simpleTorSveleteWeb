import IconData from "../general/icon_data";

export class BusinessDesign {
    storyView: Arrangement = Arrangement.Grid;
    productView: Arrangement = Arrangement.Grid;
    changingImages: string[] = [];
    products: Record<string, ProductModel> = {};
    updates: Record<string, Update> = {};
    storyTitle: string = '';
    shopIconUrl: string = '';
    productsTitle: string = '';
    bottomIcons: boolean = false;
    changingImagesSwapSeconds: number = 6;
    pickedThemeKey: string = 'darkIos';
    lastTimeToUpdateTerm: Date = new Date(0);
    businessThemes: Record<string, BusinessTheme> = {};
    term: string = '';
    mustConfirmTerm: boolean = false;
    popTermOnFirstEneter: boolean = false;
    isPrivateTheme: boolean = false;
  
    constructor({
      changingImagesSwapSeconds = 6,
      shopIconUrl = '',
      pickedThemeKey = 'darkIos',
    }: {
      changingImagesSwapSeconds?: number;
      shopIconUrl?: string;
      pickedThemeKey?: string;
    } = {}) {
      this.changingImagesSwapSeconds = changingImagesSwapSeconds;
      this.shopIconUrl = shopIconUrl;
      this.pickedThemeKey = pickedThemeKey;
    }
  
    fromJson(json: Record<string, any>): void {
      json.products.forEach((productId: string, product: any) => {
        this.products[productId] = ProductModel.fromJson(product, productId);
      });
  
      if (json.changingImages) {
        this.changingImages = json.changingImages.map((item: string) => item);
      }
  
      if (json.updates) {
        Object.entries(json.updates).forEach(([updateId, updateJson]: [string, any]) => {
          this.updates[updateId] = Update.fromJson(updateJson, updateId);
        });
      }
  
      if (json.storyView) {
        this.storyView = arrangementFromStr[json.storyView] || Arrangement.EndlessCarousel;
      }
  
      if (json.productView) {
        this.productView = arrangementFromStr[json.productView] || Arrangement.Grid;
      }
  
      if (json.businessThemes) {
        Object.entries(json.businessThemes).forEach(([themeKey, businessThemeJson]: [string, any]) => {
          this.businessThemes[themeKey] = BusinessTheme.fromJson(businessThemeJson, themeKey);
        });
      }
  
      if (json.lastTimeToUpdateTerm) {
        this.lastTimeToUpdateTerm = new Date(json.lastTimeToUpdateTerm) || new Date(0);
      }
  
      this.pickedThemeKey = json.pickedThemeKey || 'darkIoss';
      this.term = json.term || '';
      this.bottomIcons = json.bottomIcons || false;
      this.changingImagesSwapSeconds = json.changingImagesSwapSeconds || 6;
      this.productsTitle = json.productsTitle || '';
      this.storyTitle = json.storyTitle || '';
      this.shopIconUrl = json.shopIcon || '';
      this.mustConfirmTerm = json.mustConfirmTerm || false;
      this.popTermOnFirstEneter = json.popTermOnFirstEneter || false;
      this.isPrivateTheme = json.isPrivateTheme || false;
    }
  
    fromAlgoliaJson(json: Record<string, any>): void {
      if (json.changingImages) {
        this.changingImages = json.changingImages.map((item: string) => item);
      }
  
      if (json.updates) {
        Object.entries(json.updates).forEach(([updateId, updateJson]: [string, any]) => {
          this.updates[updateId] = Update.fromJson(updateJson, updateId);
        });
      }
  
      if (json.storyView) {
        this.storyView = arrangementFromStr[json.storyView] || Arrangement.EndlessCarousel;
      }
  
      if (json.productView) {
        this.productView = arrangementFromStr[json.productView] || Arrangement.Grid;
      }
  
      if (json.businessThemes) {
        Object.entries(json.businessThemes).forEach(([themeKey, businessThemeJson]: [string, any]) => {
          this.businessThemes[themeKey] = BusinessTheme.fromJson(businessThemeJson, themeKey);
        });
      }
  
      if (json.lastTimeToUpdateTerm) {
        this.lastTimeToUpdateTerm = new Date(json.lastTimeToUpdateTerm) || new Date(0);
      }
  
      this.pickedThemeKey = json.pickedThemeKey || 'darkIos';
      this.term = json.term || '';
      this.bottomIcons = json.bottomIcons || false;
      this.changingImagesSwapSeconds = json.changingImagesSwapSeconds || 6;
      this.productsTitle = json.productsTitle || '';
      this.storyTitle = json.storyTitle || '';
      this.shopIconUrl = json.shopIcon || '';
      this.mustConfirmTerm = json.mustConfirmTerm || false;
      this.popTermOnFirstEneter = json.popTermOnFirstEneter || false;
      this.isPrivateTheme = json.isPrivateTheme || false;
    }
  
    // get pickedTheme(): BusinessTheme {
    //   return ThemeHelper().currentThemes[this.pickedThemeKey] || defaultThemes;
    // }
  
    get shopIconData(): IconData {
      return  IconData.fromShopIconUrl(this.shopIconUrl);
    }
  
    fromBusinessDesign(other: BusinessDesign): void {
      Object.entries(other.products).forEach(([productId, product]) => {
        this.products[productId] = ProductModel.fromProduct(product);
      });
  
      this.changingImages = [...other.changingImages];
  
      Object.entries(other.updates).forEach(([id, value]) => {
        this.updates[id] = Update.fromUpdate(value);
      });
  
      this.storyView = other.storyView;
  
      Object.entries(other.businessThemes).forEach(([themeKey, theme]) => {
        this.businessThemes[themeKey] = BusinessTheme.fromBusinessTheme(theme);
      });
  
      this.shopIconUrl = other.shopIconUrl;
      this.pickedThemeKey = other.pickedThemeKey;
      this.lastTimeToUpdateTerm = other.lastTimeToUpdateTerm;
      this.changingImagesSwapSeconds = other.changingImagesSwapSeconds;
      this.term = other.term;
      this.bottomIcons = other.bottomIcons;
      this.productsTitle = other.productsTitle;
      this.productView = other.productView;
      this.storyTitle = other.storyTitle;
      this.mustConfirmTerm = other.mustConfirmTerm;
      this.popTermOnFirstEneter = other.popTermOnFirstEneter;
      this.isPrivateTheme = other.isPrivateTheme;
    }
  
    toJson(): Record<string, any> {
      const data: Record<string, any> = {};
      if (this.storyView !== Arrangement.EndlessCarousel) {
        data.storyView = arrangementToStr[this.storyView];
      }
      if (this.productView !== Arrangement.Grid) {
        data.productView = arrangementToStr[this.storyView];
      }
      data.changingImages = this.changingImages;
      data.products = {};
      Object.entries(this.products).forEach(([key, product]) => {
        data.products[key] = product.toJson();
      });
  
      data.updates = {};
      Object.entries(this.updates).forEach(([id, update]) => {
        data.updates[id] = update.toJson();
      });
  
      if (this.mustConfirmTerm) {
        data.mustConfirmTerm = this.mustConfirmTerm;
      }
  
      if (this.popTermOnFirstEneter) {
        data.popTermOnFirstEneter = this.popTermOnFirstEneter;
      }
      if (this.term !== '') {
        data.term = this.term;
      }
      if (this.lastTimeToUpdateTerm !== new Date(0)) {
        data.lastTimeToUpdateTerm = this.lastTimeToUpdateTerm.toISOString();
      }
  
      data.bottomIcons = this.bottomIcons;
      data.changingImagesSwapSeconds = this.changingImagesSwapSeconds;
      data.storyTitle = this.storyTitle;
      data.productsTitle = this.productsTitle;
      data.businessThemes = {};
      Object.entries(this.businessThemes).forEach(([themeKey, businessTheme]) => {
        if (!defaultThemes.hasOwnProperty(themeKey)) {
          data.businessThemes[themeKey] = businessTheme.toJson();
        }
      });
      data.pickedThemeKey = this.pickedThemeKey;
      data.shopIcon = this.shopIconUrl;
      data.isPrivateTheme = this.isPrivateTheme;
      return data;
    }
  }
  