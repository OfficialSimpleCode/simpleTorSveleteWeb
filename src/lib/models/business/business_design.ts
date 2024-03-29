import {
  Arrangement,
  arrangementFromStr,
  arrangementToStr,
  defaultThemes,
} from "$lib/consts/business_design";
import { getTheme } from "$lib/utils/colors";
import { dateIsoStr, isoToDate } from "$lib/utils/times_utils";
import IconData from "../general/icon_data";
import { BusinessTheme } from "./business_theme";
import { ProductModel } from "./product_model";

import { Update } from "./update_model";

export class BusinessDesign {
  storyView: Arrangement = Arrangement.Grid;
  productView: Arrangement = Arrangement.Grid;
  changingImages: string[] = [];
  products: Record<string, ProductModel> = {};
  updates: Record<string, Update> = {};
  storyTitle: string = "";
  shopIconUrl: string = "";
  productsTitle: string = "";
  bottomIcons: boolean = false;
  changingImagesSwapSeconds: number = 6;
  pickedThemeKey: string = "darkIos";
  lastTimeToUpdateTerm: Date = new Date(0);
  businessThemes: Record<string, BusinessTheme> = {};
  term: string = "";
  mustConfirmTerm: boolean = false;
  popTermOnFirstEneter: boolean = false;
  isPrivateTheme: boolean = false;

  constructor({
    storyView = Arrangement.Grid,
    productView = Arrangement.Grid,
    changingImagesSwapSeconds = 6,
    shopIconUrl = "",
    pickedThemeKey = "darkIos",
  }: {
    storyView?: Arrangement;
    productView?: Arrangement;
    changingImagesSwapSeconds?: number;
    shopIconUrl?: string;
    pickedThemeKey?: string;
  } = {}) {
    this.changingImagesSwapSeconds = changingImagesSwapSeconds;
    this.shopIconUrl = shopIconUrl;
    this.pickedThemeKey = pickedThemeKey;
  }

  static fromJson(
    json: Record<string, any>,
    withOutTimestamp?: boolean
  ): BusinessDesign {
    const newObj = new BusinessDesign();

    Object.entries(json.products).forEach(
      ([productId, product]: [string, any]) => {
        newObj.products[productId] = ProductModel.fromJson(
          product,
          productId,
          withOutTimestamp
        );
      }
    );

    if (json.changingImages) {
      newObj.changingImages = json.changingImages.map((item: string) => item);
    }

    if (json.updates) {
      Object.entries(json.updates).forEach(
        ([updateId, updateJson]: [string, any]) => {
          newObj.updates[updateId] = Update.fromJson(updateJson, updateId);
        }
      );
    }

    if (json.storyView) {
      newObj.storyView =
        arrangementFromStr[json.storyView] || Arrangement.EndlessCarousel;
    }

    if (json.productView) {
      newObj.productView =
        arrangementFromStr[json.productView] || Arrangement.Grid;
    }

    if (json.businessThemes) {
      Object.entries(json.businessThemes).forEach(
        ([themeKey, businessThemeJson]: [string, any]) => {
          newObj.businessThemes[themeKey] = BusinessTheme.fromJson(
            businessThemeJson,
            themeKey
          );
        }
      );
    }

    if (json.lastTimeToUpdateTerm) {
      newObj.lastTimeToUpdateTerm =
        isoToDate(json.lastTimeToUpdateTerm) || new Date(0);
    }

    newObj.pickedThemeKey = json.pickedThemeKey || "darkIoss";
    newObj.term = json.term || "";
    newObj.bottomIcons = json.bottomIcons || false;
    newObj.changingImagesSwapSeconds = json.changingImagesSwapSeconds || 6;
    newObj.productsTitle = json.productsTitle || "";
    newObj.storyTitle = json.storyTitle || "";
    newObj.shopIconUrl = json.shopIcon || "";
    newObj.mustConfirmTerm = json.mustConfirmTerm || false;
    newObj.popTermOnFirstEneter = json.popTermOnFirstEneter || false;
    newObj.isPrivateTheme = json.isPrivateTheme || false;

    return newObj;
  }

  get pickedTheme(): BusinessTheme {
    return getTheme(this.pickedThemeKey, this.businessThemes);
  }

  get shopIconData(): IconData {
    return IconData.fromShopIconUrl(this.shopIconUrl);
  }

  static fromBusinessDesign(other: BusinessDesign): BusinessDesign {
    const newObj = new BusinessDesign();
    Object.entries(other.products).forEach(([productId, product]) => {
      newObj.products[productId] = ProductModel.fromProduct(product);
    });

    newObj.changingImages = [...other.changingImages];

    Object.entries(other.updates).forEach(([id, value]) => {
      newObj.updates[id] = Update.fromUpdate(value);
    });

    newObj.storyView = other.storyView;

    Object.entries(other.businessThemes).forEach(([themeKey, theme]) => {
      newObj.businessThemes[themeKey] = BusinessTheme.fromBusinessTheme(theme);
    });

    newObj.shopIconUrl = other.shopIconUrl;
    newObj.pickedThemeKey = other.pickedThemeKey;
    newObj.lastTimeToUpdateTerm = other.lastTimeToUpdateTerm;
    newObj.changingImagesSwapSeconds = other.changingImagesSwapSeconds;
    newObj.term = other.term;
    newObj.bottomIcons = other.bottomIcons;
    newObj.productsTitle = other.productsTitle;
    newObj.productView = other.productView;
    newObj.storyTitle = other.storyTitle;
    newObj.mustConfirmTerm = other.mustConfirmTerm;
    newObj.popTermOnFirstEneter = other.popTermOnFirstEneter;
    newObj.isPrivateTheme = other.isPrivateTheme;
    return newObj;
  }

  toJson(withOutTimestamp?: boolean): Record<string, any> {
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
      data.products[key] = product.toJson(withOutTimestamp);
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
    if (this.term !== "") {
      data.term = this.term;
    }
    if (this.lastTimeToUpdateTerm !== new Date(0)) {
      data.lastTimeToUpdateTerm = dateIsoStr(this.lastTimeToUpdateTerm);
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
