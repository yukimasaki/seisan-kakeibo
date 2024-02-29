import { IntersectionType } from '@nestjs/swagger';
import { GroupResponse } from 'src/group/entities/group.entity';

export class Invite {
  token: string;
  groupId: number;
}

export class CreateInviteResponse extends Invite {}

export class FindInviteResponse extends IntersectionType(
  Invite,
  GroupResponse,
) {}
