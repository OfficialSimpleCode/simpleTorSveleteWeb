import { LoadingStatuses } from "$lib/consts/loading_statuses";
import { LoadAppHelper } from "./load_app_helper";

export default class LinksHelper {
  private static _instance: LinksHelper;
  appFirstTime: boolean = true;
  linkedHasChanged: boolean = false;
  linkedBuisnessId: string = "";
  linkedPaymentId: string = "";

  private constructor() {}

  public static GI(): LinksHelper {
    if (!LinksHelper._instance) {
      LinksHelper._instance = new LinksHelper();
    }
    return LinksHelper._instance;
  }

  public async handleOpenAppLink(): Promise<void> {
    console.log(`AppFirstTime: ${this.appFirstTime}`);
    try {
      if (this.appFirstTime) {
        this.appFirstTime = false;
        const link: string = "";
        console.log(`The link of the first time --> ${link}`);
        if (link) {
          if (link.includes("PaymentId")) {
            const paymentId = this.getPaymentId(link);

            if (paymentId && paymentId !== this.linkedPaymentId) {
              this.linkedPaymentId = paymentId;
            }
          } else {
            const buisnessId = this.getBuisnessId(link);

            if (buisnessId && buisnessId !== this.linkedBuisnessId) {
              this.linkedBuisnessId = buisnessId;
            }
          }
        }
      }
    } catch (e) {
      console.error(`Link general error ${e}`);
    }
  }

  public async linksAfterResumeApp(): Promise<void> {
    console.log(`LinkedHasChanged ---->  ${this.linkedHasChanged}`);
    if (this.linkedHasChanged) {
      console.log("Link update screen");
      this.linkedHasChanged = false;
      // Assuming LoadAppHelper and UiManager classes
      LoadAppHelper.GI().status = LoadingStatuses.loading;
      //UiManager.insertUpdate(Providers.links);
    }
  }

  private getPaymentId(initialLink: string): string {
    const link = new URL(initialLink);
    console.log(`Query params --> ${JSON.stringify(link.searchParams)}`);
    console.log(`Segments --> ${JSON.stringify(link.pathname.split("/"))}`);

    return link.searchParams.get("PaymentId") || "";
  }

  private getBuisnessId(initialLink: string): string {
    const link = new URL(initialLink);
    console.log(`Query params --> ${JSON.stringify(link.searchParams)}`);
    console.log(`Segments --> ${JSON.stringify(link.pathname.split("/"))}`);

    let buisnesId = link.searchParams.get("BusinessId") || "";
    // Change only for liel
    if (link.pathname.endsWith("lielcohen")) {
      buisnesId = "972-545401020--d0363260-ef23-11ed-8922-f300f55ecac2";
    }
    return buisnesId.replace(/~@~/g, "--");
  }
}
