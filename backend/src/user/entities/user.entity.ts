import { GroupResponse } from '@@nest/group/entities/group.entity';
import { Member, MemberResponse } from '@@nest/member/entities/member.entity';
import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class User {
  @ApiProperty({
    example: '1',
    description: 'ユーザーID',
  })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({
    example: 'b3d7a9bc-bf21-49d3-a7f8-b15b85d69ea4',
    description: 'Keycloak ユーザーID',
  })
  @IsUUID()
  uuid: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'メールアドレス',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Jhon Doe',
    description: '',
  })
  @IsString()
  @MaxLength(255)
  userName: string;

  @ApiProperty({
    example: 'free',
    description: '',
    enum: ['free', 'premium'],
  })
  @IsString()
  membership: string;
}

class AdditionalUserInfo {
  belongingGroups: MemberResponse[];
  activeGroupId: number;
  activeGroup: GroupResponse;
}

export class UserResponse extends IntersectionType(User, AdditionalUserInfo) {}
