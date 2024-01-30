import {
  NotificationType,
  type BookingReminderType,
} from "$lib/consts/booking";
import { NumericCommands } from "$lib/consts/db";
import { emojisRegex } from "$lib/consts/string";
import DbPathesHelper from "$lib/helpers/db_paths_helper";
import GeneralRepo from "$lib/helpers/general/general_repo";
import type Booking from "$lib/models/booking/booking_model";
import { Duration } from "$lib/models/core/duration";
import { subDuration } from "$lib/utils/duration_utils";
import { removePhoneNumberPrefix } from "$lib/utils/string_utils";
import MessageRepo from "./messages_repo";
export default class MessagesHelper {
  private static _singleton: MessagesHelper = new MessagesHelper();

  private constructor() {}

  public static GI(): MessagesHelper {
    return MessagesHelper._singleton;
  }

  private generalRepo: GeneralRepo = new GeneralRepo();

  messageRepo: MessageRepo = new MessageRepo();

  ///Get `bookings` and schedule them with message
  async scheduleMessageToMultipleBookings(
    bookings: Record<string, Booking>
  ): Promise<boolean> {
    if (Object.keys(bookings).length === 0) {
      return true;
    }
    const messages: ScheduleMessage[] = [];
    const businessToDecrease: Map<string, number> = new Map();
    Object.entries(bookings).forEach(([bookingId, booking]) => {
      // seconds from now to the time that need to notify
      const reminders = booking.remindersToScheduleMessages;
      messages.push(...reminders);
      if (!businessToDecrease.has(booking.buisnessId)) {
        businessToDecrease.set(booking.buisnessId, 0);
      }
      businessToDecrease.set(
        booking.buisnessId,
        businessToDecrease.get(booking.buisnessId)! + reminders.length
      );
    });
    // no possibility to Non-valid data
    return await this.sendMultipleScheduleAccordingToPlatfrom({
      messages: messages,
    }).then((value) => {
      if (value) {
        businessToDecrease.forEach((value, businessId) => {
          this.decreaseMessageCounter(businessId, value);
        });
      }
      return value;
    });
  }
  async updateBookingScheduleMessage(
    oldBooking: Booking,
    newBooking: Booking
  ): Promise<boolean> {
    if (
      oldBooking.notificationType !== NotificationType.message ||
      newBooking.notificationType !== NotificationType.message
    ) {
      return false;
    }

    const cancelResp = await this.cancelScheduleMessageToMultipleBookings({
      [oldBooking.bookingId]: oldBooking,
    });

    if (!cancelResp) {
      return false;
    }

    return await this.scheduleMessageToMultipleBookings({
      [newBooking.bookingId]: newBooking,
    });
  }

  ///Get `bookings` and cancel all the bookings schedule messages
  async cancelSpecificScheduleMessageOnBooking(
    booking: Booking,
    reminderType: BookingReminderType
  ): Promise<boolean> {
    const messages: Record<string, string> = {};
    const businessToDecrease: Map<string, number> = new Map();
    messages[booking.reminderId(reminderType)] = removePhoneNumberPrefix(
      booking.customerPhone
    );

    businessToDecrease.set(booking.buisnessId, 1);
    if (Object.keys(messages).length === 0) {
      return true;
    }
    // no possibility to Non-valid data
    return await this._cancelMultipleScheduleAccordingToPlatfrom({
      messages: messages,
    }).then((value) => {
      if (value) {
        businessToDecrease.forEach((value, businessId) => {
          this.increaseMessageCounter(businessId, value);
        });
      }
      return value;
    });
  }

  ///Get `bookings` and cancel all the bookings schedule messages
  async cancelScheduleMessageToMultipleBookings(
    bookings: Record<string, Booking>
  ): Promise<boolean> {
    if (Object.keys(bookings).length === 0) {
      return true;
    }
    const messages: Record<string, string> = {};
    const businessToDecrease: Map<string, number> = new Map();
    Object.entries(bookings).forEach(([bookingId, booking]) => {
      const reminders = booking.messageRemindersOnBooking;
      reminders.forEach((reminderId) => {
        messages[reminderId] = removePhoneNumberPrefix(booking.customerPhone);
      });
      if (!businessToDecrease.has(booking.buisnessId)) {
        businessToDecrease.set(booking.buisnessId, 0);
      }
      businessToDecrease.set(
        booking.buisnessId,
        businessToDecrease.get(booking.buisnessId)! + reminders.length
      );
    });
    if (Object.keys(messages).length === 0) {
      return true;
    }
    return await this._cancelMultipleScheduleAccordingToPlatfrom({
      messages: messages,
    });
  }

  private removePhoneNumberPrefix(number: string): string {
    // Implement this method according to your needs
    return number;
  }

  async sendScheduleAccordingPlatform({
    isWhatsapp,
    number,
    content,
    messageId,
    minutesBeforeNotify,
    eventTime,
  }: {
    isWhatsapp: boolean;
    number: string;
    content: string;
    messageId: string;
    minutesBeforeNotify: number;
    eventTime: Date;
  }): Promise<boolean> {
    if (minutesBeforeNotify === 0) {
      return true;
    }

    const timeToSend = subDuration(
      eventTime,
      new Duration({ minutes: minutesBeforeNotify })
    );

    if (timeToSend.getTime() < new Date().getTime()) {
      return true;
    }

    if (isWhatsapp) {
      // return await ServerMessagesClient.sendScheduleWhatsappMessage({
      //   destNumber: number,
      //   message: content,
      //   secondsDelata: secondsDelata,
      // });
    }

    // get rid of symbols
    content = content.replace(emojisRegex, "");

    return await this.messageRepo.sendScheduleSms(
      this.removePhoneNumberPrefix(number),
      content,
      messageId,
      timeToSend
    );
  }

  async sendMultipleScheduleAccordingToPlatfrom({
    messages,
  }: {
    messages: ScheduleMessage[];
  }): Promise<boolean> {
    if (messages.length === 0) {
      return true;
    }
    return await this.messageRepo.sendMultipleScheduleSms(messages);
  }

  async _cancelMultipleScheduleAccordingToPlatfrom({
    messages,
  }: {
    messages: Record<string, string>;
  }): Promise<boolean> {
    if (Object.keys(messages).length === 0) {
      return true;
    }
    return await this.messageRepo.cancelMultipleScheduleSms(messages);
  }

  async decreaseMessageCounter(
    businessId: string,
    count: number = 1
  ): Promise<boolean> {
    if (count === 0) {
      return true;
    }
    const childPath = DbPathesHelper.GI().getBusinessDataPath(businessId);
    return await this.generalRepo.incrementNumberChild({
      childPath: childPath,
      valueId: "messagesCounter",
      delta: count,
      command: NumericCommands.decrement,
    });
  }

  async increaseMessageCounter(
    businessId: string,
    count: number = 1
  ): Promise<boolean> {
    const childPath = DbPathesHelper.GI().getBusinessDataPath(businessId);
    return await this.generalRepo.incrementNumberChild({
      childPath: childPath,
      valueId: "messagesCounter",
      delta: count,
      command: NumericCommands.increment,
    });
  }
}
