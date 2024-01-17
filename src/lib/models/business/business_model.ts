import { Timestamp } from "firebase/firestore";
import { CurrencyModel, defaultCurrency } from "../general/currency_model";
import BusinessPayloadData from "../notifications/business_data_payload";

import {
  BusinessesTypes,
  businessTypeFromStr,
} from "$lib/consts/business_types";
import { hypPathFromStr, type HypPaths } from "$lib/consts/hyp_pathes";
import { BusinessData } from "./business_data";
import { BusinessDesign } from "./business_design";
import { ProductModel } from "./ProductModel";
import { Update } from "./update_model";

export default class BusinessModel {
  businesseType: BusinessesTypes = BusinessesTypes.Other;
  currency: CurrencyModel = defaultCurrency;
  notifyOnNewCustomer: boolean = true;
  searchable: boolean = true;
  billingIssue: Record<string, Date> = {};
  isLandingPageMode: boolean = false;
  allWorkersIds: Record<string, string> = {};
  workersIds: Record<string, string> = {};
  hypPath?: HypPaths;
  expiredDate: Date = new Date();
  shopPhone: string = "";
  ownersName: string = "";
  companyNumber: string = "";
  ownersPhone: string = "";
  masofNumber: string = "";
  previewDoc: string = "";
  instagramAccount: string = "";
  revenueCatId: string = "";
  pendingWorkersProductsId: string = "";
  adress: string = "";
  workersProductsId: string = "";
  pendingProductId: string = "";
  dynamicLink: string = "";
  shopName: string = "";
  productId: string = "";
  businessId: string = "";
  createdAt: Date = new Date();
  blockedUsersTemp: Record<string, string> = {};
  lastTimeConnected: Date = new Date();
  businessData: BusinessData = new BusinessData();
  design: BusinessDesign = new BusinessDesign();

  constructor({
    shopName = "",
    businessId,
    productId = "",
    adress = "",
    dynamicLink = "",
    revenueCatId = "",
    ownersName = "",
    instagramAccount = "",
    shopPhone = "",
    design,
  }: {
    shopName?: string;
    businessId: string;
    productId?: string;
    adress?: string;
    dynamicLink?: string;
    revenueCatId?: string;
    ownersName?: string;
    instagramAccount?: string;
    shopPhone?: string;
    design: BusinessDesign;
  }) {
    this.shopName = shopName;
    this.businessId = businessId;
    this.productId = productId;
    this.adress = adress;
    this.dynamicLink = dynamicLink;
    this.revenueCatId = revenueCatId;
    this.ownersName = ownersName;
    this.instagramAccount = instagramAccount;
    this.shopPhone = shopPhone;
    this.design = design;
  }

  static empty(): BusinessModel {
    return new BusinessModel({
      design: new BusinessDesign(),
      businessId: "",
    });
  }

  get businessPayLoadData(): BusinessPayloadData {
    return new BusinessPayloadData({
      businessId: this.businessId,
      businessName: this.shopName,
      shopIcon: this.design.shopIconData,
    });
  }

  static fromJson(
    json: Record<string, any>,
    businessId: string
  ): BusinessModel {
    const instance = new BusinessModel({
      businessId,
      design: new BusinessDesign(),
    });
    instance.setData(json, businessId);
    return instance;
  }

  setData(json: Record<string, any>, newBusinessId: string): void {
    this.businessId = newBusinessId;

    if (json["currency"] != null) {
      this.currency = CurrencyModel.fromJson(json["currency"]);
    }

    if (json["design"] != null) {
      this.design = BusinessDesign.fromJson(json["design"]);
    } else {
      const theme = json["theme"]; // themeFromStr[json['theme']] ?? Themes.dark;
      this.design.pickedThemeKey = theme;
      Object.entries<Record<string, any>>(json["products"]).forEach(
        ([productId, productJson]) => {
          this.design.products[productId] = ProductModel.fromJson(
            productJson,
            productId
          );
        }
      );

      if (json["changingImages"] != null) {
        this.design.changingImages = json["changingImages"].map(
          (item: string) => item
        );
      }

      if (json["updates"] != null) {
        (json["updates"] as Record<string, any>[]).forEach((update, index) => {
          this.design.updates[index.toString()] = Update.fromJson(
            update,
            index.toString()
          );
        });
      }

      this.design.bottomIcons = json["bottomIcons"] ?? false;
      this.design.storyTitle = json["storyTitle"] ?? "";
      this.design.changingImagesSwapSeconds =
        json["changingImagesSwapSeconds"] ?? 6;
      this.design.shopIconUrl = json["shopIcon"] ?? "";
    }

    this.previewDoc = json["previewDoc"] ?? "";
    this.workersProductsId = json["workersProductsId"] ?? "";
    this.pendingWorkersProductsId = json["pendingWorkersProductsId"] ?? "";
    this.shopName = json["shopName"] ?? "";
    this.isLandingPageMode = json["isLandingPageMode"] ?? false;
    this.searchable = json["searchable"] ?? true;

    if (json["expiredDate"] != null) {
      this.expiredDate = new Date(json["expiredDate"]);
    }

    this.notifyOnNewCustomer = json["notifyOnNewCustomer"] ?? true;

    // json["workersPermissions"] ??= {};
    // this.workersPermissions = WorkersPermissions.fromJson(json["workersPermissions"]);

    this.companyNumber = json["companyNumber"] ?? "";

    if (json["hypPath"] != null) {
      this.hypPath = hypPathFromStr[json["hypPath"]];
    }

    this.allWorkersIds = {};
    if (json["allWorkersIds"] != null) {
      Object.entries<string>(json["allWorkersIds"]).forEach(
        ([workerId, details]) => {
          this.allWorkersIds[workerId] = details;
        }
      );
    }

    const ownerPhone = this.businessId.split("--")[0];
    if (!this.allWorkersIds.hasOwnProperty("+" + ownerPhone)) {
      this.allWorkersIds["+" + ownerPhone] = "";
    }

    this.workersIds = {};
    if (json["workersIds"] != null) {
      Object.entries<string>(json["workersIds"]).forEach(
        ([workerId, details]) => {
          this.workersIds[workerId] = details;
        }
      );
    }

    if (!this.workersIds.hasOwnProperty(ownerPhone)) {
      this.workersIds[ownerPhone] = "";
    }

    this.dynamicLink = json["dynamicLink"] ?? "";
    this.masofNumber = json["masofNumber"] ?? "";

    this.ownersName = json["ownersName"] ?? "";
    this.revenueCatId = json["revenueCatId"] ?? "";
    this.productId = json["productId"] ?? "";
    this.pendingProductId = json["pendingProductId"] ?? "";

    this.businesseType =
      businessTypeFromStr[json["businesseType"]] ?? BusinessesTypes.Other;

    this.instagramAccount = json["instagramAccount"] ?? "";
    this.adress = json["adress"] ?? "";
    this.shopPhone = json["shopPhone"] ?? "";

    try {
      if (json["billingIssue"] != null) {
        Object.entries(json["billingIssue"]).forEach(([productId, date]) => {
          this.billingIssue[productId] = (date as Timestamp).toDate();
        });
      }
    } catch (e) {
      // logger.e(e);
    }

    if (json["createdAt"] instanceof Timestamp) {
      this.createdAt = (json["createdAt"] as Timestamp).toDate();
    } else if (typeof json["createdAt"] === "string") {
      this.createdAt = new Date(json["createdAt"]) || new Date();
    }

    if (json["lastTimeConnected"] != null) {
      this.lastTimeConnected =
        new Date(json["lastTimeConnected"]) || new Date();
    }
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};

    data.notifyOnNewCustomer = this.notifyOnNewCustomer;
    data.currency = this.currency.toJson();
    data.searchable = this.searchable;
    data.workersProductsId = this.workersProductsId;
    data.pendingWorkersProductsId = this.pendingWorkersProductsId;
    data.previewDoc = this.previewDoc;
    data.masofNumber = this.masofNumber;
    data.revenueCatId = this.revenueCatId;
    data.pendingProductId = this.pendingProductId;
    data.productId = this.productId;
    data.shopName = this.shopName;
    if (this.hypPath) {
      data.hypPath = this.hypPath;
    }

    if (Object.keys(this.billingIssue).length > 0) {
      data.billingIssue = {};
      Object.entries(this.billingIssue).forEach(([productId, date]) => {
        data.billingIssue[productId] = Timestamp.fromDate(date);
      });
    }
    if (this.dynamicLink !== "") {
      data.dynamicLink = this.dynamicLink;
    }

    data.companyNumber = this.companyNumber;
    data.expiredDate = this.expiredDate;

    data.businesseType = this.businesseType;
    data.ownersName = this.ownersName;
    data.instagramAccount = this.instagramAccount;
    data.adress = this.adress;
    data.shopPhone = this.shopPhone;

    data.workersIds = this.workersIds;
    data.createdAt = this.createdAt;
    data.lastTimeConnected = this.lastTimeConnected;

    // if (Object.keys(data.workersPermissions).length === 0) {
    //   delete data.workersPermissions;
    // }

    if (this.isLandingPageMode) {
      data.isLandingPageMode = this.isLandingPageMode;
    }
    data.design = this.design.toJson();

    return data;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}
