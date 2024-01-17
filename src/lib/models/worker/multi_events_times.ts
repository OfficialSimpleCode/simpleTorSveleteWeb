class MultiEventsTimes {
    times: Record<string, Record<string, MultiBookingTime>> = {};
    duringPaymentsTimes: Record<string, Record<string, MultiBookingTime>> = {};
    listener?: firebase.firestore.DocumentSnapshot<Map<string, unknown>>;
    lastBookingTimeDate?: Date;
  
    constructor() {}
  
    static fromJson(json: Record<string, any>): MultiEventsTimes {
      const instance = new MultiEventsTimes();
      instance.setData(json);
      return instance;
    }
  
    setData(json: Record<string, any>, includeDuringPayment = true): void {
      this.times = {};
  
      if (json["eventsTimes"] !== null) {
        Object.entries(json["eventsTimes"]).forEach(([dateString, timesJson]) => {
          const date = new Date(dateString);
          const lastWeek = new Date();
          lastWeek.setDate(lastWeek.getDate() - 7);
  
          if (date >= lastWeek && timesJson instanceof Object && Object.keys(timesJson).length > 0) {
            this.times[dateString] = {};
  
            Object.entries(timesJson).forEach(([timeStr, timeJson]) => {
              this.times[dateString]![timeStr] = MultiBookingTime.fromJson(timeJson);
            });
          }
        });
      }
  
      if (json["eventsTimeDuringPayment"] !== null && includeDuringPayment) {
        Object.entries(json["eventsTimeDuringPayment"]).forEach(([dateString, dayTimes]) => {
          const date = new Date(dateString);
          const lastWeek = new Date();
          lastWeek.setDate(lastWeek.getDate() - 7);
  
          if (date >= lastWeek) {
            dayTimes.forEach(([bookingTime, details]) => {
              const timeObj = MultiBookingTime.fromJson(details);
              if (timeObj.expiredDate !== null && timeObj.expiredDate!.getTime() > Date.now()) {
                this.times[dateString] ??= {};
                if (this.times[dateString]![bookingTime] === null) {
                  this.times[dateString]![bookingTime] =
                    MultiBookingTime.fromMultiBookingTime(timeObj)
                    .expiredDate = null;
                } else {
                  this.times[dateString]![bookingTime]!.currentParticipants += timeObj.currentParticipants;
                }
  
                if (date > (this.lastBookingTimeDate || new Date(0))) {
                  this.lastBookingTimeDate = date;
                }
  
                this.duringPaymentsTimes[dateString] ??= {};
                this.duringPaymentsTimes[dateString]![bookingTime] = timeObj;
              }
            });
          }
        });
      }
    }
  
    emptyBookingTimesDatesInMonth(monthString: string): void {
      Object.entries(this.times).forEach(([dayString, _]) => {
        if (dayString.includes(monthString)) {
          this.times[dayString] = {};
        }
      });
    }
  
    toJson(): Record<string, Record<string, any>> {
      const data: Record<string, Record<string, any>> = {};
      data["eventsTimes"] = {};
  
      Object.entries(this.times).forEach(([date, map]) => {
        data["eventsTimes"][date] = {};
        Object.entries(map).forEach(([timeStr, timeObj]) => {
          data["eventsTimes"][date]![timeStr] = timeObj.toJson();
        });
      });
  
      return data;
    }
  }