import {
  NotificationType,
  type BookingReminderType,
} from "$lib/consts/booking";
import { NumericCommands } from "$lib/consts/db";
import { emojisRegex } from "$lib/consts/string";
import DbPathesHelper from "$lib/helpers/db_paths_helper";
import GeneralRepo from "$lib/helpers/general/general_repo";
import BusinessInitializer from "$lib/initializers/business_initializer";
import UserInitializer from "$lib/initializers/user_initializer";
import type Booking from "$lib/models/booking/booking_model";
import { BusinessData } from "$lib/models/business/business_data";
import { Duration } from "$lib/models/core/duration";
import type MultiBooking from "$lib/models/multi_booking/multi_booking";
import type MultiBookingUser from "$lib/models/multi_booking/multi_booking_user";
import type ScheduleMessage from "$lib/models/notifications/schedule_message";
import PaymentRequest from "$lib/models/payment_hyp/payment_request/payment_request";
import { isEmpty } from "$lib/utils/core_utils";
import { subDuration } from "$lib/utils/duration_utils";
import { removePhoneNumberPrefix } from "$lib/utils/string_utils";
import { translate } from "$lib/utils/translate";
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

    console.log("2222222222222222222222222222222222");
    const messages: ScheduleMessage[] = [];
    const businessToDecrease: Record<string, number> = {};
    Object.entries(bookings).forEach(([bookingId, booking]) => {
      // seconds from now to the time that need to notify
      const reminders = booking.remindersToScheduleMessages;
      messages.push(...reminders);
      businessToDecrease[booking.buisnessId] ??= 0;
      businessToDecrease[booking.buisnessId] =
        businessToDecrease[booking.buisnessId]! + reminders.length;
    });
    console.log(messages);
    // no possibility to Non-valid data
    return await this.sendMultipleScheduleAccordingToPlatfrom({
      messages: messages,
    }).then((value) => {
      if (value) {
        Object.entries(businessToDecrease).forEach(([businessId, value]) => {
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
    console.log("cccccccccccccccccccccccccccccccccccccccccccccccc");
    if (Object.keys(bookings).length === 0) {
      return true;
    }
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    const messages: Record<string, string> = {};
    const businessToIncrease: Record<string, number> = {};
    Object.entries(bookings).forEach(([_, booking]) => {
      const reminders = booking.messageRemindersOnBooking;
      console.log(reminders);
      reminders.forEach((reminderId) => {
        messages[reminderId] = removePhoneNumberPrefix(booking.customerPhone);
      });
      businessToIncrease[booking.buisnessId] ??= 0;
      businessToIncrease[booking.buisnessId] =
        businessToIncrease[booking.buisnessId]! + reminders.length;
    });
    console.log(messages);
    console.log("ddddddddddddddddddddddddddddddddddddddddddddddd");
    if (isEmpty(messages)) {
      return true;
    }
    return await this._cancelMultipleScheduleAccordingToPlatfrom({
      messages: messages,
    }).then((value) => {
      if (value) {
        Object.entries(businessToIncrease).forEach(([businessId, value]) => {
          this.increaseMessageCounter(businessId, value);
        });
      }
      return value;
    });
  }

  async scheduleMultiBookingMessagesToUsers({
    multiBooking,
    multiBookingUsers,
  }: {
    multiBooking: MultiBooking;
    multiBookingUsers: Record<string, MultiBookingUser>;
  }): Promise<boolean> {
    if (isEmpty(multiBookingUsers)) {
      return true;
    }
    const messages: ScheduleMessage[] = [];
    const businessToDecrease: Record<string, number> = {};
    const existNumbers: Set<string> = new Set();
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    Object.entries(multiBookingUsers).forEach(([_, multiBookingUser]) => {
      if (existNumbers.has(multiBookingUser.customerPhone)) {
        return;
      }
      console.log("222222222222");
      const reminders =
        multiBooking.remindersToScheduleMessages(multiBookingUser);
      console.log(reminders);
      messages.push(...reminders);
      if (reminders.length > 0) {
        existNumbers.add(multiBookingUser.customerPhone);
      }

      businessToDecrease[multiBooking.buisnessId] ??= 0;
      businessToDecrease[multiBooking.buisnessId] =
        businessToDecrease[multiBooking.buisnessId] + reminders.length;
      console.log("777777777777777777777777777777777");
    });
    console.log(messages);
    // no possibility to Non-valid data
    const value = await this.sendMultipleScheduleAccordingToPlatfrom({
      messages,
    });
    if (value) {
      Object.entries(businessToDecrease).forEach(([businessId, count]) => {
        this.decreaseMessageCounter(businessId, count);
      });
    }
    return value;
  }

  async cancelScheduleMultiBookingMessagesToUsers({
    multiBooking,
    multiBookingUsers,
  }: {
    multiBooking: MultiBooking;
    multiBookingUsers: Record<string, MultiBookingUser>;
  }): Promise<boolean> {
    if (Object.entries(multiBookingUsers).length === 0) {
      return true;
    }
    console.log("dddddddddddddddddddddddddddddddddddddddddddd");
    const messages: Record<string, string> = {};
    const businessToIncrease: Record<string, number> = {};
    const existNumbers: Set<string> = new Set();
    Object.entries(multiBookingUsers).forEach(
      ([bookingId, multiBookingUser]) => {
        if (existNumbers.has(multiBookingUser.customerPhone)) {
          return;
        }
        const reminders = multiBooking.messageRemindersOnUser(multiBookingUser);
        console.log("reminders", reminders);
        reminders.forEach((reminderId) => {
          messages[reminderId] = removePhoneNumberPrefix(
            multiBookingUser.customerPhone
          );
        });

        if (reminders.length > 0) {
          existNumbers.add(multiBookingUser.customerPhone);
        }

        businessToIncrease[multiBooking.buisnessId] ??= 0;
        businessToIncrease[multiBooking.buisnessId] =
          businessToIncrease[multiBooking.buisnessId] + reminders.length;
      }
    );
    console.log("messages", messages);
    const result = await this._cancelMultipleScheduleAccordingToPlatfrom({
      messages,
    });

    if (result) {
      Object.entries(businessToIncrease).forEach(([businessId, value]) => {
        this.increaseMessageCounter(businessId, value);
      });
    }

    return result;
  }

  async messageClientsThatWorkerAsignToThemNewPaymentRequest(
    numbers: Set<string>,
    paymentRequest: PaymentRequest
  ): Promise<void> {
    const validNumbers = this.filterValidNumbers(numbers);
    await this.sendMultipleSameSmsAccordingPlatform({
      isWhatsapp: false,
      destNumbers: validNumbers,
      content: translate("newPaymentRequestContent", undefined, false)
        .replace("WORKERNAME", paymentRequest.workerInfo.workerName)
        .replace("BUSINESSNAME", paymentRequest.businessInfo.businessName)
        .replace("PRICE", paymentRequest.price.toString()),
    }).then((value) => {
      if (value) {
        this.decreaseMessageCounter(
          paymentRequest.businessInfo.businessId,
          validNumbers.size
        );
      }
      return value;
    });
  }

  async messageNotExistClientsThatWorkerAsignToThemNewPaymentRequest({
    numbers,
    paymentRequest,
  }: {
    numbers: Set<string>;
    paymentRequest: PaymentRequest;
  }) {
    try {
      const validNumbers = this.filterValidNumbers(numbers);
      const content = translate(
        "notExistNewPaymentRequestContent",
        undefined,
        false
      )
        .replace("WORKERNAME", paymentRequest.workerInfo.workerName)
        .replace("BUSINESSNAME", paymentRequest.businessInfo.businessName)
        .replace("LINK", BusinessInitializer.GI().business.dynamicLink)
        .replace("PRICE", paymentRequest.price.toString());

      const resp = await this.sendMultipleSameSmsAccordingPlatform({
        isWhatsapp: false,
        destNumbers: validNumbers,
        content: content,
      });

      if (resp) {
        this.decreaseMessageCounter(
          paymentRequest.businessInfo.businessId,
          validNumbers.size
        );
      }

      return resp;
    } catch (error) {
      console.error("Error sending SMS:", error);
      return false;
    }
  }

  async sendMultipleSameSmsAccordingPlatform({
    isWhatsapp,
    destNumbers,
    content,
  }: {
    isWhatsapp: boolean;
    destNumbers: Set<string>;
    content: string;
  }): Promise<boolean> {
    //get rid off symbols
    content = content.replace(emojisRegex, "");
    // seconds from now to the time that need to notify
    if (isWhatsapp) {
      // Uncomment the following lines once you have the appropriate implementation
      // return await ServerMessagesClient()
      //     .sendWhatsappMessage(destNumber: number, message: content);
    }
    return await this.messageRepo.sendMultipleSameSms({
      destNumbers: Array.from(destNumbers),
      message: content,
    });
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

    // seconds from now to the time that need to notify
    const timeToSend: Date = subDuration(
      eventTime,
      new Duration({ minutes: minutesBeforeNotify })
    );
    // the event is before now no need to send a remainder
    if (timeToSend < new Date()) {
      return true;
    }
    if (isWhatsapp) {
      // return await ServerMessagesClient().sendScheduleWhatsappMessage(
      //     destNumber: number, message: content, secondsDelata: secondsDelata);
    }

    //get rid off symbols
    content = content.replaceAll(emojisRegex, "");
    return await this.messageRepo.sendScheduleSms(
      removePhoneNumberPrefix(number),
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

    let businessData: BusinessData =
      await BusinessInitializer.GI().getBuinessData(businessId);

    let messagesCounterRemoveCount = 0;
    let messagesCounterConsumableRemoveCount = 0;

    if (businessData.messagesCounter >= count) {
      // If there is enough in the renewed counter, remove all from there
      messagesCounterRemoveCount = count;
    } else {
      // If there is not enough in the renewed counter, remove all there is and try to remove from the consumable counter
      messagesCounterRemoveCount = businessData.messagesCounter;
      const leftToRemove = count - businessData.messagesCounter;
      if (businessData.messagesCounterConsumable >= leftToRemove) {
        // If there is enough in the consumable counter, remove all from there
        messagesCounterConsumableRemoveCount = leftToRemove;
      } else {
        // If there is not enough in the consumable counter, remove all there is in
        messagesCounterConsumableRemoveCount =
          businessData.messagesCounterConsumable;
      }
    }

    return await this.generalRepo.incrementMultipleNumberChild({
      childPath: DbPathesHelper.GI().getBusinessDataPath(businessId),
      data: {
        ["messagesCounter"]: -messagesCounterRemoveCount,
        ["messagesCounterConsumable"]: -messagesCounterConsumableRemoveCount,
      },
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

  filterValidNumbers(phoneNumbers: Set<string>): Set<string> {
    const validNumbers = new Set<string>();
    phoneNumbers.forEach((phoneNumber) => {
      if (this.needSendDirectMessage(phoneNumber)) {
        validNumbers.add(phoneNumber);
      }
    });
    return validNumbers;
  }

  needSendDirectMessage(phoneNumber: string): boolean {
    return phoneNumber !== UserInitializer.GI().user.phoneNumber;
  }
}
