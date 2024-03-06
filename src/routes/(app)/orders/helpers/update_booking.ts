import { goto } from "$app/navigation";
import { base } from "$app/paths";
import BookingController from "$lib/controllers/booking_controller";
import { GeneralData } from "$lib/helpers/general_data";
import BusinessInitializer from "$lib/initializers/business_initializer";
import type Booking from "$lib/models/booking/booking_model";
import { businessStore } from "$lib/stores/Business";
import { ShowToast } from "$lib/stores/ToastManager";
import { workersStore } from "$lib/stores/Workers";
import { translate } from "$lib/utils/translate";
import { get } from "svelte/store";

export async function updateBooking({ booking }: { booking: Booking }) {
  const worker = get(workersStore)[booking.workerId];
  if (booking.isPassed) {
    ShowToast({
      status: "fail",
      text: translate("alreadyPassed", undefined, false),
    });
    return;
  }
  if (booking.buisnessId != GeneralData.currentBusinesssId) {
    ShowToast({
      status: "info",
      text: translate("needToLoadBusiness", undefined, false),
    });

    return;
  }
  if (booking.isMultiRef) {
    ShowToast({
      status: "info",
      text: translate("cantUpdateEvent", undefined, false),
    });

    return;
  }

  if (booking.isPassed) {
    ShowToast({
      status: "fail",
      text: translate("alreadyPassed", undefined, false),
    });
    return;
  }

  if (booking.currentDisplayDate <= new Date()) {
    return;
  }
  BookingController.bookingToUpdate = booking;
  BusinessInitializer.GI().startWorkerListening(worker);
  BusinessInitializer.GI().startTimesListening(worker, false);

  await goto(`${base}/business/${get(businessStore)?.url ?? ""}/order`);
}
