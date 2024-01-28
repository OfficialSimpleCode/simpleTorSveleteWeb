// Assuming Booking and BookingReminderType classes are defined somewhere

import { BookingReminderType } from "$lib/consts/booking";
import { formatedPhone, getFormatedTime } from "$lib/utils/string_utils";
import { translate } from "$lib/utils/translate";
import Booking from "./booking_model";

export default class BookingTextTemplate extends Booking {
  constructor(booking: Booking) {
    super(booking);
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
    return translate("alertBookingTemplate", undefined, false)
      .replace(
        "ADRESS",
        this.showAdressAlert && this.adress !== ""
          ? translate("atAdrees").replace("ADRESS", this.adress) + " "
          : ""
      )
      .replace(
        "PHONE",
        this.showPhoneAlert
          ? " " +
              translate("toDetails").replace(
                "PHONE",
                formatedPhone(this.workerPhone)
              )
          : ""
      )
      .replace("DATE", getFormatedTime(this.bookingDate))
      .replace("WORKERNAME", this.workerName)
      .replace("TREATMENTNAME", this.treatmentsToStringNotDetailed)
      .replace("BUSINESSNAME", this.businessName)
      .replace("NAME", this.customerName);
  }

  confirmArrivalReminderTemplate(): string {
    return translate("confirmArrivalReminderTemplate", undefined, false)
      .replace("DATE", getFormatedTime(this.bookingDate))
      .replace("WORKERNAME", this.workerName)
      .replace("TREATMENTNAME", this.treatmentsToStringNotDetailed)
      .replace("BUSINESSNAME", this.businessName)
      .replace("NAME", this.customerName);
  }
}
