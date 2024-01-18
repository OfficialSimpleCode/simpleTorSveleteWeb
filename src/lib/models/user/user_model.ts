import { AuthProvider, authProviderFromStr } from "$lib/consts/auth";
import { Gender, genderFromStr, genderToStr } from "$lib/consts/gender";
import { Timestamp, type Unsubscribe } from "firebase/firestore";
// import { isEqual } from "lodash";
// import { v4 as uuid } from "uuid";
import BusinessInfo from "../business/business_info";
import Device from "../general/device";
import NotificationTopic from "../notifications/notification_topic";
import type Invoice from "../payment_hyp/invoice/invoice";
import PaymentCard from "../payment_hyp/payment_card";
import PaymentRequestUser from "../payment_hyp/payment_request/payment_request_user";
import type TransactionModel from "../payment_hyp/transaction";
import UserBookings from "./bookings";
import UserPublicData from "./user_public_data";
import UserSubProductItem from "./user_sub_product.item";

export default class UserModel {
  productsIds: { [key: string]: UserSubProductItem } = {};
  pendingProductsIds: { [key: string]: string } = {};
  id: string = "";
  revenueCatId: string = "";
  limitOfBuisnesses: number = 1;
  preferdTipPercentage: number = 0;
  cardPaymentsPass: string = "";
  lastTimeUpdatePhone: Date = new Date(0);
  lastTimeUpdateEmail: Date = new Date(0);
  authProviders: { [key in AuthProvider]?: Date } = {};
  businessesInfo: { [key: string]: BusinessInfo } = {};
  storyLikes: string[] = [];
  paymentCards: { [key: string]: { [key: string]: PaymentCard } } = {};
  lastVisitedBuisnesses: string[] = [];
  lastVisitedBuisnessesRemoved: string[] = [];
  lastCleanDate: Timestamp = Timestamp.fromDate(new Date());
  businessTopics: Set<string> = new Set();
  waitingListTopics: { [key: string]: NotificationTopic } = {};
  tempFcm?: string;
  termsApprovals: { [key: string]: Date } = {};
  seenUpdates: { [key: string]: Set<string> } = {};
  createdAt: Date = new Date();
  userPublicData: UserPublicData = new UserPublicData({
    devices: {},
    myBuisnessesIds: [],
  });
  name: string = "";
  isVerifiedPhone: boolean = false;
  phoneNumber: string = "";
  gender: Gender = Gender.anonymous;
  lastTimeConnect: Date = new Date();
  userPublicDataListener?: Unsubscribe;
  connectedGoogleEmail: string = "";
  // localData: UserLocalData = new UserLocalData();
  currentMonthInvoices?: { [key: string]: Invoice };
  currentMonthPaymentRequest?: { [key: string]: PaymentRequest };
  currentMonthPayments?: { [key: string]: TransactionModel };
  existInvoicesDocs: Set<string> = new Set();
  existPaymentsDocs: Set<string> = new Set();
  existPaymentRequestsDocs: Set<string> = new Set();
  invoices: { [key: string]: Invoice } = {};
  devices: { [key: string]: Device } = {};
  bookings: UserBookings = new UserBookings();
  hasOldNotification: boolean = false;

  constructor({
    name = "",
    phoneNumber = "",
    id = "",
    productsIds = {},
    myBuisnessesIds = [],
    revenueCatId = "",
    limitOfBuisnesses = 1,
    gender = Gender.anonymous,
    lastVisitedBuisnesses = [],
    lastVisitedBuisnessesRemoved = [],
    paymentCards = {},
    isVerifiedPhone = false,
    isVerifiedEmail = false,
    email = "",
    lastCleanDate = Timestamp.fromDate(new Date()),
    createdAt = new Date(),
  }: {
    name?: string;
    phoneNumber?: string;
    id?: string;
    productsIds?: { [key: string]: UserSubProductItem };
    myBuisnessesIds?: string[];
    revenueCatId?: string;
    limitOfBuisnesses?: number;
    gender?: Gender;
    lastVisitedBuisnesses?: string[];
    lastVisitedBuisnessesRemoved?: string[];
    paymentCards?: { [key: string]: { [key: string]: PaymentCard } };
    isVerifiedPhone?: boolean;
    isVerifiedEmail?: boolean;
    email?: string;
    lastCleanDate?: Timestamp;
    createdAt?: Date;
  }) {
    this.userPublicData = new UserPublicData({
      email,
      isVerifiedEmail,
      isVerifiedPhone,
      name,
      phoneNumber,
      id,
      devices: this.devices,
      gender,
      myBuisnessesIds,
    });
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.id = id;
    this.productsIds = productsIds;
    this.revenueCatId = revenueCatId;
    this.limitOfBuisnesses = limitOfBuisnesses;
    this.gender = gender;
    this.lastVisitedBuisnesses = lastVisitedBuisnesses;
    this.lastVisitedBuisnessesRemoved = lastVisitedBuisnessesRemoved;
    this.paymentCards = paymentCards;
    this.isVerifiedPhone = isVerifiedPhone;
    this.cardPaymentsPass = "";
    this.lastCleanDate = lastCleanDate;
    this.createdAt = createdAt;
  }

  // get toMultiBookingUser(): MultiBookingUser {
  //   return new MultiBookingUser({
  //     userFcms: this.fcmsTokens,
  //     customerName: this.name,
  //     debts: {},

  //     customerPhone: this.phoneNumber,
  //     customerId: this.id,
  //     userGender: this.gender,
  //   });
  // }

  get toPaymentRequestUser(): PaymentRequestUser {
    return new PaymentRequestUser({
      userId: this.id,
      name: this.name,
      gender: this.gender,
      isVerifiedPhone: this.isVerifiedPhone,
      isExist: true,
      phone: this.phoneNumber,
      userDecline: false,
    });
  }

  get fcmsTokens(): Set<string> {
    if (!this.userPublicData.allowAppNotification) {
      return new Set();
    }
    if (this.tempFcm) {
      return new Set([this.tempFcm]);
    }
    const setFcmsTokens: Set<string> = new Set();
    Object.values(this.devices).forEach((device) => {
      if (device.activeNotifications) {
        setFcmsTokens.add(device.token);
      }
    });
    return setFcmsTokens;
  }

  getDeviceByToken(token: string): Device | undefined {
    let newDevice: Device | undefined;
    Object.values(this.devices).forEach((device) => {
      if (device.token === token) {
        newDevice = Device.fromDevice(device);
      }
    });
    return newDevice;
  }

  static fromUserDocJson(json: Record<string, any>): UserModel {
    const user = new UserModel({
      name: json["name"],
      phoneNumber: json["phoneNumber"],
      id: json["id"],
      productsIds: {},
      myBuisnessesIds: [],
      revenueCatId: json["revenueCatId"],
      limitOfBuisnesses: json["limitOfBuisnesses"],

      gender: genderFromStr[json["gender"]],
      lastVisitedBuisnesses: json["lastVisitedBuisnesses"],
      lastVisitedBuisnessesRemoved: json["lastVisitedBuisnessesRemoved"],
      paymentCards: {},
      isVerifiedPhone: json["isVerifiedPhone"],
      isVerifiedEmail: false,
      email: "",
      lastCleanDate: json["lastCleanDate"],
      createdAt: new Date(json["createdAt"]),
    });

    if (json["devices"] && typeof json["devices"] === "object") {
      Object.entries<Record<string, any>>(json["devices"]).forEach(
        ([fcmId, fcmJson]) => {
          user.devices[fcmId] = Device.fromJson(fcmJson, fcmId);
        }
      );
    } else if (json["currentFcm"] && json["currentFcm"] !== "") {
      user.tempFcm = json["currentFcm"];
    }

    if (json["termsApprovals"]) {
      Object.entries<string>(json["termsApprovals"]).forEach(
        ([businessId, dateStr]) => {
          user.termsApprovals[businessId] = new Date(dateStr) || new Date(0);
        }
      );
    }

    user.seenUpdates = {};
    if (json["seenUpdates"]) {
      Object.entries<Array<string>>(json["seenUpdates"]).forEach(
        ([businessId, updates]) => {
          user.seenUpdates[businessId] = new Set(updates);
        }
      );
    }

    user.phoneNumber = json["phoneNumber"] || "0";
    user.id = json["id"] || json["phoneNumber"];
    user.preferdTipPercentage = 0;
    if (json["preferdTipPercentage"]) {
      user.preferdTipPercentage = Number.isInteger(json["preferdTipPercentage"])
        ? json["preferdTipPercentage"]
        : Math.floor(json["preferdTipPercentage"]);
    }

    user.cardPaymentsPass = json["cardPaymentsPass"] || "";

    if (json["storyLikes"]) {
      json["storyLikes"].forEach((imageId: string) =>
        user.storyLikes.push(imageId)
      );
    }

    if (json["lastTimeUpdatePhone"]) {
      user.lastTimeUpdatePhone =
        new Date(json["lastTimeUpdatePhone"]) || new Date(0);
    }

    if (json["lastTimeUpdateEmail"]) {
      user.lastTimeUpdateEmail =
        new Date(json["lastTimeUpdateEmail"]) || new Date(0);
    }

    user.productsIds = {};
    if (json["productsIds"]) {
      Object.entries(json["productsIds"]).forEach(
        ([productId, productJson]) => {
          user.productsIds[productId] = UserSubProductItem.fromJson(
            productJson,
            productId
          );
        }
      );
    }

    if (json["pendingProductsIds"]) {
      Object.entries<string>(json["pendingProductsIds"]).forEach(
        ([productId, businessId]) => {
          user.pendingProductsIds[productId] = businessId;
        }
      );
    }

    user.revenueCatId = json["revenueCatId"] || "";
    user.lastCleanDate = json["lastCleanDate"];
    json["lastVisitedBuisnesses"].forEach((Id: string) =>
      user.lastVisitedBuisnesses.push(Id)
    );

    if (json["lastVisitedBuisnessesRemoved"]) {
      json["lastVisitedBuisnessesRemoved"].forEach((Id: string) =>
        user.lastVisitedBuisnessesRemoved.push(Id)
      );
    }

    user.businessesInfo = {};
    if (json["businessesInfo"]) {
      Object.entries(json["businessesInfo"]).forEach(([businessId, info]) => {
        user.businessesInfo[businessId] = BusinessInfo.fromJson(
          info,
          businessId
        );
      });
    }

    if (json["businessTopics"]) {
      json["businessTopics"].forEach((businessId: string) => {
        user.businessTopics.add(businessId);
      });
    }

    if (json["waitingListTopics"]) {
      user.waitingListTopics = {};
      Object.entries(json["waitingListTopics"]).forEach(
        ([notificationId, notificationJson]) => {
          const notificationObj = NotificationTopic.fromJson(
            notificationJson,
            notificationId
          );
          if (notificationObj.date === "") {
            user.businessTopics.add(notificationId);
          } else {
            user.waitingListTopics[notificationId] = notificationObj;
          }
        }
      );
    }

    // if (json["subToNotifications"]) {
    //   user.hasOldNotification = true;
    //   Object.entries<Record<string, any>>(json["subToNotifications"]).forEach(
    //     ([key, val]) => {
    //       if (key === "whaitingList") {
    //         user.waitingListTopics = {};
    //         val.forEach((element: string) => {
    //           const obj = NotificationTopic.fromTopicStr(element);
    //           user.waitingListTopics[uuid()] = obj;
    //         });
    //       }
    //       if (key === "shopNotification") {
    //         user.businessTopics = new Set();
    //         val.forEach((element: string) => {
    //           const obj = NotificationTopic.fromTopicStr(element);
    //           user.businessTopics.add(obj.businessId);
    //         });
    //       }
    //     }
    //   );
    // }

    user.paymentCards = {};
    if (json["paymentCards"]) {
      Object.entries<Record<string, any>>(json["paymentCards"]).forEach(
        ([businessId, cardJsons]) => {
          user.paymentCards[businessId] = {};
          Object.entries<Record<string, any>>(cardJsons).forEach(
            ([cardId, cardJson]) => {
              user.paymentCards[businessId][cardId] = PaymentCard.fromJson(
                cardJson,
                cardId,
                businessId
              );
            }
          );
        }
      );
    }

    user.createdAt = new Date(json["createdAt"]);
    user.limitOfBuisnesses = json["limitOfBuisnesses"] || 1;

    if (json["authProviders"]) {
      Object.entries<Date>(json["authProviders"]).forEach(
        ([provider, date]) => {
          if (authProviderFromStr[provider]) {
            const authProvider = authProviderFromStr[provider];
            user.authProviders[authProvider] = new Date(date) || new Date(2023);
          }
        }
      );
    } else {
      user.authProviders = { [AuthProvider.Phone]: user.createdAt };
    }

    if (user.id === user.phoneNumber) {
      user.isVerifiedPhone = true;
    } else {
      user.isVerifiedPhone = json["isVerifiedPhone"] || false;
    }

    if (json["lastTimeConnect"]) {
      user.lastTimeConnect = new Date(json["lastTimeConnect"]) || new Date();
    }

    user.userPublicData = new UserPublicData({
      myBuisnessesIds: [],
      devices: {},
      isVerifiedPhone: user.isVerifiedPhone,
      phoneNumber: user.phoneNumber,
    });

    return user;
  }

  // customerDataFromBooking({ booking, delete = false, exclude, initDate }: { booking: Booking, delete?: boolean, exclude?: Date, initDate?: Date }): CustomerData {
  //   return {
  //     name: this.name,
  //     email: this.userPublicData.email,
  //     gender: this.gender,
  //     customerUuid: this.id,
  //     phoneNumber: this.phoneNumber,
  //     isVerifiedPhone: this.isVerifiedPhone,
  //     userFirstBookingsDate: this.bookings.firstBookingForBusiness(booking.buisnessId, booking.workerId, { exclude: delete ? booking.bookingDate : exclude, initDate: delete ? initDate : booking.bookingDate }),
  //     lastBookingsDate: this.bookings.lastBookingForBusiness(booking.buisnessId, booking.workerId, { exclude: delete ? booking.bookingDate : exclude, initDate: delete ? initDate : booking.bookingDate })
  //   };
  // }

  // isSubToWaitingList({
  //   notificationTopic,
  // }: {
  //   notificationTopic: NotificationTopic;
  // }): NotificationTopic | undefined {
  //   for (const notification of Object.values(this.waitingListTopics)) {
  //     const jsonA = notificationTopic.toJson();
  //     jsonA["workerId"] = "";
  //     const jsonB = notification.toJson();
  //     jsonB["workerId"] = "";
  //     if (isEqual(jsonA, jsonB)) {
  //       return notification;
  //     }
  //   }
  //   return undefined;
  // }

  setUserPublicData(dataJson: { [key: string]: any }): void {
    this.name = dataJson["name"] || "";
    if (dataJson["devices"] && typeof dataJson["devices"] === "object") {
      Object.entries<Record<string, any>>(dataJson["devices"]).forEach(
        ([fcmId, fcmJson]) => {
          this.devices[fcmId] = Device.fromJson(fcmJson, fcmId);
        }
      );
    }
    this.gender = genderFromStr[dataJson["gender"]];
    this.phoneNumber = dataJson["phoneNumber"];
    this.id = dataJson["id"] || dataJson["phoneNumber"];
    this.userPublicData.setUserPublicData(dataJson, this);
  }

  firstEnterance(businessId: string): boolean {
    const visitedBusinesses = new Set([
      ...this.lastVisitedBuisnesses,
      ...this.lastVisitedBuisnessesRemoved,
    ]);
    return !visitedBusinesses.has(businessId);
  }

  toUserDocJson(): Record<string, any> {
    const data: Record<string, any> = {};
    data["name"] = this.name;
    data["devices"] = {};
    Object.entries(this.devices).forEach(([fcmId, fcm]) => {
      data["devices"][fcmId] = fcm.toJson();
    });
    if (this.lastTimeUpdateEmail.getTime() !== new Date(0).getTime()) {
      data["lastTimeUpdateEmail"] = this.lastTimeUpdateEmail.toISOString();
    }
    if (this.lastTimeUpdatePhone.getTime() !== new Date(0).getTime()) {
      data["lastTimeUpdatePhone"] = this.lastTimeUpdatePhone.toISOString();
    }
    data["gender"] = genderToStr[this.gender];
    data["phoneNumber"] = this.phoneNumber;
    data["id"] = this.id;
    if (Object.keys(this.termsApprovals).length > 0) {
      data["termsApprovals"] = {};
      Object.entries(this.termsApprovals).forEach(([businessId, date]) => {
        data["termsApprovals"][businessId] = date.toISOString();
      });
    }
    if (Object.keys(this.seenUpdates).length > 0) {
      data["seenUpdates"] = {};
      Object.entries(this.seenUpdates).forEach(([businessId, updates]) => {
        data["seenUpdates"][businessId] = Array.from(updates);
      });
    }
    if (this.isVerifiedPhone) {
      data["isVerifiedPhone"] = this.isVerifiedPhone;
    }
    data["preferdTipPercentage"] = this.preferdTipPercentage;
    data["revenueCatId"] = this.revenueCatId;
    if (Object.keys(this.productsIds).length > 0) {
      data["productsIds"] = {};
      Object.entries(this.productsIds).forEach(([productId, product]) => {
        data["productsIds"][productId] = product.toJson();
      });
    }
    data["pendingProductsIds"] = this.pendingProductsIds;
    data["lastCleanDate"] = this.lastCleanDate;
    data["limitOfBuisnesses"] = this.limitOfBuisnesses;
    data["lastVisitedBuisnesses"] = this.lastVisitedBuisnesses;
    data["lastVisitedBuisnessesRemoved"] = this.lastVisitedBuisnessesRemoved;
    data["businessesInfo"] = {};
    if (this.cardPaymentsPass !== "") {
      data["cardPaymentsPass"] = this.cardPaymentsPass;
    }
    Object.entries(this.businessesInfo).forEach(([businessId, info]) => {
      data["businessesInfo"][businessId] = info.toJson();
    });
    data["storyLikes"] = this.storyLikes;

    data["waitingListTopics"] = {};
    Object.entries(this.waitingListTopics).forEach(([notificationId, obj]) => {
      data["waitingListTopics"][notificationId] = obj.toJson();
    });
    data["businessTopics"] = Array.from(this.businessTopics);
    data["authProviders"] = {};
    Object.entries<Date>(this.authProviders).forEach(([provider, date]) => {
      data["authProviders"][provider] = date.toISOString();
    });
    data["paymentCards"] = {};
    Object.entries(this.paymentCards).forEach(([businessId, cards]) => {
      data["paymentCards"][businessId] = {};
      Object.entries(cards).forEach(([cardId, card]) => {
        data["paymentCards"][businessId][cardId] = card.toJson();
      });
    });
    data["createdAt"] = this.createdAt.toISOString();
    return data;
  }

  get developerId(): string {
    return this.id.replace("+", "");
  }

  toString(): string {
    return (
      JSON.stringify(this.toUserDocJson()) +
      JSON.stringify(this.userPublicData.toJson())
    );
  }
}
