import { bookingMakerStore } from "$lib/controllers/booking_controller";
import TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
import * as schedule from "@syncfusion/ej2-schedule";
import { get } from "svelte/store";

export function onEventClick(args: schedule.EventClickArgs): void {
  console.log(args.event);
  const timePickerObj = TimePickerObj.fromScheduleEvent(args.event);
  console.log(timePickerObj);
  const bookingMaker = get(bookingMakerStore);
  bookingMaker.date = timePickerObj.displayDate;
  bookingMaker.currentStep += 1;
  bookingMakerStore.set(bookingMaker);
}
