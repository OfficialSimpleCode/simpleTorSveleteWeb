import { NotificationType } from "$lib/consts/booking";
import { NotificationOption } from "$lib/consts/notification";
import BusinessInitializer from "$lib/initializers/business_initializer";
import type Booking from "$lib/models/booking/booking_model";
import type MultiBookingUser from "$lib/models/multi_booking/multi_booking_user";
import type PaymentRequestUser from "$lib/models/payment_hyp/payment_request/payment_request_user";
import WorkerModel from "$lib/models/worker/worker_model";

export function sendMessage({
  booking,
  worker,
  notificationOption,
  customHsEnoughMessages,
}: {
  booking: Booking;
  worker?: WorkerModel;
  notificationOption?: NotificationOption;
  customHsEnoughMessages?: boolean;
}): NotificationType {
  notificationOption =
    notificationOption || worker?.notifications.notificationOption;
  if (!notificationOption) {
    return NotificationType.none;
  }
  const hasEnoughMessages =
    customHsEnoughMessages ||
    BusinessInitializer.GI().business.businessData.hasMessages;
  switch (notificationOption) {
    case NotificationOption.OnlyPush:
      if (Object.values(booking.userFcms).length === 0) {
        return NotificationType.none;
      }
      return NotificationType.push;
    case NotificationOption.SMSOnly:
      if (!booking.canSendMessage || !hasEnoughMessages) {
        return NotificationType.none;
      }
      return NotificationType.message;
    case NotificationOption.WhatAppOnly:
      if (!booking.canSendMessage || !hasEnoughMessages) {
        return NotificationType.none;
      }
      return NotificationType.whatsapp;
    case NotificationOption.PushOrSMS:
      if (Object.values(booking.userFcms).length > 0) {
        return NotificationType.push;
      }
      if (!booking.canSendMessage || !hasEnoughMessages) {
        return NotificationType.none;
      }
      return NotificationType.message;
    case NotificationOption.PushOrWhatsApp:
      if (Object.values(booking.userFcms).length > 0) {
        return NotificationType.push;
      }
      if (!booking.canSendMessage || !hasEnoughMessages) {
        return NotificationType.none;
      }
      return NotificationType.whatsapp;
    case NotificationOption.SMSOrPush:
      if (booking.canSendMessage && hasEnoughMessages) {
        return NotificationType.message;
      }
      if (Object.values(booking.userFcms).length > 0) {
        return NotificationType.push;
      }
      return NotificationType.none;
    case NotificationOption.WhatsAppOrPush:
      if (booking.canSendMessage && hasEnoughMessages) {
        return NotificationType.whatsapp;
      }
      if (Object.values(booking.userFcms).length > 0) {
        return NotificationType.push;
      }
      return NotificationType.none;
    default:
      return NotificationType.none;
  }
}

export function sendMessagePaymentRequest(
  user: PaymentRequestUser,
  worker: WorkerModel
): NotificationType {
  const hasEnoughMessages =
    BusinessInitializer.GI().business.businessData.hasMessages;
  switch (worker.notifications.notificationOption) {
    case NotificationOption.OnlyPush:
      if (!user.fcmTokens || Object.keys(user.fcmTokens).length === 0) {
        return NotificationType.none;
      }
      return NotificationType.push;
    case NotificationOption.SMSOnly:
      if (!hasEnoughMessages) {
        return NotificationType.none;
      }
      return NotificationType.message;
    case NotificationOption.WhatAppOnly:
      if (!hasEnoughMessages) {
        return NotificationType.none;
      }
      return NotificationType.whatsapp;
    case NotificationOption.PushOrSMS:
      if (user.fcmTokens && Object.values(user.fcmTokens).length > 0) {
        return NotificationType.push;
      }
      if (!hasEnoughMessages) {
        return NotificationType.none;
      }
      return NotificationType.message;
    case NotificationOption.PushOrWhatsApp:
      if (user.fcmTokens && Object.values(user.fcmTokens).length > 0) {
        return NotificationType.push;
      }
      if (!hasEnoughMessages) {
        return NotificationType.none;
      }
      return NotificationType.whatsapp;
    case NotificationOption.SMSOrPush:
      if (hasEnoughMessages) {
        return NotificationType.message;
      }
      if (user.fcmTokens && Object.values(user.fcmTokens).length > 0) {
        return NotificationType.push;
      }
      return NotificationType.none;
    case NotificationOption.WhatsAppOrPush:
      if (hasEnoughMessages) {
        return NotificationType.whatsapp;
      }
      if (user.fcmTokens && Object.values(user.fcmTokens).length > 0) {
        return NotificationType.push;
      }
      return NotificationType.none;
    default:
      return NotificationType.none;
  }
}

export function sendMessageForMulti(
  multiBookingUser: MultiBookingUser,
  worker: WorkerModel
): NotificationType {
  const hasEnoughMessages =
    BusinessInitializer.GI().business.businessData.hasMessages;
  switch (worker.notifications.notificationOption) {
    case NotificationOption.OnlyPush:
      if (Object.keys(multiBookingUser.userFcms).length === 0) {
        return NotificationType.none;
      }
      return NotificationType.push;
    case NotificationOption.SMSOnly:
      if (!multiBookingUser.canSendMessage || !hasEnoughMessages) {
        return NotificationType.none;
      }
      return NotificationType.message;
    case NotificationOption.WhatAppOnly:
      if (!multiBookingUser.canSendMessage || !hasEnoughMessages) {
        return NotificationType.none;
      }
      return NotificationType.whatsapp;
    case NotificationOption.PushOrSMS:
      if (multiBookingUser.userFcms.size > 0) {
        return NotificationType.push;
      }
      if (!multiBookingUser.canSendMessage || !hasEnoughMessages) {
        return NotificationType.none;
      }
      return NotificationType.message;
    case NotificationOption.PushOrWhatsApp:
      if (Object.values(multiBookingUser.userFcms).length > 0) {
        return NotificationType.push;
      }
      if (!multiBookingUser.canSendMessage || !hasEnoughMessages) {
        return NotificationType.none;
      }
      return NotificationType.whatsapp;
    case NotificationOption.SMSOrPush:
      if (multiBookingUser.canSendMessage && hasEnoughMessages) {
        return NotificationType.message;
      }
      if (Object.values(multiBookingUser.userFcms).length > 0) {
        return NotificationType.push;
      }
      return NotificationType.none;
    case NotificationOption.WhatsAppOrPush:
      if (multiBookingUser.canSendMessage && hasEnoughMessages) {
        return NotificationType.whatsapp;
      }
      if (Object.values(multiBookingUser.userFcms).length > 0) {
        return NotificationType.push;
      }
      return NotificationType.none;
    default:
      return NotificationType.none;
  }
}
