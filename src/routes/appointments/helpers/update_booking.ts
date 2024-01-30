import { goto } from "$app/navigation";
import { base } from "$app/paths";
import BookingController from "$lib/controllers/booking_controller";
import BusinessInitializer from "$lib/initializers/business_initializer";
import type Booking from "$lib/models/booking/booking_model";
import type WorkerModel from "$lib/models/worker/worker_model";
import { ShowToast } from "$lib/stores/ToastManager";
import { translate } from "$lib/utils/translate";
import { deleteNotAvaliableWorkerBooking } from "./delete_not_avaliable_booking";

export async function updateBooking({
  booking,
  worker,
}: {
  booking: Booking;
  worker: WorkerModel | undefined;
}) {
  if (booking.isPassed) {
    ShowToast({
      status: "fail",
      text: translate("alreadyPassed", undefined, false),
    });
    return;
  }
  if (worker == null) {
    await deleteNotAvaliableWorkerBooking({
      booking: booking,
    });
    return;
  }

  if (booking.currentDisplayDate <= new Date()) {
    return;
  }
  console.log(booking.workerId);
  BookingController.initializeBookingMaker({ bookingForUpdate: booking });
  BusinessInitializer.GI().startWorkerListening(worker);
  BusinessInitializer.GI().startTimesListening(worker, false);
  goto(`${base}/business/order`);
}
