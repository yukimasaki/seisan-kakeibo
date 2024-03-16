import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';
import { Group } from './group.entity';
import { User } from './user.entity';

export class Member {
  @ApiProperty({
    example: '1',
    description: 'メンバーID',
  })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({
    example: '1',
    description: 'グループID',
  })
  @IsInt()
  @IsPositive()
  groupId: number;
}

class AdditionalMemberInfo {
  user: User;
  group: Group;
}

export class MemberResponse extends IntersectionType(
  Member,
  AdditionalMemberInfo,
) {}
