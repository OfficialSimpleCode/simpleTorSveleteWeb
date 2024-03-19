import type NotificationTopic from "$lib/models/notifications/notification_topic";
import NotificationService from "$lib/services/external_services/notifications_service";

import type NotificationPayload from "$lib/models/notifications/notification_payload";
import type UserNotification from "$lib/models/notifications/user_notification";

export default class NotificationsRepo extends NotificationService {
  constructor() {
    super();
  }

  async notifyWaitingList({
    topic,
    payload,
  }: {
    topic: NotificationTopic;
    payload: NotificationPayload;
  }): Promise<boolean> {
    if (topic.dateTime < new Date()) {
      return false;
    }

    return await this.activateWaitingListNotification({
      topic: topic.toTopicStr(),
      businessId: topic.businessId,
      dateStr: `${topic.date} ${
        topic.timeStr === "" ? "00:00" : topic.timeStr
      }`,
      payload: payload,
      treatmentName: topic.treatmentName,
    });
  }

  async notifyGeneralNotification({
    topic,
    msg,
    title,
    payload,
  }: {
    topic: string;
    msg: string;
    title: string;
    payload: NotificationPayload;
  }): Promise<boolean> {
    return await this.activateGeneralNotification({
      topic: topic,
      msg: msg,
      title: title,
      payload: payload,
    });
  }

  async notifyRangeWaitingList({
    topics,
    payload,
  }: {
    topics: Set<string>;
    payload: NotificationPayload;
  }): Promise<boolean> {
    return await this.activateRangeWaitingListNotification({
      topics: topics,
      payload,
    });
  }

  async notifyMultipleUsers({
    fcms,
    content,
    title,
    payload,
    isSilent = false,
  }: {
    fcms: Set<string>;
    content: string;
    title: string;
    payload: NotificationPayload;
    isSilent?: boolean;
  }): Promise<boolean> {
    return await this.sendMultypleSpecificNotifications({
      fcms: fcms,
      msg: content,
      title,
      payload,
      isSilent,
    });
  }

  async notifyToUsers({
    users,
    content,
    title,
    isSilent = false,
  }: {
    users: Set<UserNotification>;
    content: string;
    title: string;
    isSilent?: boolean;
  }): Promise<boolean> {
    return await this.sendNotificationsToUsers({
      users: users,
      msg: content,
      title,
      isSilent,
    });
  }
}
