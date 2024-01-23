import { Gender } from "$lib/consts/gender";
import { laterDate } from "$lib/utils/dates_utils";
import { hashId } from "$lib/utils/encryptions";
import { firstDate } from "$lib/utils/times_utils/times_utils";
import { phoneToDocId } from "$lib/utils/user";
import MultiBookingUser from "../multi_booking/multi_booking_user";
import PaymentRequestUser from "../payment_hyp/payment_request/payment_request_user";
import PublicCustomer from "../worker/public_customer";
import type WorkerModel from "../worker/worker_model";

export const minBookingCountToRegular: number = 3;

export enum CustomerTypes {
  regular,
  returned,
  fresh,
  missing,
  any,
  self,
  blocked,
  deleted,
}

export const customerTypesToStr: Map<CustomerTypes, string> = new Map([
  [CustomerTypes.regular, "RegularClient"],
  [CustomerTypes.returned, "ReturnedClient"],
  [CustomerTypes.fresh, "NewClient"],
  [CustomerTypes.missing, "MissingClient"],
  [CustomerTypes.self, "selfClient"],
  [CustomerTypes.deleted, "deleted"],
  [CustomerTypes.blocked, "blockedMale"],
  [CustomerTypes.any, "All"],
]);

export const customerTypesToColor: Map<CustomerTypes, string> = new Map([
  [CustomerTypes.fresh, "green"],
  [CustomerTypes.regular, "blue"],
  [CustomerTypes.blocked, "black"],
  [CustomerTypes.returned, "yellow"],
  [CustomerTypes.deleted, "red"],
  [CustomerTypes.self, "orange"],
]);

export default class CustomerData {
  name: string = ""; //the name that the user gave
  workerNaming: string = ""; //the name of the user that the worker gave
  phoneNumber: string = "";
  freeFromPayments: boolean = false;
  isExapmle: boolean = false;
  id: string = "";
  customerUuid: string = "";
  blocked: boolean = false;
  isVerifiedPhone: boolean = false;
  email: string = "";
  addedManually: boolean = false;
  gender: Gender = Gender.male;
  amoutOfBookings: number = 0;
  firstBookingsDate: Date | null;
  userFirstBookingsDate: Date | null;
  lastBookingsDate: Date | null;
  belongings: Set<string> = new Set<string>();
  isDeleted: boolean = false;

  constructor({});
  constructor({
    name = "",
    amoutOfBookings = 0,
    gender = Gender.male,
    email = "",
    id = "",
    freeFromPayments = false,
    addedManually = false,
    customerUuid = "",
    isVerifiedPhone = false,
    workerNaming = "",
    blocked = false,
    phoneNumber = "",
    firstBookingsDate,
    userFirstBookingsDate,
    lastBookingsDate,
  }: {
    name?: string;
    amoutOfBookings?: number;
    gender?: Gender;
    email?: string;
    id?: string;
    freeFromPayments?: boolean;
    addedManually?: boolean;
    customerUuid?: string;
    isVerifiedPhone?: boolean;
    workerNaming?: string;
    blocked?: boolean;
    phoneNumber?: string;
    firstBookingsDate: Date | null;
    userFirstBookingsDate: Date | null;
    lastBookingsDate: Date | null;
  }) {
    this.name = name;
    this.amoutOfBookings = amoutOfBookings;
    this.gender = gender;
    this.email = email;
    this.id = id;
    this.freeFromPayments = freeFromPayments;
    this.addedManually = addedManually;
    this.customerUuid = customerUuid;
    this.isVerifiedPhone = isVerifiedPhone;
    this.workerNaming = workerNaming;
    this.blocked = blocked;
    this.phoneNumber = phoneNumber;
    this.firstBookingsDate = firstBookingsDate;
    this.userFirstBookingsDate = userFirstBookingsDate;
    this.lastBookingsDate = lastBookingsDate;
  }

  static fromJson(json: { [key: string]: any }, uuid: string): CustomerData {
    const customerData: CustomerData = new CustomerData({});
    customerData.name = json["name"] ?? "";
    if (json["gender"] != null) {
      customerData.gender = customerData.getGenderFromStr(json["gender"]);
    }
    customerData.isVerifiedPhone = json["isVerifiedPhone"] ?? false;
    customerData.freeFromPayments = json["freeFromPayments"] ?? false;
    customerData.customerUuid = uuid;
    customerData.phoneNumber =
      json["phoneNumber"] ??
      (uuid.length < 20 && uuid.includes("-") ? uuid : "");
    if (json["firstBookingsDate"] != "" && json["firstBookingsDate"] != null) {
      customerData.firstBookingsDate = new Date(json["firstBookingsDate"]);
    }
    if (
      json["userFirstBookingsDate"] != "" &&
      json["userFirstBookingsDate"] != null
    ) {
      customerData.userFirstBookingsDate = new Date(
        json["userFirstBookingsDate"]
      );
      if (
        customerData.firstBookingsDate == null ||
        customerData.userFirstBookingsDate < customerData.firstBookingsDate
      ) {
        customerData.firstBookingsDate = customerData.userFirstBookingsDate;
      }
    }
    if (json["lastBookingsDate"] != null) {
      customerData.lastBookingsDate = new Date(json["lastBookingsDate"]);
    }
    customerData.workerNaming = json["workerNaming"] ?? "";
    customerData.amoutOfBookings = json["amoutOfBookings"] ?? 0;
    customerData.blocked = json["blocked"] ?? false;
    customerData.email = json["email"] ?? "";
    customerData.id = json["id"] ?? "";
    customerData.addedManually = json["AM"] ?? false;

    return customerData;
  }

  fromCustomerData(customerData: CustomerData): CustomerData {
    this.name = customerData.name;
    this.gender = customerData.gender;
    this.isVerifiedPhone = customerData.isVerifiedPhone;
    this.phoneNumber = customerData.phoneNumber;
    this.belongings = customerData.belongings;
    this.email = customerData.email;
    this.isDeleted = customerData.isDeleted;
    this.blocked = customerData.blocked;
    this.id = customerData.id;
    this.addedManually = customerData.addedManually;
    this.freeFromPayments = customerData.freeFromPayments;
    this.customerUuid = customerData.customerUuid;
    this.workerNaming = customerData.workerNaming;
    this.firstBookingsDate = customerData.firstBookingsDate;
    this.lastBookingsDate = customerData.lastBookingsDate;
    this.amoutOfBookings = customerData.amoutOfBookings;
    this.userFirstBookingsDate = customerData.userFirstBookingsDate;

    return this;
  }

  get nameForWorker(): string {
    return this.workerNaming == "" ? this.name : this.workerNaming;
  }

  get getFirstDate(): Date | null {
    if (
      this.firstBookingsDate == null ||
      (this.userFirstBookingsDate != null &&
        this.userFirstBookingsDate < this.firstBookingsDate)
    ) {
      return this.userFirstBookingsDate;
    }
    return this.firstBookingsDate;
  }

  get customerHashPhone(): string {
    return phoneToDocId(this.phoneNumber);
  }

  get customerPhoneAsCollection(): string {
    return this.phoneNumber.replaceAll("-", "");
  }

  isTheSameAs(
    customerData: CustomerData,
    { withId = false }: { withId?: boolean } = {}
  ): boolean {
    const jsonA = this.toJson();
    if (withId) {
      jsonA["id"] = customerData.customerUuid;
    }
    const jsonB = customerData.toJson();
    if (withId) {
      jsonB["id"] = this.customerUuid;
    }
    return JSON.stringify(jsonB) === JSON.stringify(jsonA);
  }

  getType({
    bookingInMonthForRegularClient,
    worker,
  }: {
    bookingInMonthForRegularClient: number;
    worker: WorkerModel;
  }): CustomerTypes {
    if (worker.id === this.customerUuid) {
      return CustomerTypes.self;
    }
    if (this.isDeleted) {
      return CustomerTypes.deleted;
    }
    if (this.amoutOfBookings <= minBookingCountToRegular) {
      return CustomerTypes.fresh;
    }
    return this.amountOfBookingsInMonth() < bookingInMonthForRegularClient
      ? CustomerTypes.returned
      : CustomerTypes.regular;
  }

  getGenderFromStr(genderStr: string | undefined): Gender {
    if (genderStr == null || genderStr == "A") {
      return Gender.anonymous;
    }
    return genderStr == "F" ? Gender.female : Gender.male;
  }

  getStrFromGender(gender: Gender): string {
    return (
      {
        [Gender.anonymous]: "A",
        [Gender.male]: "M",
        [Gender.female]: "F",
      }[gender] || "A"
    );
  }

  get toMultiBookingUser(): MultiBookingUser {
    const newMultiBookingUser = new MultiBookingUser();
    newMultiBookingUser.customerName =
      this.name != "" ? this.name : this.workerNaming;
    newMultiBookingUser.customerPhone = this.phoneNumber;
    newMultiBookingUser.customerId = this.customerUuid;
    newMultiBookingUser.userGender = this.gender;
    return newMultiBookingUser;
  }

  get toPaymentRequestUser(): PaymentRequestUser {
    return new PaymentRequestUser({
      userId: this.customerUuid,
      name: this.nameForWorker,
      gender: this.gender,
      isExist: !this.addedManually,
      isVerifiedPhone: this.isVerifiedPhone,
      phone: this.phoneNumber,
    });
  }

  isMissing(daysForMissingClient: number): boolean {
    if (this.lastBookingsDate == null) {
      return false; // missing have to visit at least onc time
    }
    return (
      (new Date().getTime() - this.lastBookingsDate.getTime()) /
        (1000 * 3600 * 24) >
      daysForMissingClient
    );
  }

  amountOfBookingsInMonth(): number {
    if (this.firstBookingsDate == null) {
      return -1;
    }
    if (this.lastBookingsDate == null) {
      return 0;
    }
    const lastestDate: Date =
      this.lastBookingsDate > new Date() ? new Date() : this.lastBookingsDate;
    const days: number = Math.max(
      (lastestDate.getTime() - this.firstBookingsDate.getTime()) /
        (1000 * 3600 * 24),
      1
    );
    return (this.amoutOfBookings / days) * 30;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    if (this.name !== "") {
      data["name"] = this.name;
    }
    if (this.gender !== Gender.male) {
      data["gender"] = this.getStrFromGender(this.gender);
    }
    if (this.phoneNumber !== this.id) {
      data["phoneNumber"] = this.phoneNumber;
    }
    if (this.firstBookingsDate != null) {
      data["firstBookingsDate"] = this.firstBookingsDate.toISOString();
    }
    if (this.userFirstBookingsDate != null) {
      data["userFirstBookingsDate"] = this.userFirstBookingsDate.toISOString();
    }
    if (this.lastBookingsDate != null) {
      data["lastBookingsDate"] = this.lastBookingsDate.toISOString();
    }
    if (this.amoutOfBookings !== 0) {
      data["amoutOfBookings"] = this.amoutOfBookings;
    }
    if (this.isVerifiedPhone) {
      data["isVerifiedPhone"] = this.isVerifiedPhone;
    }
    data["freeFromPayments"] = this.freeFromPayments;
    if (this.email !== "") {
      data["email"] = this.email;
    }
    data["blocked"] = this.blocked;
    if (this.id !== "") {
      data["id"] = this.id;
    }
    if (this.addedManually) {
      data["AM"] = this.addedManually;
    }
    if (this.workerNaming !== "") {
      data["workerNaming"] = this.workerNaming;
    }
    return data;
  }

  toMinimalJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data["N"] = this.name !== "" ? this.name : this.workerNaming;
    data["G"] = this.getStrFromGender(this.gender);
    data["P"] = this.phoneNumber;
    if (this.phoneNumber !== this.customerUuid) {
      data["CU"] = this.customerUuid;
    }
    if (this.email !== "") {
      data["E"] = this.email;
    }
    if (this.id !== "") {
      data["ID"] = this.id;
    }
    return data;
  }

  merge(other: CustomerData): CustomerData {
    if (!other.addedManually && this.addedManually) {
      this.email = other.email !== "" ? other.email : this.email;
      this.name = other.name !== "" ? other.name : this.name;
      this.addedManually = false;
      this.customerUuid = other.customerUuid;
    }
    if (this.workerNaming === "") {
      this.workerNaming = other.workerNaming;
    }
    this.isVerifiedPhone = other.isVerifiedPhone || this.isVerifiedPhone;
    this.gender = this.gender;
    this.blocked = other.blocked || this.blocked;
    this.lastBookingsDate = laterDate(
      other.lastBookingsDate,
      this.lastBookingsDate
    );
    this.firstBookingsDate = firstDate(
      other.firstBookingsDate,
      this.firstBookingsDate
    );
    this.userFirstBookingsDate = firstDate(
      other.userFirstBookingsDate,
      this.userFirstBookingsDate
    );
    this.amoutOfBookings += other.amoutOfBookings;
    return this;
  }

  fromMinimalJson(json: { [key: string]: any }): CustomerData {
    this.workerNaming = json["N"] ?? "";
    this.name = json["N"] ?? "";
    if (json["G"] != null) {
      this.gender = this.getGenderFromStr(json["gender"]);
    }
    this.addedManually = json["AM"] ?? false;
    this.phoneNumber = json["P"] ?? "";
    this.customerUuid = json["CU"] ?? json["P"] ?? "";
    this.email = json["E"] ?? "";
    this.id = json["ID"] ?? "";

    return this;
  }

  get publicCustomer(): PublicCustomer {
    return new PublicCustomer({
      freeFromPayments: this.freeFromPayments,
      blocked: this.blocked,
      hashNumber: hashId({ id: this.customerUuid }),
    });
  }

  belongingsNames(workers: Map<string, WorkerModel>): string {
    return Array.from(this.belongings)
      .map((workerId) => workers.get(workerId)?.name ?? "")
      .join(", ");
  }

  get forUpdate(): CustomerData {
    const customerData: CustomerData = new CustomerData({});
    customerData.name = this.name;
    customerData.gender = this.gender;
    customerData.isVerifiedPhone = this.isVerifiedPhone;
    customerData.phoneNumber = this.phoneNumber;
    customerData.belongings = this.belongings;
    customerData.email = this.email;
    customerData.isDeleted = this.isDeleted;
    customerData.blocked = this.blocked;
    customerData.id = this.id;
    customerData.addedManually = this.addedManually;
    customerData.freeFromPayments = this.freeFromPayments;
    customerData.customerUuid = this.customerUuid;
    customerData.workerNaming = this.workerNaming;
    customerData.firstBookingsDate = null;
    customerData.userFirstBookingsDate = null;
    customerData.amoutOfBookings = 0;
    customerData.lastBookingsDate = null;

    return customerData;
  }

  // toCustomerStatisticsData(): CustomerStatisticsData {
  //   return {
  //     phoneNumber: this.phoneNumber,
  //     userId: this.customerUuid,
  //     name: this.nameForWorker,
  //     gender: this.gender,
  //   };
  // }

  toString(): string {
    return JSON.stringify(this.toJson(), null, "  ");
  }
}