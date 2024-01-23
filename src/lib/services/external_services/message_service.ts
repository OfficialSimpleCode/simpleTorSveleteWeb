import { serverSignature } from "$lib/consts/secrets";
import { MESSAGES_END_POINT } from "$lib/consts/server_variables";
import MakeRequest from "./make_request";

export default class MessagesService {
  async sendScheduleSmsSRV({
    destNumber,
    message,
    messageId,
    timeToSend,
  }: {
    destNumber: string;
    message: string;
    messageId: string;
    timeToSend: string;
  }): Promise<boolean> {
    const resp: any = await MakeRequest.GI().performRequest({
      onFail: {},
      endpoint: `${MESSAGES_END_POINT}/send_schedule_sms`,
      method: "post",
      data: {
        to: destNumber,
        body: message,
        timeToSend: timeToSend,
        messageId: messageId,
      },
    });
    try {
      return resp?.ok || false;
    } catch (e) {
      return false;
    }
  }

  async sendMultipleScheduleSmsSRV({
    messages,
  }: {
    messages: Record<string, Record<string, string>>;
  }): Promise<boolean> {
    const resp: any = await MakeRequest.GI().performRequest({
      onFail: {},
      endpoint: `${MESSAGES_END_POINT}/send_multiple_schedule_sms`,
      method: "post",
      data: { messages: messages },
    });
    return resp?.ok || false;
  }

  async sendMultipleSmsSRV({
    messages,
  }: {
    messages: { [key: string]: { [key: string]: string } };
  }): Promise<boolean> {
    const resp: any = await MakeRequest.GI().performRequest({
      onFail: {},
      endpoint: `${MESSAGES_END_POINT}/send_multiple_sms`,
      method: "post",
      data: { messages: messages },
    });
    try {
      return resp?.ok || false;
    } catch (e) {
      return false;
    }
  }

  async cancelMultipleScheduleSmsSRV({
    messages,
  }: {
    messages: { [key: string]: string };
  }): Promise<boolean> {
    const resp: any = await MakeRequest.GI().performRequest({
      onFail: {},
      endpoint: `${MESSAGES_END_POINT}/cancel_multiple_schedule_messages`,
      method: "post",
      data: { messages: messages },
    });
    try {
      return resp?.ok || false;
    } catch (e) {
      return false;
    }
  }

  async updateScheduleSmsSRV({
    newPhoneNumber,
    oldPhoneNumber,
    message,
    newMessageId,
    oldMessageId,
    timeToSend,
  }: {
    newPhoneNumber: string;
    oldPhoneNumber: string;
    message: string;
    newMessageId: string;
    oldMessageId: string;
    timeToSend: string;
  }): Promise<boolean> {
    const resp: any = await MakeRequest.GI().performRequest({
      onFail: {},
      endpoint: `${MESSAGES_END_POINT}/update_schedule_sms`,
      method: "post",
      data: {
        newPhoneNumber: newPhoneNumber,
        oldPhoneNumber: oldPhoneNumber,
        body: message,
        timeToSend: timeToSend,
        oldMessageId: oldMessageId,
        newMessageId: newMessageId,
      },
    });
    try {
      return resp?.ok || false;
    } catch (e) {
      return false;
    }
  }

  async cancelScheduleMessageSRV({
    messageSid,
    phoneNumber,
  }: {
    messageSid: string;
    phoneNumber: string;
  }): Promise<boolean> {
    const resp: any = await MakeRequest.GI().performRequest({
      onFail: {},
      endpoint: `${MESSAGES_END_POINT}/cancel_schedule_message`,
      queryParameters: {
        message_sid: messageSid,
        phone_number: phoneNumber,
        signature: serverSignature,
      },
      method: "get",
      data: {},
    });
    try {
      return resp?.ok || false;
    } catch (e) {
      return false;
    }
  }
}
