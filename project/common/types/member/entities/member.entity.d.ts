import { Group } from 'src/group/entities/group.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Member {
    userId: number;
    groupId: number;
}
declare class AdditionalMemberInfo {
    user: User;
    group: Group;
}
declare const MemberResponse_base: import("@nestjs/common").Type<Member & AdditionalMemberInfo>;
export declare class MemberResponse extends MemberResponse_base {
}
export {};
