import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionComplex } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(
  CreateTransactionComplex,
) {}
