import { bookingMakerStore } from "$lib/controllers/booking_controller";
import { loadBookingMakerTimeData } from "$lib/utils/booking_maker";
import { allWeekDays } from "$lib/utils/dates_utils";

export function jumpToDate(newDate: Date) {
  bookingMakerStore.update((value) => {
    value.timePickerDisplayDates = allWeekDays(newDate);
    return value;
  });
  loadBookingMakerTimeData();
}
