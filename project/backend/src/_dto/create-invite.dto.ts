import { OmitType } from '@nestjs/swagger';
import { Invite } from '@entity/invite.entity';

export class CreateInviteDto extends OmitType(Invite, ['token']) {
  groupId: number;
}
