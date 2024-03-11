import {
  messagesForNewBusiness,
  paymentRequsetForNewBusiness,
} from "$lib/consts/limitation";

import { type DataSnapshot } from "firebase/database";
import type { Unsubscribe } from "firebase/firestore";

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
  ///renewed messages counter - get renewed by the business subscription
  messagesCounter: number = 0;

  ///renewed payment request counter - get renewed by the business subscription
  paymentRequestCounter: number = 0;

  ///payment request counter that not renewed every month - get only from
  ///buying cosumable products
  paymentRequestsCounterConsumable: number = 0;

  ///messages counter that not renewed every month - get only from
  ///buying consumable products
  messagesCounterConsumable: number = 0;
  listener?: Unsubscribe;

  constructor(
    messagesCounter: number = 0,
    paymentRequestCounter: number = 0,
    paymentRequestsCounterConsumable: number = 0,
    messagesCounterConsumable: number = 0
  ) {
    this.messagesCounter = messagesCounter;
    this.paymentRequestCounter = paymentRequestCounter;
    this.paymentRequestsCounterConsumable = paymentRequestsCounterConsumable;
    this.messagesCounterConsumable = messagesCounterConsumable;
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
  get totalMessages(): number {
    return this.messagesCounter + this.messagesCounterConsumable;
  }

  get totalPaymentRequest(): number {
    return this.paymentRequestCounter + this.paymentRequestsCounterConsumable;
  }

  get hasMessages(): boolean {
    return this.totalMessages > 0;
  }

  get hasPaymentRequests(): boolean {
    return this.totalPaymentRequest > 0;
  }

  setBusinessData(snapshot: DataSnapshot): void {
    this.messagesCounter =
      parseInt((snapshot.val().messagesCounter ?? 0).toString()) || 0;
    this.paymentRequestCounter =
      parseInt((snapshot.val().paymentRequestCounter ?? 0).toString()) || 0;
    this.messagesCounterConsumable =
      parseInt((snapshot.val().messagesCounterConsumable ?? 0).toString()) || 0;
    this.paymentRequestsCounterConsumable =
      parseInt(
        (snapshot.val().paymentRequestsCounterConsumable ?? 0).toString()
      ) || 0;
  }

  toJson(): any {
    const data: { [key: string]: number } = {};
    data["messagesCounter"] = this.messagesCounter;
    data["paymentRequestCounter"] = this.paymentRequestCounter;
    data["paymentRequestsCounterConsumable"] =
      this.paymentRequestsCounterConsumable;
    data["messagesCounterConsumable"] = this.messagesCounterConsumable;
    return data;
  }
}
