import { Balance } from "@frontend/types/entities/balance";
import { Category } from "@frontend/types/entities/category";
import { Payment } from "@frontend/types/entities/payment";

// 割り勘方法
export type PaymentStatus = "PENDING" | "PROPOSED" | "COMPLETED";
export type PaymentMethod = "RATIO" | "EVEN" | "AMOUNT_BASIS" | "NONE";

// 共通
export type CreateTransactionDto = Omit<
  Transaction,
  "id" | "editorId" | "payments" | "balances" | "category"
>;

// 比率
export type BalanceInput = {
  member: {
    userId: number;
    finalBill: number;
    ratio: number | null;
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
  status: PaymentStatus;
  method: PaymentMethod;
  categoryId: number;
  groupId: number;
  category: Category; // Omit
  payments: Payment[]; // Omit
  balances: Balance[]; // Omit
};

export type CreateTransactionComplex = CreateTransactionDto & BalanceInput;

export type UpdateTransactionDto = Partial<CreateTransactionComplex>;
