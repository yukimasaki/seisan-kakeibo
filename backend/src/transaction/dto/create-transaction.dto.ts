import { Transaction } from "../entities/transaction.entity";
import { CreatePaymentOmitTransactionId } from "@@nest/payment/dto/create-payment.dto";
import { CreateBalanceOmitTransactionId } from "@@nest/balance/dto/create-balance.dto";
import { OmitType } from "@nestjs/swagger";

export class CreateTransactionSeedDto extends OmitType(Transaction, ['id', 'editorId']) { }

export class CreateTransactionDto extends OmitType(Transaction, ['id', 'editorId']) {
  method: string;
  paymentInfoArray: {
    userId: number;
    ratio: number;
    amountEachMember: number;
  }[];
}

export class CreateTransactionComplex {
  createTransactionSeedDto: CreateTransactionSeedDto;
  createPaymentOmitTransactionId: CreatePaymentOmitTransactionId[];
  createBalanceOmitTransactionId: CreateBalanceOmitTransactionId[];
}
