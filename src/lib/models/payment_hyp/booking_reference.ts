import { dateIsoStr, isoToDate } from "$lib/utils/times_utils";

export default class BookingReference {
  ///The id of the booking on
  ///NOTICE: multi booking the id is null because the id of the multi
  ///booking is the "HH:mm" format of its date
  id: string = "";

  ///booking date
  date: Date = new Date(0);

  ///is multi booking or not
  isMultiBooking: boolean = false;

  ///workerId of the booking
  workerId: string = "";

  ///if signNewMultiBookingUsers in the multi booking is active
  signNewMultiBookingUsers: boolean = false;

  constructor({
    id,
    date,
    isMultiBooking,
    workerId,
    signNewMultiBookingUsers = false,
  }: {
    id: string;
    date: Date;
    isMultiBooking: boolean;
    workerId: string;
    signNewMultiBookingUsers?: boolean;
  }) {
    this.id = id;
    this.date = date;
    this.isMultiBooking = isMultiBooking;
    this.workerId = workerId;
    this.signNewMultiBookingUsers = signNewMultiBookingUsers;
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};

    data["I"] = this.id;
    data["D"] = dateIsoStr(this.date);
    data["WI"] = this.workerId;
    if (this.isMultiBooking) {
      data["IMB"] = this.isMultiBooking;
    }

    if (this.signNewMultiBookingUsers) {
      data["SNMBU"] = this.signNewMultiBookingUsers;
    }

    return data;
  }

  static fromJson(json: Record<string, any>): BookingReference {
    const date = json["D"] ? isoToDate(json["D"]) : new Date(0);
    const id = json["I"] || "";
    const isMultiBooking = json["IMB"] || false;
    const workerId = json["WI"] || "";
    const signNewMultiBookingUsers = json["SNMBU"] || false;

    return new BookingReference({
      id,
      date,
      isMultiBooking,
      workerId,
      signNewMultiBookingUsers,
    });
  }

  toString(): string {
    return JSON.stringify(this, null, 2);
  }
}
