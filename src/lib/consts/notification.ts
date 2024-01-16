enum NotifySorts {
    waitingList,
    buisness,
  }
  
  const notifySortsToStr: { [key in NotifySorts]: string } = {
    [NotifySorts.waitingList]: "whaitingList",
    [NotifySorts.buisness]: "shopNotification",
  };
  
  const notifySortsFromStr: { [key: string]: NotifySorts } = {
    "whaitingList": NotifySorts.waitingList,
    "shopNotification": NotifySorts.buisness,
  };
  
  enum NotificationOption {
    SMS,
    SMSOrPush,
    WhatsAppOrPush,
    WhatsApp,
    SMSOnly,
    WhatAppOnly,
    Push,
    PushOrWhatsApp,
    PushOrSMS,
    OnlyPush
  }
  
  const notificationOptionToStr: { [key in NotificationOption]: string } = {
    [NotificationOption.SMS]: "SMS",
    [NotificationOption.SMSOnly]: "SMSOnly",
    [NotificationOption.WhatAppOnly]: "WhatAppOnly",
    [NotificationOption.SMSOrPush]: "SMSOrPush",
    [NotificationOption.WhatsAppOrPush]: "WhatsAppOrPush",
    [NotificationOption.WhatsApp]: "WhatsApp",
    [NotificationOption.OnlyPush]: "OnlyPush",
    [NotificationOption.PushOrWhatsApp]: "PushOrWhatsApp",
    [NotificationOption.PushOrSMS]: "PushOrSMS",
    [NotificationOption.Push]: "Push"
  };
  
  const notificationOptionFromStr: { [key: string]: NotificationOption } = {
    "SMS": NotificationOption.SMS,
    "SMSOrPush": NotificationOption.SMSOrPush,
    "WhatAppOnly": NotificationOption.WhatAppOnly,
    "SMSOnly": NotificationOption.SMSOnly,
    "WhatsAppOrPush": NotificationOption.WhatsAppOrPush,
    "WhatsApp": NotificationOption.WhatsApp,
    "OnlyPush": NotificationOption.OnlyPush,
    "PushOrWhatsApp": NotificationOption.PushOrWhatsApp,
    "PushOrSMS": NotificationOption.PushOrSMS,
    "Push": NotificationOption.Push
  };
  
  const pushCategories: NotificationOption[] = [
    NotificationOption.OnlyPush,
    NotificationOption.PushOrWhatsApp,
    NotificationOption.PushOrSMS,
    NotificationOption.Push
  ];
  
  const smsCategories: NotificationOption[] = [
    NotificationOption.SMS,
    NotificationOption.SMSOrPush,
    NotificationOption.SMSOnly
  ];
  
  const whatsAppCategories: NotificationOption[] = [
    NotificationOption.WhatsApp,
    NotificationOption.WhatsAppOrPush,
    NotificationOption.WhatAppOnly
  ];
  
  const topicRegex = /^[a-zA-Z0-9-_.~%]{1,900}$/;
  