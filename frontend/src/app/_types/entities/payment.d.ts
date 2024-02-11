import { User } from "@type/entities/user";

export type Payment = {
  id: number;
  payerId: number;
  actualPaymentAmount: number;
  defaultPaymentAmount: number;
  difference: number;
  method: string;
  ratio: number;
  transactionId: number;
  payer: User;
};
