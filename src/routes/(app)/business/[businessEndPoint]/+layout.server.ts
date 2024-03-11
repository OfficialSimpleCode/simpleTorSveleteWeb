import BusinessInitializer from "$lib/initializers/business_initializer.js";
import { error, redirect } from "@sveltejs/kit";

export const load = async ({ url, params }) => {
  const businessUrl = params.businessEndPoint;
  let businessDoc = undefined;

  //if the url is longer than 45 is must to be an id
  if (businessUrl.length < 45) {
    businessDoc = await BusinessInitializer.GI().getBusinessDocByQuery(
      businessUrl
    );
  } else {
    businessDoc = await BusinessInitializer.GI().getBusinessDocById(
      businessUrl
    );
    if (businessDoc != null && businessDoc.business["urlEndPoint"] != null) {
      throw redirect(
        303,
        url.href.replaceAll(businessUrl, businessDoc.business["urlEndPoint"])
      );
    }
  }

  if (businessDoc == null) {
    throw error(404, "page not found");
  }

  return businessDoc;
};
