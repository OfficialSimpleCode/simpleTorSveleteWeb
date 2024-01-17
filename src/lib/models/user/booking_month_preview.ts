class BookingsPreview {
    bookingCount: number = 0;
    lastUpdateTime: Date = new Date(0);
    type: string = "";
  
    constructor();
  
    constructor(json: Record<string, any>, newType: string);
  
    constructor(json?: Record<string, any>, newType?: string) {
      if (json !== undefined && newType !== undefined) {
        this.type = newType;
        this.bookingCount = json["bookingCount"] ?? 0;
        this.lastUpdateTime = json["lastUpdateTime"]
          ? new Date(json["lastUpdateTime"])
          : new Date(0);
      }
    }
  
    toJson(): Record<string, any> {
      const data: Record<string, any> = {};
      if (this.lastUpdateTime.getTime() !== new Date(0).getTime()) {
        data["lastUpdateTime"] = this.lastUpdateTime.toISOString();
      }
      if (this.bookingCount > 0) {
        data["bookingCount"] = this.bookingCount;
      }
  
      return data;
    }
  
    toString(): string {
      return JSON.stringify(this.toJson(), null, '  ');
    }
  }
  