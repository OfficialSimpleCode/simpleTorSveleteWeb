import { logger } from "$lib/consts/application_general";
import { NotificationType } from "$lib/consts/booking";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";
import Booking from "$lib/models/booking/booking_model";
import type { PaymentTypes } from "$lib/models/booking/booking_transaction";
import Treatment from "$lib/models/general/treatment_model";
import type WorkerModel from "$lib/models/worker/worker_model";
import { ShowToast } from "$lib/stores/ToastManager";
import { sendMessage } from "$lib/utils/notifications_utils";
import { translate } from "$lib/utils/translate";

import { get, writable } from "svelte/store";
interface BookingMaker {
  workerId?: string;
  showVerificationAlert: boolean;
  services: Record<string, Treatment>;
  date?: Date;
  isUpdate: boolean;
  pickMultipleServices: boolean;
  currentCurrencyCode?: string;
  currentPaymentType?: PaymentTypes;
  hasMultiTreatment: boolean;
  isBookingWithPaymentUpdate: boolean;
}
export default class BookingController {
  static bookingMakerStore = writable<BookingMaker>();

  static initializeBookingMaker({ isUpdate = false }: { isUpdate?: boolean }) {
    console.log("initializeBookingMaker");
    const initialBookingMaker: BookingMaker = {
      workerId: undefined,
      showVerificationAlert: false,
      services: {},
      date: undefined,
      isUpdate: isUpdate,
      currentPaymentType: undefined,
      currentCurrencyCode: undefined,
      pickMultipleServices: false,
      hasMultiTreatment: false,
      isBookingWithPaymentUpdate: false,
    };
    BookingController.bookingMakerStore.set(initialBookingMaker);
  }

  static setWorkerId(newWorkerId: string) {
    const bookingMaker = get(BookingController.bookingMakerStore);
    if (newWorkerId === bookingMaker.workerId) {
      return;
    }

    BusinessInitializer.GI().cancelAllWorkersRegularListenings();

    // Resume the current worker listener
    const currentWorker = BusinessInitializer.GI().workers[newWorkerId];
    if (currentWorker !== null && currentWorker !== undefined) {
      BusinessInitializer.GI().startWorkerListening(currentWorker);
    }

    const worker = BusinessInitializer.GI().workers[newWorkerId];

    if (worker != undefined) {
      bookingMaker.showVerificationAlert = showPhoneVerificationAlert(worker);
    }

    bookingMaker.workerId = newWorkerId;

    BookingController.bookingMakerStore.set(bookingMaker);
  }

  static updateWorkerData(workerObj: WorkerModel) {
    const bookingMaker = get(BookingController.bookingMakerStore);
    logger.debug("Getting new data for the worker");

    // If treatments had changed
    const servicesCopy = { ...bookingMaker.services };
    Object.keys(servicesCopy).forEach((serviceId) => {
      if (!workerObj.hasTreatemnt(serviceId)) {
        delete bookingMaker.services[serviceId];
      }
    });

    // Update the current picked services with the new worker data
    workerObj.treatmentsSubjects.forEach((subject, key) => {
      subject.treatments.forEach((service, _) => {
        if (bookingMaker.services.hasOwnProperty(service.id)) {
          const count = bookingMaker.services[service.id].count;
          const tempService = Treatment.fromTreatment(service);
          tempService.count = count;
          bookingMaker.services[service.id] = tempService;
        }
      });
    });

    const currentWorker =
      BusinessInitializer.GI().workers[bookingMaker.workerId!];
    if (currentWorker !== null) {
      bookingMaker.showVerificationAlert =
        showPhoneVerificationAlert(currentWorker);
    }

    BookingController.bookingMakerStore.set(bookingMaker);
  }

  get bookingFromValues(): Booking {
    const bookingMaker = get(BookingController.bookingMakerStore);
    const booking = new Booking({
      workerId: bookingMaker.workerId,
    });

    booking.bookingDate = bookingMaker.date ?? new Date(0);

    const worker =
      BusinessInitializer.GI().workers[bookingMaker.workerId ?? ""];

    if (worker === null || worker === undefined) {
      return booking;
    }

    const services: Map<string, Treatment> = new Map();
    let index = 0;
    Object.entries(services).forEach(([id, service]) => {
      services.set(index.toString(), service);
      index += 1;
    });
    booking.treatments = services;
    return booking;
  }

  static onTapService(treatment: Treatment): void {
    console.log("rrrrrrrrrrrrrrrrrrrrrr");
    const bookingMaker = get(BookingController.bookingMakerStore);
    if (
      bookingMaker.isBookingWithPaymentUpdate &&
      !bookingMaker.services.hasOwnProperty(treatment.id)
    ) {
      ShowToast({
        text: translate("cantEditTreatmentOnPaymentBooking"),
        status: "warning",
      });
      return;
    }

    if (bookingMaker.isUpdate && treatment.amountInAdvance > 0) {
      ShowToast({
        text: translate("cantChoosePaymentServiceOnBookingUpdate"),
        status: "warning",
      });
      return;
    }

    const alreadyPicked = bookingMaker.services.hasOwnProperty(treatment.id);

    if (!alreadyPicked) {
      if (treatment.isMulti) {
        this.addMultiService(bookingMaker, treatment);
      } else {
        this.addService(bookingMaker, treatment);
      }
    } else {
      if (bookingMaker.pickMultipleServices) {
        this.removeService(bookingMaker, treatment);
      }
    }
  }

  static addMultiService(bookingMaker: BookingMaker, treatment: Treatment) {
    if (
      bookingMaker.pickMultipleServices &&
      Object.keys(bookingMaker.services).length > 0
    ) {
      ShowToast({
        text: translate(
          bookingMaker.hasMultiTreatment
            ? "noMultiWithMulti"
            : "noMultiWithRegular",
          false
        ),
        status: "warning",
      });
      return;
    }

    bookingMaker.services = {
      [treatment.id]: treatment,
    };
    const worker =
      BusinessInitializer.GI().workers[bookingMaker.workerId ?? ""];
    if (worker === undefined) {
      return;
    }

    BusinessInitializer.GI().startTimesListening(
      worker,
      treatment.isMulti,
      treatment.amountInAdvance > 0
    );
    BookingController.bookingMakerStore.set(bookingMaker);
  }

  static removeService(bookingMaker: BookingMaker, treatment: Treatment) {
    if (Object.keys(bookingMaker.services).length === 1) {
      bookingMaker.currentCurrencyCode = undefined;
      bookingMaker.currentPaymentType = undefined;
    }
    bookingMaker.services[treatment.id].count = 1;
    delete bookingMaker.services[treatment.id];

    BookingController.bookingMakerStore.set(bookingMaker);
  }

  static addService(bookingMaker: BookingMaker, treatment: Treatment) {
    let treatmentsAmount = 0;
    Object.values(bookingMaker.services).forEach((treatment) => {
      treatmentsAmount += treatment.count;
    });
    const worker =
      BusinessInitializer.GI().workers[bookingMaker.workerId ?? ""];
    if (worker === undefined) {
      return;
    }
    if (bookingMaker.pickMultipleServices && bookingMaker.hasMultiTreatment) {
      ShowToast({
        text: translate("noMultiWithRegular"),
        status: "warning",
      });
      return;
    }
    if (treatmentsAmount >= worker.maxTreatments) {
      ShowToast({
        text: translate("userMaxTreatments").replace(
          "AMOUNT",
          worker.maxTreatments.toString()
        ),
        status: "warning",
      });
      return;
    }

    if (
      bookingMaker.pickMultipleServices &&
      treatment.amountInAdvance > 0 &&
      treatment.paymentType != undefined &&
      treatment.paymentType != bookingMaker.currentPaymentType &&
      bookingMaker.currentPaymentType != undefined
    ) {
      ShowToast({
        text: translate("cantPickDiffrentPaymentType"),
        status: "warning",
      });
      return;
    }

    if (
      bookingMaker.pickMultipleServices &&
      treatment.price!.currency.code != bookingMaker.currentCurrencyCode &&
      bookingMaker.currentCurrencyCode != undefined
    ) {
      ShowToast({
        text: translate("cantPickDiffrentCurrencies"),
        status: "warning",
      });
      return;
    }

    BusinessInitializer.GI().startTimesListening(
      worker,
      treatment.isMulti,
      treatment.amountInAdvance > 0
    );

    bookingMaker.currentCurrencyCode = treatment.price!.currency.code;
    if (treatment.amountInAdvance > 0) {
      bookingMaker.currentPaymentType = treatment.paymentType;
    }

    if (bookingMaker.pickMultipleServices) {
      bookingMaker.services[treatment.id] = treatment;
    } else {
      bookingMaker.services = {
        [treatment.id]: treatment,
      };
    }
    BookingController.bookingMakerStore.set(bookingMaker);
  }
}
function showPhoneVerificationAlert(worker: WorkerModel): boolean {
  const tempBooking = new Booking({});
  tempBooking.userFcms = UserInitializer.GI().user.fcmsTokens;
  tempBooking.isVerifiedPhone = true;
  return (
    (sendMessage({ booking: tempBooking, worker: worker }) ==
      NotificationType.message ||
      worker.mustVerifyPhone) &&
    !UserInitializer.GI().user.isVerifiedPhone
  );
}
