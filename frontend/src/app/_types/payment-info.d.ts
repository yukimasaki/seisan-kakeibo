// 支払情報
export type PaymentInfo = Ratio | Even | AmountBasis;

// 共通
type Common = {
  totalAmount: number;
  member: {
    userId: number;
    finalBill: number;
  }[];
}

// 比率
type Ratio = Common & {
  tag: "ratio";
  member: {
    ratio: number;
  }[];
};

// 均等
type Even = Common & {
  tag: "even";
};

// 金額指定
type AmountBasis = Common & {
  tag: "amount_basis";
  member: {
    specifiedAmount: number;
  }[];
};
