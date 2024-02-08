import type Treatment from "$lib/models/general/treatment_model";
import TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
import type WorkerModel from "$lib/models/worker/worker_model";
import { dateToDateStr, timeStrToDate } from "../times_utils";

/**
 * Returns a list of relevant multi-event times for the given worker, date, and treatment.
 * @param worker - The worker model.
 * @param dateForCheck - The date for checking relevance.
 * @param treatment - The treatment for filtering relevant times.
 * @returns List of relevant multi-event times.
 */
export function relevantMultiEventTime({
  worker,
  dateForCheck,
  treatment,
}: {
  worker: WorkerModel;
  dateForCheck: Date;
  treatment: Treatment;
}): TimePickerObj[] {
  const finalTimes: TimePickerObj[] = [];

  // Check if the date is in the worker's close calendar date
  if (
    dateToDateStr(worker.closeCalendarDate ?? new Date(0)) ===
    dateToDateStr(dateForCheck)
  ) {
    return finalTimes;
  }

  // Check if the worker's calendar is closed
  if (!worker.openCalendar) {
    return finalTimes;
  }

  // Retrieve multi-event times for the specified date
  const workerTimes =
    worker.multiEventsTimes.times[dateToDateStr(dateForCheck)] ?? {};

  // Iterate through the times and filter relevant ones
  Object.entries(workerTimes).forEach(([timeStr, timeObj]) => {
    if (timeObj.treatmentId === treatment.id && timeObj.index === 0) {
      const startTime = timeStrToDate(timeStr);
      const displayDate = new Date(
        dateForCheck.getFullYear(),
        dateForCheck.getMonth(),
        dateForCheck.getDate(),
        startTime.getHours(),
        startTime.getMinutes()
      );

      // Check if the display date is before the current time
      if (displayDate < new Date()) {
        return;
      }

      const maxParticipants = timeObj.maxParticipants ?? treatment.participants;
      console.log("Eeeeeeeeeeeeeeeeeee", displayDate);
      finalTimes.push(
        new TimePickerObj({
          isMulti: true,
          showMultiWaitingList: timeObj.showWaitingList,
          signedPaymentRequestId: timeObj.paymentRequestId,
          displayDate,
          maxParticipants,
          isWaitingList: maxParticipants <= timeObj.currentParticipants,
          currentParticipants: timeObj.currentParticipants,
          showParticipants: treatment.showParticipants,
        })
      );
    }
  });

  // Iterate through recurrence events and filter relevant ones
  Object.entries(worker.recurrence.recurrenceEvents).forEach(
    ([_, eventsDay]) => {
      Object.entries(eventsDay).forEach(([timeStr, event]) => {
        if (event.recurrenceEvent?.start?.getDate() === 12) {
          console.log(event.recurrenceEvent?.start);
          console.log(
            !event.isMulti,
            event.recurrenceEvent == null,
            event.treatmentId !== treatment.id,
            !event.recurrenceEvent?.isAccureInDate({ date: dateForCheck }),
            event.eventIndex !== 0
          );
        }

        if (
          !event.isMulti ||
          event.recurrenceEvent == null ||
          event.treatmentId !== treatment.id ||
          !event.recurrenceEvent?.isAccureInDate({ date: dateForCheck }) ||
          event.eventIndex !== 0
        ) {
          return;
        }

        const startTime = timeStrToDate(timeStr);
        const displayDate = new Date(
          dateForCheck.getFullYear(),
          dateForCheck.getMonth(),
          dateForCheck.getDate(),
          startTime.getHours(),
          startTime.getMinutes()
        );
        console.log("3333333333333", displayDate);

        finalTimes.push(
          new TimePickerObj({
            displayDate,
            isMulti: true,
            recurrenceTimeId: event.timeId ?? undefined,
            recurrenceFatherBookingId: event.recurrenceFatherBookingId,
            maxParticipants: treatment.participants,
            currentParticipants: event.currentParticipants,
            isWaitingList: treatment.participants <= event.currentParticipants,
            showParticipants: treatment.showParticipants,
            recurrenceMultiEvent: event.recurrenceEvent,
            fatherRecurrenceMultiEventDate: event.from,
          })
        );
      });
    }
  );

  // Sort the final times by display date
  finalTimes.sort(
    (a, b) => a.displayDate!.getTime() - b.displayDate!.getTime()
  );

  return finalTimes;
}
