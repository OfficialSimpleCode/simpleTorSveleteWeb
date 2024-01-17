class InvoiceWorkerInfo {
    workerId: string = "";
    workerName: string = "";
  
    constructor({
      workerId = "",
      workerName = "",
    }: {
      workerId?: string;
      workerName?: string;
    } = {}) {
      this.workerId = workerId || "";
      this.workerName = workerName || "";
    }
  
    toJson(): Record<string, any> {
      const data: Record<string, any> = {};
  
      data["WN"] = this.workerName;
      data["WI"] = this.workerId;
  
      return data;
    }
  
    static fromJson(json: Record<string, any>): InvoiceWorkerInfo {
      return new InvoiceWorkerInfo({
        workerId: json["WI"] || "",
        workerName: json["WN"] || "",
      });
    }
  }
  