import { PaymentMethod, Transaction } from '../entities/transaction.entity';
import { IntersectionType, OmitType } from '@nestjs/swagger';

export class CreateTransactionDto extends OmitType(Transaction, [
  'id',
  'editorId',
]) {}

class BalanceInput {
  method: PaymentMethod;
  member: {
    userId: number;
    finalBill: number;
    balance: number;
  }[];
}

export class CreateTransactionComplex extends IntersectionType(
  CreateTransactionDto,
  BalanceInput,
) {}
