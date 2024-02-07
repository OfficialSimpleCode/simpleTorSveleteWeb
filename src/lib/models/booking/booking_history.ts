export default class BookingHistoryItem {
  updateTime: Date = new Date(0);
  previousTime: Date = new Date(0);
  workerId: string = "";
  workerAction: boolean = false;
  treatmentsIds: Record<string, number> = {};
  index: string = "0";
  constructor({});
  constructor({
    updateTime,
    previousTime,
    workerId,
    workerAction,
    treatmentsIds,
    index,
  }: {
    updateTime: Date;
    previousTime: Date;
    workerId: string;
    workerAction: boolean;
    treatmentsIds: Record<string, number>;
    index: string;
  }) {
    this.updateTime = updateTime;
    this.previousTime = previousTime;
    this.workerId = workerId;
    this.workerAction = workerAction;
    this.treatmentsIds = treatmentsIds;
    this.index = index;
  }

  toJson(): { [key: string]: any } {
    const data: Record<string, any> = {};

    data["updateTime"] = this.updateTime.toISOString();
    data["previousTime"] = this.previousTime.toISOString();
    data["workerId"] = this.workerId;
    if (this.workerAction) {
      data["workerAction"] = this.workerAction;
    }
    data["treatmentsIds"] = {};
    Object.entries(this.treatmentsIds).forEach(([id, count]) => {
      data["treatmentsIds"][id] = count;
    });

    return data;
  }

  static fromJson(
    json: Record<string, any>,
    newIndex: string
  ): BookingHistoryItem {
    const newItem = new BookingHistoryItem({});
    newItem.index = newIndex;
    if (json["previousTime"] != null) {
      newItem.previousTime = new Date(json["previousTime"]);
    }
    if (json["updateTime"] != null) {
      newItem.updateTime = new Date(json["updateTime"]);
    }
    newItem.workerId = json["workerId"] ?? "";
    newItem.workerAction = json["workerAction"] ?? false;
    newItem.treatmentsIds = {};
    if (json["treatmentsIds"] != null) {
      Object.entries<number>(json["treatmentsIds"]).forEach(
        ([treatmentId, count]) => {
          newItem.treatmentsIds[treatmentId] = count;
        }
      );
    }

    return newItem;
  }
}
