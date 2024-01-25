import type { BookingReminderType } from "$lib/consts/booking";
import { recurrenceBookingsDoc } from "$lib/consts/db";
import { Gender, genderFromStr, genderToStr } from "$lib/consts/gender";
import {
  monthStrToDate,
  setToStartOfMonth,
} from "$lib/utils/times_utils/times_utils";
import Booking from "../booking/booking_model";
import CustomerData from "../general/customer_data";
import Device from "../general/device";
import LocalDocReference from "../general/local_doc_reference";
import BookingsPreview from "./booking_month_preview";
import type UserBookings from "./bookings";

export default class UserPublicData {
  email: string = "";
  name: string = "";
  phoneNumber: string = "";
  id: string = "";
  devices: Map<string, Device> = new Map();
  gender: Gender = Gender.anonymous;
  myBuisnessesIds: string[] = [];
  reminders?: {
    [key in BookingReminderType]?: Booking[];
  };
  clientAt: Map<string, Set<string>> = new Map();
  hasNotificationPermission: boolean = true;
  permission: Map<string, number> = new Map();
  tempFcm?: string;
  allowAppNotification: boolean = true;
  isVerifiedPhone: boolean = false;
  isVerifiedEmail: boolean = false;
  invoiceCounter?: number;
  newWorkerWelcomes: Set<string> = new Set();
  bookings?: Map<string, Booking> = new Map();
  bookingsPreviews: Map<string, BookingsPreview> = new Map();
  bookingsDocsToLoad: Set<string> = new Set();
  localDocsToDelete: Set<LocalDocReference> = new Set();

  constructor({
    email = "",
    isVerifiedPhone = false,
    isVerifiedEmail = false,
    name = "",
    phoneNumber = "",
    id = "",
    gender = Gender.anonymous,
    devices = new Map(),
  }: {
    email?: string;
    isVerifiedPhone?: boolean;
    isVerifiedEmail?: boolean;
    name?: string;
    phoneNumber?: string;
    id?: string;
    gender?: Gender;
    devices?: Map<string, Device>;
  }) {
    this.email = email;
    this.isVerifiedPhone = isVerifiedPhone;
    this.isVerifiedEmail = isVerifiedEmail;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.id = id;
    this.gender = gender;
    this.devices = devices;
  }

  static fromJson(
    dataJson: { [key: string]: any },
    bookings?: UserBookings
  ): UserPublicData {
    const userPublicData = new UserPublicData({
      email: dataJson["email"],
      isVerifiedPhone: dataJson["isVerifiedPhone"],
      isVerifiedEmail: dataJson["isVerifiedEmail"],
      name: dataJson["name"],
      phoneNumber: dataJson["phoneNumber"],
      id: dataJson["id"],
      gender: dataJson["gender"],
    });
    userPublicData.setUserPublicData(dataJson, bookings);
    return userPublicData;
  }

  get customerData(): CustomerData {
    return new CustomerData({
      customerUuid: this.id,
      name: this.name,
      email: this.email,
      isVerifiedPhone: this.isVerifiedPhone,
      gender: this.gender,
      phoneNumber: this.phoneNumber,
    });
  }

  // get singleTicket(): MultiBookingUsersPerCustomer {
  //   const newCustomerData = this.customerData;
  //   /const id = uuidv1();
  //   const multiBookingUser = newCustomerData.toMultiBookingUser;
  //   multiBookingUser.userBookingId = id;
  //   return new MultiBookingUsersPerCustomer({
  //     customer: newCustomerData,
  //     multiBookingUsers: { [id]: multiBookingUser },
  //   });
  // }

  setUserPublicData(
    dataJson: Record<string, any>,
    bookings?: UserBookings
  ): void {
    this.permission = new Map();
    this.myBuisnessesIds = [];
    this.isVerifiedEmail = dataJson["isVerifiedEmail"] || false;
    this.email = dataJson["email"] || "";
    this.allowAppNotification = dataJson["allowAppNotification"] || true;
    this.email = dataJson["email"] || "";
    this.name = dataJson["name"] || "";
    this.clientAt = new Map();
    if (dataJson["clientAt"]) {
      Object.entries<Record<string, string>>(dataJson["clientAt"]).forEach(
        ([businessId, workerIds]) => {
          if (Object.keys(workerIds).length === 0) {
            return;
          }
          this.clientAt.set(businessId, new Set());

          Object.keys(workerIds).forEach((workerId) => {
            this.clientAt.set(
              businessId,
              this.clientAt.get(businessId)!.add(workerId)
            );
          });
        }
      );
    }
    if (dataJson["localDocsToDelete"]) {
      this.localDocsToDelete = new Set();
      dataJson["localDocsToDelete"].forEach((localDocJson: any) => {
        this.localDocsToDelete.add(LocalDocReference.fromJson(localDocJson));
      });
    }
    this.invoiceCounter = dataJson["invoiceCounter"];
    this.devices = new Map();
    if (dataJson["devices"] && typeof dataJson["devices"] === "object") {
      Object.entries<Record<string, any>>(dataJson["devices"]).forEach(
        ([deviceId, deviceJson]) => {
          this.devices.set(deviceId, Device.fromJson(deviceJson, deviceId));
        }
      );
    } else if (dataJson["currentFcm"] && dataJson["currentFcm"] !== "") {
      this.tempFcm = dataJson["currentFcm"];
    }
    this.hasNotificationPermission =
      dataJson["hasNotificationPermission"] || true;
    if (dataJson["gender"]) {
      this.gender = genderFromStr[dataJson["gender"]] || Gender.anonymous;
    }
    this.phoneNumber = dataJson["phoneNumber"] || "";
    this.id = dataJson["id"] || dataJson["phoneNumber"] || "";
    if (dataJson["permission"]) {
      Object.entries<number>(dataJson["permission"]).forEach(
        ([businessId, codePermission]) => {
          if (codePermission === 2) this.myBuisnessesIds.push(businessId);
          this.permission.set(businessId, codePermission);
        }
      );
    }
    if (dataJson["bookings"]) {
      this.bookings = new Map();
      Object.entries<Record<string, any>>(dataJson["bookings"]).forEach(
        ([bookingId, bookingJson]) => {
          const bookingObj = Booking.fromJson(bookingJson, bookingId);
          if (bookingObj.cancelDate) {
            return;
          }
          this.bookings!.set(bookingId, bookingObj);
        }
      );
    }
    this.bookingsDocsToLoad = new Set();
    if (dataJson["bookingsPreviews"]) {
      const newPreviews: Map<string, BookingsPreview> = new Map();
      Object.entries<Record<string, any>>(dataJson["bookingsPreviews"]).forEach(
        ([docId, previewJson]) => {
          newPreviews.set(docId, BookingsPreview.fromJson(previewJson, docId));
        }
      );
      newPreviews.forEach((preview, docId) => {
        if (
          this.bookingsPreviews.get(docId)?.lastUpdateTime !==
            preview.lastUpdateTime &&
          (docId === recurrenceBookingsDoc ||
            monthStrToDate(docId) >= setToStartOfMonth(new Date()) ||
            (bookings?.passedBookings?.hasOwnProperty(docId) ?? false))
        ) {
          this.bookingsDocsToLoad.add(docId);
        }
      });
      this.bookingsPreviews = newPreviews;
    }
    if (this.id === this.phoneNumber) {
      this.isVerifiedPhone = true;
    } else {
      this.isVerifiedPhone = dataJson["isVerifiedPhone"] || false;
    }
    this.newWorkerWelcomes = new Set();
    if (dataJson["newWorkerWelcomes"]) {
      Object.keys(dataJson["newWorkerWelcomes"]).forEach((businessId) => {
        this.newWorkerWelcomes.add(businessId);
      });
    }
  }

  get fcmsTokens(): Set<string> {
    if (!this.allowAppNotification) {
      return new Set();
    }
    if (this.tempFcm) {
      return new Set(this.tempFcm);
    }
    const setFcmsTokens: Set<string> = new Set();
    Object.values(this.devices).forEach((device) => {
      if (device.activeNotifications) {
        setFcmsTokens.add(device.token);
      }
    });
    return setFcmsTokens;
  }

  getDevicesByToken(token: string): Device[] {
    const sameTokenDevices: Device[] = [];
    Object.values(this.devices).forEach((device) => {
      if (device.token === token) {
        sameTokenDevices.push(Device.fromDevice(device));
      }
    });
    return sameTokenDevices;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    if (!this.hasNotificationPermission) {
      data["hasNotificationPermission"] = this.hasNotificationPermission;
    }
    if (this.isVerifiedPhone) {
      data["isVerifiedPhone"] = this.isVerifiedPhone;
    }
    if (this.isVerifiedEmail) {
      data["isVerifiedEmail"] = this.isVerifiedEmail;
    }
    if (this.email !== "") {
      data["email"] = this.email;
    }
    if (Object.keys(this.bookingsPreviews).length > 0) {
      data["bookingsPreviews"] = {};
      Object.entries(this.bookingsPreviews).forEach(([monthStr, preview]) => {
        data["bookingsPreviews"][monthStr] = preview.toJson();
      });
    }
    if (!this.allowAppNotification) {
      data["allowAppNotification"] = this.allowAppNotification;
    }
    data["permission"] = {};
    Object.entries(this.permission).forEach(([businessId, codePermission]) => {
      data["permission"][businessId] = codePermission;
    });
    if (this.localDocsToDelete.size > 0) {
      data["localDocsToDelete"] = [];
      this.localDocsToDelete.forEach((localDoc) => {
        data["localDocsToDelete"].push(localDoc.toJson());
      });
    }
    data["email"] = this.email;
    data["name"] = this.name;
    data["devices"] = {};
    this.devices.forEach((device, deviceId) => {
      data["devices"][deviceId] = device.toJson();
    });
    data["clientAt"] = {};
    this.clientAt.forEach((workerIds, businessId) => {
      data["clientAt"][businessId] = {};
      workerIds.forEach((workerId) => {
        data["clientAt"][businessId][workerId] = "";
      });
    });
    data["gender"] = genderToStr[this.gender];
    data["phoneNumber"] = this.phoneNumber;
    data["id"] = this.id;
    if (this.newWorkerWelcomes.size > 0) {
      data["newWorkerWelcomes"] = {};
      this.newWorkerWelcomes.forEach((businessId) => {
        data["newWorkerWelcomes"][businessId] = "";
      });
    }
    return data;
  }
}
