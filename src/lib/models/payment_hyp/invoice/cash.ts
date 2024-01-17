export default class Cash {
    amount: number;
  
    constructor(amount: number = 0) {
      this.amount = amount;
    }
  
    addAmount(amount: number): void {
      this.amount += amount;
    }
  
    removeAmount(amount: number): void {
      this.amount -= amount;
    }
  }
  