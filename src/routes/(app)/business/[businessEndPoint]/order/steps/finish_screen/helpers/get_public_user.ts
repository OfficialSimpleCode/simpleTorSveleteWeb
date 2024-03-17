import { publicCustomerHashSalt } from "$lib/consts/worker";
import BookingController from "$lib/controllers/booking_controller";
import type UserModel from "$lib/models/user/user_model";
import PublicCustomer from "$lib/models/worker/public_customer";
import Encryptor from "$lib/services/encryption_service/encryptor";

export function getPublicCustomer(user: UserModel): PublicCustomer {
  let publicCustomer: PublicCustomer | undefined;

  //check in the public customer obj
  publicCustomer = (BookingController.worker?.publicCustomers
    .publicCustomersData ?? {})[
    Encryptor.GI().shortHashTextSha256(user.id, publicCustomerHashSalt) ?? ""
  ];

  // check if its phone in the public customers
  if (publicCustomer == null) {
    publicCustomer = (BookingController.worker?.publicCustomers
      .publicCustomersData ?? {})[
      Encryptor.GI().shortHashTextSha256(
        user.phoneNumber,
        publicCustomerHashSalt
      ) ?? ""
    ];
  }

  return publicCustomer ?? new PublicCustomer();
}
