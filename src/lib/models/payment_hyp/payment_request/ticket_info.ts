import { isNotEmpty } from "$lib/utils/core_utils";
import { dateIsoStr, isoToDate } from "$lib/utils/times_utils";

export default class TicketInfo {
  isDeclined: boolean;
  payments: Record<string, Date>;
  bookingId: string;

  constructor(isDeclined: boolean, bookingId: string) {
    this.isDeclined = isDeclined;
    this.bookingId = bookingId;
    this.payments = {};
  }

  static empty(): TicketInfo {
    return new TicketInfo(false, "");
  }

  static fromJson(json: any, newBookingId: string): TicketInfo {
    const ticketInfo = new TicketInfo(
      json["isDeclined"] ?? false,
      newBookingId
    );
    ticketInfo.payments = {};

    const paymentsJson = json["PY"];
    if (paymentsJson) {
      Object.entries<string>(paymentsJson).forEach(
        ([transactionId, dateStr]) => {
          ticketInfo.payments[transactionId] = isoToDate(dateStr);
        }
      );
    }
    return ticketInfo;
  }

  get isPaid(): boolean {
    return isNotEmpty(this.payments);
  }

  toJson(): any {
    const data: any = {};
    data["isDeclined"] = this.isDeclined;

    if (isNotEmpty(this.payments)) {
      data["PY"] = {};
      Object.entries(this.payments).forEach(([transactionId, date]) => {
        data["PY"][transactionId] = dateIsoStr(date);
      });
    }
    return data;
  }
}
