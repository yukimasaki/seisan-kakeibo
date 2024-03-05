import { Balance } from "@type/entities/balance";
import { Category } from "@type/entities/category";
import { Payment } from "@type/entities/payment";
import { PaymentType } from "../../(private)/transaction/transaction-server-action";

// 割り勘方法
export type PaymentType = "ratio" | "even" | "amount_basis";

// 共通
export type CommonInput = Omit<
  Transaction,
  "id" | "editorId" | "payments" | "balances" | "category"
>;

// 比率
export type BalanceInput = {
  method: PaymentType;
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

export type CreateTransactionComplex = CommonInput & BalanceInput;

export type UpdateTransactionDto = Partial<CreateTransactionComplex>;
