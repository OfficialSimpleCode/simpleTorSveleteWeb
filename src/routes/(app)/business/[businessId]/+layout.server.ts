import BusinessInitializer from "$lib/initializers/business_initializer.js";

export const load = async ({ params }) => {
  const businessId = params.businessId;

  const businessJson = await BusinessInitializer.GI().getBusinessDoc(
    businessId
  );

  return { business: businessJson, businessId: businessId };
};
