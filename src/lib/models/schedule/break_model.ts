import { dateToNotifyBreak, utcDeltaMinutes } from "$lib/utils/dates_utils";
import {
  dateStrToDate,
  dateToDateStr,
  dateToTimeStr,
  dateToUtc,
  timeStrToDate,
} from "$lib/utils/times_utils";
import { translate } from "$lib/utils/translate";
import BusinessModel from "../business/business_model";
import { Duration } from "../core/duration";
import IconData from "../general/icon_data";
import FutureNotification from "../notifications/future_notification";
import Event from "../schedule/calendar_event";
import type WorkerModel from "../worker/worker_model";
import ScheduleItem from "./schedule_item";
export default class BreakModel extends ScheduleItem {
  title: string = "";
  timeId?: string;
  color: number = 0;
  duration: Duration = new Duration({});
  day: string = "";
  start: string = "";
  partOfRecurrence: boolean = false;
  note: string = "";
  id: string = "";
  blockSchedule: boolean = true;
  minutesNotification: number = 60;
  notify: boolean = false;
  addedToDeviceCalendar: boolean = false;
  shopIcon: IconData = new IconData(); // Replace with the actual IconData type

  constructor({
    title,
    day,
    shopIcon,
    id,
    start,
    note,
    blockSchedule,
    addedToDeviceCalendar = false,
    color,
    workerId,
    businessModel,
    duration,
  }: {
    title: string;
    day: string;
    shopIcon: IconData;
    id: string;
    start: string;
    note: string;
    blockSchedule: boolean;
    addedToDeviceCalendar?: boolean;
    color: number;
    workerId: string;
    businessModel: BusinessModel; // Replace with the actual BusinessModel type
    duration: Duration;
  }) {
    super();
    const date = dateStrToDate(day);
    const time = timeStrToDate(start);
    this.bookingDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    );
    this.businessName = businessModel.shopName;
    this.buisnessId = businessModel.businessId;
    this.workerId = workerId;
    this.title = title;
    this.day = day;
    this.shopIcon = shopIcon;
    this.id = id;
    this.start = start;
    this.note = note;
    this.blockSchedule = blockSchedule;
    this.addedToDeviceCalendar = addedToDeviceCalendar;
    this.color = color;
    this.duration = duration;
  }

  static fromBreakModel(breakModel: BreakModel): BreakModel {
    const newBreak = new BreakModel({
      title: breakModel.title,
      day: breakModel.day,
      shopIcon: breakModel.shopIcon,
      id: breakModel.id,
      start: breakModel.start,
      note: breakModel.note,
      blockSchedule: breakModel.blockSchedule,
      addedToDeviceCalendar: breakModel.addedToDeviceCalendar,
      color: breakModel.color,
      workerId: breakModel.workerId,
      businessModel: new BusinessModel({}), // Replace with the actual BusinessModel type
      duration: breakModel.duration,
    });

    newBreak.recurrenceRef = breakModel.recurrenceRef;
    newBreak.recurrenceEventRefInfo = breakModel.recurrenceEventRefInfo;
    newBreak.partOfRecurrence = breakModel.partOfRecurrence;
    newBreak.timeId = breakModel.timeId;
    newBreak.recurrenceNotificationsLastDate =
      breakModel.recurrenceNotificationsLastDate;

    return newBreak;
  }

  static fromEvent(event: Event): BreakModel {
    const newBreak = new BreakModel({
      title: event.eventName,
      day: dateToDateStr(event.from),
      shopIcon: event.breakIconData ?? new IconData(), // Replace with the actual IconData type
      id: event.breakId,
      start: dateToTimeStr(event.from),
      note: event.note ?? "",
      blockSchedule: event.blockSchedule,
      addedToDeviceCalendar: event.breakAddedToDeviceCalendar,
      color: event.colorIndex,
      workerId: event.ids.length > 0 ? event.ids[0] : "",
      businessModel: new BusinessModel({}), // Replace with the actual BusinessModel type
      duration: new Duration({ minutes: event.durationMinutes }),
    });

    newBreak.recurrenceRef = event.breakFatherRecurrenceId;
    newBreak.recurrenceEventRefInfo = event.recurrenceBreakRefInfo;
    newBreak.recurrenceFatherDate = event.recurrenceBreakFatherDate;
    newBreak.minutesNotification = event.minutesBreakNotification;
    newBreak.notify = event.breakNotificaiton;
    newBreak.partOfRecurrence = event.partOfRecurrence;
    newBreak.timeId = event.timeId;

    return newBreak;
  }

  get currentDisplayDate(): Date {
    return this.recurrenceChildDate ?? this.bookingDate;
  }

  reminder(worker: WorkerModel): FutureNotification | null {
    if (!this.notify) {
      return null;
    }

    const dateToNotify = dateToNotifyBreak(this);

    if (dateToNotify < dateToUtc(new Date())) {
      return null;
    }

    if (worker.fcmsTokens.size === 0) {
      return null;
    }

    const id = `${this.buisnessId}--AAAA--${worker.id}`;

    return new FutureNotification({
      businessName: this.businessName,
      address: "",
      isRecurrence: this.recurrenceEvent !== null,
      id: id,
      shopIcon: this.shopIcon,
      phoneToContact: "",
      dateToNotify: dateToNotify,
      isMulti: false,
      minutesToAdd: utcDeltaMinutes() + this.minutesNotification,
      businessId: "",
      type: this.title !== "" ? this.title : translate("break"),
      fcms: { ...worker.fcmsTokens },
    });
  }

  get timeIdAsKey(): string {
    return this.timeId !== undefined
      ? `${this.start}_${this.timeId}`
      : this.start;
  }
}
