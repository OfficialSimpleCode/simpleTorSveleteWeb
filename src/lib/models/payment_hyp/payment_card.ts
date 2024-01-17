const paymentBrandsFromStr: { [key: string]: string } = {
    '1': 'PL',
    '2': 'MasterCard',
    '3': 'Visa',
    '4': 'Maestro',
    '5': 'Isracard',
  };
  
  const paymentBrandsToStr: { [key: string]: string } = {
    'PL': '1',
    'MasterCard': '2',
    'Visa': '3',
    'Maestro': '4',
    'Isracard': '5',
  };
  
  const bankFromStr: { [key: string]: string } = {
    '1': 'Isracard',
    '2': 'Visa Cal',
    '3': 'Diners',
    '4': 'Amex',
    '6': 'Leumi Card',
  };
  
  const bankToStr: { [key: string]: string } = {
    'Isracard': '1',
    'Visa Cal': '2',
    'Diners': '3',
    'Amex': '4',
    'Leumi Card': '6',
  };
  
  class PaymentCard {
    brand: string = '';
    token: string = '';
    validityMonth: string = '';
    validityYear: string = '';
    name: string = '';
    bankName: string = '';
    l4Digits: string = '';
    userId: string = '';
    attemptsLeft: number = maxAttemptsPassword;
    cardId: string = '';
    businessId: string = '';
  
    constructor({
      brand = '',
      token = '',
      validityMonth = '',
      validityYear = '',
      name = '',
      userId = '',
      bankName = '',
      l4Digits = '',
      cardId = '',
      businessId = '',
      attemptsLeft = maxAttemptsPassword,
    }: {
      brand?: string;
      token?: string;
      validityMonth?: string;
      validityYear?: string;
      name?: string;
      userId?: string;
      bankName?: string;
      l4Digits?: string;
      cardId?: string;
      businessId?: string;
      attemptsLeft?: number;
    } = {}) {
      this.brand = brand;
      this.token = token;
      this.validityMonth = validityMonth;
      this.validityYear = validityYear;
      this.name = name;
      this.userId = userId;
      this.bankName = bankName;
      this.l4Digits = l4Digits;
      this.cardId = cardId;
      this.businessId = businessId;
      this.attemptsLeft = attemptsLeft;
    }
  
    fromJson(json: Record<string, any>, key: string, newBusinessId: string): void {
      this.cardId = key;
      this.brand = paymentBrandsFromStr[json['brand']] || 'Card';
      this.token = json['token'] || '';
      this.userId = json['userId'] || '';
      this.attemptsLeft = json['attemptsLeft'] || maxAttemptsPassword;
      this.validityMonth = json['validityMonth'] || '';
      this.validityYear = json['validityYear'] || '';
      this.businessId = newBusinessId;
      this.name = json['name'] || '';
      this.bankName = json['bankName'] || '';
      this.bankName = bankFromStr[json['bankName']] || 'Bank';
      this.l4Digits = json['l4Digits'] || '';
    }
  
    fromPaymentCard(card: PaymentCard): void {
      this.brand = card.brand;
      this.token = card.token;
      this.userId = card.userId;
      this.businessId = card.businessId;
      this.cardId = card.cardId;
      this.attemptsLeft = card.attemptsLeft;
      this.validityMonth = card.validityMonth;
      this.validityYear = card.validityYear;
      this.name = card.name;
      this.bankName = card.bankName;
      this.l4Digits = card.l4Digits;
    }
  
    toJson(): Record<string, any> {
      const data: Record<string, any> = {};
      data['brand'] = paymentBrandsToStr[this.brand] || '';
      data['token'] = this.token;
      data['userId'] = this.userId;
      data['attemptsLeft'] = this.attemptsLeft;
      data['validityMonth'] = this.validityMonth;
      data['validityYear'] = this.validityYear;
      data['name'] = this.name;
      data['bankName'] = this.bankName;
      data['bankName'] = bankToStr[this.bankName] || '';
      data['l4Digits'] = this.l4Digits;
  
      return data;
    }
  
    decryptCard(password: string): PaymentCard {
      return new PaymentCard({
        cardId: this.cardId,
        brand: this.brand,
        token: decryptText({ encryption: this.token, password }),
        validityMonth: decryptText({ encryption: this.validityMonth, password }),
        validityYear: decryptText({ encryption: this.validityYear, password }),
        name: this.name,
        userId: this.userId,
        bankName: this.bankName,
        businessId: this.businessId,
        l4Digits: this.l4Digits,
      });
    }
  
    encryptCard(password: string): PaymentCard {
      return new PaymentCard({
        cardId: this.cardId,
        brand: this.brand,
        token: encryptText({ text: this.token, password }),
        validityMonth: encryptText({ text: this.validityMonth, password }),
        validityYear: encryptText({ text: this.validityYear, password }),
        name: this.name,
        userId: this.userId,
        bankName: this.bankName,
        businessId: this.businessId,
        l4Digits: this.l4Digits,
      });
    }
  
    isTheSameAs(card: PaymentCard): boolean {
      return (
        this.bankName === card.bankName &&
        this.brand === card.brand &&
        this.name === card.name &&
        this.l4Digits === card.l4Digits &&
        this.userId === card.userId &&
        this.validityMonth === card.validityMonth &&
        this.validityYear === card.validityYear
      );
    }
  
    toString(): string {
      return JSON.stringify(this, null, '  ');
    }
  }
  