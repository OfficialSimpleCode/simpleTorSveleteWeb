// Assuming Booking and BookingReminderType classes are defined somewhere

import { BookingReminderType } from "$lib/consts/booking";
import { subDuration } from "$lib/utils/duration_utils";
import { formatedPhone, getFormatedTime } from "$lib/utils/string_utils";
import { translate } from "$lib/utils/translate";
import { Duration } from "../core/duration";
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
    const sendMessageTime = subDuration(
      this.bookingDate,
      new Duration({
        minutes: this.remindersTypes.get(BookingReminderType.regular) ?? 0,
      })
    );
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
      .replace("DATE", getFormatedTime(this.bookingDate, sendMessageTime))
      .replace("WORKERNAME", this.workerName)
      .replace("TREATMENTNAME", this.treatmentsToStringNotDetailed)
      .replace("BUSINESSNAME", this.businessName)
      .replace("NAME", this.customerName);
  }

  confirmArrivalReminderTemplate(): string {
    const sendMessageTime = subDuration(
      this.bookingDate,
      new Duration({
        minutes:
          this.remindersTypes.get(BookingReminderType.confirmArrival) ?? 0,
      })
    );
    return translate("confirmArrivalReminderTemplate", undefined, false)
      .replace("DATE", getFormatedTime(this.bookingDate, sendMessageTime))
      .replace("WORKERNAME", this.workerName)
      .replace("TREATMENTNAME", this.treatmentsToStringNotDetailed)
      .replace("BUSINESSNAME", this.businessName)
      .replace("NAME", this.customerName);
  }
}
