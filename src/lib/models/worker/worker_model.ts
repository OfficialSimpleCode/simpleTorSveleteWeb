import { Gender, genderFromStr, genderToStr } from "$lib/consts/gender";
import { NotificationOption } from "$lib/consts/notification";
import {
  WindowSpaces,
  windowSpacesFromStr,
  windowSpacesToStr,
} from "$lib/consts/worker";
import {
  religionFromStr,
  religionToStr,
  type Religion,
} from "$lib/consts/worker_schedule";
import { translate } from "$lib/utils/string_utilitis";
import { dateToDateStr } from "$lib/utils/times_utils/times_utils";
import { Timestamp, type Unsubscribe } from "firebase/firestore";
import Booking from "../booking/booking_model";
import type Device from "../general/device";
import type Invoice from "../payment_hyp/invoice/invoice";
import type TransactionModel from "../payment_hyp/transaction";
import type WorkerPublicData from "./worker_public_data";

export default class WorkerModel {
  //---------------------------------- workerDoc json -------------------------
  daysToAllowBookings: number = 7;
  name: string = "";
  phone: string = "";
  id: string = "";
  profileImg: string = "";
  about: string = "";
  maxTreatments: number = 5;
  allowAppNotification: boolean = true;
  religions: Religion[] = [];
  waitingListExceptionDays: Set<string> = new Set();
  closeScheduleOnHolidays: boolean = false;
  weekendDays: number[] = [5, 6];
  onHoldMinutes: number = 0;
  cancelMinutes: number = 0;
  minutesBeforeBookingToConfirm: number = 1440;
  tempFcm?: string;
  hasRecurrenceEvents: boolean = false;
  windowSpaces: WindowSpaces = WindowSpaces.shortestTreatment;
  customWindowMinute: number = 30;
  showWaitingListWhenThereIsChoises: boolean = true;
  isVerifiedPhone: boolean = false;
  lastCleanDate: Date = new Date();
  gender: Gender = Gender.anonymous;
  deleteNeerDedlineBookingMessage?: string;
  orderNeerDedlineBookingMessage?: string;
  generalBookingMessage?: string;
  closeCalendarDate?: Date;
  minDateForShowinData: Date = new Date(0);
  openCalendar: boolean = true;
  maxFutureBookings: number = 4;
  currentClientCount: number = 0;
  showVacations: boolean = true;
  mustVerifyPhone: boolean = true;
  allowBookingConfirmations: boolean = true;
  devices: { [key: string]: Device } = {};
  storyImages: { [key: string]: string } = {};
  createdAt: Date = new Date(0);
  workTime: { [key: string]: string[] } = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  };
  isCustomersNeedRecurrence: boolean = false;
  specificRangeChanges: { [key: string]: ShiftChangeRange } = {};
  treatmentsSubjects: { [key: string]: TreatmentSubject } = {};
  //----------------------------------from public worker json-------------------------------
  workerPublicData: WorkerPublicData = new WorkerPublicData({}, {});
  //----------------------------- from bookingsEvents doc -------------------
  events: Events = new Events({}, this);
  //------------------------------ from customerData doc ----------------------
  customers: Customers = new Customers({}, new CustomersDataSettings());
  //---------------------- from publicCustomersData doc -----------------
  publicCustomers: PublicCustomers = new PublicCustomers();
  // --------------------------- from local cache ---------------------------
  localData: WorkerLocalData = new WorkerLocalData();
  //------------------------------ from bookingsCollection jsons ---------------
  bookingObjects: { [key: string]: BookingsDay } = {};
  // ------------------------------ from real time database ------------------
  storylikesAmount: { [key: string]: number } = {};
  eventsCounters: EventsCounters = new EventsCounters();
  //------------------------------- from multiEventsTimes doc------------------------------
  multiEventsTimes: MultiEventsTimes = new MultiEventsTimes();
  // ----------------------------- from waiting list collection ---------------
  waitings: WorkerWaitings = new WorkerWaitings();
  //-------------------------------another vars ----------------------------
  generalBookingsCount: number = 0;
  passedBookingsCount: number = 0;
  shortBookingTime: number = 999;
  longestBookingTime: number = 0;
  recurrence: RecurrenceEvents = new RecurrenceEvents();
  notifications: WorkerNotificatiosSettings = new WorkerNotificatiosSettings(
    {}
  );
  currentMonthInvoices?: { [key: string]: Invoice };
  currentMonthPaymentRequest?: { [key: string]: PaymentRequest };
  currentMonthPayments?: { [key: string]: TransactionModel };
  existInvoicesDocs: Set<string> = new Set();
  existPaymentsDocs: Set<string> = new Set();
  existPaymentRequestsDocs: Set<string> = new Set();
  treatmentsById: { [key: string]: Treatment } = {};
  //------------------------------ listners -------------------------------
  workerDocListner?: Unsubscribe;
  constructor({
    phone = "",
    id = "",
    profileImg = "",
    about = "",
    name = "",
    daysToAllowBookings = 7,
    gender = Gender.anonymous,
    bookingObjects,
    closeCalendarDate,
    openCalendar = true,
    allowBookingConfirmations = true,
    devices,
    lastCleanDate,
    onHoldMinutes,
    treatments,
    workTime,
    specificRangeChanges,
  }: {
    phone?: string;
    id?: string;
    profileImg?: string;
    about?: string;
    name?: string;
    daysToAllowBookings?: number;
    gender?: Gender;
    bookingObjects: { [key: string]: BookingsDay };
    closeCalendarDate?: Date;
    openCalendar?: boolean;
    allowBookingConfirmations?: boolean;
    devices: { [key: string]: Device };
    lastCleanDate?: Date;
    onHoldMinutes?: number;
    treatments?: any;
    workTime?: any;
    specificRangeChanges?: any;
  }) {
    this.phone = phone;
    this.id = id;
    this.profileImg = profileImg;
    this.about = about;
    this.name = name;
    this.daysToAllowBookings = daysToAllowBookings;
    this.gender = gender;
    this.bookingObjects = bookingObjects;
    this.closeCalendarDate = closeCalendarDate;
    this.openCalendar = openCalendar;
    this.allowBookingConfirmations = allowBookingConfirmations;
    this.devices = devices;
    this.lastCleanDate = lastCleanDate;
    this.onHoldMinutes = onHoldMinutes;
    this.cancelMinutes = onHoldMinutes;
    this.workTime = workTime;
    this.specificRangeChanges = specificRangeChanges;
  }
  /// Extract the worker data from user data json
  static fromUserPublicData(json: { [key: string]: any }): WorkerModel {
    const workerModel = new WorkerModel({});
    workerModel.phone = json["phoneNumber"] || "";
    workerModel.currentClientCount = json["currentClientCount"] || 0;
    workerModel.id = json["id"] || workerModel.phone;
    workerModel.name = json["name"] || "";
    if (json["devices"] != null && typeof json["devices"] === "object") {
      Object.entries(json["devices"]).forEach(([fcmId, fcmJson]) => {
        workerModel.devices[fcmId] = Device.fromJson(fcmJson, fcmId);
      });
    } else if (json["currentFcm"] != null && json["currentFcm"] !== "") {
      workerModel.tempFcm = json["currentFcm"];
    }
    workerModel.gender = genderFromStr[json["gender"]] || Gender.anonymous;
    workerModel.lastCleanDate = new Date();
    workerModel.createdAt = new Date();
    workerModel.notifications.remindersTypes = {
      [BookingReminderType.regular]: 60,
    };
    return workerModel;
  }
  /// create new worker from that json
  ///  Dont use it if you want to update the worker
  /// it will not consider the worker publicData doc
  static fromWorkerDocJson(workerJson: { [key: string]: any }): WorkerModel {
    const workerModel = new WorkerModel({});
    workerModel.setFromWorkerDoc(workerJson);
    return workerModel;
  }
  /// Total amount of treatments in this worker
  get treatmentsLength(): number {
    let counter = 0;
    Object.values(this.treatmentsSubjects).forEach((subject) => {
      counter += Object.values(subject.treatments).length;
    });
    return counter;
  }
  /// Get date and returns the workTikes for this date
  shiftsFor({ day }: { day: Date }): string[] {
    // regular shifts
    const defaultShifts =
      this.workTime[
        day.toLocaleString("en-US", { weekday: "long" }).toLowerCase()
      ] || [];
    // specific changes
    for (const specifiRangeObj of Object.values(this.specificRangeChanges)) {
      if (
        durationStrikings(
          specifiRangeObj.start,
          new Date(
            specifiRangeObj.end.getTime() + 23 * 60 * 60 * 1000 + 59 * 60 * 1000
          ),
          day,
          day
        ) === "STRIKE"
      ) {
        // day is include in this range changing
        return specifiRangeObj.combineShifts(defaultShifts);
      }
    }
    return combinedShuffleShifts(shiftsFromStrList(defaultShifts));
  }
  // Returns whether this day is closing day or not
  isClosingDate(date: Date): boolean {
    return (
      !this.openCalendar ||
      (this.closeCalendarDate &&
        setToMidNight(this.closeCalendarDate).getTime() ===
          setToMidNight(date).getTime())
    );
  }
  getLocalBookingByEvent(eventDate: Date): Booking | undefined {
    const timeStr = format(eventDate, "HH:mm");
    const eventDay = format(eventDate, "dd-MM-yyyy");
    if (!this.bookingObjects[eventDay]) {
      return undefined;
    }
    for (const bookingObj of Object.values(
      this.bookingObjects[eventDay].bookings
    )) {
      if (
        bookingObj.cancelDate === null &&
        bookingObj.bookingWorkTimes.hasOwnProperty(timeStr)
      ) {
        return bookingObj;
      }
    }
    return undefined;
  }
  findEventTreatmentById(eventId: string): Treatment | undefined {
    let event: Treatment | undefined;
    Object.values(this.treatmentsSubjects).forEach((subject) => {
      Object.values(subject.treatments).forEach((treatment) => {
        if (treatment.id === eventId) {
          event = treatment;
        }
      });
    });
    return event;
  }
  getLocalMultiBookingByEvent(eventDate: Date): MultiBooking | undefined {
    const timeStr = format(eventDate, "HH:mm");
    const eventDay = format(eventDate, "dd-MM-yyyy");
    if (!this.bookingObjects[eventDay]) {
      return undefined;
    }
    for (const bookingObj of Object.values(
      this.bookingObjects[eventDay].multiBookings
    )) {
      if (bookingObj.timesAsJson.hasOwnProperty(timeStr)) {
        return bookingObj;
      }
    }
    return undefined;
  }
  ///  Get month end empty all the days times but keep the days as keys
  emptyBookingObjectsDatesInMonth(monthString: string): void {
    const bookingObjectsDup = { ...this.bookingObjects };
    Object.keys(bookingObjectsDup).forEach((dayString) => {
      if (dayString.includes(monthString)) {
        delete this.bookingObjects[dayString];
      }
    });
  }
  hasTreatemnt(treatmentId: string): boolean {
    for (const subject of Object.values(this.treatmentsSubjects)) {
      if (subject.containTreatment(treatmentId)) {
        return true;
      }
    }
    return false;
  }
  get useWhatsApp(): boolean {
    return (
      this.notifications.notificationOption === NotificationOption.WhatsApp ||
      this.notifications.notificationOption ===
        NotificationOption.PushOrWhatsApp
    );
  }
  /// Get workerJson and update the current worker fields
  setFromWorkerDoc(workerJson: { [key: string]: any }): void {
    this.daysToAllowBookings = workerJson["daysToAllowBookings"] || 7;
    this.profileImg = workerJson["profileImg"] || "";
    this.about = workerJson["about"] || "";
    if (workerJson["lastCleanDate"] instanceof Timestamp) {
      this.lastCleanDate = workerJson["lastCleanDate"].toDate();
    } else if (typeof workerJson["lastCleanDate"] === "string") {
      this.lastCleanDate = new Date(workerJson["lastCleanDate"]) || new Date();
    }
    if (workerJson["religions"]) {
      this.religions = workerJson["religions"].map(
        (religion: string) => religionFromStr[religion]
      );
    }
    if (workerJson["windowSpaces"]) {
      this.windowSpaces =
        windowSpacesFromStr[workerJson["windowSpaces"]] ||
        WindowSpaces.shortestTreatment;
    }
    this.isCustomersNeedRecurrence =
      workerJson["isCustomersNeedRecurrence"] || false;
    this.showWaitingListWhenThereIsChoises =
      workerJson["showWaitingListWhenThereIsChoises"] || true;
    this.customWindowMinute = workerJson["customWindowMinute"] || 30;
    this.closeScheduleOnHolidays =
      workerJson["closeScheduleOnHolidays"] || false;
    this.weekendDays = workerJson["weekendDays"] || [5, 6];
    this.mustVerifyPhone = workerJson["mustVerifyPhone"] || true;
    this.showVacations = workerJson["showVacations"] || true;
    this.gender = genderFromStr[workerJson["gender"]] || Gender.anonymous;
    this.allowAppNotification = workerJson["allowAppNotification"] || true;
    this.name = workerJson["name"] || "";
    this.maxTreatments = workerJson["maxTreatments"] || 3;
    this.phone = workerJson["phone"] || "";
    this.hasRecurrenceEvents = workerJson["hasRecurrenceEvents"] || false;
    this.id = workerJson["id"] || workerJson["phone"] || "";
    this.minutesBeforeBookingToConfirm =
      workerJson["minutesBeforeBookingToConfirm"] || 1440;
    this.maxFutureBookings = workerJson["maxFutureBookings"] || 4;
    this.treatmentsSubjects = {};
    this.treatmentsById = {};
    this.shortBookingTime = 999;
    if (workerJson["treatmentsSubjects"]) {
      // new users with subjects
      let pointerShortBookingTime = [this.shortBookingTime];
      let pointerLognestBookingTime = [this.longestBookingTime];
      Object.entries(workerJson["treatmentsSubjects"]).forEach(
        ([index, treatmentsSubject]) => {
          const subject = TreatmentSubject.fromJson(
            treatmentsSubject,
            index,
            pointerShortBookingTime,
            pointerLognestBookingTime
          );
          this.treatmentsSubjects[index] = subject;
        }
      );
      this.shortBookingTime = pointerShortBookingTime[0];
      this.longestBookingTime = pointerLognestBookingTime[0];
    } else if (workerJson["treatments"]) {
      // old users with no subjects
      const treatments: { [key: string]: Treatment } = {};
      let index = 0; //also the colorindex
      Object.entries(workerJson["treatments"]).forEach(
        ([name, treatmentJson]) => {
          const treatment = Treatment.fromOldJson(
            treatmentJson,
            index.toString(),
            name,
            index + 4
          );
          treatments[index.toString()] = treatment;
          // save the first duration of the short booking time
          if (treatment.totalMinutes < this.shortBookingTime) {
            this.shortBookingTime = Math.max(
              treatment.times["0"].workMinutes,
              5
            );
          }
          if (treatment.totalMinutes === this.shortBookingTime) {
            this.shortBookingTime = Math.min(
              Math.max(treatment.times["0"].workMinutes, 5),
              this.shortBookingTime
            );
          }
          index += 1;
        }
      );
      this.treatmentsSubjects = {
        "0": new TreatmentSubject(translate("general"), treatments, "0"),
      };
    }
    this.initialTreatmentsById();
    this.onHoldMinutes = workerJson["onHoldMinutes"] || 0;
    this.cancelMinutes = workerJson["cancelMinutes"] || 0;
    if (
      workerJson["devices"] != null &&
      typeof workerJson["devices"] === "object"
    ) {
      Object.entries(workerJson["devices"]).forEach(([fcmId, fcmJson]) => {
        this.devices[fcmId] = Device.fromJson(fcmJson, fcmId);
      });
    }
    this.deleteNeerDedlineBookingMessage =
      workerJson["deleteNeerDedlineBookingMessage"];
    this.orderNeerDedlineBookingMessage =
      workerJson["orderNeerDedlineBookingMessage"];
    this.generalBookingMessage = workerJson["generalBookingMessage"];
    this.workTime = {};
    if (workerJson["workTime"]) {
      Object.entries(workerJson["workTime"]).forEach(([key, val]) => {
        this.workTime[key] = val.map((item: any) => item as string);
      });
    }
    this.waitingListExceptionDays = new Set();
    if (workerJson["waitingListExceptionDays"]) {
      workerJson["waitingListExceptionDays"].forEach((day: string) => {
        this.waitingListExceptionDays.add(day);
      });
    }
    if (workerJson["notifications"]) {
      this.notifications = WorkerNotificatiosSettings.fromJson(
        workerJson["notifications"]
      );
    } else {
      this.notifications = new WorkerNotificatiosSettings(
        workerJson["notifyOnWaitingListEvents"] || true,
        workerJson["showAdressAlert"] || false,
        workerJson["showAdressMessage"] || false,
        workerJson["showPhoneAlert"] || false,
        workerJson["showPhoneMessage"] || false,
        {
          [BookingReminderType.regular]:
            workerJson["minutesBeforeNotify"] || 60,
        },
        workerJson["notifyOnPayments"] || true,
        workerJson["notifyAboutCancelNearDeadline"] || true,
        workerJson["notifyAboutOrderNearDeadline"] || true,
        workerJson["notifyWhenGettingBooking"] || true
      );
      if (workerJson["notificationOption"]) {
        this.notifications.notificationOption =
          notificationOptionFromStr[workerJson["notificationOption"]] ||
          NotificationOption.OnlyPush;
      }
      if (workerJson["recurrenceNotificationsLastDate"]) {
        this.notifications.recurrenceNotificationsLastDate = new Date(
          workerJson["recurrenceNotificationsLastDate"]
        );
      } else {
        this.notifications.recurrenceNotificationsLastDate = new Date();
      }
    }
    this.specificRangeChanges = {};
    if (workerJson["specificRangeChanges"]) {
      Object.entries(workerJson["specificRangeChanges"]).forEach(
        ([key, val]) => {
          const shiftRange = ShiftChangeRange.fromJson(val, key);
          // the specific range dosen't over
          if (!shiftRange.end.isBefore(setToMidNight(new Date()))) {
            this.specificRangeChanges[key] = shiftRange;
          }
        }
      );
    }
    this.storyImages = {};
    if (workerJson["storyImages"]) {
      Object.entries(workerJson["storyImages"]).forEach(([imageId, image]) => {
        this.storyImages[imageId] = image;
      });
    }
    // in not exist -> null
    if (workerJson["closeCalendarDate"]) {
      //the format is not the regular its cant
      //be changed - already used in production
      this.closeCalendarDate = parse(
        workerJson["closeCalendarDate"],
        "dd/MM/yyyy",
        new Date()
      );
    }
    if (workerJson["minDateForShowinData"]) {
      this.minDateForShowinData = dateStrToDate(
        workerJson["minDateForShowinData"]
      );
    }
    this.openCalendar = workerJson["openCalendar"] || true;
    this.allowBookingConfirmations =
      workerJson["allowBookingConfirmations"] || true;
    if (workerJson["createdAt"]) {
      this.createdAt = parse(workerJson["createdAt"], "yyyy-MM-dd", new Date());
    } else {
      this.createdAt = new Date(2023, 0, 1);
    }
    //old user auth with phone provider
    if (this.id === this.phone) {
      this.isVerifiedPhone = true;
    } else {
      this.isVerifiedPhone = workerJson["isVerifiedPhone"] || false;
    }
  }
  /// Update booking data
  addOrUpdateBookingInBookingsObjects(booking: Booking): void {
    const dateStr = format(booking.bookingDate, "dd-MM-yyyy");
    this.bookingObjects[dateStr] ||= new BookingsDay(dateStr);
    this.bookingObjects[dateStr].bookings[booking.bookingId] = booking;
  }
  /// Update booking data
  addOrUpdateMultiBookingInBookingsObjects(multiBooking: MultiBooking): void {
    const dateStr = format(multiBooking.bookingDate, "dd-MM-yyyy");
    this.bookingObjects[dateStr] ||= new BookingsDay(dateStr);
    this.bookingObjects[dateStr].multiBookings[multiBooking.bookingId] =
      multiBooking;
  }
  // Update booking data
  removeMultiBookingInBookingsObjects(multiBooking: MultiBooking) {
    const dateStr = dateToDateStr(multiBooking.bookingDate);
    if (
      this.bookingObjects[dateStr] != null &&
      this.bookingObjects[dateStr].multiBookings[multiBooking.bookingId] != null
    ) {
      delete this.bookingObjects[dateStr].bookings[multiBooking.bookingId];
    }
  }
  // Update booking data
  removeBookingInBookingsObjects(booking: Booking) {
    const dateStr = dateToDateStr(booking.bookingDate);
    if (
      this.bookingObjects[dateStr] != null &&
      this.bookingObjects[dateStr].bookings[booking.bookingId] != null
    ) {
      delete this.bookingObjects[dateStr].bookings[booking.bookingId];
    }
  }
  // Parse the bookings Json camming from server to bookingsObjects data
  setBookingsObjects({ bookingsObjectsJson, dateString }) {
    /* This func only for the worker himself - only he get 
      the bookingsObjects collection*/
    this.bookingObjects[dateString] = { dateStr: dateString };
    Object.entries(bookingsObjectsJson).forEach(([bookingId, bookingJson]) => {
      const bookingObj = Booking.fromJson(bookingJson, bookingId);
      this.bookingObjects[dateString].bookings[bookingObj.bookingId] =
        bookingObj;
    });
  }
  // initial the var treatmentsById by the current treatmentsSubjects
  initialTreatmentsById() {
    this.treatmentsById = {};
    // initial the treatmentById map
    Object.values(this.treatmentsSubjects).forEach((subject) => {
      Object.values<Treatment>(subject.treatments).forEach((tempTreatment) => {
        this.treatmentsById[tempTreatment.id] = tempTreatment;
      });
    });
  }
  getInvoiceWorkerInfo() {
    return new InvoiceWorkerInfo({ workerId: this.id, workerName: this.name });
  }
  getFcmsTokens() {
    if (!this.allowAppNotification) {
      return new Set();
    }
    if (this.tempFcm != null) {
      return new Set([this.tempFcm]);
    }
    const setFcmsTokens = new Set();
    Object.values(this.devices).forEach((device) => {
      if (device.activeNotifications) {
        setFcmsTokens.add(device.token);
      }
    });
    return setFcmsTokens;
  }

  // --------------- Actions To The DB ------------------
  toWorkerDocJson() {
    const data: Record<string, any> = {};
    data["workTime"] = {};
    Object.entries(this.workTime).forEach(([day, list]) => {
      data["workTime"][day] = list;
    });
    data["specificRangeChanges"] = {};
    Object.entries(this.specificRangeChanges).forEach(
      ([rangeKey, shiftChangeRange]) => {
        data["specificRangeChanges"][rangeKey] = shiftChangeRange.toJson();
      }
    );
    data["religions"] = [];
    this.religions.forEach((religion) => {
      data["religions"].push(religionToStr[religion]);
    });
    if (this.closeCalendarDate != null) {
      // the format is not the regular its cant
      // be changed - already used in production
      data["closeCalendarDate"] = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(this.closeCalendarDate);
    }
    if (this.minDateForShowinData.getFullYear() != new Date(0).getFullYear()) {
      data["minDateForShowinData"] = dateToDateStr(this.minDateForShowinData);
    }
    if (!this.openCalendar) {
      data["openCalendar"] = this.openCalendar;
    }
    data["allowBookingConfirmations"] = this.allowBookingConfirmations;
    if (!this.mustVerifyPhone) {
      data["mustVerifyPhone"] = this.mustVerifyPhone;
    }
    if (this.isCustomersNeedRecurrence) {
      data["isCustomersNeedRecurrence"] = this.isCustomersNeedRecurrence;
    }
    data["weekendDays"] = this.weekendDays;
    data["maxTreatments"] = this.maxTreatments;
    data["gender"] = genderToStr[this.gender];
    data["onHoldMinutes"] = this.onHoldMinutes;
    data["cancelMinutes"] = this.cancelMinutes;
    if (this.hasRecurrenceEvents) {
      data["hasRecurrenceEvents"] = this.hasRecurrenceEvents;
    }
    if (!this.showVacations) {
      data["showVacations"] = this.showVacations;
    }
    data["devices"] = {};
    Object.entries(this.devices).forEach(([fcmId, fcm]) => {
      data["devices"][fcmId] = fcm.toJson();
    });
    data["deleteNeerDedlineBookingMessage"] =
      this.deleteNeerDedlineBookingMessage;
    data["orderNeerDedlineBookingMessage"] =
      this.orderNeerDedlineBookingMessage;
    data["generalBookingMessage"] = this.generalBookingMessage;
    data["closeScheduleOnHolidays"] = this.closeScheduleOnHolidays;
    if (this.customWindowMinute != 30) {
      data["customWindowMinute"] = this.customWindowMinute;
    }
    if (this.windowSpaces != WindowSpaces.shortestTreatment) {
      data["windowSpaces"] = windowSpacesToStr[this.windowSpaces];
    }
    if (this.minutesBeforeBookingToConfirm != 1440) {
      data["minutesBeforeBookingToConfirm"] =
        this.minutesBeforeBookingToConfirm;
    }
    data["bookingDaysToDeleteLocal"] = [];
    data["notifications"] = this.notifications.toJson();
    data["lastCleanDate"] = this.lastCleanDate.toString();
    data["daysToAllowBookings"] = this.daysToAllowBookings;
    if (this.maxFutureBookings != 4) {
      data["maxFutureBookings"] = this.maxFutureBookings;
    }
    if (this.currentClientCount != 0) {
      data["currentClientCount"] = this.currentClientCount;
    }
    if (!this.allowAppNotification) {
      data["allowAppNotification"] = this.allowAppNotification;
    }
    if (this.waitingListExceptionDays.entries.length > 0) {
      data["waitingListExceptionDays"] = Array.from(
        this.waitingListExceptionDays
      );
    }
    data["treatmentsSubjects"] = {};
    Object.entries(this.treatmentsSubjects).forEach(
      ([index, treatmentsSubject]) => {
        data["treatmentsSubjects"][index] = treatmentsSubject.toJson();
      }
    );
    if (!this.showWaitingListWhenThereIsChoises) {
      data["showWaitingListWhenThereIsChoises"] =
        this.showWaitingListWhenThereIsChoises;
    }
    if (this.isVerifiedPhone) {
      data["isVerifiedPhone"] = this.isVerifiedPhone;
    }
    data["profileImg"] = this.profileImg;
    data["about"] = this.about;
    data["name"] = name;
    data["phone"] = this.phone;
    data["id"] = this.id;
    data["storyImages"] = {};
    Object.entries(this.storyImages).forEach(([imageId, image]) => {
      data["storyImages"][imageId] = image;
    });
    data["createdAt"] = this.createdAt.toString();
    return data;
  }
  toString() {
    return (
      JSON.stringify(this.toWorkerDocJson()) +
      this.workerPublicData.toWorkerPublicDataJson().toString()
    );
  }
}
