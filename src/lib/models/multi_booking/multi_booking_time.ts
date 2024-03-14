import { dateIsoStr, isoToDate } from "$lib/utils/times_utils";
import { Price } from "../general/price";
import TreatmentTime from "../general/treatment_time";

export default class MultiBookingTime {
  treatmentId: string = "";
  currentParticipants: number = 0;
  maxParticipants?: number;
  minutes: number = 0;
  index: number = 0;
  showWaitingList: boolean = true;
  expiredDate?: Date;
  paymentRequestId?: string;

  //incase the worker change the event treatment durations after book it
  changedTimes: Map<string, TreatmentTime> | undefined;

  //incase the worker change the event price after book it
  changedPrice: Price | undefined;

  constructor({
    treatmentId,
    minutes,
    maxParticipants,
    paymentRequestId,
    changedPrice,
    changedTimes,
    showWaitingList = true,
    currentParticipants = 0,
    expiredDate,
    index = 0,
  }: {
    treatmentId: string;
    minutes: number;
    changedTimes?: Map<string, TreatmentTime>;
    changedPrice?: Price;
    maxParticipants?: number;
    paymentRequestId?: string;
    showWaitingList?: boolean;
    currentParticipants?: number;
    expiredDate?: Date;
    index?: number;
  }) {
    this.treatmentId = treatmentId;
    this.currentParticipants = currentParticipants;
    this.minutes = minutes;
    this.changedPrice = changedPrice;
    this.changedTimes = changedTimes;
    this.showWaitingList = showWaitingList;
    this.maxParticipants = maxParticipants;
    this.expiredDate = expiredDate;
    this.paymentRequestId = paymentRequestId;
    this.index = index;
  }

  static fromMultiBookingTime(other: MultiBookingTime): MultiBookingTime {
    return new MultiBookingTime({
      treatmentId: other.treatmentId,
      currentParticipants: other.currentParticipants,
      minutes: other.minutes,
      changedTimes:
        other.changedTimes != null ? new Map(other.changedTimes) : undefined,
      changedPrice: other.changedPrice,
      showWaitingList: other.showWaitingList,
      maxParticipants: other.maxParticipants,
      expiredDate: other.expiredDate,
      paymentRequestId: other.paymentRequestId,
      index: other.index,
    });
  }

  static fromJson(json: Record<string, any>): MultiBookingTime {
    const treatmentId = json["TI"] ?? "";
    const currentParticipants = json["CP"] ?? 0;
    const minutes = json["M"] ?? 0;

    const paymentRequestId = json["PRI"];
    const showWaitingList = json["SWL"] ?? true;
    const expiredDateString = json["ED"];
    const maxParticipants = json["MP"];
    const index = json["I"] || 0;

    const expiredDate = expiredDateString
      ? isoToDate(expiredDateString)
      : undefined;
    let changedTimes: Map<string, TreatmentTime> | undefined;
    if (json["changedTimes"] != null) {
      changedTimes = new Map();
      Object.entries<any>(json["changedTimes"]).forEach(
        ([timeIndex, timeData]) => {
          changedTimes!.set(timeIndex, TreatmentTime.fromJson(timeData));
        }
      );
    }
    let changedPrice: Price | undefined;
    if (json["changedPrice"] != null) {
      changedPrice = Price.fromJson(json["changedPrice"]);
    }

    return new MultiBookingTime({
      treatmentId,
      currentParticipants,
      minutes,
      maxParticipants,
      paymentRequestId,
      changedTimes,
      changedPrice,
      showWaitingList,
      expiredDate,
      index,
    });
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};

    if (this.treatmentId !== "") {
      data["TI"] = this.treatmentId;
    }

    if (this.currentParticipants !== 0) {
      data["CP"] = this.currentParticipants;
    }

    if (this.maxParticipants != null) {
      data["MP"] = this.maxParticipants;
    }

    if (this.paymentRequestId != null) {
      data["PRI"] = this.paymentRequestId;
    }

    data["M"] = this.minutes;

    if (this.index !== 0) {
      data["I"] = this.index;
    }

    if (!this.showWaitingList) {
      data["SWL"] = this.showWaitingList;
    }

    if (this.expiredDate != null) {
      data["ED"] = dateIsoStr(this.expiredDate);
    }
    if (this.changedPrice != null) {
      data["changedPrice"] = this.changedPrice!.toJson();
    }

    if (this.changedTimes != null) {
      data["changedTimes"] = {};
      this.changedTimes!.forEach((time, index) => {
        data["changedTimes"]![index] = time.toJson();
      });
    }

    return data;
  }
}
