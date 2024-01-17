import { v1 as uuidv1 } from 'uuid';
import { BookingReminderType } from '../../app_const/booking';
import { Gender } from '../../app_const/gender';
import { Booking } from '../booking/booking_model';
import { CustomerData } from '../general/customer_data';
import { Device } from '../general/device';
import { LocalDocReference } from '../general/local_doc_reference';
import { MultiBookingUsersPerCustomer } from '../multi_booking/multi_booking_users_per_customer';
import { BookingsPreview } from './booking_month_preview';

class UserPublicData {
  email: string = "";
  name: string = "";
  phoneNumber: string = "";
  id: string = '';
  devices: { [key: string]: Device } = {};
  gender: Gender = Gender.anonymous;
  myBuisnessesIds: string[] = [];
  clientAt: { [key: string]: Set<string> } = {};
  hasNotificationPermission: boolean = true;
  permission: { [key: string]: number } = {};
  tempFcm?: string;
  allowAppNotification: boolean = true;
  isVerifiedPhone: boolean = false;
  isVerifiedEmail: boolean = false;
  invoiceCounter?: number;
  reminders?: { [key in BookingReminderType]: Booking[] };
  newWorkerWelcomes: Set<string> = new Set();
  bookings?: { [key: string]: Booking };
  bookingsPreviews: { [key: string]: BookingsPreview } = {};
  bookingsDocsToLoad: Set<string> = new Set();
  localDocsToDelete: Set<LocalDocReference> = new Set();

  constructor(data: {
    email?: string,
    isVerifiedPhone?: boolean,
    isVerifiedEmail?: boolean,
    name?: string,
    phoneNumber?: string,
    id?: string,
    gender?: Gender,
    devices: { [key: string]: Device },
    myBuisnessesIds: string[],
    bookings?: { [key: string]: Booking }
  }) {
    this.email = data.email || "";
    this.isVerifiedPhone = data.isVerifiedPhone || false;
    this.isVerifiedEmail = data.isVerifiedEmail || false;
    this.name = data.name || "";
    this.phoneNumber = data.phoneNumber || "";
    this.id = data.id || '';
    this.gender = data.gender || Gender.anonymous;
    this.devices = data.devices;
    this.myBuisnessesIds = data.myBuisnessesIds;
    this.bookings = data.bookings;
  }

  static fromJson(dataJson: { [key: string]: any }, user?: User): UserPublicData {
    const userPublicData = new UserPublicData({
      email: dataJson["email"],
      isVerifiedPhone: dataJson["isVerifiedPhone"],
      isVerifiedEmail: dataJson["isVerifiedEmail"],
      name: dataJson['name'],
      phoneNumber: dataJson["phoneNumber"],
      id: dataJson['id'],
      gender: dataJson['gender'],
      devices: dataJson["devices"],
      myBuisnessesIds: dataJson["myBuisnessesIds"],
      bookings: dataJson["bookings"]
    });
    userPublicData.setUserPublicData(dataJson, user);
    return userPublicData;
  }

  get customerData(): CustomerData {
    return new CustomerData({
      customerUuid: this.id,
      name: this.name,
      email: this.email,
      isVerifiedPhone: this.isVerifiedPhone,
      gender: this.gender,
      phoneNumber: this.phoneNumber
    });
  }

  get singleTicket(): MultiBookingUsersPerCustomer {
    const newCustomerData = this.customerData;
    const id = uuidv1();
    const multiBookingUser = newCustomerData.toMultiBookingUser;
    multiBookingUser.userBookingId = id;
    return new MultiBookingUsersPerCustomer({
      customer: newCustomerData,
      multiBookingUsers: { [id]: multiBookingUser }
    });
  }

  setUserPublicData(dataJson: { [key: string]: any }, user?: User): void {
    this.permission = {};
    this.myBuisnessesIds = [];
    this.isVerifiedEmail = dataJson["isVerifiedEmail"] || false;
    this.email = dataJson["email"] || "";
    this.allowAppNotification = dataJson["allowAppNotification"] || true;
    this.email = dataJson["email"] || "";
    this.name = dataJson['name'] || "";
    this.clientAt = {};
    if (dataJson["clientAt"]) {
      Object.entries(dataJson["clientAt"]).forEach(([businessId, workerIds]) => {
        if (Object.keys(workerIds).length === 0) {
          return;
        }
        this.clientAt[businessId] = new Set();
        Object.keys(workerIds).forEach((workerId) => {
          this.clientAt[businessId].add(workerId);
        });
      });
    }
    if (dataJson["localDocsToDelete"]) {
      this.localDocsToDelete = new Set();
      dataJson["localDocsToDelete"].forEach((localDocJson: any) => {
        this.localDocsToDelete.add(LocalDocReference.fromJson(localDocJson));
      });
    }
    this.invoiceCounter = dataJson["invoiceCounter"];
    this.devices = {};
    if (dataJson["devices"] && typeof dataJson["devices"] === 'object') {
      Object.entries(dataJson["devices"]).forEach(([fcmId, fcmJson]) => {
        this.devices[fcmId] = Device.fromJson(fcmJson, fcmId);
      });
    } else if (dataJson["currentFcm"] && dataJson["currentFcm"] !== "") {
      this.tempFcm = dataJson["currentFcm"];
    }
    this.hasNotificationPermission = dataJson["hasNotificationPermission"] || true;
    if (dataJson['gender']) {
      this.gender = genderFromStr[dataJson['gender']] || Gender.anonymous;
    }
    this.phoneNumber = dataJson["phoneNumber"] || "";
    this.id = dataJson['id'] || dataJson['phoneNumber'] || "";
    if (dataJson["permission"]) {
      Object.entries(dataJson["permission"]).forEach(([businessId, codePermission]) => {
        if (codePermission === 2) this.myBuisnessesIds.push(businessId);
        this.permission[businessId] = codePermission;
      });
    }
    if (dataJson["bookings"]) {
      this.bookings = {};
      Object.entries(dataJson["bookings"]).forEach(([bookingId, bookingJson]) => {
        const bookingObj = Booking.fromJson(bookingJson, bookingId);
        if (bookingObj.cancelDate) {
          return;
        }
        this.bookings[bookingId] = bookingObj;
      });
    }
    this.bookingsDocsToLoad = new Set();
    if (dataJson["bookingsPreviews"]) {
      const newPreviews: { [key: string]: BookingsPreview } = {};
      Object.entries(dataJson["bookingsPreviews"]).forEach(([docId, previewJson]) => {
        newPreviews[docId] = BookingsPreview.fromJson(previewJson, docId);
      });
      Object.entries(newPreviews).forEach(([docId, preview]) => {
        if (
          this.bookingsPreviews[docId]?.lastUpdateTime !== preview.lastUpdateTime &&
          (docId === recurrenceBookingsDoc ||
            !monthStrToDate(docId).isBefore(setToStartOfMonth(new Date())) ||
            (user?.bookings.passedBookings?.hasOwnProperty(docId) ?? false))
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

  get fcmsTokens(): string[] {
    if (!this.allowAppNotification) {
      return [];
    }
    if (this.tempFcm) {
      return [this.tempFcm];
    }
    const setFcmsTokens: string[] = [];
    Object.values(this.devices).forEach((device) => {
      if (device.activeNotifications) {
        setFcmsTokens.push(device.token);
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
    data['name'] = this.name;
    data["devices"] = {};
    Object.entries(this.devices).forEach(([deviceId, device]) => {
      data["devices"][deviceId] = device.toJson();
    });
    data["clientAt"] = {};
    Object.entries(this.clientAt).forEach(([businessId, workerIds]) => {
      data["clientAt"][businessId] = {};
      workerIds.forEach((workerId) => {
        data["clientAt"][businessId][workerId] = "";
      });
    });
    data['gender'] = genderToStr[this.gender];
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


