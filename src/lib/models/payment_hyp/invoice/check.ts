import { dateIsoStr } from "$lib/utils/times_utils";

export default class Check {
  accountNumber: string = "";
  bankBranch: string = ""; // Snif number like 902
  bankNumber: string = "";
  checkNumber: string = "";
  amount: number = 0;
  repaymentDate: Date = new Date(0);

  constructor(
    accountNumber: string,
    bankBranch: string, // Snif number like 902
    bankNumber: string,
    checkNumber: string,
    amount: number,
    repaymentDate: Date
  ) {
    this.accountNumber = accountNumber;
    this.bankBranch = bankBranch;
    this.bankNumber = bankNumber;
    this.checkNumber = checkNumber;
    this.amount = amount;
    this.repaymentDate = repaymentDate;
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};
    data["AN"] = this.accountNumber;
    data["BB"] = this.bankBranch;
    data["BN"] = this.bankNumber;
    data["CN"] = this.checkNumber;
    data["A"] = this.amount;
    data["RD"] = dateIsoStr(this.repaymentDate);

    return data;
  }

  static fromJson(json: Record<string, any>): Check {
    const check = new Check(
      json["AN"] || "",
      json["BB"] || "",
      json["BN"] || "",
      json["CN"] || "",
      json["A"] || 0,
      new Date(json["RD"] || "1970-01-01T00:00:00.000Z")
    );

    return check;
  }

  toString(): string {
    return JSON.stringify(this, null, 2);
  }
}
