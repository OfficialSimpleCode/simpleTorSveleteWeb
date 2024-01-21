import { defaultCurrency } from "../general/currency_model";
import { Price } from "../general/price";

export abstract class PaymentObject {
  price: Price = new Price({ amount: "0", currency: defaultCurrency });
  id: string = "";
  createdAt: Date = new Date(0);
}
