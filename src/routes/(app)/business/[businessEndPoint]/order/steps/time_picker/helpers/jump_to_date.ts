import { bookingMakerStore } from "$lib/controllers/booking_controller";
import {
  getForwardDays,
  loadBookingMakerTimeData,
} from "$lib/utils/booking_maker";

export function jumpToDate(newDate: Date) {
  bookingMakerStore.update((value) => {
    value.timePickerDisplayDates = getForwardDays(
      newDate,
      value.numberOfShownDays
    );
    return value;
  });
  loadBookingMakerTimeData();
}
