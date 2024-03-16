import { Invite } from '@entity/invite.entity';
declare const CreateInviteDto_base: import("@nestjs/common").Type<Omit<Invite, "token">>;
export declare class CreateInviteDto extends CreateInviteDto_base {
    groupId: number;
}
export {};
