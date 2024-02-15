import { Transaction } from '../entities/transaction.entity';
import { IntersectionType, OmitType } from '@nestjs/swagger';

type PaymentType = 'ratio' | 'even' | 'amount_basis';

class CommonInput extends OmitType(Transaction, ['id', 'editorId']) {}

class BalanceInput {
  method: PaymentType;
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
