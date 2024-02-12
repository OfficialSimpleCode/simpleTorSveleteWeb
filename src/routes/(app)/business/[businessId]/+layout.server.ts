import BusinessInitializer from "$lib/initializers/business_initializer.js";

export const load = async ({ params }) => {
  const businessId = params.businessId;

  const businessJson = await BusinessInitializer.GI().getBusinessDoc(
    businessId
  );
  console.log("3333333333333333333333333333333333333");
  return { business: businessJson, businessId: businessId };
};
