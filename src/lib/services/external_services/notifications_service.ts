import { logger } from "$lib/consts/application_general";
import { NOTIFICATIONS_END_POINT } from "$lib/consts/server_variables";
import type NotificationPayload from "$lib/models/notifications/notification_payload";
import type UserNotification from "$lib/models/notifications/user_notification";
import MakeRequest from "./make_request";
export default class NotificationService {
  async activateWaitingListNotification({
    topic,
    businessId,
    dateStr,
    treatmentName,
    payload,
  }: {
    topic: string;
    businessId: string;
    dateStr: string;
    treatmentName: string;
    payload: NotificationPayload;
  }): Promise<boolean> {
    try {
      const resp: Record<string, any> = await MakeRequest.GI().performRequest({
        endpoint: `${NOTIFICATIONS_END_POINT}/waiting_list`,
        method: "post",
        data: {
          businessId: businessId,
          treatmentName: treatmentName,
          topic: topic,
          date: dateStr,
          payload: payload.toJsonStr(),
        },
      });
      return resp["ok"];
    } catch (e) {
      console.error("Error while activating the waiting list notification");
      console.error("Error -->", e);
      return true;
    }
  }

  async activateGeneralNotification({
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
    try {
      const resp: Record<string, any> = await MakeRequest.GI().performRequest({
        endpoint: `${NOTIFICATIONS_END_POINT}/general_message`,
        method: "post",
        data: {
          topic: topic,
          msg: msg,
          title: title,
          payload: payload.toJsonStr(),
        },
      });
      return resp["ok"];
    } catch (e) {
      logger.error("Error while activating the general notification");
      logger.error("Error -->", e);
      return true;
    }
  }

  async activateRangeWaitingListNotification({
    topics,
    payload,
  }: {
    topics: Set<string>;
    payload: NotificationPayload;
  }): Promise<boolean> {
    try {
      const resp: Record<string, any> = await MakeRequest.GI().performRequest({
        endpoint: `${NOTIFICATIONS_END_POINT}/range_of_waiting_list`,
        method: "post",
        data: { topics: Array.from(topics), payload: payload.toJsonStr() },
      });
      return resp["ok"];
    } catch (e) {
      logger.error(
        "Error while activating the range Waiting List Notification"
      );
      logger.error("Error -->", e);
      return true;
    }
  }

  async sendMultypleSpecificNotifications({
    fcms,
    msg,
    title,
    payload,
    isSilent,
  }: {
    fcms: Set<string>;
    msg: string;
    title: string;
    payload: NotificationPayload;
    isSilent: boolean;
  }): Promise<boolean> {
    const resp: Record<string, any> = await MakeRequest.GI().performRequest({
      endpoint: `${NOTIFICATIONS_END_POINT}/multyple_specific_notifications`,
      method: "post",
      onFail: {},
      data: {
        fcms: Array.from(fcms),
        msg: msg,
        title: title,
        payload: payload.toJsonStr(),
        isSilent: isSilent,
      },
    });

    return resp["ok"] || false;
  }

  async sendNotificationsToUsers({
    users,
    msg,
    title,
    isSilent,
  }: {
    users: Set<UserNotification>;
    msg: string;
    title: string;
    isSilent: boolean;
  }): Promise<boolean> {
    const userJsons: any[] = [];
    users.forEach((user) => {
      userJsons.push(user.toJson());
    });
    const resp: Record<string, any> = await MakeRequest.GI().performRequest({
      endpoint: `${NOTIFICATIONS_END_POINT}/notifications_to_users`,
      method: "post",
      onFail: {},
      data: {
        users: userJsons,
        msg: msg,
        title: title,
        isSilent: isSilent,
      },
    });

    return resp["ok"] || false;
  }
}
