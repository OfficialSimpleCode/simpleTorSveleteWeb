import { BookingReminderType } from "$lib/consts/booking";
import { subDuration } from "$lib/utils/duration_utils";
import { formatedPhone, getFormatedTime } from "$lib/utils/string_utils";
import { translate } from "$lib/utils/translate";
import { Duration } from "../core/duration";
import MultiBooking from "./multi_booking";
import type MultiBookingUser from "./multi_booking_user";

export default class MultiBookingTextTemplate {
  multiBooking: MultiBooking;
  constructor(multiBooking: MultiBooking) {
    this.multiBooking = multiBooking;
  }

  reminderTemplateByType(
    multiBookingUser: MultiBookingUser,
    type: BookingReminderType
  ): string {
    switch (type) {
      case BookingReminderType.regular:
        return this.reminderTemplate(multiBookingUser);
      case BookingReminderType.confirmArrival:
        return this.confirmArrivalReminderTemplate(multiBookingUser);
      default:
        throw new Error("Invalid reminder type");
    }
  }

  reminderTemplate(multiBookingUser: MultiBookingUser): string {
    const sendMessageTime = subDuration(
      this.multiBooking.bookingDate,
      new Duration({
        minutes:
          multiBookingUser.remindersTypes.get(BookingReminderType.regular) ?? 0,
      })
    );
    return translate("alertMultiBookingTemplate", undefined, false)
      .replace(
        "ADRESS",
        multiBookingUser.showAdressAlert && this.multiBooking.adress
          ? translate("atAdrees").replace("ADRESS", this.multiBooking.adress) +
              " "
          : ""
      )
      .replace(
        "PHONE",
        multiBookingUser.showPhoneAlert
          ? " " +
              translate("toDetails").replace(
                "PHONE",
                formatedPhone(this.multiBooking.workerPhone)
              )
          : ""
      )
      .replace(
        "DATE",
        getFormatedTime(this.multiBooking.bookingDate, sendMessageTime)
      )
      .replace("WORKERNAME", this.multiBooking.workerName)
      .replace("TREATMENTNAME", this.multiBooking.treatment.name)
      .replace("BUSINESSNAME", this.multiBooking.businessName)
      .replace("NAME", multiBookingUser.customerName);
  }

  confirmArrivalReminderTemplate(multiBookingUser: MultiBookingUser): string {
    const sendMessageTime = subDuration(
      this.multiBooking.bookingDate,
      new Duration({
        minutes:
          multiBookingUser.remindersTypes.get(
            BookingReminderType.confirmArrival
          ) ?? 0,
      })
    );
    return translate(
      "confirmArrivalMultiBookingReminderTemplate",
      undefined,
      false
    )
      .replace(
        "DATE",
        getFormatedTime(this.multiBooking.bookingDate, sendMessageTime)
      )
      .replace("WORKERNAME", this.multiBooking.workerName)
      .replace("TREATMENTNAME", this.multiBooking.treatment.name)
      .replace("BUSINESSNAME", this.multiBooking.businessName)
      .replace("NAME", multiBookingUser.customerName);
  }
}
