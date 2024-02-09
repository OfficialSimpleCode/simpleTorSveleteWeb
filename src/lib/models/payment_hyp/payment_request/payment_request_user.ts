import { Gender, genderFromStr } from "$lib/consts/gender";
import { dateIsoStr, isoToDate } from "$lib/utils/times_utils";
import { phoneToDocId } from "$lib/utils/user";
import type TicketInfo from "./ticket_info";

export default class PaymentRequestUser {
  ///user's id
  userId: string = "";

  ///user's name
  name: string = "";

  ///user's gender
  gender: Gender = Gender.male;

  ///user's phone
  phone: string = "";

  ///payments that the user paid for that request
  payments: Record<string, Date> = {};

  ///is user exist in the users collection in firebase - is it sign to the system
  isExist: boolean = false;

  //user fcms token to send them notifications
  fcmTokens?: Set<string>;
  // is user phone is verified
  isVerifiedPhone: boolean = false;

  ///The Amount Of times that the user decline for that payment request -
  ///can be more than one if the count proprtie is more than one
  userDecline: number = 0;

  ///The amount of times the user need to pay for that payment request
  count: number = 1;

  ///tickets that connected to this user -
  /// only for user picker in the make payment request page
  tickets: Record<string, TicketInfo> = {};

  ///is user new to the request - only for adding func
  isNew: boolean = false;

  constructor({
    userId = "",
    name = "",
    gender = Gender.male,
    isVerifiedPhone = false,
    phone = "",
    isExist = true,
    userDecline = 0,
  }: {
    userId: string;
    name: string;
    gender: Gender;
    isVerifiedPhone: boolean;
    phone: string;
    isExist: boolean;
    userDecline?: number;
  }) {
    this.userId = userId;
    this.name = name;
    this.gender = gender;
    this.isVerifiedPhone = isVerifiedPhone;
    this.phone = phone;
    this.isExist = isExist;
    this.userDecline = userDecline;
  }

  get customerHashPhone(): string {
    return phoneToDocId(this.phone);
  }

  get customerPhoneAsCollection(): string {
    return this.phone.replaceAll("-", "");
  }

  get isPaid(): boolean {
    return Object.keys(this.payments).length > 0;
  }

  static fromJson(json: any, newId: string): PaymentRequestUser {
    const user = new PaymentRequestUser({
      userId: newId,
      name: json["N"] ?? "",
      gender: json["G"] ? genderFromStr[json["G"]] : Gender.male,
      isVerifiedPhone: json["IVP"] ?? false,
      phone: json["P"] ?? "",
      isExist: json["IE"] ?? true,
      userDecline: json["UD"] ?? 0,
    });
    user.count = json["C"] ?? 1;
    if (json["PY"] != null && typeof json["PY"] === "object") {
      Object.entries<string>(json["PY"]).forEach(([transactionId, dateStr]) => {
        user.payments[transactionId] = isoToDate(dateStr) ?? new Date(0);
      });
    }

    return user;
  }

  static fromPaymentRequestUser(other: PaymentRequestUser): PaymentRequestUser {
    const user = new PaymentRequestUser({
      userId: other.userId,
      name: other.name,
      gender: other.gender,
      isVerifiedPhone: other.isVerifiedPhone,
      phone: other.phone,
      isExist: other.isExist,
      userDecline: other.userDecline,
    });
    user.count = other.count;
    Object.entries(other.payments).forEach(([transactionId, date]) => {
      user.payments[transactionId] = date;
    });

    return user;
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};
    data["N"] = this.name;
    if (this.isVerifiedPhone) {
      data["IVP"] = this.isVerifiedPhone;
    }
    if (!this.isExist) {
      data["IE"] = this.isExist;
    }
    if (this.count > 0) {
      data["C"] = this.count;
    }
    data["P"] = this.phone;
    if (this.gender !== Gender.male) {
      data["G"] = Gender[this.gender];
    }
    if (Object.keys(this.payments).length > 0) {
      data["PY"] = {};
      Object.entries<Date>(this.payments).forEach(([transactionId, date]) => {
        data["PY"][transactionId] = dateIsoStr(date);
      });
    }
    if (this.userDecline > 0) {
      data["UD"] = this.userDecline;
    }
    return data;
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, "  ");
  }
}
