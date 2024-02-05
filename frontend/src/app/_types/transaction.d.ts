import { Balance } from "@type/balance";
import { Category } from "@type/category";
import { Payment } from "@type/payment";

export type Transaction = {
  id: number;
  creatorId: number;
  editorId: number;
  amount: number;
  paymentDate: Date;
  title: string;
  memo: string;
  status: string;
  categoryId: number;
  groupId: number;
  category: Category;
  payments: Payment[];
  balances: Balance[];
};

export type CreateTransactionDto = Omit<
  Transaction,
  "id",
  "editorId",
  "payments",
  "balances"
> &
  PaymentInfo;

export type UpdateTransactionDto = Partial<CreateTransactionDto>;

// 支払情報
type PaymentInfo = Ratio | Even | AmountBasis;

// 共通
type Common = {
  member: {
    userId: number;
    finalBill: number;
  }[];
};

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
