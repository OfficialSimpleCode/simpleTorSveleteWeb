import { pushState } from "$app/navigation";
import { bookingMakerStore } from "$lib/controllers/booking_controller";
import TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
import * as schedule from "@syncfusion/ej2-schedule";
import { get } from "svelte/store";

export function onEventClick(
  args: schedule.EventClickArgs,
  downloadAppDialog: HTMLDialogElement
): void {
  const timePickerObj = TimePickerObj.fromScheduleEvent(args.event);

  const bookingMaker = get(bookingMakerStore);

  console.log("2222222222222222222222");
  if (timePickerObj.isWaitingList) {
    console.log("Eeeeeeeeeeeeeeee");
    pushState("", {
      showModal: true,
    });
    setTimeout(() => downloadAppDialog.showModal(), 200);
    return;
  }
  if (timePickerObj.displayDate == null) {
    return;
  }
  bookingMaker.date = timePickerObj.displayDate;
  bookingMaker.currentStep += 1;
  bookingMakerStore.set(bookingMaker);
}
