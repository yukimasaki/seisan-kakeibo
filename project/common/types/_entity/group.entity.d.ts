import { Member } from '@prisma/client';
import { User } from './user.entity';
export declare class Group {
    id: number;
    creatorId: number;
    uuid: string;
    displayName: string;
}
declare class AddtionalGroupInfo {
    members: Member[];
}
declare class AdditionalUserInfo {
    creator: User;
}
declare const GroupResponse_base: import("@nestjs/common").Type<Group & AddtionalGroupInfo & AdditionalUserInfo>;
export declare class GroupResponse extends GroupResponse_base {
}
export {};
