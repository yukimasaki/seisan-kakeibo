import { Balance } from "@type/entities/balance";
import { Category } from "@type/entities/category";
import { Payment } from "@type/entities/payment";

// 共通
export type CommonInput = Omit<
  Transaction,
  "id" | "editorId" | "payments" | "balances" | "category"
>;

// 比率
export type BalanceInput = {
  member: {
    userId: number;
    finalBill: number;
    balance: number;
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

export type CreateTransactionDto = CommonInput & BalanceInput;

export type UpdateTransactionDto = Partial<CreateTransactionDto>;
