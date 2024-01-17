import Cash from "./cash";
import Check from "./check";

export default class PaymentsMethods {
    checks: Check[] = [];
    onlinePayment?: OnlinePayment;
    cash?: Cash;
    applicationPayments: ApplicationPayment[] = [];
    amount: number = 0;
    currency?: string;
  
    constructor({
      amount = 0,
      currency,
      onlinePayment,
      cash,
    }: {
      amount?: number;
      currency?: string;
      onlinePayment?: OnlinePayment;
      cash?: Cash;
    } = {}) {
      this.amount = amount;
      this.currency = currency;
      this.onlinePayment = onlinePayment;
      this.cash = cash;
    }
  
    addCheck(check: Check): void {
      this.checks.push(check);
      this.amount += check.amount;
    }
  
    removeCheck(check: Check): void {
      const index = this.checks.indexOf(check);
      if (index !== -1) {
        this.checks.splice(index, 1);
        this.amount -= check.amount;
      }
    }
  
    addCashAmount(amount: number): void {
      if (!this.cash) {
        this.cash = new Cash();
      }
      this.cash.addAmount(amount);
      this.amount += amount;
    }
  
    removeCashAmount(amount: number): void {
      if (this.cash) {
        this.cash.removeAmount(amount);
        this.amount -= amount;
      }
    }
  
    get cashAmount(): number {
      return this.cash ? this.cash.amount : 0;
    }
  
    get allChecks(): MultipleChecks {
      return new MultipleChecks({ checks: this.checks });
    }
  
    get allPaymentsAsChecks(): MultipleChecks {
      const multipleChecks = new MultipleChecks({ checks: this.checks });
      if (this.cash || this.applicationPayments.length > 0) {
        let totalAmount = 0;
        if (this.cash) {
          totalAmount += this.cash.amount;
        }
        if (this.applicationPayments.length > 0) {
          this.applicationPayments.forEach((appPay) => {
            totalAmount += appPay.amount;
          });
        }
        multipleChecks.addCheck(
          new Check({
            accountNumber: '',
            bankBranch: '',
            bankNumber: '',
            checkNumber: '',
            amount: totalAmount,
            repaymentDate: new Date(0),
          })
        );
      }
      return multipleChecks;
    }
  
    toJson(): Record<string, any> {
      const data: Record<string, any> = {};
      if (this.checks.length > 0) {
        data["Ch"] = this.checks.map((check) => check.toJson());
      }
  
      if (this.applicationPayments.length > 0) {
        data["AP"] = this.applicationPayments.map((appPay) => appPay.toJson());
      }
  
      if (this.cash && this.cash.amount > 0) {
        data["CA"] = this.cash.amount;
      }
  
      if (this.onlinePayment) {
        data["OP"] = this.onlinePayment.amount;
      }
  
      data["A"] = this.amount;
      data["C"] = this.currency;
  
      return data;
    }
  
    static fromJson(json: Record<string, any>): PaymentsMethods {
      const paymentsMethods = new PaymentsMethods();
      paymentsMethods.checks = [];
  
      if (json["Ch"]) {
        json["Ch"].forEach((checkJson: Record<string, any>) => {
          paymentsMethods.checks.push(Check.fromJson(checkJson));
        });
      }
  
      if (json["AP"]) {
        (json["AP"] as Record<string, any>[]).forEach((appPayJson) => {
          paymentsMethods.applicationPayments.push(
            ApplicationPayment.fromJson(appPayJson)
          );
        });
      }
  
      if (json["CA"]) {
        const amountTemp =
          typeof json["CA"] === "number" ? json["CA"] : parseFloat(json["CA"]);
        paymentsMethods.cash = new Cash({ amount: amountTemp });
      }
  
      if (json["OP"]) {
        paymentsMethods.onlinePayment = new OnlinePayment({
          amount: json["OP"],
        });
      }
  
      if (json["A"]) {
        paymentsMethods.amount =
          typeof json["A"] === "number" ? json["A"] : parseFloat(json["A"]);
      }
  
      paymentsMethods.currency = json["C"] || "";
  
      return paymentsMethods;
    }
  }
  