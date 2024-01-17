

enum PayApplication { Bit, PayPal, PayBox, Other }

const payApplicationToStr: Record<PayApplication, string> = {
  [PayApplication.PayPal]: "payPal",
  [PayApplication.Bit]: "bit",
  [PayApplication.PayBox]: "payBox",
  [PayApplication.Other]: "other",
};

const payApplicationFromStr: Record<string, PayApplication> = {
  "payPal": PayApplication.PayPal,
  "bit": PayApplication.Bit,
  "payBox": PayApplication.PayBox,
  "other": PayApplication.Other,
};

const payApplicationToIcon: Record<PayApplication, string> = {
  [PayApplication.PayPal]: paypalLogo,
  [PayApplication.Bit]: bitLogo,
  [PayApplication.PayBox]: payboxLogo,
  [PayApplication.Other]: otherLogo,
};

class ApplicationPayment {
  amount: number = 0;
  application: PayApplication = PayApplication.Bit;

  constructor({ amount = 0, application = PayApplication.Bit}: { amount?: number; application?: PayApplication }) {
    this.amount = amount || 0;
    this.application = application|| PayApplication.Bit;
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};

    data["A"] = this.amount;
    data["PA"] = payApplicationToStr[this.application];

    return data;
  }

  static fromJson(json: Record<string, any>): ApplicationPayment{
    const newObj = new ApplicationPayment();
    newObj.amount = json["A"];
    if (json["PA"] !== null) {
        newObj.application = payApplicationFromStr[json["PA"]] || PayApplication.Bit;
    }
    return newObj;
  }

}
