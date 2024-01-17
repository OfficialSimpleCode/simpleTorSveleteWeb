import type Check from "./check";


export default class MultypleChecks {
  accountNumbers: string[] = [];
  bankBranchs: string[] = [];
  bankNumbers: string[] = [];
  checkNumbers: string[] = [];
  amounts: number[] = [];
  repaymentDates: Date[] = [];

  constructor({ checks }: { checks: Check[] }) {
    checks.forEach((check) => {
      this.addCheck(check);
    });
  }

  addCheck(check: Check): void {
    this.accountNumbers.push(check.accountNumber);
    this.bankBranchs.push(check.bankBranch);
    this.bankNumbers.push(check.bankNumber);
    this.checkNumbers.push(check.checkNumber);
    this.amounts.push(check.amount);
    this.repaymentDates.push(check.repaymentDate);
  }

  get accountNumbersAsStr(): string {
    return this.accountNumbers.join(',');
  }

  get bankBranchsAsStr(): string {
    return this.bankBranchs.join(',');
  }

  get bankNumbersAsStr(): string {
    return this.bankNumbers.join(',');
  }

  get checkNumbersAsStr(): string {
    return this.checkNumbers.join(',');
  }

  get amountsAsStr(): string {
    return this.amounts.join(',');
  }

  get repaymentDatesAsStr(): string {
    return this.repaymentDates
      .map((date) => this.dateToHypFormat(date))
      .join(',');
  }

  dateToHypFormat(date: Date): string {
    return DateFormat("yyyyMMdd").format(date);
  }
}
