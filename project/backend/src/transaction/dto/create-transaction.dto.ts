import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
import { Transaction } from '../entities/transaction.entity';
import { IntersectionType, OmitType } from '@nestjs/swagger';

export class CreateTransactionDto extends OmitType(Transaction, [
  'id',
  'editorId',
]) {}

class Member {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsNumber()
  finalBill: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  ratio: number | null;

  @IsNumber()
  @IsOptional()
  balance: number;
}

export class BalanceInput {
  member: Member[];
}

export class CreateTransactionComplex extends IntersectionType(
  CreateTransactionDto,
  BalanceInput,
) {}
