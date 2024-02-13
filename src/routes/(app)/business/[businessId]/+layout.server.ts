import BusinessInitializer from "$lib/initializers/business_initializer.js";

export const load = async ({ params }) => {
  const businessUrl = params.businessId;
  let businessDoc;
  //if the url is longer than 45 is must to be an id
  if (businessUrl.length < 45) {
    businessDoc = await BusinessInitializer.GI().getBusinessDocByQuery(
      businessUrl
    );
  } else {
    businessDoc = await BusinessInitializer.GI().getBusinessDocById(
      businessUrl
    );
  }

  return businessDoc;
};
