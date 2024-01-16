class Treatment {
    totalMinutes: number = 0;
    index: string = "";
    id: string = "";
    note: string = "";
    price?: Price;
    amountInAdvance: number = 0;
    paymentType?: PaymentTypes;
    isMulti: boolean = false;
    showPrice: boolean = true;
    showTime: boolean = true;
    count: number = 1;
    name: string = '';
    colorIndex: number = -2;
    maxParticipants: number = 1;
    maxTicketsForUser: number = 1;
    tempMaxParticipants?: number;
    hide: boolean = false;
    showParticipants: boolean = true;
    times: { [key: string]: TreatmentTime } = {};
    priceChangingNote?: string;
  
    constructor({
      times = {},
      id = "",
      price,
      count = 1,
      name = "",
      isMulti = false,
      maxTicketsForUser = 1,
      index = "",
      amountInAdvance = 0,
      colorIndex = -2,
      hide = false,
      paymentType,
      note = "",
      maxParticipants = 1,
      showPrice = true,
      showParticipants = true,
      showTime = true,
    }: {
      times?: { [key: string]: TreatmentTime };
      id?: string;
      price?: Price;
      count?: number;
      name?: string;
      isMulti?: boolean;
      maxTicketsForUser?: number;
      index?: string;
      amountInAdvance?: number;
      colorIndex?: number;
      hide?: boolean;
      paymentType?: PaymentTypes;
      note?: string;
      maxParticipants?: number;
      showPrice?: boolean;
      showParticipants?: boolean;
      showTime?: boolean;
    }={}) {
      this.times = times;
      this.id = id;
      this.price = price;
      this.count = count;
      this.name = name;
      this.isMulti = isMulti;
      this.maxTicketsForUser = maxTicketsForUser;
      this.index = index;
      this.amountInAdvance = amountInAdvance;
      this.colorIndex = colorIndex;
      this.hide = hide;
      this.paymentType = paymentType;
      this.note = note;
      this.maxParticipants = maxParticipants;
      this.showPrice = showPrice;
      this.showParticipants = showParticipants;
      this.showTime = showTime;
      this.totalMinutes = this.getTotalMinutes();
    }
  
    isEqual(treatment: Treatment): boolean {
      return deepEqual(treatment.toJson(), this.toJson());
    }
  
    getTotalMinutes(): number {
      let minutes = 0;
      for (const timeIndex in this.times) {
        if (this.times.hasOwnProperty(timeIndex)) {
          minutes += this.times[timeIndex].wholeMinutes;
        }
      }
      return minutes;
    }
  
    get totalWorkMinutes(): number {
      let minutes = 0;
      for (const timeIndex in this.times) {
        if (this.times.hasOwnProperty(timeIndex)) {
          minutes += this.times[timeIndex].workMinutes;
        }
      }
      return minutes;
    }
  
    get totalMinutesForBooking(): number {
      return this.totalMinutes * this.count;
    }
  
    get amountInAdvanceForBooking(): number {
      return this.amountInAdvance * this.count;
    }
  
    get totalPriceForBooking(): number {
      return this.price!.amount * this.count;
    }
  
    get nameForBooking(): string {
      return this.count === 1 ? this.name : `${this.name} X${this.count}`;
    }
  
    static fromTreatment(treatment: Treatment): Treatment {
      const newTreatment = new Treatment({
        times: {},
        showTime: treatment.showTime,
        paymentType: treatment.paymentType,
        id: treatment.id,
        priceChangingNote: treatment.priceChangingNote,
        hide: treatment.hide,
        showPrice: treatment.showPrice,
        price: treatment.price,
        index: treatment.index,
        maxTicketsForUser: treatment.maxTicketsForUser,
        colorIndex: treatment.colorIndex,
        name: treatment.name,
        isMulti: treatment.isMulti,
        note: treatment.note,
        count: treatment.count,
        tempMaxParticipants: treatment.tempMaxParticipants,
        maxParticipants: treatment.maxParticipants,
        amountInAdvance: treatment.amountInAdvance,
        totalMinutes: treatment.totalMinutes,
      });
  
      for (const timeIndex in treatment.times) {
        if (treatment.times.hasOwnProperty(timeIndex)) {
          newTreatment.times[timeIndex] = TreatmentTime.fromTreatmentTime(
            treatment.times[timeIndex]
          );
        }
      }
  
      return newTreatment;
    }
  
    static fromTreatmentsMap(treatments: { [key: string]: Treatment }): Treatment {
      let index = 0;
      const newTreatment = new Treatment({
        price: { amount: "0", currency: defaultCurrency },
      });
  
      for (const key in treatments) {
        if (treatments.hasOwnProperty(key)) {
          const treatment = treatments[key];
  
          for (let i = 0; i < treatment.count; i++) {
            for (const timeIndex in treatment.times) {
              if (treatment.times.hasOwnProperty(timeIndex)) {
                newTreatment.times[`${index}`] = treatment.times[timeIndex];
                index++;
              }
            }
  
            if (treatment.price) {
              newTreatment.price!.amount += treatment.price.amount;
              newTreatment.price!.currency = treatment.price.currency;
            }
  
            if (newTreatment.name === "") {
              newTreatment.name = treatment.name;
            } else {
              newTreatment.name += ` + ${treatment.name}`;
            }
  
            newTreatment.showTime = newTreatment.showTime && treatment.showTime;
            newTreatment.showPrice = newTreatment.showPrice && treatment.showPrice;
            newTreatment.paymentType = treatment.paymentType;
            newTreatment.amountInAdvance += treatment.amountInAdvance;
            newTreatment.totalMinutes += treatment.totalMinutes;
          }
        }
      }
  
      return newTreatment;
    }
  
    get participants(): number {
      return this.tempMaxParticipants !== undefined
        ? this.tempMaxParticipants
        : this.maxParticipants;
    }
  
    priceToString(): string {
      return this.price!.toString();
    }
  
    minutesToString(): string {
      return this.durationToString({ minutes: this.totalMinutes });
    }
  
    static fromJson(json: { [key: string]: any }, newIndex: string): Treatment {
      const newTreatment = new Treatment({
        times: {},
        id: json["id"] || "",
        colorIndex: json["colorIndex"] || -2,
        maxTicketsForUser: json["maxTicketsForUser"] || 1,
        index: newIndex,
        hide: json["hide"] || false,
        name: json["name"] || "",
        isMulti: json["isMulti"] || false,
        note: json["note"] || "",
        count: json["count"] || 1,
        priceChangingNote: json["priceChangingNote"],
        price: json["price"] ? Price.fromJson(json["price"]) : undefined,
        tempMaxParticipants: json["tempMaxParticipants"],
        amountInAdvance:
          json["amountInAdvance"] !== undefined
            ? typeof json["amountInAdvance"] === "number"
              ? json["amountInAdvance"]
              : parseFloat(json["amountInAdvance"])
            : 0,
        maxParticipants: json["maxParticipants"] || 1,
        paymentType: paymentTypesFromStr[json["paymentType"]],
        showPrice: json["showPrice"] || false,
        showTime: json["showTime"] || false,
        showParticipants: json["showParticipants"] || true,
      });
  
      if (json["times"]) {
        for (const timeIndex in json["times"]) {
          if (json["times"].hasOwnProperty(timeIndex)) {
            newTreatment.times[timeIndex] = TreatmentTime.fromJson(
              json["times"][timeIndex]
            );
          }
        }
      }
  
      return newTreatment;
    }
  
    toJson(): { [key: string]: any } {
      const data: { [key: string]: any } = {};
  
      data["times"] = {};
      for (const index in this.times) {
        if (this.times.hasOwnProperty(index)) {
          data["times"][index] = this.times[index].toJson();
        }
      }
  
      data["name"] = this.name;
      if (this.note !== "") {
        data["note"] = this.note;
      }
      if (this.id !== "") {
        data["id"] = this.id;
      }
      if (this.hide) {
        data["hide"] = this.hide;
      }
      if (this.maxTicketsForUser > 1) {
        data["maxTicketsForUser"] = this.maxTicketsForUser;
      }
      if (this.colorIndex !== -2) {
        data["colorIndex"] = this.colorIndex;
      }
      if (this.priceChangingNote !== undefined) {
        data["priceChangingNote"] = this.priceChangingNote;
      }
      data["price"] = this.price ? this.price.toJson() : undefined;
      if (this.amountInAdvance !== 0) {
        data["amountInAdvance"] = this.amountInAdvance;
      }
      if (paymentTypesToStr[this.paymentType] !== undefined) {
        data["paymentType"] = paymentTypesToStr[this.paymentType];
      }
      if (this.isMulti) {
        data["isMulti"] = this.isMulti;
      }
      if (this.tempMaxParticipants !== undefined) {
        data["tempMaxParticipants"] = this.tempMaxParticipants;
      }
      if (this.count !== 1) {
        data["count"] = this.count;
      }
      if (this.maxParticipants !== 1) {
        data["maxParticipants"] = this.maxParticipants;
      }
      if (!this.showParticipants) {
        data["showParticipants"] = this.showParticipants;
      }
      data["showPrice"] = this.showPrice;
      data["showTime"] = this.showTime;
      return data;
    }
  
    fromOldJson(json: { [key: string]: any }, newIndex: string, newName: string, colorIndex: number): void {
      if (json["times"]) {
        for (const timeIndex in json["times"]) {
          if (json["times"].hasOwnProperty(timeIndex)) {
            this.times[timeIndex] = TreatmentTime.fromJson(json["times"][timeIndex]);
          }
        }
      }
  
      this.id = "";
      this.colorIndex = colorIndex;
      this.index = newIndex;
  
      this.name = this.parseNameFromDbField(newName);
  
      if (json["price"]) {
        this.price = Price.fromJson(json["price"]);
      }
  
      if (json["amountInAdvance"] !== undefined) {
        this.amountInAdvance =
          typeof json["amountInAdvance"] === "number"
            ? json["amountInAdvance"]
            : parseFloat(json["amountInAdvance"]);
      }
      this.paymentType = paymentTypesFromStr[json["paymentType"]];
      this.showPrice = json["showPrice"] || false;
      this.showTime = json["showTime"] || false;
  
      this.totalMinutes = this.getTotalMinutes();
    }
  
    parseNameFromDbField(name: string): string {
      return name.replace(strToReplaceSlash, '/').replace(strToReplaceAsterisk, '*');
    }
  
    parseNameToDbField(name: string): string {
      return name.replace('/', strToReplaceSlash).replace('*', strToReplaceAsterisk);
    }
  
    toString(): string {
      return JSON.stringify(this, null, 2);
    }
  }
  