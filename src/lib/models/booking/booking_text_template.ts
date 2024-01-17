// Assuming Booking and BookingReminderType classes are defined somewhere

import { formatedPhone, getFormatedTime, translate } from "$lib/utils/string_utilitis";
import Booking from "./booking_model";

class BookingTextTemplate extends Booking {
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
          return '';
      }
    }
  
    reminderTemplate(): string {
      return translate("alertBookingTemplate", false)
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
        .replace('DATE', getFormatedTime(this.bookingDate))
        .replace("WORKERNAME", this.workerName)
        .replace("TREATMENTNAME", this.treatmentsToStringNotDetailed)
        .replace("BUSINESSNAME", this.businessName)
        .replace("NAME", this.customerName);
    }
  
    confirmArrivalReminderTemplate(): string {
      return translate("confirmArrivalReminderTemplate", false)
        .replace('DATE', getFormatedTime(this.bookingDate))
        .replace("WORKERNAME", this.workerName)
        .replace("TREATMENTNAME", this.treatmentsToStringNotDetailed)
        .replace("BUSINESSNAME", this.businessName)
        .replace("NAME", this.customerName);
    }
  }
  