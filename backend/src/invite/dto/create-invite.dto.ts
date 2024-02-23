import { OmitType } from '@nestjs/swagger';
import { Invite, InviteResponse } from '../entities/invite.entity';

export class CreateInviteDto extends OmitType(Invite, ['token']) {
  groupId: number;
}
