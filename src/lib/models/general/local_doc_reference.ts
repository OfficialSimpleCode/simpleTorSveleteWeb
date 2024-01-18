export default class LocalDocReference {
  docId: string = "";
  path: string = "";

  constructor(docId: string, path: string) {
    this.docId = docId;
    this.path = path;
  }

  toJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};

    data["docId"] = this.docId;
    data["path"] = this.path;

    return data;
  }

  static fromJson(json: any): LocalDocReference {
    const localDocReference = new LocalDocReference("", "");

    localDocReference.docId = json["docId"] || "";
    localDocReference.path = json["path"] || "";

    return localDocReference;
  }

  toString(): string {
    return JSON.stringify(this, null, 2);
  }
}
