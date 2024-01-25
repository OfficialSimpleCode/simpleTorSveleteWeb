import { CurrencyModel, defaultCurrency } from "./currency_model";

export class Price {
  amount: number = 0.0;
  currency: CurrencyModel = defaultCurrency; // Assuming defaultCurrency is an instance of CurrencyModel

  constructor({
    amount,
    currency,
  }: {
    amount: string;
    currency: CurrencyModel;
  }) {
    const amountAsDouble = parseFloat(amount) || 0.0;
    this.amount = parseFloat(amountAsDouble.toFixed(2));
    this.currency = currency;
  }

  static fromJson(json: Record<string, any>): Price {
    const price = new Price({
      amount: "0.0",
      currency: CurrencyModel.fromJson(json["currency"]),
    });
    if (json.amount != null) {
      price.amount =
        typeof json.amount === "number" ? json.amount : parseFloat(json.amount);
    }
    return price;
  }

  add(anotherPrice: Price): void {
    if (anotherPrice.currency.code !== this.currency.code) return;
    this.amount += anotherPrice.amount;
  }

  isEqual(price: Price): boolean {
    return (
      this.amount === price.amount && this.currency.code === price.currency.code
    );
  }

  toString(): string {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: this.currency.code,
    });

    return formatter.format(this.amount).slice(0, -1);
  }

  toJson(): any {
    return {
      amount: this.amount,
      currency: this.currency.toJson(),
    };
  }
}
