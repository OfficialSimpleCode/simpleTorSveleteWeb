import { dateIsoStr, isoToDate } from "$lib/utils/times_utils";

export default class Check {
  accountNumber: string = "";
  bankBranch: string = ""; // Snif number like 902
  bankNumber: string = "";
  checkNumber: string = "";
  amount: number = 0;
  repaymentDate: Date = new Date(0);
  constructor({});
  constructor({
    accountNumber,
    bankBranch,
    bankNumber,
    checkNumber,
    amount,
    repaymentDate,
  }: {
    accountNumber: string;
    bankBranch: string; // Snif number like 902
    bankNumber: string;
    checkNumber: string;
    amount: number;
    repaymentDate: Date;
  }) {
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
    const check = new Check({});

    check.accountNumber = json["AN"] || "";
    check.bankBranch = json["BB"] || "";
    check.bankNumber = json["BN"] || "";
    check.checkNumber = json["CN"] || "";
    check.amount = json["A"] || 0;
    check.repaymentDate = isoToDate(json["RD"]) ?? new Date(0);

    return check;
  }

  toString(): string {
    return JSON.stringify(this, null, 2);
  }
}
