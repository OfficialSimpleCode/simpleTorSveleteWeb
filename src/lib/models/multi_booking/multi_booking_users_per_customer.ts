import { NotificationType } from "$lib/consts/booking";
import { isEmpty, isNotEmpty } from "$lib/utils/core_utils";

import CustomerData from "../general/customer_data";
import type UserModel from "../user/user_model";
import type MultiBooking from "./multi_booking";
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
  ///Update the multiBookingUsers if there is need to remind to them -
  ///no need to remind to the second ticket of customer
  ///check all connected tickets
  updateNeedToRemind({
    multiBooking,

    user,
  }: {
    multiBooking: MultiBooking;

    user: UserModel;
  }): void {
    // Get all tickets from the multi booking if worker action or from the
    // user if user action
    const oldTickets = user.bookings.userTickets(
      multiBooking,
      this.customerUuid
    );

    // If there are no previous tickets, consider only the new ones
    if (isEmpty(oldTickets)) {
      if (isNotEmpty(this.multiBookingUsers)) {
        Object.values(this.multiBookingUsers)[0].canRemind = true;
      }
      return;
    }
    // If there are previous tickets, check them for a reminder and then
    // consider the new ones
    else {
      let hasNotification = false;
      Object.entries(oldTickets).forEach(([bookingId, ticket]) => {
        if (ticket.notificationType !== NotificationType.none) {
          hasNotification = true;
        }
      });
      if (!hasNotification) {
        if (isNotEmpty(this.multiBookingUsers)) {
          Object.values(this.multiBookingUsers)[0].canRemind = true;
        }
      }
    }
  }
}
