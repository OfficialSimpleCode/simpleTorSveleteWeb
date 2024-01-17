// Assuming BusinessesTypes and BusinessModel classes are defined somewhere

import { BusinessDesign } from "./business_design";
import BusinessModel from "./business_model";

class BusinessInfo {
    businessName: string = "";
    iconUrl: string = "";
    businessId: string = "";
    type: BusinessesTypes = BusinessesTypes.Other;
    adress: string = "";
    ownerName: string = "";
    shopPhone: string = "";
  
    constructor({
      businessId,
      shopPhone,
      type,
      adress,
      ownerName,
      iconUrl,
      businessName,
    }: {
      businessId: string;
      shopPhone: string;
      type: BusinessesTypes;
      adress: string;
      ownerName: string;
      iconUrl: string;
      businessName: string;
    }) {
      this.businessId = businessId;
      this.shopPhone = shopPhone;
      this.type = type;
      this.adress = adress;
      this.ownerName = ownerName;
      this.iconUrl = iconUrl;
      this.businessName = businessName;
    }
  
    static empty(): BusinessInfo {
      return new BusinessInfo({
        businessId: "",
        shopPhone: "",
        type: BusinessesTypes.Other,
        adress: "",
        ownerName: "",
        iconUrl: "",
        businessName: "",
      });
    }
  
    static fromJson(json: any, key: string): BusinessInfo {
      const businessName = json["businessName"] || "";
      const iconUrl = json["iconUrl"] || "";
      const type = businessTypeFromStr[json["T"]] || BusinessesTypes.Other;
      const ownerName = json["ON"] || "";
      const shopPhone = json["SP"] || "";
      const adress = json["A"] || "";
  
      return new BusinessInfo({
        businessId: key,
        shopPhone,
        type,
        adress,
        ownerName,
        iconUrl,
        businessName,
      });
    }
  
    get toBusinessModel(): BusinessModel {
      const businessModel = new BusinessModel({
        businessId: this.businessId,
        design: new BusinessDesign({ shopIconUrl: this.iconUrl }),
      });
      businessModel.ownersName = this.ownerName;
      businessModel.shopPhone = this.shopPhone;
      businessModel.shopName = this.businessName;
      businessModel.adress = this.adress;
      businessModel.businesseType = this.type;
  
      return businessModel;
    }
  
    static fromBusinessInfo(other: BusinessInfo): BusinessInfo {
      return new BusinessInfo({
        businessId: other.businessId,
        shopPhone: other.shopPhone,
        type: other.type,
        adress: other.adress,
        ownerName: other.ownerName,
        iconUrl: other.iconUrl,
        businessName: other.businessName,
      });
    }
  
    toJson(): { [key: string]: any } {
      const data: { [key: string]: any } = {};
      data["businessName"] = this.businessName;
      data["iconUrl"] = this.iconUrl;
      data["ON"] = this.ownerName;
      data["SP"] = this.shopPhone;
      data["A"] = this.adress;
      data["T"] = businessTypeToStr[this.type];
  
      return data;
    }
  
    isTheSame(businessInfo: BusinessInfo): boolean {
      return (
        businessInfo.iconUrl === this.iconUrl &&
        businessInfo.ownerName === this.ownerName &&
        businessInfo.shopPhone === this.shopPhone &&
        businessInfo.adress === this.adress &&
        businessInfo.type === this.type &&
        businessInfo.businessName === this.businessName
      );
    }
  
    toString(): string {
      return JSON.stringify(this.toJson());
    }
  }
  


  