import { Group } from '@entity/group.entity';
declare const CreateGroupDto_base: import("@nestjs/common").Type<Omit<Group, "id" | "uuid">>;
export declare class CreateGroupDto extends CreateGroupDto_base {
}
declare class UserId {
    userId: number;
}
declare const CreateGroupAndMemberDto_base: import("@nestjs/common").Type<CreateGroupDto & UserId>;
export declare class CreateGroupAndMemberDto extends CreateGroupAndMemberDto_base {
}
export {};
