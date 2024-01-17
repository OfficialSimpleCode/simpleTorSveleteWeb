import IconData from "../../general/icon_data";

  export default class InvoiceBusinessInfo {
    masofNumber: string = "";
    businessName: string = "";
    adress: string = "";
    businessNumber: string = "";
    businessId: string = "";
    shopIcon: IconData | undefined;
  
    constructor({
      masofNumber = "",
      businessName = "",
      adress = "",
      businessId = "",
      shopIcon,
      businessNumber = "",
    }: {
      masofNumber?: string;
      businessName?: string;
      adress?: string;
      businessId?: string;
      shopIcon?: IconData | undefined;
      businessNumber?: string;
    } = {}) {
      this.masofNumber = masofNumber || "";
      this.businessName = businessName || "";
      this.adress = adress || "";
      this.businessNumber = businessNumber || "";
      this.businessId = businessId || "";
      this.shopIcon = shopIcon;
    }
  
    toJson(): Record<string, any> {
      const data: Record<string, any> = {};
  
      data["MN"] = this.masofNumber;
      if (this.shopIcon !== undefined) {
        data["SI"] = this.shopIcon.toJson();
      }
  
      data["BNA"] = this.businessName;
      data["BID"] = this.businessId;
      data["A"] = this.adress;
      data["BNU"] = this.businessNumber;
      return data;
    }
  
    static fromJson(json: Record<string, any>): InvoiceBusinessInfo {
      const shopIcon = json["SI"] !== undefined ? IconData.fromJson(json["SI"]) : undefined;
  
      return new InvoiceBusinessInfo({
        masofNumber: json["MN"] || "",
        businessName: json["BNA"] || "",
        businessId: json["BID"] || "",
        shopIcon: shopIcon,
        adress: json["A"] || "",
        businessNumber: json["BNU"] || "",
      });
    }
  }
  