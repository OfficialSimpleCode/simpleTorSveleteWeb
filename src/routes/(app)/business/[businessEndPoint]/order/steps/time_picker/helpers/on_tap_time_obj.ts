import BookingController, {
  bookingMakerStore,
} from "$lib/controllers/booking_controller";
import TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
import { get } from "svelte/store";

export function onTimeItemClick(timePickerObj: TimePickerObj): void {
  const bookingMaker = get(bookingMakerStore);

  if (timePickerObj.displayDate == null) {
    return;
  }
  BookingController.pickedTimeObj = timePickerObj;
  bookingMaker.date = timePickerObj.displayDate;

  //delete the treatments changed price and changed times its per
  //BookingController().pickedTimeObj so need to initial it every
  //time we pick new time obj
  Object.entries(bookingMaker.services).forEach(([_, service]) => {
    service.changedPrice = undefined;
    service.changedTimes = undefined;
  });
  bookingMaker.currentStep += 1;
  bookingMakerStore.set(bookingMaker);
}
