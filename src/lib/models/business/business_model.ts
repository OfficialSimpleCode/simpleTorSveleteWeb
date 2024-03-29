import { Timestamp } from "firebase/firestore";
import { CurrencyModel, defaultCurrency } from "../general/currency_model";
import BusinessPayloadData from "../notifications/business_data_payload";

import {
  BusinessesTypes,
  businessTypeFromStr,
} from "$lib/consts/business_types";
import { hypPathFromStr, type HypPaths } from "$lib/consts/hyp_pathes";
import {
  dateIsoStr,
  dateStrToDate,
  dateToDateStr,
  isoToDate,
} from "$lib/utils/times_utils";
import InvoiceBusinessInfo from "../payment_hyp/invoice/invoice_business_info";
import { BusinessData } from "./business_data";
import { BusinessDesign } from "./business_design";
import BusinessInfo from "./business_info";
import { ProductModel } from "./product_model";
import { Update } from "./update_model";
import WorkersPermissions from "./workers_permission";

export default class BusinessModel {
  businesseType: BusinessesTypes = BusinessesTypes.Other;
  currency: CurrencyModel = defaultCurrency;
  notifyOnNewCustomer: boolean = true;
  searchable: boolean = true;
  urlEndPoint: string | undefined;
  businessDescription: string | undefined;
  keyWords: string[] = [];
  billingIssue: Map<string, Date> = new Map();
  isLandingPageMode: boolean = false;
  allWorkersIds: Record<string, string> = {};
  workersIds: Record<string, string> = {};
  hypPath?: HypPaths;
  expiredDate: Date = new Date();
  workersPermissions: WorkersPermissions = new WorkersPermissions();
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
  lastDateChangeBusinessDescription?: Date;
  createdAt: Date = new Date();
  blockedUsersTemp: Map<string, string> = new Map();
  lastTimeConnected: Date = new Date();
  businessData: BusinessData = new BusinessData();
  design: BusinessDesign = new BusinessDesign();
  constructor({});
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
    businessId: string,
    withOutTimestamp?: boolean
  ): BusinessModel {
    const instance = new BusinessModel({
      businessId,
      design: new BusinessDesign(),
    });
    instance.setData(json, businessId, withOutTimestamp);
    return instance;
  }

  get toBusinessInfo(): BusinessInfo {
    return new BusinessInfo({
      businessId: this.businessId,
      iconUrl: this.design.shopIconUrl,
      type: this.businesseType,
      shopPhone: this.shopPhone,
      ownerName: this.ownersName,
      adress: this.adress,
      businessName: this.shopName,
    });
  }

  //the business website end point
  get url(): string {
    return this.urlEndPoint ?? this.businessId;
  }

  setData(
    json: Record<string, any>,
    newBusinessId: string,
    withOutTimestamp?: boolean
  ): void {
    this.businessId = newBusinessId;

    if (json["currency"]) {
      this.currency = CurrencyModel.fromJson(json["currency"]);
    }

    if (json["design"]) {
      this.design = BusinessDesign.fromJson(json["design"], withOutTimestamp);
    } else {
      const theme = json["theme"]; // themeFromStr[json['theme']] ?? Themes.dark;
      this.design.pickedThemeKey = theme;
      Object.entries<Record<string, any>>(json["products"]).forEach(
        ([productId, productJson]) => {
          this.design.products[productId] = ProductModel.fromJson(
            productJson,
            productId,
            withOutTimestamp
          );
        }
      );

      if (json["changingImages"]) {
        this.design.changingImages = json["changingImages"].map(
          (item: string) => item
        );
      }

      if (json["updates"]) {
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
    if (json["workersPermissions"] != null) {
      this.workersPermissions = WorkersPermissions.fromJson(
        json["workersPermissions"]
      );
    }
    if (json["lastDateChangeBusinessDescription"] != null) {
      this.lastDateChangeBusinessDescription =
        isoToDate(json["lastDateChangeBusinessDescription"]) ?? new Date();
    }

    this.previewDoc = json["previewDoc"] ?? "";
    this.workersProductsId = json["workersProductsId"] ?? "";
    this.pendingWorkersProductsId = json["pendingWorkersProductsId"] ?? "";
    this.shopName = json["shopName"] ?? "";
    this.isLandingPageMode = json["isLandingPageMode"] ?? false;
    this.searchable = json["searchable"] ?? true;

    this.urlEndPoint = json["urlEndPoint"];

    this.businessDescription = json["businessDescription"];

    this.keyWords = json["keyWords"] ?? [];

    if (json["expiredDate"] != null) {
      this.expiredDate = dateStrToDate(json["expiredDate"]);
    }

    this.notifyOnNewCustomer = json["notifyOnNewCustomer"] ?? true;

    this.companyNumber = json["companyNumber"] ?? "";

    if (json["hypPath"] != null) {
      this.hypPath = hypPathFromStr[json["hypPath"]];
    }
    let ownerId = this.businessId.split("--")[0];
    if (ownerId.length < 20) {
      ownerId = `+${ownerId}`;
    }
    if (this.allWorkersIds[ownerId] == null) {
      this.allWorkersIds[ownerId] = "";
    }

    this.workersIds = {};
    if (json["workersIds"] != null) {
      Object.entries<string>(json["workersIds"]).forEach(
        ([workerId, details]) => {
          this.workersIds[workerId] = details;
        }
      );
    }

    if (this.workersIds[ownerId.replaceAll("+", "")] == null) {
      this.workersIds[ownerId.replaceAll("+", "")] = "";
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
          this.billingIssue.set(productId, (date as Timestamp).toDate());
        });
      }
    } catch (e) {
      // logger.e(e);
    }

    if (json["createdAt"] instanceof Timestamp) {
      this.createdAt = (json["createdAt"] as Timestamp).toDate();
    } else if (typeof json["createdAt"] === "string") {
      this.createdAt = isoToDate(json["createdAt"]) || new Date();
    }

    if (json["lastTimeConnected"] != null) {
      this.lastTimeConnected =
        isoToDate(json["lastTimeConnected"]) || new Date();
    }
  }

  get invoiceBusinessInfo(): InvoiceBusinessInfo {
    return new InvoiceBusinessInfo({
      masofNumber: this.masofNumber,
      businessName: this.shopName,
      adress: this.adress,
      shopIcon: this.design.shopIconData,
      businessId: this.businessId,
      businessNumber: this.companyNumber,
    });
  }

  toJson(withOutTimestamp?: boolean): Record<string, any> {
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

    if (this.keyWords.length > 0) {
      data["keyWords"] = this.keyWords;
    }

    if (this.businessDescription != null) {
      data["businessDescription"] = this.businessDescription;
    }
    if (this.hypPath) {
      data.hypPath = this.hypPath;
    }

    if (this.billingIssue.size > 0) {
      data.billingIssue = {};
      this.billingIssue.forEach((date, productId) => {
        data.billingIssue[productId] = Timestamp.fromDate(date);
      });
    }
    if (this.dynamicLink !== "") {
      data.dynamicLink = this.dynamicLink;
    }

    data.companyNumber = this.companyNumber;
    data.expiredDate = dateToDateStr(this.expiredDate);

    data.businesseType = this.businesseType;
    data.ownersName = this.ownersName;
    data.instagramAccount = this.instagramAccount;
    data.adress = this.adress;
    data.shopPhone = this.shopPhone;
    data.workersPermissions = this.workersPermissions.toJson();
    if (this.urlEndPoint != null) {
      data.urlEndPoint = this.urlEndPoint;
    }
    if (this.lastDateChangeBusinessDescription != null) {
      data.lastDateChangeBusinessDescription = dateIsoStr(
        this.lastDateChangeBusinessDescription
      );
    }

    data.workersIds = this.workersIds;
    data.createdAt = dateIsoStr(this.createdAt);
    data.lastTimeConnected = dateIsoStr(this.lastTimeConnected);

    if (this.isLandingPageMode) {
      data.isLandingPageMode = this.isLandingPageMode;
    }
    data.design = this.design.toJson(withOutTimestamp);

    return data;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}
