import { MemberResponse } from './member.entity';
import { GroupResponse } from './group.entity';
export declare class User {
    id: number;
    uuid: string;
    email: string;
    userName: string;
    membership: string;
}
declare class AdditionalUserInfo {
    belongingGroups: MemberResponse[];
    activeGroupId: number;
    activeGroup: GroupResponse;
}
declare const UserResponse_base: import("@nestjs/common").Type<User & AdditionalUserInfo>;
export declare class UserResponse extends UserResponse_base {
}
export {};
