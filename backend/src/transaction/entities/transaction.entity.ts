import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsPositive, IsString } from "class-validator";

export class Transaction {
  @ApiProperty({
    example: '1',
    description: '取引ID',
  })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({
    example: '1',
    description: '登録者ID',
  })
  @IsInt()
  @IsPositive()
  creatorId: number;

  @ApiProperty({
    example: '1',
    description: '変更者ID',
  })
  @IsInt()
  @IsPositive()
  editorId: number;

  @ApiProperty({
    example: '3000',
    description: '取引金額',
  })
  @IsInt()
  amount: number;

  @ApiProperty({
    example: 'Mon Nov 15 2023 12:34:56 GMT+0000',
    description: '取引日時',
  })
  @IsDate()
  paymentDate: Date;

  @ApiProperty({
    example: '食材の買い出し',
    description: '件名',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'ポイントを使用した',
    description: '備考',
  })
  @IsString()
  memo: string;

  @ApiProperty({
    example: '完了',
    description: '',
    enum: ['未完了', '提案中', '完了'],
  })
  @IsString()
  status: string;

  @ApiProperty({
    example: '1',
    description: 'カテゴリーID',
  })
  @IsInt()
  @IsPositive()
  categoryId: number;

  @ApiProperty({
    example: '1',
    description: 'グループID',
  })
  @IsInt()
  @IsPositive()
  groupId: number;
}

export class TransactionResponse extends Transaction { }
