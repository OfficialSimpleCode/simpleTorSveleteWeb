
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  return {
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
