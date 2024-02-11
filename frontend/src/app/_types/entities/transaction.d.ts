import { Balance } from "@type/entities/balance";
import { Category } from "@type/entities/category";
import { Payment } from "@type/entities/payment";

// 共通
export type Common = Omit<
  Transaction,
  "id" | "editorId" | "payments" | "balances" | "category"
>;

// 比率
export type Ratio = Common & {
  tag: "ratio";
  member: {
    userId: number;
    finalBill: number;
    ratio: number;
  }[];
};

// 均等
export type Even = Common & {
  tag: "even";
  member: {
    userId: number;
    finalBill: number;
  }[];
};

// 金額指定
export type AmountBasis = Common & {
  tag: "amount_basis";
  member: {
    userId: number;
    finalBill: number;
    specifiedAmount: number;
  }[];
};

export type Transaction = {
  id: number; // Omit
  creatorId: number;
  editorId: number; // Omit
  amount: number;
  paymentDate: Date;
  title: string;
  memo?: string;
  status: string;
  categoryId: number;
  groupId: number;
  category: Category; // Omit
  payments: Payment[]; // Omit
  balances: Balance[]; // Omit
};

export type CreateTransactionDto = Ratio | Even | AmountBasis;

export type UpdateTransactionDto = Partial<CreateTransactionDto>;
