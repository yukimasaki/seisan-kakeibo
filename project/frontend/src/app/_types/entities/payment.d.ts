import { User } from "@frontend/types/entities/user";

export type Payment = {
  id: number;
  payerId: number;
  actualPaymentAmount: number;
  defaultPaymentAmount: number;
  difference: number;
  method: string;
  ratio: number | null;
  transactionId: number;
  payer: User;
};
