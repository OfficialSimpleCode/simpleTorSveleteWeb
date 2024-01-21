import {
  messagesForNewBusiness,
  paymentRequsetForNewBusiness,
} from "$lib/consts/limitation";
import type { DataSnapshot } from "firebase/database";

export const messagesLimits: { [key: string]: number } = {
  simpletor_golden_business_month_1: 1000,
  simpletor_advanced_business_month_1: 200,
  simpletor_basic_business_month_1: 0,
  simpletor_landing_business_month_1: 0,
};

export const paymentRequestLimit: { [key: string]: number } = {
  simpletor_golden_business_month_1: 100,
  simpletor_advanced_business_month_1: 20,
  simpletor_basic_business_month_1: 10,
  simpletor_landing_business_month_1: 10,
};

export class BusinessData {
  messagesCounter: number = 0;
  paymentRequestCounter: number = 0;

  constructor(messagesCounter: number = 0, paymentRequestCounter: number = 0) {
    this.messagesCounter = messagesCounter;
    this.paymentRequestCounter = paymentRequestCounter;
  }

  static forNewBusiness(): BusinessData {
    return new BusinessData(
      messagesForNewBusiness,
      paymentRequsetForNewBusiness
    );
  }

  static fromProductId(productId: string): BusinessData {
    return new BusinessData(
      messagesLimits[productId] || 0,
      paymentRequestLimit[productId] || 0
    );
  }

  setBusinessData(ref: DataSnapshot): void {
    this.messagesCounter =
      parseInt(ref.child("messagesCounter").val().toString()) || 0;
    this.paymentRequestCounter =
      parseInt(ref.child("paymentRequestCounter").val().toString()) || 0;
  }

  toJson(): any {
    const data: { [key: string]: number } = {};
    data["messagesCounter"] = this.messagesCounter;
    data["paymentRequestCounter"] = this.paymentRequestCounter;

    return data;
  }
}
