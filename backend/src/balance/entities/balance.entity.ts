import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, IsString } from "class-validator";

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
  @IsInt()
  amount: number;

  @ApiProperty({
    example: '未完了',
    description: 'ステータス',
    enum: ['未完了', '提案中', '完了'],
  })
  @IsString()
  status: string;

  @ApiProperty({
    example: '1',
    description: '取引ID',
  })
  @IsInt()
  @IsPositive()
  transactionId: number
}

export class BalanceResponse extends Balance { }
