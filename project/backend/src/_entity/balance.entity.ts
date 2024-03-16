import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive, IsString } from 'class-validator';
import { PaymentStatus } from './transaction.entity';

export class Balance {
  @ApiProperty({
    example: '1',
    description: '貸借ID',
  })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({
    example: '1',
    description: '貸し手ID',
  })
  @IsInt()
  @IsPositive()
  lenderId: number;

  @ApiProperty({
    example: '1',
    description: '借り手ID',
  })
  @IsInt()
  @IsPositive()
  borrowerId: number;

  @ApiProperty({
    example: '200',
    description: '残高',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'PENDING',
    description: '取引の状況を表すステータス',
    enum: ['PENDING', 'PROPOSED', 'COMPLETED'],
  })
  @IsString()
  status: PaymentStatus;

  @ApiProperty({
    example: '1',
    description: '取引ID',
  })
  @IsInt()
  @IsPositive()
  transactionId: number;
}

export class BalanceResponse extends Balance {}
