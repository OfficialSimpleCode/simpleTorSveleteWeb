import Treatment from "$lib/models/general/treatment_model";
import type MultiBookingTime from "$lib/models/multi_booking/multi_booking_time";
import WorkerModel from "$lib/models/worker/worker_model";
import { dateToDateStr, dateToTimeStr } from "../times_utils";

export function hasPlaceInMultiBooking({
  date,
  worker,
  treatment,
}: {
  date: Date;
  worker: WorkerModel;
  treatment: Treatment;
}): boolean {
  const signingDate = dateToDateStr(date);
  const signingTime = dateToTimeStr(date);
  let time: MultiBookingTime | undefined = undefined;
  if (worker.multiEventsTimes.times[signingDate] != null) {
    time = worker.multiEventsTimes.times[signingDate][signingTime];
  }

  const currentParticipants: number | undefined = time?.currentParticipants;
  const maxParticipants = time?.maxParticipants;

  return (
    (currentParticipants ?? 0) < (maxParticipants ?? treatment.participants)
  );
}
