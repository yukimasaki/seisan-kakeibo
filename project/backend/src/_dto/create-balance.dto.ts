import { Balance } from '@entity/balance.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateBalanceDto extends OmitType(Balance, ['id']) {}
export class CreateBalanceOmitTransactionId extends OmitType(Balance, [
  'id',
  'transactionId',
]) {}
