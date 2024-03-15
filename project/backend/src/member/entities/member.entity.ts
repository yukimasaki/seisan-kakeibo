import { Group } from 'src/group/entities/group.entity';
import { User } from 'src/user/entities/user.entity';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

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
