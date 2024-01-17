class TreatmentTime {
    workMinutes: number = 0;
    breakMinutes: number = 0;
    title: string = "";
  
    constructor({ workMinutes = 0, breakMinutes = 0, title = "" }: {
      workMinutes?: number;
      breakMinutes?: number;
      title?: string;
    }) {
      this.workMinutes = workMinutes;
      this.breakMinutes = breakMinutes;
      this.title = title;
    }
  
    get wholeMinutes(): number {
      return this.workMinutes + this.breakMinutes;
    }
  
    static fromTreatmentTime(other: TreatmentTime): TreatmentTime {
      return new TreatmentTime({
        breakMinutes: other.breakMinutes,
        workMinutes: other.workMinutes,
        title: other.title,
      });
    }
  
    static fromJson(json: { [key: string]: any }): TreatmentTime {
      return new TreatmentTime({
        breakMinutes: json["break"] || 0,
        workMinutes: json["duration"] || 0,
        title: json["title"] || "",
      });
    }
  
    toJson(): { [key: string]: any } {
      const data: { [key: string]: any } = {};
      data["break"] = this.breakMinutes;
      data["duration"] = this.workMinutes;
      data["title"] = this.title;
      return data;
    }
  
    toString(): string {
      return JSON.stringify(this, null, 2);
    }
  }
  