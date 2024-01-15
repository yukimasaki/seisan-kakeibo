import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, IsString, Length, MaxLength } from "class-validator";

export class Group {
  @ApiProperty({
    example: '1',
    description: 'グループID',
  })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({
    example: 'c68e0836b2e04476a18eeb17a5c3385b',
    description: 'Webアプリケーション用の固有ID。UUIDv4からハイフンを除いた文字列を使用。',
  })
  @IsString()
  @Length(32)
  uid: string;

  @ApiProperty({
    example: 'グループA',
    description: 'グループの表示名',
  })
  @IsString()
  @MaxLength(255)
  displayName: string;
}

export class GroupResponse extends Group { }
