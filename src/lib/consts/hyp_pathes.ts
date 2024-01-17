export enum HypPaths {
  NoPayNoPayment,
  NoPayNoPaymentWithReceipts,
  Pay100For30WithReceipts,
  Pay70For700Actions,
}

export const hypPathToStr: { [key in HypPaths]: string } = {
  [HypPaths.NoPayNoPayment]: "noPayNoPayment",
  [HypPaths.NoPayNoPaymentWithReceipts]: "noPayNoPaymentWithReceipts",
  [HypPaths.Pay100For30WithReceipts]: "pay100For30WithReceipts",
  [HypPaths.Pay70For700Actions]: "pay70For700Actiions",
};

export const hypPathFromStr: { [key: string]: HypPaths } = {
  noPayNoPayment: HypPaths.NoPayNoPayment,
  noPayNoPaymentWithReceipts: HypPaths.NoPayNoPaymentWithReceipts,
  pay100For30WithReceipts: HypPaths.Pay100For30WithReceipts,
  pay70For700Actiions: HypPaths.Pay70For700Actions,
};
