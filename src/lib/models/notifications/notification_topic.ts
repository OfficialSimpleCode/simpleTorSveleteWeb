import { topicRegex } from "$lib/consts/notification";
import { dateStrToDate, timeStrToDate } from "$lib/utils/times_utils";

const strToReplaceAdd: string = "~.9.~";
const strToSpaceUnicAndInfo: string = "..";
const strToSpaceAttributes: string = "_";
const strToReplaceImageSpecial: string = "!&~&!";

export default class NotificationTopic {
  id: string = "";
  businessId: string = "";
  workerName: string = "";
  date: string = ""; // str date of waiting list
  workerId: string = ""; // to ensure the waiting list topic is unic
  timeStr: string = "";
  treatmentId: string = "";
  treatmentName: string = "";

  constructor({
    workerName = "",
    date = "",
    workerId = "",
    timeStr = "",
    treatmentId = "",
    treatmentName = "",
    businessId = "",
  }: {
    workerName?: string;
    date?: string;
    workerId?: string;
    timeStr?: string;
    treatmentId?: string;
    treatmentName?: string;
    businessId?: string;
  }) {
    this.workerName = workerName;
    this.date = date;
    this.workerId = workerId;
    this.timeStr = timeStr;
    this.treatmentId = treatmentId;
    this.treatmentName = treatmentName;
    this.businessId = businessId;
  }

  fixEmptyAttributes(): void {
    this.workerName = this.workerName === "" ? "E" : this.workerName;
    this.date = this.date === "" ? "E" : this.date;
    this.businessId = this.businessId === "" ? "E" : this.businessId;
    this.workerId = this.workerId === "" ? "E" : this.workerId;
  }

  static fromJson(json: any, notificationId: string): NotificationTopic {
    const topic = new NotificationTopic({});
    topic.id = notificationId;
    topic.workerName = json["workerName"] ?? "";
    topic.date = json["date"] ?? "";
    topic.timeStr = json["timeStr"] ?? "";
    topic.treatmentId = json["treatmentId"] ?? "";
    topic.treatmentName = json["treatmentName"] ?? "";
    topic.businessId = json["businessId"] ?? "";
    topic.workerId = json["workerId"] ?? "";
    return topic;
  }

  get isMulti(): boolean {
    return this.timeStr !== "";
  }

  static fromTopicStr(topic: string): NotificationTopic {
    const newObj = new NotificationTopic({});
    /*
    getting "notification topic" str end extract the data about this object
    businessId_workerId(formated)_date..businessName(encoded)_workerName(encoded)_imageUrl(encoded)
     */
    const data: string[] = topic.split(strToSpaceUnicAndInfo);
    // first split the data to unic & info
    const unicData: string[] = data[0].split(strToSpaceAttributes);
    const info: string[] = data[1].split(strToSpaceAttributes);
    // extract the unic data
    newObj.businessId = unicData[0];
    newObj.workerId = unicData[1].replaceAll(strToReplaceAdd, "+");
    newObj.date = unicData[2];
    // exract info data
    // this.businessName = info[0];
    newObj.workerName = info[1];
    // this.imageUrl = info[2].replaceAll(strToReplaceImageSpecial, '_');
    // this.businessName =
    //     utf8.decode(info[0].split('-').map((e) => int.parse(e)).toList());
    // this.workerName =
    //     utf8.decode(info[1].split('-').map((e) => int.parse(e)).toList());
    // this.imageUrl = utf8
    //     .decode(info[2].split('-').map((e) => int.parse(e)).toList())
    //     .replaceAll(strToReplaceStartImage, storageImagesPath);
    //fixEmptyAttributes();
    return newObj;
  }

  isEqual(topic: NotificationTopic): boolean {
    return JSON.stringify(topic.toJson()) === JSON.stringify(this.toJson());
  }

  toTopicStr(): string {
    /* 
    convert this object to "notification topic" (1-900 characters & llegal topic)
    names are optional to contain any characters even illegal topic then 
    parse them to utf-8.
    topis str ->
      general - businessId_workerId(E empty)_date(E empty)_..businessName_workerName(E empty)_imageUrl
      waitingList - businessId_workerId_date..businessName_workerName_imageUrl */
    this.fixEmptyAttributes();
    const formatedWorkerId: string = this.workerId.replaceAll(
      "+",
      strToReplaceAdd
    );
    const unicData: string = [
      this.businessId,
      formatedWorkerId,
      this.date,
      this.timeStr,
      this.treatmentId,
    ].join(strToSpaceAttributes);
    const validTopic: string = unicData
      .split("")
      .filter((char: string) => topicRegex.test(char))
      .join("");
    return validTopic;
  }

  get dateTime(): Date {
    const dateObj: Date = dateStrToDate(this.date);
    const timeObj: Date =
      this.timeStr === "" ? new Date(0) : timeStrToDate(this.timeStr);
    return new Date(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate(),
      timeObj.getHours(),
      timeObj.getMinutes()
    );
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data["businessId"] = this.businessId;
    if (this.workerName !== "") {
      data["workerName"] = this.workerName;
    }
    if (this.workerId !== "") {
      data["workerId"] = this.workerId;
    }
    if (this.date !== "") {
      data["date"] = this.date;
    }
    if (this.timeStr !== "") {
      data["timeStr"] = this.timeStr;
    }
    if (this.treatmentName !== "") {
      data["treatmentName"] = this.treatmentName;
    }
    if (this.treatmentId !== "") {
      data["treatmentId"] = this.treatmentId;
    }
    return data;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}
