import { envKey } from "$lib/consts/db";

export default class IconData {
  id: string = "";
  token: string = "";

  constructor();

  constructor(json: { I?: string; T?: string });

  constructor(json?: { I?: string; T?: string }) {
    if (json) {
      this.id = json.I || "";
      this.token = json.T || "";
    }
  }

  static fromShopIconUrl(url: string): IconData {
    const instance = new IconData();
    try {
      // Take the id
      const splitUrl = url.split("SHOPICON");
      instance.id = splitUrl[1].split("?alt")[0];

      // Take the token
      const splitUrlForToken = url.split("&token=");
      instance.token = splitUrlForToken[1];
      return instance;
    } catch (e) {
      return new IconData();
    }
  }

  static fromJson(json: { [key: string]: string }): IconData {
    const instance = new IconData();
    instance.id = json.I || "";
    instance.token = json.T || "";
    return instance;
  }

  static fromJsonStr(jsonStr: string): IconData {
    const json = JSON.parse(jsonStr) as { I?: string; T?: string };
    const instance = new IconData();
    instance.id = json.I || "";
    instance.token = json.T || "";
    return instance;
  }

  get isEmpty(): boolean {
    return this.token === "" || this.id === "";
  }

  get isNotEmpty(): boolean {
    return this.token !== "" && this.id !== "";
  }

  isEqual(other: IconData): boolean {
    return other.id == this.id && other.token == this.token;
  }

  getShopIconPath(businessId: string): string {
    if (this.token === "" || this.id === "") {
      return "";
    }

    const env = envKey.replace("enviroments/", "");
    return `https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2F${env}%2F${businessId}%2Fimages%2Flogos%2FSHOPICON${this.id}?alt=media&token=${this.token}`;
  }

  toJsonStr(): string {
    const data = {
      I: this.id,
      T: this.token,
    };

    return JSON.stringify(data);
  }

  toJson(): { [key: string]: string } {
    const data = {
      I: this.id,
      T: this.token,
    };

    return data;
  }
}
