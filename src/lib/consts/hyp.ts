import { CurrencyModel } from "$lib/models/general/currency_model";

/// Thes file is saving the const vars of the "hyp" P2p service
/// example: the currencies umbers

export const currencyToInt: Record<string, number> = {
  ["ILS"]: 1,
  ["USD"]: 2,
  ["EUR"]: 3,
  ["GBP"]: 4,
};

export const hypValidCurrencies: Record<string, CurrencyModel> = {
  ILS: new CurrencyModel({ code: "ILS", name: "Israel Shekel", symbol: "₪" }),
  USD: new CurrencyModel({
    code: "USD",
    name: "United States Dollar",
    symbol: "$",
  }),
  EUR: new CurrencyModel({ code: "EUR", name: "Euro", symbol: "€" }),
  GBP: new CurrencyModel({ code: "GBP", name: "British Pound", symbol: "£" }),
};

export const limitForPaymentWithoutId: { [key in string]: number } = {
  ILS: 5000,
  USD: 1200,
  EUR: 1000,
  GBP: 800,
};

export const hypTerminalUrl: string =
  "https://icom.yaad.net/cgi-bin/yaadpay/yaadpay.pl?d=s&CSRF=7ad0efdfde68def7f659f5ac9e4d88e63e4ab582&action=Settings";

export const minPasswordCharsLength: number = 6;
export const maxPasswordCharsLength: number = 20;
export const attemptsToTryPassword: number = 5;
export const minutesToExportAnInvoice: number = 5;
export const maxAttemptsPassword: number = 5;
export const transactionIdInvoiceLink: string =
  "https://icom.yaad.net/cgi-bin/yaadpay/yaadpay3ds.pl?Masof=MASOFNUMBER&TransId=TRANSACTIONID&action=PrintHesh&type=PDF&signature=SIGNATURE";

export const invoiceNumberInvoiceLink: string =
  "https://icom.yaad.net/cgi-bin/yaadpay/yaadpay3ds.pl?Masof=MASOFNUMBER&action=PrintHesh&asm=INVOICENUMBER&type=PDF&signature=SIGNATURE";
