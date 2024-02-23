import { Member } from '@prisma/client';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  IsInt,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class Group {
  @ApiProperty({
    example: '1',
    description: 'グループID',
  })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({
    example: 'b3d7a9bc-bf21-49d3-a7f8-b15b85d69ea4',
    description: 'Webアプリケーション用の固有ID (UUIDv4)',
  })
  @IsUUID()
  uuid: string;

  @ApiProperty({
    example: 'グループA',
    description: 'グループの表示名',
  })
  @IsString()
  @MaxLength(255)
  displayName: string;
}

class AddtionalGroupInfo {
  members: Member[];
}

export class GroupResponse extends IntersectionType(
  Group,
  AddtionalGroupInfo,
) {}
