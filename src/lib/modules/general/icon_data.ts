
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
    try{
      // Take the id
      const splitUrl = url.split("SHOPICON");
      instance.id = splitUrl[1].split("?alt")[0];

      // Take the token
      const splitUrlForToken =  url.split("&token=");
      instance.token = splitUrlForToken[1];
      return instance;
    }catch(e){
      return new IconData();
    }
   

    
  }

  static fromJsonStr(jsonStr:string ): IconData {
    const json = JSON.parse(jsonStr) as { I?: string; T?: string };
    const instance = new IconData();
    instance.id = json.I || "";
    instance.token = json.T || "";
    return instance;
  }

  

  toJsonStr(): string {
    const data = {
      I: this.id, T: this.token
    };

    return JSON.stringify(data);
  }
}


