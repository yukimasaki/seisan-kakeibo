import { IntersectionType } from '@nestjs/swagger';
import { GroupResponse } from './group.entity';

export class Invite {
  token: string;
  groupId: number;
}

export class CreateInviteResponse extends Invite {}

class AdditionalGroupInfo {
  group: GroupResponse;
}

export class FindInviteResponse extends IntersectionType(
  Invite,
  AdditionalGroupInfo,
) {}
