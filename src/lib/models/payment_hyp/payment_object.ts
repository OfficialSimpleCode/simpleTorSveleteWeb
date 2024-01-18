import { defaultCurrency } from "../general/currency_model";
import { Price } from "../general/price";

abstract class PaymentObject {
  price: Price = new Price("0", defaultCurrency);
  createdAt: Date = new Date(0);
}
