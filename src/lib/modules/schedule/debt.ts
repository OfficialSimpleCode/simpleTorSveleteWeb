class Debt {
    createdAt: Date = new Date(0);
    id: string = "";
    amount: number = 0;
    description: string = "";
    showUser: boolean = false;
  
    constructor({
      createdAt,
      amount,
      id,
      showUser,
      description = "",
    }: {
      createdAt: Date;
      amount: number;
      id: string;
      showUser: boolean;
      description?: string;
    }) {
      this.createdAt = createdAt;
      this.amount = amount;
      this.id = id;
      this.showUser = showUser;
      this.description = description;
    }
  
    static fromJson(json: any, newId: string): Debt {
      const debt = new Debt({
        createdAt: json["createdAt"]
          ? new Date(json["createdAt"])
          : new Date(0),
        amount: json["amount"] != null ? (typeof json["amount"] === "number" ? json["amount"] : parseFloat(json["amount"])) : 0,
        id: newId,
        showUser: json["showUser"] ?? false,
        description: json["description"] ?? "",
      });
      return debt;
    }
  
    static fromDebt(debt: Debt): Debt {
      const newDebt = new Debt({
        createdAt: debt.createdAt,
        amount: debt.amount,
        id: debt.id,
        showUser: debt.showUser,
        description: debt.description,
      });
      return newDebt;
    }
  
    isEqual(debt: Debt): boolean {
      return (
        debt.id === this.id &&
        debt.description === this.description &&
        debt.showUser === this.showUser &&
        debt.createdAt.toString() === this.createdAt.toString() &&
        this.amount === debt.amount
      );
    }
  
    toJson(): Record<string, any> {
      const data: Record<string, any> = {};
      data['createdAt'] = this.createdAt.toISOString();
      data['amount'] = this.amount;
  
      if (this.showUser) {
        data["showUser"] = this.showUser;
      }
  
      if (this.description !== "") {
        data["description"] = this.description;
      }
  
      return data;
    }
  }
  