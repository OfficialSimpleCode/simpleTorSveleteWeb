import BusinessPayloadData from "../notifications/business_data_payload";
import { BusinessDesign } from "./business_design";


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
  shopPhone: string = '';
  ownersName: string = '';
  companyNumber: string = '';
  ownersPhone: string = '';
  masofNumber: string = '';
  previewDoc: string = '';
  instagramAccount: string = '';
  revenueCatId: string = '';
  pendingWorkersProductsId: string = '';
  adress: string = '';
  workersProductsId: string = '';
  pendingProductId: string = '';
  dynamicLink: string = '';
  shopName: string = '';
  productId: string = '';
  businessId: string = '';
  createdAt: Date = new Date();
  blockedUsersTemp: Record<string, string> = {};
  lastTimeConnected: Date = new Date();
  businessData: BusinessData = new BusinessData();
  design: BusinessDesign = new BusinessDesign();

  constructor({
    shopName = '',
    businessId,
    productId = '',
    adress = '',
    dynamicLink = '',
    revenueCatId = '',
    ownersName = '',
    instagramAccount = '',
    shopPhone = '',
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
      businessId: '',
    });
  }

  get businessPayLoadData(): BusinessPayloadData {
    return new BusinessPayloadData({
        businessId: this.businessId,
        businessName: this.shopName,
        shopIcon: this.design.shopIconData,
    });
  }

  static fromJson(json: Record<string, any>, businessId: string): BusinessModel {
    const instance = new BusinessModel({
      businessId,
      design: new BusinessDesign(),
    });
    instance.setData(json, businessId);
    return instance;
  }

  setData(json: Record<string, any>, newBusinessId: string): void {
   
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
        data.billingIssue[productId] = date.toDate(); // Adjust based on the actual structure of 'date'
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
    
   
    if (Object.keys(data.workersPermissions).length === 0) {
      delete data.workersPermissions;
    }

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
