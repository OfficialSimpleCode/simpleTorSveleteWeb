import type Booking from "$lib/models/booking/booking_model";

class BookingFilter {
    filterCurrentBusiness: boolean = false;
  
    constructor() {}
  
    get isEmpty(): boolean {
      return !this.filterCurrentBusiness || GeneralData.currentBusinesssId === "";
    }
  
    // get booking and return if it passes all the filters
    isValid(booking: Booking): boolean {
      const businessFilter =
        !this.filterCurrentBusiness ||
        GeneralData.currentBusinesssId === "" ||
        GeneralData.currentBusinesssId === booking.buisnessId;
  
      return businessFilter;
    }
  }