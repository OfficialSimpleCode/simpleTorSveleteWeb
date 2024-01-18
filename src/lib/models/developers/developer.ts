export class Developer {
  id: string = "";
  businessProductId: string = "";
  workersProductId: string = "";

  constructor(json: Record<string, any>, newId: string) {
    this.id = newId;
    this.businessProductId = json["business"] ?? "";
    this.workersProductId = json["worker"] ?? "";
  }

  static fromJson(json: Record<string, any>, newId: string): Developer {
    return new Developer(json, newId);
  }
}
