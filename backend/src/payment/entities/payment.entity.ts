import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

export class Payment {
  @ApiProperty({
    example: '1',
    description: '支払ID',
  })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({
    example: '1',
    description: '支払者ID',
  })
  @IsInt()
  @IsPositive()
  payerId: number;

  @ApiProperty({
    example: '1200',
    description: '実際の支払額',
  })
  @IsNumber()
  finalBill: number;

  @ApiProperty({
    example: '1000',
    description: '既定の支払額',
  })
  @IsNumber()
  balance: number;

  @ApiProperty({
    example: '200',
    description: '実際の支払額と既定の支払額との差額',
  })
  @IsInt()
  difference: number;

  @ApiProperty({
    example: '0.25',
    description: '負担割合 (最小値: 0、最大値: 1)',
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  ratio: number | null;

  @ApiProperty({
    example: '1',
    description: '取引ID',
  })
  @IsInt()
  @IsPositive()
  transactionId: number;
}

export class PaymentResponse extends Payment {}
