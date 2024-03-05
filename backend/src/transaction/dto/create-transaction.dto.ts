import { PaymentMethod, Transaction } from '../entities/transaction.entity';
import { IntersectionType, OmitType } from '@nestjs/swagger';

class CommonInput extends OmitType(Transaction, ['id', 'editorId']) {}

class BalanceInput {
  method: PaymentMethod;
  member: {
    userId: number;
    finalBill: number;
    balance: number;
  }[];
}

export class CreateTransactionDto extends IntersectionType(
  CommonInput,
  BalanceInput,
) {}
