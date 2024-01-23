export default class BookingReferencePaymentObj {
  id: string = "";
  date: Date = new Date(0);
  isMultiBooking: boolean = false;
  workerId: string = "";
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
    data["D"] = this.date.toISOString();
    data["WI"] = this.workerId;
    if (this.isMultiBooking) {
      data["IMB"] = this.isMultiBooking;
    }

    if (this.signNewMultiBookingUsers) {
      data["SNMBU"] = this.signNewMultiBookingUsers;
    }

    return data;
  }

  static fromJson(json: Record<string, any>): BookingReferencePaymentObj {
    const date = json["D"] ? new Date(json["D"]) : new Date(0);
    const id = json["I"] || "";
    const isMultiBooking = json["IMB"] || false;
    const workerId = json["WI"] || "";
    const signNewMultiBookingUsers = json["SNMBU"] || false;

    return new BookingReferencePaymentObj({
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
