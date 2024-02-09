import { Gender } from "$lib/consts/gender";
import Event from "../schedule/calendar_event";
import type UserModel from "../user/user_model";

export default class WaitingListCustomer {
  name: string = "";
  gender: Gender = Gender.anonymous;
  phonenumber: string = "";
  userId: string = "";
  workerId: string = "";
  date: Date = new Date();
  constructor({});
  constructor({
    name = "",
    gender = Gender.anonymous,
    workerId,
    date,
    phonenumber,
    userId,
  }: {
    name: string;
    gender: Gender;
    workerId: string;
    date: Date;
    phonenumber: string;
    userId: string;
  }) {
    this.name = name;
    this.gender = gender;
    this.phonenumber = phonenumber;
    this.userId = userId;
    this.workerId = workerId;
    this.date = date;
  }

  static fromJson(
    json: any,
    id: string,
    newWorkerId: string,
    newDate: Date
  ): WaitingListCustomer {
    const customer = new WaitingListCustomer({});
    customer.name = json["N"];
    customer.gender = customer.getGender(json["G"]);
    customer.phonenumber = json["P"] ?? id;
    customer.userId = id;
    return customer;
  }

  static fromUser(
    user: UserModel,
    newWorkerId: string,
    newDate: Date
  ): WaitingListCustomer {
    const customer = new WaitingListCustomer({});
    customer.name = user.name;
    customer.gender = user.gender;
    customer.workerId = newWorkerId;
    customer.date = newDate;
    customer.phonenumber = user.phoneNumber;
    customer.userId = user.id;
    return customer;
  }

  static fromWaitingListCustomer(
    customer: WaitingListCustomer
  ): WaitingListCustomer {
    const newCustomer = new WaitingListCustomer({});

    newCustomer.name = customer.name;
    newCustomer.gender = customer.gender;
    newCustomer.workerId = customer.workerId;
    newCustomer.date = customer.date;
    newCustomer.phonenumber = customer.phonenumber;
    newCustomer.userId = customer.userId;
    return newCustomer;
  }

  toEvent(): Event {
    const newEvent = new Event();

    newEvent.eventName = this.name;
    newEvent.from = this.date;
    newEvent.colorIndex = 0;
    newEvent.eventIndex = 0;
    newEvent.eventsBelong = 1;
    newEvent.durationMinutes = 20;
    newEvent.ids = [this.workerId];
    newEvent.customerPhoneWaitingList = this.phonenumber;
    newEvent.isWaitingList = true;
    return newEvent;
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {
      N: this.name,
      G: this.gender,
    };
    if (this.userId !== this.phonenumber) {
      data.P = this.phonenumber;
    }
    return data;
  }

  genderCode(): string {
    switch (this.gender) {
      case Gender.male:
        return "M";
      case Gender.female:
        return "F";
      default:
        return "A";
    }
  }

  getGender(code: string): Gender {
    switch (code) {
      case "M":
        return Gender.male;
      case "F":
        return Gender.female;
      default:
        return Gender.anonymous;
    }
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, "  ");
  }
}
