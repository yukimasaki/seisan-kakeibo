import { GroupResponse } from "@type/entities/group";
import { Member, MemberResponse } from "@type/entities/member";

export type User = {
  id: number;
  uuid: string;
  email: string;
  userName: string;
  membership: string;
};

type AdditionalUserInfo = {
  belongingGroups: MemberResponse[];
  activeGroupId: number;
  activeGroup: GroupResponse;
};

export type UserResponse = User & AdditionalUserInfo;

export type CreateUserDto = Omit<User, "id">;

export type UpdateUserDto = Partial<User>;
