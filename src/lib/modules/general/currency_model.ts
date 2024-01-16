



class CurrencyModel {
    ///The currency code
    code: string = "";
  
    ///The currency name in English
    name: string = "";
  
    ///The currency symbol
    symbol: string = "";
  
    constructor({
      code = "",
      name = "",
      symbol = "",
    }: {
      code?: string;
      name?: string;
      symbol?: string;
    } = {}) {
      this.code = code;
      this.name = name;
      this.symbol = symbol;
    }
  
    static fromJson(json: { [key: string]: any }): CurrencyModel {
      return new CurrencyModel({
        code: json['code'] || '',
        name: json['name'] || '',
        symbol: json['symbol'] || '',
      });
    }
  
    toJson(): { [key: string]: any } {
      return {
        'code': this.code,
        'name': this.name,
        'symbol': this.symbol,
      };
    }
  
    isEqual(other: CurrencyModel): boolean {
      return other.code === this.code;
    }
  
    // static fromCurrency(currency: Currency): CurrencyModel {
    //   return new CurrencyModel({
    //     code: currency.code,
    //     name: currency.name,
    //     symbol: currency.symbol,
    //   });
    // }
  
    // toCurrency(): Currency {
    //   return {
    //     code: this.code,
    //     name: this.name,
    //     symbol: this.symbol,
    //     flag: 'flag',
    //     number: 0,
    //     decimalDigits: 0,
    //     namePlural: '',
    //     symbolOnLeft: true,
    //     decimalSeparator: '',
    //     thousandsSeparator: '',
    //     spaceBetweenAmountAndSymbol: true,
    //   };
    // }
  
    toString(): string {
      return JSON.stringify(this.toJson(), null, 2);
    }
  }
  


  
  
  const defaultCurrency = new CurrencyModel({
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
  });

  