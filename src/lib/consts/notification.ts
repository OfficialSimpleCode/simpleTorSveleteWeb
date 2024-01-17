export enum NotifySorts {
  waitingList,
  buisness,
}

export const notifySortsToStr: { [key in NotifySorts]: string } = {
  [NotifySorts.waitingList]: "whaitingList",
  [NotifySorts.buisness]: "shopNotification",
};

export const notifySortsFromStr: { [key: string]: NotifySorts } = {
  whaitingList: NotifySorts.waitingList,
  shopNotification: NotifySorts.buisness,
};

export enum NotificationOption {
  SMS,
  SMSOrPush,
  WhatsAppOrPush,
  WhatsApp,
  SMSOnly,
  WhatAppOnly,
  Push,
  PushOrWhatsApp,
  PushOrSMS,
  OnlyPush,
}

export const notificationOptionToStr: { [key in NotificationOption]: string } =
  {
    [NotificationOption.SMS]: "SMS",
    [NotificationOption.SMSOnly]: "SMSOnly",
    [NotificationOption.WhatAppOnly]: "WhatAppOnly",
    [NotificationOption.SMSOrPush]: "SMSOrPush",
    [NotificationOption.WhatsAppOrPush]: "WhatsAppOrPush",
    [NotificationOption.WhatsApp]: "WhatsApp",
    [NotificationOption.OnlyPush]: "OnlyPush",
    [NotificationOption.PushOrWhatsApp]: "PushOrWhatsApp",
    [NotificationOption.PushOrSMS]: "PushOrSMS",
    [NotificationOption.Push]: "Push",
  };

export const notificationOptionFromStr: { [key: string]: NotificationOption } =
  {
    SMS: NotificationOption.SMS,
    SMSOrPush: NotificationOption.SMSOrPush,
    WhatAppOnly: NotificationOption.WhatAppOnly,
    SMSOnly: NotificationOption.SMSOnly,
    WhatsAppOrPush: NotificationOption.WhatsAppOrPush,
    WhatsApp: NotificationOption.WhatsApp,
    OnlyPush: NotificationOption.OnlyPush,
    PushOrWhatsApp: NotificationOption.PushOrWhatsApp,
    PushOrSMS: NotificationOption.PushOrSMS,
    Push: NotificationOption.Push,
  };

export const pushCategories: NotificationOption[] = [
  NotificationOption.OnlyPush,
  NotificationOption.PushOrWhatsApp,
  NotificationOption.PushOrSMS,
  NotificationOption.Push,
];

export const smsCategories: NotificationOption[] = [
  NotificationOption.SMS,
  NotificationOption.SMSOrPush,
  NotificationOption.SMSOnly,
];

export const whatsAppCategories: NotificationOption[] = [
  NotificationOption.WhatsApp,
  NotificationOption.WhatsAppOrPush,
  NotificationOption.WhatAppOnly,
];

export const topicRegex = /^[a-zA-Z0-9-_.~%]{1,900}$/;
