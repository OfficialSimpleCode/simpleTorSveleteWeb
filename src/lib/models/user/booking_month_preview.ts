import { dateIsoStr } from "$lib/utils/times_utils";

export default class BookingsPreview {
  bookingCount: number = 0;
  lastUpdateTime: Date = new Date(0);
  docId: string = "";

  constructor({ docId = "" }: { docId?: string }) {
    this.docId = docId;
  }

  static fromJson(
    json?: Record<string, any>,
    newDocId?: string
  ): BookingsPreview {
    const newObj = new BookingsPreview({});
    if (json !== undefined && newDocId !== undefined) {
      newObj.docId = newDocId;
      newObj.bookingCount = json["bookingCount"] ?? 0;
      newObj.lastUpdateTime = json["lastUpdateTime"]
        ? new Date(json["lastUpdateTime"])
        : new Date(0);
    }
    return newObj;
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};
    if (this.lastUpdateTime.getTime() !== new Date(0).getTime()) {
      data["lastUpdateTime"] = dateIsoStr(this.lastUpdateTime);
    }
    if (this.bookingCount > 0) {
      data["bookingCount"] = this.bookingCount;
    }

    return data;
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, "  ");
  }
}
