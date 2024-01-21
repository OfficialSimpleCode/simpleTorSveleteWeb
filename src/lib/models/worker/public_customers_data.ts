import PublicCustomer from "./public_customer";

export default class PublicCustomers {
  publicCustomersData?: { [key: string]: PublicCustomer };

  constructor({
    publicCustomersData,
  }: { publicCustomersData?: { [key: string]: PublicCustomer } } = {}) {
    this.publicCustomersData = publicCustomersData;
  }

  static fromJson(json: { [key: string]: any }): PublicCustomers {
    return new PublicCustomers().setPublicCustomersDataJson(json);
  }

  setPublicCustomersDataJson(json: { [key: string]: any }): PublicCustomers {
    json["data"] ??= {};
    this.publicCustomersData = {};

    Object.entries<Record<string, any>>(json["data"]).forEach(
      ([id, publicCustomer]) => {
        const customer = PublicCustomer.fromMinimalJson(publicCustomer, id);
        this.publicCustomersData![id] = customer;
      }
    );

    return this;
  }

  toMinimalJson(): { [key: string]: any } {
    const data: { [key: string]: any } = {};
    data["data"] = {};
    this.publicCustomersData ??= {};
    Object.entries(this.publicCustomersData).forEach(([id, customer]) => {
      data["data"][id] = customer.toMinimalJson();
    });
    return data;
  }
}
