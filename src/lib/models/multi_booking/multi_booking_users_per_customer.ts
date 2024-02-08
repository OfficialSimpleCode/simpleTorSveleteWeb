import CustomerData from "../general/customer_data";
import MultiBookingUser from "./multi_booking_user";

export default class MultiBookingUsersPerCustomer extends CustomerData {
  multiBookingUsers: Record<string, MultiBookingUser>;

  constructor({
    customer,
    multiBookingUsers,
  }: {
    customer: CustomerData;
    multiBookingUsers: Record<string, MultiBookingUser>;
  }) {
    super(customer);
    this.multiBookingUsers = multiBookingUsers;
  }

  static fromMultiBookingUsersPerCustomer(
    other: MultiBookingUsersPerCustomer
  ): MultiBookingUsersPerCustomer {
    const customer = CustomerData.fromCustomerData(other);
    const multiBookingUsers: Record<string, MultiBookingUser> = {};

    for (const bookingId in other.multiBookingUsers) {
      if (other.multiBookingUsers[bookingId] != null) {
        multiBookingUsers[bookingId] = MultiBookingUser.fromMultiBookingUser(
          other.multiBookingUsers[bookingId]
        );
      }
    }

    return new MultiBookingUsersPerCustomer({ customer, multiBookingUsers });
  }
}
