import { firebaseConfig } from "$lib/firebase_config";
import BusinessInitializer from "$lib/initializers/business_initializer.js";
import BusinessModel from "$lib/models/business/business_model";
import { initializeApp } from "firebase/app";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const business = await getBusinessById(
    "972-525656377--857e6680-b863-11ed-89a5-05ff99923d7e"
  );
  console.log(business.toJson());
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

async function getBusinessById(id: string): Promise<BusinessModel> {
  const firebaseApp = initializeApp(firebaseConfig);
  await BusinessInitializer.GI().loadBusiness(id, "");
  const business = BusinessInitializer.GI().business;
  return business;
}
