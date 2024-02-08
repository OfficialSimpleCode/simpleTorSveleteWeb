import { logger } from "$lib/consts/application_general";
import { NotificationType } from "$lib/consts/booking";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";
import Booking from "$lib/models/booking/booking_model";
import { PaymentTypes } from "$lib/models/booking/booking_transaction";
import Treatment from "$lib/models/general/treatment_model";
import WorkerModel from "$lib/models/worker/worker_model";
import { ShowToast } from "$lib/stores/ToastManager";
import { sendMessage } from "$lib/utils/notifications_utils";
import { translate } from "$lib/utils/translate";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import * as schedule from "@syncfusion/ej2-schedule";

import MultiBooking from "$lib/models/multi_booking/multi_booking";
import type PhoneDataResult from "$lib/models/resps/phone_data_result";
import type TimePickerObj from "$lib/models/ui/booking/time_picker_obj";
import { loadBookingMakerTimeData } from "$lib/utils/booking_maker";
import { length } from "$lib/utils/core_utils";
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
  currentStep: number;
  isMultiEvent: boolean;
  note: string;
}
export const bookingMakerStore = writable<BookingMaker>();

export default class BookingController {
  static timePickerObjects: Record<string, Record<string, any>> = {};
  static oldBooking: Booking | undefined;
  static visibleDates: Date[] = [];
  static scheduleObj: schedule.Schedule | undefined;
  static firstDateToShow: Date | undefined;
  static phoneVerificationResult: PhoneDataResult | undefined;
  static pickedTimeObj: TimePickerObj | undefined;
  static initializeBookingMaker({
    bookingForUpdate,
  }: {
    bookingForUpdate?: Booking;
  }) {
    const initialBookingMaker: BookingMaker = {
      workerId: bookingForUpdate?.workerId,
      showVerificationAlert: false,
      services: {},
      note: "",
      date: bookingForUpdate?.bookingDate,
      isUpdate: bookingForUpdate != null,
      currentPaymentType: PaymentTypes.payment,
      currentCurrencyCode: bookingForUpdate?.currency.code,
      pickMultipleServices: (bookingForUpdate?.treatmentLength ?? 0) > 1,
      hasMultiTreatment: false,
      isBookingWithPaymentUpdate: false,
      currentStep: 0,
      isMultiEvent: false,
    };

    bookingForUpdate?.treatments.forEach((treatment, index) => {
      initialBookingMaker.services[treatment.id] = treatment;
    });
    console.log(initialBookingMaker);
    BookingController.oldBooking = bookingForUpdate;
    bookingMakerStore.set(initialBookingMaker);
  }

  static get worker(): WorkerModel {
    const bookingMaker = get(bookingMakerStore);
    return BusinessInitializer.GI().workers[bookingMaker.workerId ?? ""];
  }

  static setWorkerId(newWorkerId: string) {
    const bookingMaker = get(bookingMakerStore);
    if (newWorkerId === bookingMaker.workerId) {
      bookingMaker.currentStep += 1;
      bookingMakerStore.set(bookingMaker);
      return;
    }

    BusinessInitializer.GI().cancelAllWorkersRegularListenings();

    // Resume the current worker listener
    const currentWorker = BusinessInitializer.GI().workers[newWorkerId];
    if (currentWorker != null) {
      BusinessInitializer.GI().startWorkerListening(currentWorker);
    }

    const worker = BusinessInitializer.GI().workers[newWorkerId];

    if (worker != undefined) {
      bookingMaker.showVerificationAlert = showPhoneVerificationAlert(worker);
    }

    bookingMaker.workerId = newWorkerId;
    bookingMaker.currentStep += 1;
    bookingMakerStore.set(bookingMaker);
  }

  static updateWorkerData(workerObj: WorkerModel) {
    const bookingMaker = get(bookingMakerStore);

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
    if (currentWorker != null) {
      bookingMaker.showVerificationAlert =
        showPhoneVerificationAlert(currentWorker);
    }

    bookingMakerStore.set(bookingMaker);
    //only if there picked worker and picked service  need to update the schedule
    if (
      bookingMaker.workerId != null &&
      Object.entries(bookingMaker.services).length > 0 &&
      BookingController.scheduleObj != undefined
    ) {
      BookingController.scheduleObj.deleteEvent(
        Object.values(BookingController.timePickerObjects)
      );
      loadBookingMakerTimeData(
        BookingController.scheduleObj.getCurrentViewDates(),
        BookingController.worker,
        [30]
      );
      BookingController.scheduleObj.addEvent(
        Object.values(BookingController.timePickerObjects)
      );
    }
  }

  static get bookingFromValues(): Booking {
    const bookingMaker = get(bookingMakerStore);
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
    Object.entries(bookingMaker.services).forEach(([id, service]) => {
      services.set(index.toString(), service);
      index += 1;
    });
    booking.treatments = services;
    return booking;
  }
  static get multiBookingFromValues(): MultiBooking {
    const bookingMaker = get(bookingMakerStore);
    const multiBooking = new MultiBooking({});
    multiBooking.bookingDate = bookingMaker.date ?? new Date(0);

    const worker = this.worker;

    if (!worker) {
      return multiBooking;
    }

    if (length(bookingMaker.services) > 0) {
      multiBooking.treatment = Object.values(bookingMaker.services)[0];
    }

    multiBooking.copyDataToOrder({
      worker: worker,
      customers: {},
      user: UserInitializer.GI().user,
      business: BusinessInitializer.GI().business,
      workerAction: false,
    });

    return multiBooking;
  }

  static onTapService(treatment: Treatment): void {
    const bookingMaker = get(bookingMakerStore);
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

    if (
      bookingMaker.isUpdate &&
      bookingMaker.services[treatment.id] == null &&
      treatment.amountInAdvance > 0
    ) {
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
      } else {
        bookingMaker.currentStep += 1;
        bookingMakerStore.set(bookingMaker);
        //this.addService(bookingMaker, treatment);
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
          undefined,
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

    BusinessInitializer.GI().startTimesListening(worker, treatment.isMulti);
    bookingMaker.isMultiEvent = true;
    bookingMaker.currentStep += 1;
    bookingMakerStore.set(bookingMaker);
  }

  static removeService(bookingMaker: BookingMaker, treatment: Treatment) {
    if (Object.keys(bookingMaker.services).length === 1) {
      bookingMaker.currentCurrencyCode = undefined;
      bookingMaker.currentPaymentType = undefined;
    }
    bookingMaker.services[treatment.id].count = 1;
    delete bookingMaker.services[treatment.id];

    bookingMakerStore.set(bookingMaker);
  }

  static addService(bookingMaker: BookingMaker, treatment: Treatment) {
    console.log("addService");
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

    BusinessInitializer.GI().startTimesListening(worker, treatment.isMulti);

    bookingMaker.currentCurrencyCode = treatment.price!.currency.code;
    if (treatment.amountInAdvance > 0) {
      bookingMaker.currentPaymentType = treatment.paymentType;
    }

    if (!bookingMaker.pickMultipleServices) {
      bookingMaker.services = {};
      bookingMaker.currentStep += 1;
    }
    bookingMaker.services[treatment.id] = treatment;
    bookingMaker.isMultiEvent = false;
    bookingMakerStore.set(bookingMaker);
  }

  static onRemoveTreatmentCount(treatment: Treatment) {
    const bookingMaker = get(bookingMakerStore);
    if (bookingMaker.services[treatment!.id] === undefined) {
      return;
    }
    if (bookingMaker.services[treatment!.id]?.count === 1) {
      this.removeService(bookingMaker, treatment);
    } else {
      bookingMaker.services[treatment.id].count -= 1;
      bookingMakerStore.set(bookingMaker);
    }
  }

  static onAddTreatmentCount(treatment: Treatment) {
    const bookingMaker = get(bookingMakerStore);
    if (bookingMaker.services[treatment!.id] == null) {
      return;
    }
    let treatmentsAmount = 0;
    Object.entries(bookingMaker.services).forEach(
      ([treatmentId, treatment]) => {
        if (bookingMaker.services.hasOwnProperty(treatmentId)) {
          const treatment = bookingMaker.services[treatmentId];
          treatmentsAmount += treatment.count;
        }
      }
    );

    if (treatmentsAmount >= BookingController.worker.maxTreatments) {
      ShowToast({
        text: translate("userMaxTreatments").replaceAll(
          "AMOUNT",
          BookingController.worker.maxTreatments.toString()
        ),
        status: "warning",
      });
      return;
    }
    bookingMaker.services[treatment.id].count += 1;

    bookingMakerStore.set(bookingMaker);
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
