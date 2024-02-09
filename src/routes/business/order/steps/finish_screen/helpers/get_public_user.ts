import BookingController from "$lib/controllers/booking_controller";
import UserInitializer from "$lib/initializers/user_initializer";
import PublicCustomer from "$lib/models/worker/public_customer";
import { hashId } from "$lib/utils/encryptions";

export function getPublicCustomer(): PublicCustomer {
  let publicCustomer: PublicCustomer | undefined;

  //check in the public customer obj
  publicCustomer = (BookingController.worker?.publicCustomers
    .publicCustomersData ?? {})[hashId({ id: UserInitializer.GI().user.id })];

  console.log(hashId({ id: UserInitializer.GI().user.id }));

  // check if its phone in the public customers
  if (publicCustomer == null) {
    publicCustomer = (BookingController.worker?.publicCustomers
      .publicCustomersData ?? {})[
      hashId({ id: UserInitializer.GI().user.phoneNumber })
    ];
  }

  return publicCustomer ?? new PublicCustomer();
}
