

class PaymentRequestUser {
  userId: string = "";
  name: string = "";
  gender: Gender = Gender.male;
  phone: string = "";
  payments: Map<string, Date> = new Map();
  isExist: boolean = false;
  fcmTokens?: Set<string>;
  isVerifiedPhone: boolean = false;
  userDecline: boolean = false;

  constructor(
    userId: string,
    name: string,
    gender: Gender,
    isVerifiedPhone: boolean,
    phone: string,
    isExist: boolean,
    userDecline: boolean = false
  ) {
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
    return this.payments.size > 0;
  }

  static fromJson(json: any, newId: string): PaymentRequestUser {
    const user = new PaymentRequestUser(
      newId,
      json["N"] ?? "",
      json["G"] ? Gender[json["G"]] : Gender.male,
      json["IVP"] ?? false,
      json["P"] ?? "",
      json["IE"] ?? true,
      json["UD"] ?? false
    );

    if (json["PY"] != null && typeof json["PY"] === "object") {
      Object.entries(json["PY"]).forEach(([transactionId, dateStr]) => {
        user.payments.set(
          transactionId,
          dateStr ? new Date(dateStr) : new Date(0)
        );
      });
    }

    return user;
  }

  toJson(): any {
    const data: any = {};
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
    if (this.payments.size > 0) {
      data["PY"] = {};
      this.payments.forEach((date, transactionId) => {
        data["PY"][transactionId] = date.toString();
      });
    }
    if (this.userDecline) {
      data["UD"] = this.userDecline;
    }
    return data;
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, '  ');
  }
}


