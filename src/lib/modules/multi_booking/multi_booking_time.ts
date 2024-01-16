class MultiBookingTime {
    treatmentId: string = "";
    currentParticipants: number = 0;
    maxParticipants?: number;
    minutes: number = 0;
    index: number = 0;
    showWaitingList: boolean = true;
    expiredDate?: Date;
    paymentRequestId?: string;
  
    constructor({
      treatmentId,
      minutes,
      maxParticipants,
      paymentRequestId,
      showWaitingList = true,
      currentParticipants = 0,
      expiredDate,
      index = 0,
    }: {
      treatmentId: string;
      minutes: number;
      maxParticipants?: number;
      paymentRequestId?: string;
      showWaitingList?: boolean;
      currentParticipants?: number;
      expiredDate?: Date;
      index?: number;
    }) {
      this.treatmentId = treatmentId;
      this.currentParticipants = currentParticipants;
      this.minutes = minutes;
      this.showWaitingList = showWaitingList;
      this.maxParticipants = maxParticipants;
      this.expiredDate = expiredDate;
      this.paymentRequestId = paymentRequestId;
      this.index = index;
    }
  
    static fromMultiBookingTime(other: MultiBookingTime): MultiBookingTime {
      const {
        treatmentId,
        currentParticipants,
        minutes,
        showWaitingList,
        maxParticipants,
        expiredDate,
        paymentRequestId,
        index,
      } = other;
  
      return new MultiBookingTime({
        treatmentId,
        currentParticipants,
        minutes,
        showWaitingList,
        maxParticipants,
        expiredDate,
        paymentRequestId,
        index,
      });
    }
  
    static fromJson(json: Record<string, any>): MultiBookingTime {
      const treatmentId = json["TI"] || "";
      const currentParticipants = json["CP"] || 0;
      const minutes = json["M"] || 0;
      const paymentRequestId = json["PRI"];
      const showWaitingList = json["SWL"] || true;
      const expiredDateString = json["ED"];
      const maxParticipants = json["MP"];
      const index = json["I"] || 0;
  
      const expiredDate = expiredDateString ? new Date(expiredDateString) : undefined;
  
      return new MultiBookingTime({
        treatmentId,
        currentParticipants,
        minutes,
        maxParticipants,
        paymentRequestId,
        showWaitingList,
        expiredDate,
        index,
      });
    }
  
    toJson(): Record<string, any> {
      const data: Record<string, any> = {};
  
      if (this.treatmentId !== "") {
        data["TI"] = this.treatmentId;
      }
  
      if (this.currentParticipants !== 0) {
        data["CP"] = this.currentParticipants;
      }
  
      if (this.maxParticipants !== undefined) {
        data["MP"] = this.maxParticipants;
      }
  
      if (this.paymentRequestId !== undefined) {
        data["PRI"] = this.paymentRequestId;
      }
  
      data["M"] = this.minutes;
  
      if (this.index !== 0) {
        data["I"] = this.index;
      }
  
      if (!this.showWaitingList) {
        data["SWL"] = this.showWaitingList;
      }
  
      if (this.expiredDate !== undefined) {
        data["ED"] = this.expiredDate.toISOString();
      }
  
      return data;
    }
  }
  
  