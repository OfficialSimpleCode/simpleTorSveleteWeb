import {
  dateToMonthStr,
  monthStrToDate,
  setToStartOfMonth,
} from "$lib/utils/times_utils/times_utils";
import Booking from "../booking/booking_model";

export default class UserBookings {
  futureBookings: Record<string, Record<string, Booking>> = {};
  passedBookings: Record<string, Record<string, Booking>> = {};
  recurrence?: Record<string, Booking>;

  setMonth(json: Record<string, any>, monthStr: string): void {
    const date = monthStrToDate(monthStr);
    const nowMonth = setToStartOfMonth(new Date());
    if (date.getTime() === nowMonth.getTime()) {
      this.passedBookings[monthStr] = {};
      this.futureBookings[monthStr] = {};
    } else if (date.getTime() > nowMonth.getTime()) {
      this.futureBookings[monthStr] = {};
    } else if (date.getTime() < nowMonth.getTime()) {
      this.passedBookings[monthStr] = {};
    }

    Object.entries(json).forEach(([bookingId, bookingJson]) => {
      const booking = Booking.fromJson(bookingJson, bookingId);
      //no let in  bookings that has cancel date

      if (booking.cancelDate != undefined) {
        return;
      }

      if (booking.isPassed) {
        this.passedBookings[monthStr][bookingId] = booking;
      } else {
        this.futureBookings[monthStr][bookingId] = booking;
      }
    });
  }

  setRecurrence(json: Record<string, any>): void {
    this.recurrence = {};
    Object.entries(json).forEach(([bookingId, bookingJson]) => {
      const booking = Booking.fromJson(bookingJson, bookingId);
      if (booking.cancelDate !== null) {
        return;
      }
      this.recurrence![bookingId] = booking;
    });
  }

  get all(): Record<string, Booking> {
    const allBookings: Record<string, Booking> = {};

    Object.values(this.futureBookings).forEach((bookings) => {
      Object.entries(bookings).forEach(([_, booking]) => {
        allBookings[booking.bookingId] = booking;
      });
    });

    Object.values(this.passedBookings).forEach((bookings) => {
      Object.entries(bookings).forEach(([_, booking]) => {
        allBookings[booking.bookingId] = booking;
      });
    });

    if (this.recurrence !== undefined) {
      Object.entries(this.recurrence).forEach(([bookingId, booking]) => {
        allBookings[bookingId] = booking;
      });
    }

    return allBookings;
  }

  addBooking(booking: Booking): void {
    if (booking.recurrenceEvent !== null) {
      this.recurrence ??= {};
      this.recurrence[booking.bookingId] = booking;
    } else {
      const monthStr = dateToMonthStr(booking.bookingDate);
      if (booking.isPassed) {
        this.passedBookings[monthStr] ??= {};
        this.passedBookings[monthStr][booking.bookingId] = booking;
      } else {
        this.futureBookings[monthStr] ??= {};
        this.futureBookings[monthStr][booking.bookingId] = booking;
      }
    }
  }

  deleteBooking(booking: Booking): void {
    if (booking.recurrenceEvent !== null) {
      delete this.recurrence?.[booking.bookingId];
    } else {
      const monthStr = dateToMonthStr(booking.bookingDate);
      delete this.passedBookings[monthStr]?.[booking.bookingId];
      delete this.futureBookings[monthStr]?.[booking.bookingId];
    }
  }

  lastBookingForBusiness(
    businessId: string,
    workerId: string,
    includePast: boolean = false,
    initDate?: Date,
    exclude?: Date
  ): Date | undefined {
    let lastDate: Date | undefined = initDate;
    Object.entries(this.futureBookings).forEach(([_, bookingsDoc]) => {
      Object.entries(bookingsDoc).forEach(([_, booking]) => {
        if (
          businessId !== booking.buisnessId ||
          workerId !== booking.workerId
        ) {
          return;
        }
        if (
          exclude !== undefined &&
          exclude.getTime() === booking.bookingDate.getTime()
        ) {
          return;
        }
        if (
          lastDate === undefined ||
          booking.bookingDate.getTime() > lastDate.getTime()
        ) {
          lastDate = booking.bookingDate;
        }
      });
    });
    return lastDate;
  }
}
