import { translate } from "$lib/utils/string_utils";
import type Booking from "../booking/booking_model";
import type Invoice from "../payment_hyp/invoice/invoice";
import type PaymentRequest from "../payment_hyp/payment_request/payment_request";
import BookingsPreview from "../user/booking_month_preview";
export default class PhoneDataResult {
  bookings: Record<string, Record<string, Booking>> = {};
  invoices: Record<string, Record<string, Invoice>> = {};
  paymentsRequests: Record<string, Record<string, PaymentRequest>> = {};

  clientAt: Record<string, Set<string>> = {};

  constructor() {}

  get isEmpty(): boolean {
    return (
      this.bookingCount === 0 &&
      this.invoicesCount === 0 &&
      this.paymentsRequestCount === 0
    );
  }

  get bookingCount(): number {
    let count = 0;
    for (const monthBookings of Object.values(this.bookings)) {
      count += Object.keys(monthBookings).length;
    }
    return count;
  }

  get invoicesCount(): number {
    let count = 0;
    for (const monthInvoices of Object.values(this.invoices)) {
      count += Object.keys(monthInvoices).length;
    }
    return count;
  }

  get paymentsRequestCount(): number {
    let count = 0;
    for (const paymentRequestsMonth of Object.values(this.paymentsRequests)) {
      count += Object.keys(paymentRequestsMonth).length;
    }
    return count;
  }

  get clientAtJson(): Record<string, Record<string, string>> {
    const json: Record<string, Record<string, string>> = {};
    for (const [businessId, workerIds] of Object.entries(this.clientAt)) {
      json[businessId] = {};
      for (const workerId of workerIds) {
        json[businessId][workerId] = "";
      }
    }
    return json;
  }

  get bookingsJson(): Record<string, Record<string, any>> {
    const json: Record<string, Record<string, any>> = {};
    for (const [docId, bookingsDoc] of Object.entries(this.bookings)) {
      json[docId] = {};
      for (const [bookingId, booking] of Object.entries(bookingsDoc)) {
        json[docId][bookingId] = booking.toJson();
      }
    }
    return json;
  }

  get invoicesJson(): Record<string, Record<string, any>> {
    const json: Record<string, Record<string, any>> = {};
    for (const [monthStr, invoicesMonth] of Object.entries(this.invoices)) {
      json[monthStr] = {};
      for (const [invoiceId, invoice] of Object.entries(invoicesMonth)) {
        json[monthStr][invoiceId] = invoice.toJson();
      }
    }
    return json;
  }

  get paymentRequestJson(): Record<string, Record<string, any>> {
    const json: Record<string, Record<string, any>> = {};
    for (const [monthStr, paymentRequestMonth] of Object.entries(
      this.paymentsRequests
    )) {
      json[monthStr] = {};
      for (const [paymentRequestId, paymentRequest] of Object.entries(
        paymentRequestMonth
      )) {
        json[monthStr][paymentRequestId] = paymentRequest.toJson();
      }
    }
    return json;
  }

  get bookingsPreviewsJson(): Record<string, any> {
    const json: Record<string, any> = {};
    for (const [docId, bookingsDoc] of Object.entries(this.bookings)) {
      const preview = new BookingsPreview({});

      for (const [bookingId, booking] of Object.entries(bookingsDoc)) {
        if (booking.cancelDate !== null) {
          continue;
        }
        preview.bookingCount = preview.bookingCount + 1;
      }
      preview.lastUpdateTime = new Date();
      json[docId] = preview.toJson();
    }

    return json;
  }

  get whatWeFoundStr(): string {
    let str = translate("weFound");
    const foundings: string[] = [];

    if (this.bookingCount > 0) {
      foundings.push(
        translate("foundBookings").replace(
          "COUNTER",
          this.bookingCount.toString()
        )
      );
    }

    if (this.invoicesCount > 0) {
      foundings.push(
        translate("foundInvoices").replace(
          "COUNTER",
          this.invoicesCount.toString()
        )
      );
    }

    if (this.paymentsRequestCount > 0) {
      foundings.push(
        translate("foundPaymentsRequests").replace(
          "COUNTER",
          this.paymentsRequestCount.toString()
        )
      );
    }

    foundings.forEach((found, index) => {
      if (index === 0) {
        str += found;
        return;
      }

      if (index === foundings.length - 1) {
        //space before the and word
        str += " ";
        str += translate("and") + found;
        return;
      }

      str += ", " + found;
    });

    str += ", " + translate("thatAutoMaticllyAdded");

    return str;
  }
}
