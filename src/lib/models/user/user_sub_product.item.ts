import { Timestamp } from "firebase/firestore";

export default class UserSubProductItem {
  businessId: string = "";
  date?: Timestamp | null;
  productId: string = "";

  constructor(businessId: string, date: Timestamp | null, productId: string) {
    this.businessId = businessId;
    this.date = date;
    this.productId = productId;
  }

  static fromJson(json: any, newProductId: string): UserSubProductItem {
    const userSubProductItem = new UserSubProductItem(newProductId, null, "");

    userSubProductItem.businessId = json["businessId"] || "";

    if (json["date"] instanceof Timestamp) {
      userSubProductItem.date = json["date"];
    }

    return userSubProductItem;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};

    data["businessId"] = this.businessId;

    if (this.date !== null && this.date !== undefined) {
      data["date"] = this.date;
    }

    return data;
  }
}
