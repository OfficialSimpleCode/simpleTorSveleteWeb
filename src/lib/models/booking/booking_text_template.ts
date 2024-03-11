// Assuming Booking and BookingReminderType classes are defined somewhere

import { BookingReminderType } from "$lib/consts/booking";
import { subDuration } from "$lib/utils/duration_utils";
import { formatedPhone, getFormatedTime } from "$lib/utils/string_utils";
import { translate } from "$lib/utils/translate";
import { Duration } from "../core/duration";
import Booking from "./booking_model";

export default class BookingTextTemplate {
  booking: Booking;
  constructor(booking: Booking) {
    this.booking = booking;
  }

  reminderTemplateByType(type: BookingReminderType): string {
    switch (type) {
      case BookingReminderType.regular:
        return this.reminderTemplate();
      case BookingReminderType.confirmArrival:
        return this.confirmArrivalReminderTemplate();
      default:
        return "";
    }
  }

  reminderTemplate(): string {
    const sendMessageTime = subDuration(
      this.booking.bookingDate,
      new Duration({
        minutes:
          this.booking.remindersTypes.get(BookingReminderType.regular) ?? 0,
      })
    );
    return translate("alertBookingTemplate", undefined, false)
      .replace(
        "ADRESS",
        this.booking.showAdressAlert && this.booking.adress !== ""
          ? translate("atAdrees").replace("ADRESS", this.booking.adress) + " "
          : ""
      )
      .replace(
        "PHONE",
        this.booking.showPhoneAlert
          ? " " +
              translate("toDetails").replace(
                "PHONE",
                formatedPhone(this.booking.workerPhone)
              )
          : ""
      )
      .replace(
        "DATE",
        getFormatedTime(this.booking.bookingDate, sendMessageTime)
      )
      .replace("WORKERNAME", this.booking.workerName)
      .replace("TREATMENTNAME", this.booking.treatmentsToStringNotDetailed)
      .replace("BUSINESSNAME", this.booking.businessName)
      .replace("NAME", this.booking.customerName);
  }

  confirmArrivalReminderTemplate(): string {
    const sendMessageTime = subDuration(
      this.booking.bookingDate,
      new Duration({
        minutes:
          this.booking.remindersTypes.get(BookingReminderType.confirmArrival) ??
          0,
      })
    );
    return translate("confirmArrivalReminderTemplate", undefined, false)
      .replace(
        "DATE",
        getFormatedTime(this.booking.bookingDate, sendMessageTime)
      )
      .replace("WORKERNAME", this.booking.workerName)
      .replace("TREATMENTNAME", this.booking.treatmentsToStringNotDetailed)
      .replace("BUSINESSNAME", this.booking.businessName)
      .replace("NAME", this.booking.customerName);
  }
}
