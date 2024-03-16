import { OmitType } from '@nestjs/swagger';
import { Payment } from '@entity/payment.entity';

export class CreatePaymentDto extends OmitType(Payment, ['id']) {}
export class CreatePaymentOmitTransactionId extends OmitType(Payment, [
  'id',
  'transactionId',
]) {}
