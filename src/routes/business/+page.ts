import { BusinessDesign } from "$lib/models/business/business_design";
import BusinessModel from "$lib/models/business/business_model";

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const business = getBusinessById(params.slug);
  return {
    businessData: business,
    profile: {
      name: "Amit Nails",
      gender: "male",
      emailAddress: "some@gmail.com",
      phoneNumber: "+97285522908",
      userID: "ER485RT93839D",
      geo: {
        title: "Ort 23",
        link: "https://maps.google.com",
      },
    },
    name: "Amit Nails",
    geo: {
      title: "Ort 23",
      link: "https://maps.google.com",
    },
    socialLinks: {
      whatsapp: "whatsapp://send?phone=972525656377",
      instagram: "",
      call: "tel:972-525656377",
      maps: "https://www.google.com/maps/search/?api=1&query=%D7%90%D7%95%D7%A8%D7%98+23",
      policy: "",
    },
    displayImages: [
      {
        link: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd.newsweek.com%2Fen%2Ffull%2F1524142%2Fcardio-workout.jpg&f=1&nofb=1&ipt=918d5daae85a875795a8fbc59ed713efac18c5151772da9d651dda889ce597b5&ipo=images",
        numberOfHearts: 2,
      },
      {
        link: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd.newsweek.com%2Fen%2Ffull%2F1524142%2Fcardio-workout.jpg&f=1&nofb=1&ipt=918d5daae85a875795a8fbc59ed713efac18c5151772da9d651dda889ce597b5&ipo=images",
        numberOfHearts: 3,
      },
    ],
    notifications: [
      {
        title: "New worker",
        body: "We are happy to announce our newest member of the team Josh that will be joining us next monday.",
        viewed: false,
      },
      {
        title: "Hours update",
        body: "From now forward we will be closing at 17:00 every weekday.",
        viewed: false,
      },
    ],
  };
}

function getBusinessById(id: string): any {
  return new BusinessModel({
    shopName: "ShiloSaadon shop",
    businessId: id,
    productId: "",
    adress: "",
    dynamicLink: "",
    revenueCatId: "",
    ownersName: "",
    instagramAccount: "",
    shopPhone: "",
    design: new BusinessDesign(),
  });
}
