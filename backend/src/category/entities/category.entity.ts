import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, IsString } from "class-validator";

export class Category {
  @ApiProperty({
    example: '1',
    description: 'カテゴリーID',
  })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({
    example: 'https://example.com/path/to/category-icon.svg',
    description: 'カテゴリーのアイコン画像URL',
  })
  @IsString()
  icon: string;

  @ApiProperty({
    example: '交通費',
    description: 'カテゴリーの表示名',
  })
  @IsString()
  category: string;

  @ApiProperty({
    example: '1',
    description: 'グループID',
  })
  @IsInt()
  @IsPositive()
  groupId: number;
}

export class CategoryResponse extends Category { }
