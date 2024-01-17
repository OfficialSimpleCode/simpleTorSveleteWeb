// Assuming IconData class is defined somewhere with proper methods

import IconData from "../general/icon_data";

export default class FutureNotification {
    id: string = "";
    businessId: string = '';
    shopIcon: IconData = new IconData();
    businessName: string = "";
    dateToNotify: Date = new Date(0);
    fcms: Set<string> = new Set<string>();
    minutesToAdd: number = 0;
    address: string = "";
    phoneToContact: string = "";
    isMulti: boolean = false;
    isRecurrence: boolean = false;
    totalEventMinutes: number = 0;
    type: string = '';
  
    constructor({
      businessId,
      id,
      businessName,
      type,
      dateToNotify,
      isMulti,
      minutesToAdd,
      address,
      phoneToContact,
      shopIcon,
      fcms,
      totalEventMinutes = 0,
      isRecurrence = false,
    }: {
      businessId: string;
      id: string;
      businessName: string;
      type: string;
      dateToNotify: Date;
      isMulti: boolean;
      minutesToAdd: number;
      address: string;
      phoneToContact: string;
      shopIcon: IconData;
      fcms: Set<string>;
      totalEventMinutes?: number;
      isRecurrence?: boolean;
    }) {
      this.businessId = businessId;
      this.id = id;
      this.businessName = businessName;
      this.type = type;
      this.dateToNotify = dateToNotify;
      this.isMulti = isMulti;
      this.minutesToAdd = minutesToAdd;
      this.address = address;
      this.phoneToContact = phoneToContact;
      this.shopIcon = shopIcon;
      this.fcms = fcms;
      this.totalEventMinutes = totalEventMinutes;
      this.isRecurrence = isRecurrence;
    }
  
    isEqual(other: FutureNotification): boolean {
      return (
        other.businessId === this.businessId &&
        other.businessName === this.businessName &&
        JSON.stringify([...other.fcms]) === JSON.stringify([...this.fcms]) &&
        other.shopIcon.isEqual(this.shopIcon) &&
        other.totalEventMinutes === this.totalEventMinutes &&
        other.isMulti === this.isMulti &&
        other.minutesToAdd === this.minutesToAdd &&
        other.isRecurrence === this.isRecurrence &&
        other.type === this.type
      );
    }
  
    static fromJson(json: any): FutureNotification {
      const shopIcon = IconData.fromJson(json["SI"]);
      const fcms = new Set<string>(json["FS"] || []);
      const dateToNotify = new Date(json["dateToNotify"]);
  
      return new FutureNotification({
        businessId: json["I"],
        id: json["ID"],
        businessName: json["B"],
        type: json["T"],
        dateToNotify: dateToNotify,
        isMulti: json["IM"],
        minutesToAdd: json["MTA"],
        address: json["A"],
        phoneToContact: json["P"],
        shopIcon: shopIcon,
        fcms: fcms,
        totalEventMinutes: json["TEM"],
        isRecurrence: json["IR"],
      });
    }
  
    get dbPath(): string {
      return `/${notifcationsCollection}/${scheduleNotificationDoc}/1/${this.dateToNotify.getFullYear()}/${this.dateToNotify.getMonth()}/${this.dateToNotify.getDay()}/${this.dateToNotify.getHours()}`;
    }
  
    toJson(): any {
      const data: any = {};
  
      if (this.phoneToContact !== "") {
        data["P"] = this.phoneToContact;
      }
      if (this.address !== "") {
        data["A"] = this.address;
      }
      if (this.type !== "") {
        data["T"] = this.type;
      }
      if (this.businessName !== "") {
        data["B"] = this.businessName;
      }
      if (this.fcms.size > 0) {
        data["FS"] = Array.from(this.fcms);
      }
      if (this.businessId !== "") {
        data["I"] = this.businessId;
      }
      if (this.isMulti) {
        data["IM"] = this.isMulti;
      }
      if (this.minutesToAdd !== 3) {
        data["MTA"] = this.minutesToAdd;
      }
      if (this.isRecurrence) {
        data["IR"] = this.isRecurrence;
      }
      if (this.totalEventMinutes > 0) {
        data["TEM"] = this.totalEventMinutes;
      }
  
      data["SI"] = this.shopIcon.toJson();
  
      return data;
    }
  
    toString(): string {
      return JSON.stringify(this.toJson(), null, 2);
    }
  }
  
  // Example usage
  const futureNotification = new FutureNotification({
    businessId: "yourBusinessId",
    id: "yourId",
    businessName: "yourBusinessName",
    type: "yourType",
    dateToNotify: new Date(),
    isMulti: true,
    minutesToAdd: 5,
    address: "yourAddress",
    phoneToContact: "yourPhoneNumber",
    shopIcon: new IconData(),
    fcms: new Set<string>(["fcmToken1", "fcmToken2"]),
    totalEventMinutes: 30,
    isRecurrence: true,
  });
  
  console.log(futureNotification.toString());
  