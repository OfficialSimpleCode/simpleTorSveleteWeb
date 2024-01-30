import type Booking from "../booking/booking_model";

export default class DeleteWorkerResp {
  bookings: Record<string, Booking> = {};
  breaks: BreakModel[] = [];
  constructor({});
  constructor({
    bookings,
    breaks,
  }: {
    bookings: Record<string, Booking>;
    breaks: BreakModel[];
  }) {
    this.bookings = bookings;
    this.breaks = breaks;
  }

  static empty(): DeleteWorkerResp {
    return new DeleteWorkerResp({ bookings: {}, breaks: [] });
  }

  merge(deleteResp: DeleteWorkerResp): void {
    this.bookings = { ...this.bookings, ...deleteResp.bookings };
    this.breaks = [...this.breaks, ...deleteResp.breaks];
  }
}
