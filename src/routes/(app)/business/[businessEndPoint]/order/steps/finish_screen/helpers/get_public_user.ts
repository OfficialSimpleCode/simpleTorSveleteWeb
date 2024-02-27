import { publicCustomerHashSalt } from "$lib/consts/worker";
import BookingController from "$lib/controllers/booking_controller";
import UserInitializer from "$lib/initializers/user_initializer";
import PublicCustomer from "$lib/models/worker/public_customer";
import Encryptor from "$lib/services/encryption_service/encryptor";

export function getPublicCustomer(): PublicCustomer {
  let publicCustomer: PublicCustomer | undefined;

  console.log(BookingController.worker.publicCustomers.publicCustomersData);
  //check in the public customer obj
  publicCustomer = (BookingController.worker?.publicCustomers
    .publicCustomersData ?? {})[
    Encryptor.GI().shortHashTextSha256(
      UserInitializer.GI().user.id,
      publicCustomerHashSalt
    )
  ];

  // check if its phone in the public customers
  if (publicCustomer == null) {
    publicCustomer = (BookingController.worker?.publicCustomers
      .publicCustomersData ?? {})[
      Encryptor.GI().shortHashTextSha256(
        UserInitializer.GI().user.phoneNumber,
        publicCustomerHashSalt
      )
    ];
  }

  return publicCustomer ?? new PublicCustomer();
}
