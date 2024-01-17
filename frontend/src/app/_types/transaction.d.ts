import { Category } from "@type/category";

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
};
