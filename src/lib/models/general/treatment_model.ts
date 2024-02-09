import { strToReplaceAsterisk, strToReplaceSlash } from "$lib/consts/db";
import { durationToString } from "$lib/utils/string_utils";
import {
  paymentTypesFromStr,
  paymentTypesToStr,
  type PaymentTypes,
} from "../booking/booking_transaction";
import { Duration } from "../core/duration";
import { defaultCurrency } from "./currency_model";
import { Price } from "./price";
import TreatmentTime from "./treatment_time";

export default class Treatment {
  totalMinutes: number = 0;
  index: string = "";
  id: string = "";
  note: string = "";
  price?: Price;
  amountInAdvance: number = 0;
  paymentType?: PaymentTypes;
  isMulti: boolean = false;
  showPrice: boolean = true;
  showTime: boolean = true;
  count: number = 1;
  name: string = "";
  colorIndex: number = -2;
  maxParticipants: number = 1;
  maxTicketsForUser: number = 1;
  tempMaxParticipants?: number;
  hide: boolean = false;
  showParticipants: boolean = true;
  times: Map<string, TreatmentTime> = new Map();
  priceChangingNote?: string;

  constructor({
    times = new Map(),
    id = "",
    price,
    count = 1,
    name = "",
    isMulti = false,
    maxTicketsForUser = 1,
    index = "",
    amountInAdvance = 0,
    colorIndex = -2,
    hide = false,
    paymentType,
    note = "",
    maxParticipants = 1,
    showPrice = true,
    showParticipants = true,
    showTime = true,
  }: {
    times?: Map<string, TreatmentTime>;
    id?: string;
    price?: Price;
    count?: number;
    name?: string;
    isMulti?: boolean;
    maxTicketsForUser?: number;
    index?: string;
    amountInAdvance?: number;
    colorIndex?: number;
    hide?: boolean;
    paymentType?: PaymentTypes;
    note?: string;
    maxParticipants?: number;
    showPrice?: boolean;
    showParticipants?: boolean;
    showTime?: boolean;
  } = {}) {
    this.times = times;
    this.id = id;
    this.price = price;
    this.count = count;
    this.name = name;
    this.isMulti = isMulti;
    this.maxTicketsForUser = maxTicketsForUser;
    this.index = index;
    this.amountInAdvance = amountInAdvance;
    this.colorIndex = colorIndex;
    this.hide = hide;
    this.paymentType = paymentType;
    this.note = note;
    this.maxParticipants = maxParticipants;
    this.showPrice = showPrice;
    this.showParticipants = showParticipants;
    this.showTime = showTime;
    this.totalMinutes = this.totalTotalMinutes;
  }

  isEqual(treatment: Treatment): boolean {
    return true;
    //TODO
    //return deepEqual(treatment.toJson(), this.toJson());
  }

  get totalTotalMinutes(): number {
    let minutes = 0;
    this.times.forEach((time, _) => {
      minutes += time.wholeMinutes;
    });

    return minutes;
  }

  get totalWorkMinutes(): number {
    let minutes = 0;
    this.times.forEach((time, _) => {
      minutes += time.workMinutes;
    });

    return minutes;
  }

  get totalMinutesForBooking(): number {
    return this.totalTotalMinutes * this.count;
  }

  get amountInAdvanceForBooking(): number {
    return this.amountInAdvance * this.count;
  }

  get totalPriceForBooking(): number {
    return this.price!.amount * this.count;
  }

  get nameForBooking(): string {
    return this.count === 1 ? this.name : `${this.name} X${this.count}`;
  }

  static fromTreatment(treatment: Treatment): Treatment {
    const newTreatment = new Treatment({
      times: new Map(),
      showTime: treatment.showTime,
      paymentType: treatment.paymentType,
      id: treatment.id,

      hide: treatment.hide,
      showPrice: treatment.showPrice,
      price: treatment.price,
      index: treatment.index,
      maxTicketsForUser: treatment.maxTicketsForUser,
      colorIndex: treatment.colorIndex,
      name: treatment.name,
      isMulti: treatment.isMulti,
      note: treatment.note,
      count: treatment.count,

      maxParticipants: treatment.maxParticipants,
      amountInAdvance: treatment.amountInAdvance,
    });
    newTreatment.priceChangingNote = treatment.priceChangingNote;
    newTreatment.tempMaxParticipants = treatment.tempMaxParticipants;
    newTreatment.totalMinutes = treatment.totalMinutes;
    treatment.times.forEach((time, index) => {
      newTreatment.times.set(index, TreatmentTime.fromTreatmentTime(time));
    });

    return newTreatment;
  }

  static fromTreatmentsMap(treatments: Record<string, Treatment>): Treatment {
    let index = 0;
    const newTreatment = new Treatment({
      price: new Price({ amount: "0", currency: defaultCurrency }),
    });

    Object.entries(treatments).forEach(([_, treatment]) => {
      for (let i = 0; i < treatment.count; i++) {
        treatment.times.forEach((time, _) => {
          newTreatment.times.set(index.toString(), time);
          index++;
        });

        if (treatment.price) {
          newTreatment.price!.amount += treatment.price.amount;
          newTreatment.price!.currency = treatment.price.currency;
        }

        if (newTreatment.name === "") {
          newTreatment.name = treatment.name;
        } else {
          newTreatment.name += ` + ${treatment.name}`;
        }

        newTreatment.showTime = newTreatment.showTime && treatment.showTime;
        newTreatment.showPrice = newTreatment.showPrice && treatment.showPrice;
        newTreatment.paymentType = treatment.paymentType;
        newTreatment.amountInAdvance += treatment.amountInAdvance;
        newTreatment.totalMinutes += treatment.totalMinutes;
      }
    });

    return newTreatment;
  }

  get participants(): number {
    return this.tempMaxParticipants !== undefined
      ? this.tempMaxParticipants
      : this.maxParticipants;
  }

  priceToString(): string {
    return this.price!.toString();
  }

  minutesToString(): string {
    return durationToString(new Duration({ minutes: this.totalMinutes }));
  }

  static fromJson(json: { [key: string]: any }, newIndex: string): Treatment {
    const newTreatment = new Treatment({
      times: new Map(),
      id: json["id"] || "",
      colorIndex: json["colorIndex"] || -2,
      maxTicketsForUser: json["maxTicketsForUser"] || 1,
      index: newIndex,
      hide: json["hide"] || false,
      name: json["name"] || "",
      isMulti: json["isMulti"] || false,
      note: json["note"] || "",
      count: json["count"] || 1,

      price: json["price"] ? Price.fromJson(json["price"]) : undefined,

      amountInAdvance:
        json["amountInAdvance"] !== undefined
          ? typeof json["amountInAdvance"] === "number"
            ? json["amountInAdvance"]
            : parseFloat(json["amountInAdvance"])
          : 0,
      maxParticipants: json["maxParticipants"] || 1,
      paymentType: paymentTypesFromStr[json["paymentType"]],
      showPrice: json["showPrice"] || false,
      showTime: json["showTime"] || false,
      showParticipants: json["showParticipants"] || true,
    });

    newTreatment.priceChangingNote = json["priceChangingNote"];

    newTreatment.tempMaxParticipants = json["tempMaxParticipants"];

    if (json["times"]) {
      for (const timeIndex in json["times"]) {
        newTreatment.times.set(
          timeIndex,
          TreatmentTime.fromJson(json["times"][timeIndex])
        );
      }
    }
    newTreatment.totalMinutes = newTreatment.totalTotalMinutes;
    return newTreatment;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};

    data["times"] = {};
    this.times.forEach((time, index) => {
      data["times"][index] = time.toJson();
    });

    data["name"] = this.name;
    if (this.note !== "") {
      data["note"] = this.note;
    }
    if (this.id !== "") {
      data["id"] = this.id;
    }
    if (this.hide) {
      data["hide"] = this.hide;
    }
    if (this.maxTicketsForUser > 1) {
      data["maxTicketsForUser"] = this.maxTicketsForUser;
    }
    if (this.colorIndex !== -2) {
      data["colorIndex"] = this.colorIndex;
    }
    if (this.priceChangingNote !== undefined) {
      data["priceChangingNote"] = this.priceChangingNote;
    }
    data["price"] = this.price ? this.price.toJson() : undefined;
    if (this.amountInAdvance !== 0) {
      data["amountInAdvance"] = this.amountInAdvance;
    }
    if (
      this.paymentType != undefined &&
      paymentTypesToStr[this.paymentType] != undefined
    ) {
      data["paymentType"] = paymentTypesToStr[this.paymentType];
    }
    if (this.isMulti) {
      data["isMulti"] = this.isMulti;
    }
    if (this.tempMaxParticipants !== undefined) {
      data["tempMaxParticipants"] = this.tempMaxParticipants;
    }
    if (this.count !== 1) {
      data["count"] = this.count;
    }
    if (this.maxParticipants !== 1) {
      data["maxParticipants"] = this.maxParticipants;
    }
    if (!this.showParticipants) {
      data["showParticipants"] = this.showParticipants;
    }
    data["showPrice"] = this.showPrice;
    data["showTime"] = this.showTime;
    return data;
  }

  static fromOldJson(
    json: Record<string, any>,
    newIndex: string,
    newName: string,
    colorIndex: number
  ): Treatment {
    const newObj = new Treatment({});
    if (json["times"]) {
      for (const timeIndex in json["times"]) {
        if (json["times"].hasOwnProperty(timeIndex)) {
          newObj.times.set(
            timeIndex,
            TreatmentTime.fromJson(json["times"][timeIndex])
          );
        }
      }
    }

    newObj.id = "";
    newObj.colorIndex = colorIndex;
    newObj.index = newIndex;

    newObj.name = newObj.parseNameFromDbField(newName);

    if (json["price"]) {
      newObj.price = Price.fromJson(json["price"]);
    }

    if (json["amountInAdvance"] !== undefined) {
      newObj.amountInAdvance =
        typeof json["amountInAdvance"] === "number"
          ? json["amountInAdvance"]
          : parseFloat(json["amountInAdvance"]);
    }
    newObj.paymentType = paymentTypesFromStr[json["paymentType"]];
    newObj.showPrice = json["showPrice"] || false;
    newObj.showTime = json["showTime"] || false;

    newObj.totalMinutes = newObj.totalTotalMinutes;

    return newObj;
  }

  parseNameFromDbField(name: string): string {
    return name
      .replace(strToReplaceSlash, "/")
      .replace(strToReplaceAsterisk, "*");
  }

  parseNameToDbField(name: string): string {
    return name
      .replace("/", strToReplaceSlash)
      .replace("*", strToReplaceAsterisk);
  }

  toString(): string {
    return JSON.stringify(this, null, 2);
  }
}
