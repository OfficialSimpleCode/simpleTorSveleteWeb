class ReportModel {
    createdAt: Date = new Date(0);
    name: string = "";
    description: string = "";
    communication: string = "";
    id: string = "";
  
    constructor({
      createdAt = new Date(0),
      name = "",
      description = "",
      communication = "",
      id = "",
    }: {
      createdAt?: Date;
      name?: string;
      description?: string;
      communication?: string;
      id?: string;
    }={}) {
      this.createdAt = createdAt;
      this.name = name || "";
      this.description = description || "";
      this.communication = communication || "";
      this.id = id;
    }
  
    static fromJson(json: any, newId: string): ReportModel {
      const report = new ReportModel();
  
      if (typeof newId === "string") {
        report.id = newId;
      }
  
      if (json["createdAt"] != null) {
        const parsedDate = Date.parse(json["createdAt"]);
        report.createdAt = isNaN(parsedDate) ? new Date(0) : new Date(parsedDate);
      }
      report.name = json["name"] || "";
      report.description = json["description"] || "";
      report.communication = json["communication"] || "";
  
      return report;
    }
  
    toJson(): Record<string, any> {
      const data: Record<string, any> = {};
      if (this.createdAt.getTime() !== new Date(0).getTime()) {
        data["createdAt"] = this.createdAt.toISOString();
      }
      if (this.name !== "") {
        data["name"] = this.name;
      }
      if (this.description !== "") {
        data["description"] = this.description;
      }
      if (this.communication !== "") {
        data["communication"] = this.communication;
      }
  
      return data;
    }
  
    toString(): string {
      return JSON.stringify(this, null, 2);
    }
  }
  
