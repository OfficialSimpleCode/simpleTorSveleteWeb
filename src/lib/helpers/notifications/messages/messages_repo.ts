import MessagesService from "$lib/services/external_services/message_service";
import { dateIsoStr } from "$lib/utils/times_utils";

export default class MessageRepo extends MessagesService {
  constructor() {
    super();
  }

  async sendScheduleSms(
    destNumber: string,
    message: string,
    messageId: string,
    timeToSend: Date
  ): Promise<boolean> {
    const strTimeToSend = dateIsoStr(timeToSend);
    return this.sendScheduleSmsSRV({
      destNumber,
      message,
      messageId,
      timeToSend: strTimeToSend,
    });
  }

  async sendMultipleScheduleSms(messages: ScheduleMessage[]): Promise<boolean> {
    const messageMap: Record<string, Record<string, string>> = {};
    messages.forEach((message) => {
      messageMap[message.messageId] = message.toJson();
    });

    return this.sendMultipleScheduleSmsSRV({
      messages: messageMap,
    });
  }

  async cancelMultipleScheduleSms(
    messages: Record<string, string>
  ): Promise<boolean> {
    return this.cancelMultipleScheduleSmsSRV({
      messages,
    });
  }

  async updateScheduleSms(
    oldPhoneNumber: string,
    newPhoneNumber: string,
    message: string,
    newMessageId: string,
    oldMessageId: string,
    timeToSend: Date
  ): Promise<boolean> {
    const strTimeToSend = dateIsoStr(timeToSend);
    return this.updateScheduleSmsSRV({
      oldPhoneNumber,
      newPhoneNumber,
      message,
      newMessageId,
      oldMessageId,
      timeToSend: strTimeToSend,
    });
  }

  async cancelScheduleMessage(
    messageId: string,
    phoneNumber: string
  ): Promise<boolean> {
    return this.cancelScheduleMessageSRV({
      messageSid: messageId,
      phoneNumber,
    });
  }
}
