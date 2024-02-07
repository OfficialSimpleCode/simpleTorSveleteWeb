import { envKey } from "$lib/consts/db";
import {
  COMMIT_TRANSACTION_END_POINT,
  CREATE_CASH_INVOICE_END_POINT,
  CREATE_GENERAL_INVOICE_END_POINT,
  GET_CHECKOUT_PAGE_END_POINT,
  GET_INVOICE_LINK_END_POINT,
  GET_PAYMENT_TOKEN_END_POINT,
  PAY_WITH_TOKEN_END_POINT,
} from "$lib/consts/server_variables";
import MakeRequest from "../external_services/make_request";

enum InvoiceIdTypes {
  asm,
  transactionId,
}

const InvoiceIdTypesToStr: Record<InvoiceIdTypes, string> = {
  [InvoiceIdTypes.asm]: "asm",
  [InvoiceIdTypes.transactionId]: "transaction_id",
};

enum InvoiceTypes {
  multiWhitCash = "Multi-whit-Cash",
  multi = "Multi",
  check = "Check",
}

const InvoiceTypesToStr: { [key in InvoiceTypes]: string } = {
  "Multi-whit-Cash": "Multi-whit-Cash",
  Multi: "Multi",
  Check: "Check",
};

export default class HypClient {
  private _makeRequest: MakeRequest = new MakeRequest();

  async getCheckoutLink({
    terminal,
    transactionInfo,
    amount,
    businessId,
    currency,
    email = "",
    firstName = "",
    phoneNumber = "",
    isDeposit = false,
  }: {
    terminal: string;
    transactionInfo: string;
    amount: number;
    businessId: string;
    currency: number;
    email?: string;
    firstName?: string;
    phoneNumber?: string;
    isDeposit?: boolean;
  }): Promise<string> {
    const data = {
      terminal,
      transaction_info: transactionInfo,
      amount: amount.toString(),
      currency: currency.toString(),
      email,
      first_name: firstName,
      phone_number: phoneNumber,
      business_id: businessId,
      enviroment: envKey.replaceAll("enviroments/", ""),
      last_name: "",
      is_deposit: isDeposit ? "True" : "False",
    };

    return this._makeRequest.performRequst({
      endpoint: GET_CHECKOUT_PAGE_END_POINT,
      method: "post",
      data: data,
    });
  }

  async commitTransaction({
    terminal,
    transactionId,
    transactionInfo,
    businessId,
  }: {
    terminal: string;
    transactionId: string;
    transactionInfo: string;
    businessId: string;
  }): Promise<string> {
    const data = {
      terminal,
      transaction_info: transactionInfo,
      transaction_id: transactionId,
      business_id: businessId,
      enviroment: envKey.replaceAll("enviroments/", ""),
    };

    return this._makeRequest.performRequst({
      endpoint: COMMIT_TRANSACTION_END_POINT,
      method: "post",
      data: data,
    });
  }

  async getPaymentToken({
    terminal,
    transactionId,
    businessId,
  }: {
    terminal: string;
    transactionId: string;
    businessId: string;
  }): Promise<string> {
    const data = {
      terminal,
      transaction_id: transactionId,
      business_id: businessId,
      enviroment: envKey.replaceAll("enviroments/", ""),
    };

    return this._makeRequest.performRequst({
      endpoint: GET_PAYMENT_TOKEN_END_POINT,
      method: "post",
      data: data,
    });
  }

  async payWithToken({
    terminal,
    token,
    amount,
    validityMonth,
    validityYear,
    currency,
    businessId,
    email,
    name,
    userId,
    transactionInfo,
    isDeposit = false,
  }: {
    terminal: string;
    token: string;
    amount: number;
    validityMonth: string;
    validityYear: string;
    currency: number;
    businessId: string;
    email: string;
    name: string;
    userId: string;
    transactionInfo: string;
    isDeposit?: boolean;
  }): Promise<string> {
    const data = {
      terminal,
      transaction_info: transactionInfo,
      amount: amount.toString(),
      currency: currency.toString(),
      t_month: validityMonth,
      t_year: validityYear,
      email,
      first_name: name,
      last_name: "",
      user_id: userId,
      token,
      business_id: businessId,
      enviroment: envKey.replaceAll("enviroments/", ""),
      is_deposit: isDeposit ? "True" : "False",
    };
    const resp = await this._makeRequest.performRequst({
      endpoint: PAY_WITH_TOKEN_END_POINT,
      method: "post",
      data: data,
    });

    return resp;
  }

  async createCashInvoice({
    terminal,
    customerPhone,
    businessId,
    firstName,
    lastName,
    email,
    currency,
    clientId,
    items,
    amount,
  }: {
    terminal: string;
    customerPhone: string;
    businessId: string;
    firstName: string;
    lastName: string;
    email: string;
    currency: number;
    clientId: string;
    items: string;
    amount: number;
  }): Promise<string> {
    const data = {
      client_phone_number: customerPhone,
      client_mail: email,
      client_id: clientId == "" ? "000000000" : clientId,
      first_name: firstName,
      last_name: lastName,
      transaction_info: "תשלום-SimpleTor",
      terminal,
      items,
      currency: currency.toString(),
      amount: amount.toString(),
      business_id: businessId,
      enviroment: envKey.replaceAll("enviroments/", ""),
    };
    return this._makeRequest.performRequst({
      endpoint: CREATE_CASH_INVOICE_END_POINT,
      method: "post",
      data: data,
    });
  }

  async createGenealInvoice({
    terminal,
    customerPhone,
    businessId,
    firstName,
    lastName,
    email,
    clientId,
    items,
    amount,
    bankNumber,
    bankBranch,
    accountNumber,
    checkNumber,
    repaymentDate,
    currency,
    invoiceType,
  }: {
    terminal: string;
    customerPhone: string;
    businessId: string;
    firstName: string;
    lastName: string;
    email: string;
    clientId: string;
    items: string;
    amount: string;
    bankNumber: string;
    bankBranch: string;
    accountNumber: string;
    checkNumber: string;
    repaymentDate: string;
    currency: number;
    invoiceType: InvoiceTypes;
  }): Promise<string> {
    const data = {
      client_phone_number: customerPhone,
      client_mail: email,
      client_id: clientId == "" ? "000000000" : clientId,
      first_name: firstName,
      last_name: lastName,
      transaction_info: "תשלום-SimpleTor",
      items,
      amount,
      currency: currency.toString(),
      bank_number: bankNumber,
      bank_branch: bankBranch,
      account_number: accountNumber,
      check_number: checkNumber,
      repayment_date: repaymentDate,
      terminal,
      business_id: businessId,
      invoice_type: InvoiceTypesToStr[invoiceType] || "Check",
      enviroment: envKey.replaceAll("enviroments/", ""),
    };

    return this._makeRequest.performRequst({
      endpoint: CREATE_GENERAL_INVOICE_END_POINT,
      method: "post",
      data: data,
    });
  }

  async getInvoiceLink({
    terminal,
    businessId,
    id,
    invoiceIdType,
  }: {
    terminal: string;
    businessId: string;
    id: string;
    invoiceIdType: InvoiceIdTypes;
  }): Promise<string> {
    const data = {
      terminal,
      business_id: businessId,
      [InvoiceIdTypesToStr[invoiceIdType] || "transaction_id"]: id,
      enviroment: envKey.replaceAll("enviroments/", ""),
    };

    return this._makeRequest.performRequst({
      endpoint: GET_INVOICE_LINK_END_POINT,
      method: "post",
      data: data,
    });
  }
}
