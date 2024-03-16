import { GroupResponse } from './group.entity';
export declare class Invite {
    token: string;
    groupId: number;
}
export declare class CreateInviteResponse extends Invite {
}
declare class AdditionalGroupInfo {
    group: GroupResponse;
}
declare const FindInviteResponse_base: import("@nestjs/common").Type<Invite & AdditionalGroupInfo>;
export declare class FindInviteResponse extends FindInviteResponse_base {
}
export {};
