import { IntersectionType, OmitType, PickType } from '@nestjs/swagger';
import { Group } from '../entities/group.entity';

export class CreateGroupDto extends OmitType(Group, ['id', 'uuid']) {}

class UserId {
  userId: number;
}

export class CreateGroupAndMemberDto extends IntersectionType(
  CreateGroupDto,
  UserId,
) {}
