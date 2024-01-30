import { BookingReminderType } from "$lib/consts/booking";
import { Gender, genderFromStr, genderToStr } from "$lib/consts/gender";
import {
  NotificationOption,
  notificationOptionFromStr,
} from "$lib/consts/notification";
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
import { durationStrikings } from "$lib/utils/duration_utils";
import {
  combinedShuffleShifts,
  shiftsFromStrList,
} from "$lib/utils/shifts_utils";

import {
  dateIsoStr,
  dateStrToDate,
  dateToDateStr,
  setToMidNight,
} from "$lib/utils/times_utils";
import { translate } from "$lib/utils/translate";
import { format } from "date-fns";
import { Timestamp, type Unsubscribe } from "firebase/firestore";
import Device from "../general/device";
import Treatment from "../general/treatment_model";
import MultiEventsTimes from "./multi_events_times";
import WorkerNotificatiosSettings from "./notifications_settings";
import PublicCustomers from "./public_customers_data";
import RecurrenceEvents from "./recurrence_events";
import ShiftChangeRange from "./shifts_change_range";
import TreatmentSubject from "./treatment_subject";
import WorkerPublicData from "./worker_public_data";

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
  devices: Map<string, Device> = new Map();
  storyImages: Map<string, string> = new Map();
  createdAt: Date = new Date(0);
  workTime: Map<string, string[]> = new Map([
    ["sunday", []],
    ["monday", []],
    ["tuesday", []],
    ["wednesday", []],
    ["thursday", []],
    ["friday", []],
    ["saturday", []],
  ]);
  isCustomersNeedRecurrence: boolean = false;
  specificRangeChanges: Map<string, ShiftChangeRange> = new Map();
  treatmentsSubjects: Map<string, TreatmentSubject> = new Map();
  //----------------------------------from public worker json-------------------------------
  workerPublicData: WorkerPublicData = new WorkerPublicData();

  //---------------------- from publicCustomersData doc -----------------
  publicCustomers: PublicCustomers = new PublicCustomers();

  // ------------------------------ from real time database ------------------
  storylikesAmount: Record<string, number> = {};
  //------------------------------- from multiEventsTimes doc------------------------------
  multiEventsTimes: MultiEventsTimes = new MultiEventsTimes();

  //-------------------------------another vars ----------------------------
  generalBookingsCount: number = 0;
  passedBookingsCount: number = 0;
  shortBookingTime: number = 999;
  longestBookingTime: number = 0;
  recurrence: RecurrenceEvents = new RecurrenceEvents();
  notifications: WorkerNotificatiosSettings = new WorkerNotificatiosSettings();

  //------------------------------ listners -------------------------------
  workerDocListner?: Unsubscribe;

  constructor({}) {}

  /// Extract the worker data from user data json
  static fromUserPublicData(json: Record<string, any>): WorkerModel {
    const workerModel = new WorkerModel({});
    workerModel.phone = json["phoneNumber"] || "";
    workerModel.currentClientCount = json["currentClientCount"] || 0;
    workerModel.id = json["id"] || workerModel.phone;
    workerModel.name = json["name"] || "";
    if (json["devices"] != null && typeof json["devices"] === "object") {
      Object.entries<Record<string, any>>(json["devices"]).forEach(
        ([fcmId, fcmJson]) => {
          workerModel.devices.set(fcmId, Device.fromJson(fcmJson, fcmId));
        }
      );
    } else if (json["currentFcm"] != null && json["currentFcm"] !== "") {
      workerModel.tempFcm = json["currentFcm"];
    }
    workerModel.gender = genderFromStr[json["gender"]] || Gender.anonymous;
    workerModel.lastCleanDate = new Date();
    workerModel.createdAt = new Date();
    workerModel.notifications.remindersTypes = new Map([
      [BookingReminderType.regular, 60],
    ]);
    return workerModel;
  }
  /// create new worker from that json
  ///  Dont use it if you want to update the worker
  /// it will not consider the worker publicData doc
  static fromWorkerDocJson(workerJson: Record<string, any>): WorkerModel {
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
      this.workTime.get(format(day, "EEEE").toLowerCase()) || [];
    console.log("this.workTime", this.workTime);
    console.log(
      "format(day, EEEE).toLowerCase()",
      format(day, "EEEE").toLowerCase()
    );
    console.log("defaultShifts", defaultShifts);
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

  get fcmsTokens(): Set<string> {
    if (!this.allowAppNotification) {
      return new Set<string>();
    }

    if (this.tempFcm != undefined) {
      return new Set<string>([this.tempFcm]);
    }

    const setFcmsTokens = new Set<string>();
    for (const device of Object.values(this.devices)) {
      if (device.activeNotifications) {
        setFcmsTokens.add(device.token);
      }
    }

    return setFcmsTokens;
  }

  // Returns whether this day is closing day or not
  isClosingDate(date: Date): boolean {
    return (
      !this.openCalendar ||
      (this.closeCalendarDate != undefined &&
        setToMidNight(this.closeCalendarDate).getTime() ===
          setToMidNight(date).getTime())
    );
  }

  hasTreatemnt(treatmentId: string): boolean {
    for (const [index, subject] of this.treatmentsSubjects) {
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
  setFromWorkerDoc(workerJson: Record<string, any>): void {
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

    this.treatmentsSubjects = new Map();

    this.shortBookingTime = 999;
    if (workerJson["treatmentsSubjects"]) {
      // new users with subjects
      let pointerShortBookingTime = [this.shortBookingTime];
      let pointerLognestBookingTime = [this.longestBookingTime];
      Object.entries<Record<string, any>>(
        workerJson["treatmentsSubjects"]
      ).forEach(([index, treatmentsSubject]) => {
        const subject = TreatmentSubject.fromJson(treatmentsSubject, index, {
          pointerShortBookingTime: pointerShortBookingTime,
          pointerLognestBookingTime: pointerLognestBookingTime,
        });
        this.treatmentsSubjects.set(index, subject);
      });
      this.shortBookingTime = pointerShortBookingTime[0];
      this.longestBookingTime = pointerLognestBookingTime[0];
    } else if (workerJson["treatments"]) {
      // old users with no subjects
      const treatments: Map<string, Treatment> = new Map();
      let index = 0; //also the colorindex
      Object.entries<Record<string, any>>(workerJson["treatments"]).forEach(
        ([name, treatmentJson]) => {
          const treatment = Treatment.fromOldJson(
            treatmentJson,
            index.toString(),
            name,
            index + 4
          );
          treatments.set(index.toString(), treatment);
          // save the first duration of the short booking time
          if (treatment.totalMinutes < this.shortBookingTime) {
            this.shortBookingTime = Math.max(
              treatment.times.get("0")!.workMinutes,
              5
            );
          }
          if (treatment.totalMinutes === this.shortBookingTime) {
            this.shortBookingTime = Math.min(
              Math.max(treatment.times.get("0")!.workMinutes, 5),
              this.shortBookingTime
            );
          }
          index += 1;
        }
      );
      this.treatmentsSubjects = new Map([
        [
          "0",
          new TreatmentSubject({
            name: translate("general"),
            treatments: treatments,
            index: "0",
          }),
        ],
      ]);
    }

    this.onHoldMinutes = workerJson["onHoldMinutes"] || 0;
    this.cancelMinutes = workerJson["cancelMinutes"] || 0;
    if (
      workerJson["devices"] != null &&
      typeof workerJson["devices"] === "object"
    ) {
      Object.entries<Record<string, any>>(workerJson["devices"]).forEach(
        ([deviceId, deviceJson]) => {
          this.devices.set(deviceId, Device.fromJson(deviceJson, deviceId));
        }
      );
    }

    this.deleteNeerDedlineBookingMessage =
      workerJson["deleteNeerDedlineBookingMessage"];
    this.orderNeerDedlineBookingMessage =
      workerJson["orderNeerDedlineBookingMessage"];
    this.generalBookingMessage = workerJson["generalBookingMessage"];
    this.workTime = new Map();
    if (workerJson["workTime"]) {
      Object.entries<string[]>(workerJson["workTime"]).forEach(([key, val]) => {
        this.workTime.set(
          key,
          val.map((item: any) => item as string)
        );
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
      this.notifications = new WorkerNotificatiosSettings();

      (this.notifications.notifyOnWaitingListEvents =
        workerJson["notifyOnWaitingListEvents"] || true),
        (this.notifications.showAdressAlert =
          workerJson["showAdressAlert"] || false),
        (this.notifications.showAdressMessage =
          workerJson["showAdressMessage"] || false),
        (this.notifications.showPhoneAlert =
          workerJson["showPhoneAlert"] || false),
        (this.notifications.showPhoneMessage =
          workerJson["showPhoneMessage"] || false),
        (this.notifications.remindersTypes = new Map([
          [
            BookingReminderType.regular,
            workerJson["minutesBeforeNotify"] || 60,
          ],
        ]));

      (this.notifications.notifyOnPayments =
        workerJson["notifyOnPayments"] || true),
        (this.notifications.notifyAboutCancelNearDeadline =
          workerJson["notifyAboutCancelNearDeadline"] || true),
        (this.notifications.notifyAboutOrderNearDeadline =
          workerJson["notifyAboutOrderNearDeadline"] || true),
        (this.notifications.notifyWhenGettingBooking =
          workerJson["notifyWhenGettingBooking"] || true);
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

    this.specificRangeChanges = new Map();
    if (workerJson["specificRangeChanges"]) {
      Object.entries<Record<string, any>>(
        workerJson["specificRangeChanges"]
      ).forEach(([key, val]) => {
        const shiftRange = ShiftChangeRange.fromJson(val, key);
        // the specific range dosen't over
        if (shiftRange.end >= setToMidNight(new Date())) {
          this.specificRangeChanges.set(key, shiftRange);
        }
      });
    }
    this.storyImages = new Map();
    if (workerJson["storyImages"]) {
      Object.entries<string>(workerJson["storyImages"]).forEach(
        ([imageId, image]) => {
          this.storyImages.set(imageId, image);
        }
      );
    }
    // in not exist -> null
    if (workerJson["closeCalendarDate"]) {
      //the format is not the regular its cant
      //be changed - already used in production
      this.closeCalendarDate = new Date(workerJson["closeCalendarDate"]);
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
      this.createdAt = new Date(workerJson["createdAt"]);
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
    data["createdAt"] = dateIsoStr(this.createdAt);
    return data;
  }
  toString() {
    return (
      JSON.stringify(this.toWorkerDocJson()) +
      this.workerPublicData.toWorkerPublicDataJson().toString()
    );
  }
}
