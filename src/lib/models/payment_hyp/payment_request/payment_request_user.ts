import { Gender, genderFromStr } from "$lib/consts/gender";
import { phoneToDocId } from "$lib/utils/user";

export default class PaymentRequestUser {
  userId: string = "";
  name: string = "";
  gender: Gender = Gender.male;
  phone: string = "";
  payments: Record<string, Date> = {};
  isExist: boolean = false;
  fcmTokens?: Set<string>;
  isVerifiedPhone: boolean = false;
  userDecline: boolean = false;

  constructor({
    userId = "",
    name = "",
    gender = Gender.male,
    isVerifiedPhone = false,
    phone = "",
    isExist = true,
    userDecline = false,
  }: {
    userId: string;
    name: string;
    gender: Gender;
    isVerifiedPhone: boolean;
    phone: string;
    isExist: boolean;
    userDecline?: boolean;
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
      userDecline: json["UD"] ?? false,
    });

    if (json["PY"] != null && typeof json["PY"] === "object") {
      Object.entries<string>(json["PY"]).forEach(([transactionId, dateStr]) => {
        user.payments[transactionId] = dateStr
          ? new Date(dateStr)
          : new Date(0);
      });
    }

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
    data["P"] = this.phone;
    if (this.gender !== Gender.male) {
      data["G"] = Gender[this.gender];
    }
    if (Object.keys(this.payments).length > 0) {
      data["PY"] = {};
      Object.entries<Date>(this.payments).forEach(([transactionId, date]) => {
        data["PY"][transactionId] = date.toString();
      });
    }
    if (this.userDecline) {
      data["UD"] = this.userDecline;
    }
    return data;
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, "  ");
  }
}
