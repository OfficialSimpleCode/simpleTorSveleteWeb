import IconData from "../general/icon_data";


export default class BusinessPayloadData {
    businessId: string = "";
    shopIcon: IconData = new IconData();
    businessName: string = "";
  
    constructor({
      businessId = "", 
      businessName = "", 
      shopIcon  = new IconData()
    }:{
      businessId?: string ,
      businessName?:string,
      shopIcon?: IconData 
    } = {}) {
      this.businessId = businessId;
      this.shopIcon = shopIcon;
      this.businessName = businessName;
    }

    static empty() :BusinessPayloadData{
      return new BusinessPayloadData();
    }
  
    static fromJsonStr(jsonStr: string): BusinessPayloadData {
      const json = JSON.parse(jsonStr) as { businessId: string; businessName:string;shopIcon?: string };
  
      const businessPayloadData =  BusinessPayloadData.empty();
      businessPayloadData.businessId = json.businessId;
      businessPayloadData.businessName = json.businessName;
      
      if (json.shopIcon) {
        businessPayloadData.shopIcon = IconData.fromJsonStr(json.shopIcon);
      }
  
      return businessPayloadData;
    }
  
    toJsonStr(): string {
      const data = {
        businessId: this.businessId,
        shopIcon: this.shopIcon.toJsonStr(),
        businessName:this.businessName
      };
  
      return JSON.stringify(data);
    }
  }
  
  