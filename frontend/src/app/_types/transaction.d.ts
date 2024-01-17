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
  payments: Payment[],
  balances: Balance[],
};
