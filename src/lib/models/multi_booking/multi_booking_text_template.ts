// export default class MultiBookingTextTemplate extends MultiBooking {
//   constructor(multiBooking: MultiBooking) {
//     super(multiBooking);
//   }

//   reminderTemplateByType(
//     multiBookingUser: MultiBookingUser,
//     type: BookingReminderType
//   ): string {
//     switch (type) {
//       case BookingReminderType.regular:
//         return this.reminderTemplate(multiBookingUser);
//       case BookingReminderType.confirmArrival:
//         return this.confirmArrivalReminderTemplate(multiBookingUser);
//       default:
//         throw new Error("Invalid reminder type");
//     }
//   }

//   reminderTemplate(multiBookingUser: MultiBookingUser): string {
//     return translate("alertMultiBookingTemplate", undefined, false)
//       .replace(
//         "ADRESS",
//         multiBookingUser.showAdressAlert && this.adress
//           ? translate("atAdrees").replace("ADRESS", this.adress) + " "
//           : ""
//       )
//       .replace(
//         "PHONE",
//         multiBookingUser.showPhoneAlert
//           ? " " +
//               translate("toDetails").replace(
//                 "PHONE",
//                 formatedPhone(this.workerPhone)
//               )
//           : ""
//       )
//       .replace("DATE", getFormatedTime(this.bookingDate))
//       .replace("WORKERNAME", this.workerName)
//       .replace("TREATMENTNAME", this.treatment.name)
//       .replace("BUSINESSNAME", this.businessName)
//       .replace("NAME", multiBookingUser.customerName);
//   }

//   confirmArrivalReminderTemplate(multiBookingUser: MultiBookingUser): string {
//     return translate(
//       "confirmArrivalMultiBookingReminderTemplate",
//       undefined,
//       false
//     )
//       .replace("DATE", getFormatedTime(this.bookingDate))
//       .replace("WORKERNAME", this.workerName)
//       .replace("TREATMENTNAME", this.treatment.name)
//       .replace("BUSINESSNAME", this.businessName)
//       .replace("NAME", multiBookingUser.customerName);
//   }
// }