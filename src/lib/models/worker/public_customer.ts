export default class PublicCustomer {
  freeFromPayments: boolean;
  hashNumber: string;
  blocked: boolean;

  constructor({
    freeFromPayments = false,
    hashNumber = "",
    blocked = false,
  }: {
    freeFromPayments?: boolean;
    hashNumber?: string;
    blocked?: boolean;
  } = {}) {
    this.freeFromPayments = freeFromPayments;
    this.hashNumber = hashNumber;
    this.blocked = blocked;
  }

  static fromJson(json: { [key: string]: any }, id: string): PublicCustomer {
    return new PublicCustomer({
      freeFromPayments: json["freeFromPayments"],
      hashNumber: id,
    });
  }

  static fromMinimalJson(
    json: Record<string, any>,
    id: string
  ): PublicCustomer {
    return new PublicCustomer({
      blocked: json["B"] ?? false,
      freeFromPayments: json["FP"],
      hashNumber: id,
    });
  }

  static fromCustomerData(publicCustomer: PublicCustomer): PublicCustomer {
    return new PublicCustomer({
      blocked: publicCustomer.blocked,
      freeFromPayments: publicCustomer.freeFromPayments,
      hashNumber: publicCustomer.hashNumber,
    });
  }

  //TODO
  //   isTheSameAs(
  //     publicCustomer: PublicCustomer,
  //     { withId = true }: { withId?: boolean } = {}
  //   ): boolean {
  //     const jsonA = publicCustomer.toJson();
  //     if (withId) {
  //       jsonA["id"] = publicCustomer.hashNumber;
  //     }

  //     const jsonB = this.toJson();
  //     if (withId) {
  //       jsonB["id"] = this.hashNumber;
  //     }

  //     return DeepCollectionEquality.equals(jsonB, jsonA);
  //   }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};
    data["freeFromPayments"] = this.freeFromPayments;
    data["blocked"] = this.blocked;
    return data;
  }

  toMinimalJson(): Record<string, any> {
    const data: Record<string, any> = {};
    data["FP"] = this.freeFromPayments;
    data["B"] = this.blocked;
    return data;
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
