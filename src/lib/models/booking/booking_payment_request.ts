class BookingPaymentRequestData {
    id: string = "";
    workerId: string = "";
    createdAt: Date = new Date(0);
    signNewMultiBookingUsers: boolean = true;
  
    constructor({ id, workerId }: { id: string; workerId: string }) {
      this.id = id;
      this.workerId = workerId;
    }
  
    get link(): string {
      return `https://${SERVER_BASE_URL}/${PAYMENT_REQUEST_END_POINT}`
        .replace("PAYMENT_ID", this.id);
    }
  
    constructorFromJson(json: { [key: string]: any }): void {
      this.id = json["id"] ?? "";
  
      if (json["createdAt"] != null) {
        this.createdAt = new Date(json["createdAt"]) || new Date(0);
      }
  
      this.workerId = json["workerId"] ?? "";
      this.signNewMultiBookingUsers = json["signNewMultiBookingUsers"] ?? true;
    }
  
    toJson(): { [key: string]: any } {
      const data: { [key: string]: any } = {};
  
      if (this.createdAt.getTime() !== new Date(0).getTime()) {
        data["createdAt"] = this.createdAt.toISOString();
      }
  
      if (!this.signNewMultiBookingUsers) {
        data["signNewMultiBookingUsers"] = this.signNewMultiBookingUsers;
      }
  
      data["id"] = this.id;
      data["workerId"] = this.workerId;
  
      return data;
    }
  
    toString(): string {
      return JSON.stringify(this.toJson(), null, 2);
    }
  }
  